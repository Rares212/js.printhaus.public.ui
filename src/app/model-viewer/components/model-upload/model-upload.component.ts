import {AfterViewInit, Component, ElementRef, Input, OnInit, ViewChild} from '@angular/core';
import { Box3, HemisphereLight, Light, Mesh, Object3D, PerspectiveCamera, Vector3 } from "three";
import {OrbitControls} from "three/examples/jsm/controls/OrbitControls";
import { FormControl, FormGroup, Validators } from "@angular/forms";
import { filter, finalize, Observable, of, Subject, switchMap, tap } from "rxjs";
import {TuiFileLike} from "@taiga-ui/kit";
import {MeshStore} from "../../stores/mesh.store";
import {MeshProcessingService} from "../../services/mesh-processing.service";
import { PrintUploadFormFields } from "./print-settings-options.enum";
import { PrintMaterialDto, PrintModelDetailsRespDto, PrintQuality, PrintSettingsDto, PrintStrength } from '@printnuts/common';
import { MaterialService } from "../../services/material.service";
import { isDark, isNonNull } from "../../../common/util/common.util";
import { PrintModelDetailsReqDto } from "../../models/print-model-details.req.dto";

@Component({
  selector: 'haus-model-upload',
  templateUrl: './model-upload.component.html',
  styleUrls: ['./model-upload.component.scss']
})
export class ModelUploadComponent implements OnInit {
  protected readonly ACCEPTS_HEADER: string = this.meshProcessingService.ACCEPTS_HEADER;
  protected readonly FIELDS = PrintUploadFormFields;
  protected readonly isDark = isDark;

  @Input() styleClass: string = '';
  @Input() maxFileSize: number = 64 * 1000 * 1000; // 64 MB

  rejectedFile$ = new Subject<TuiFileLike | null>();
  loadingFile$: Observable<TuiFileLike | null>;
  loadedFile$: Observable<TuiFileLike | null>;

  loadedMesh$: Observable<Mesh | null>;

  printDetailsResponse$: Observable<PrintModelDetailsRespDto | null>;
  loadingPrintDetails: boolean = false;

  printForm: FormGroup;

  printDimensions: Vector3 | null;

  materialList: PrintMaterialDto[] = [];
  qualityList: PrintQuality[] = Object.values(PrintQuality);
  strengthList: PrintStrength[] = Object.values(PrintStrength);

  constructor(private meshStore: MeshStore,
              private meshProcessingService: MeshProcessingService,
              private materialService: MaterialService) {
  }

  ngOnInit(): void {
    this.buildSettingsFormGroup();
    this.bindFileChanges();
    this.bindFormCompletion();
    this.loadMaterials();
  }

  private buildSettingsFormGroup(): void {
    let controls: any = {};
    controls[PrintUploadFormFields.FILE] = new FormControl<TuiFileLike | null>(null, [Validators.required]);
    controls[PrintUploadFormFields.MATERIAL] = new FormControl<string>('', [Validators.required]);
    controls[PrintUploadFormFields.QUALITY] = new FormControl<PrintQuality>(PrintQuality.NORMAL, [Validators.required]);
    controls[PrintUploadFormFields.STRENGTH] = new FormControl<PrintStrength> (PrintStrength.NORMAL, [Validators.required]);

    this.printForm = new FormGroup<any>(controls);
  }

  private bindFileChanges(): void {
    this.printForm.get(PrintUploadFormFields.FILE)!.valueChanges.subscribe(
      file => {
        this.meshStore.setFile(file);
      }
    );
    this.loadedFile$ = this.meshStore.getFileAsObservable();
    this.loadingFile$ = this.meshStore.getLoadingFileAsObservable();
    this.loadedMesh$ = this.meshStore.getMeshAsObservable().pipe(
      tap(mesh => {
        if (mesh) {
          const boundingBox = new Box3().setFromObject(mesh);
          this.printDimensions = boundingBox.getSize(new Vector3());
        } else {
          this.printDimensions = null;
        }
      }
    ));
  }

  private bindFormCompletion(): void {
    this.printDetailsResponse$ = this.printForm.valueChanges.pipe(
      switchMap(() => {
        if (this.printForm.status === 'VALID') {
          const file: TuiFileLike = this.printForm.get(PrintUploadFormFields.FILE)?.value;
          const material: PrintMaterialDto = this.printForm.get(PrintUploadFormFields.MATERIAL)?.value;
          const quality: PrintQuality = this.printForm.get(PrintUploadFormFields.QUALITY)?.value;
          const strength: PrintStrength = this.printForm.get(PrintUploadFormFields.STRENGTH)?.value;

          this.loadingPrintDetails = true;
          return this.meshProcessingService.getModelDetails(file, material._id, new PrintSettingsDto(quality, strength)).pipe(
            finalize(() => this.loadingPrintDetails = false)
          );
        } else {
          return of(null);
        }
      })
    )
  }

  private loadMaterials(): void {
    this.materialService.getMaterials().subscribe(
      materials => {
        this.materialList = materials;
      }
    );
  }

  onReject(file: TuiFileLike | readonly TuiFileLike[]): void {
    this.rejectedFile$.next(file as TuiFileLike);
  }

  removeFile(): void {
    this.printForm.get(PrintUploadFormFields.FILE)!.setValue(null);
  }

  clearRejected(): void {
    this.removeFile();
    this.rejectedFile$.next(null);
  }


  protected readonly isNonNull = isNonNull;
}
