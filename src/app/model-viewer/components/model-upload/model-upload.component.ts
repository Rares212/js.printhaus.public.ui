import {AfterViewInit, Component, ElementRef, Input, OnInit, ViewChild} from '@angular/core';
import { Box3, HemisphereLight, Light, Mesh, Object3D, PerspectiveCamera, Vector3 } from "three";
import {OrbitControls} from "three/examples/jsm/controls/OrbitControls";
import { FormControl, FormGroup, Validators } from "@angular/forms";
import {Observable, Subject} from "rxjs";
import {TuiFileLike} from "@taiga-ui/kit";
import {MeshStore} from "../../stores/mesh.store";
import {MeshProcessingService} from "../../services/mesh-processing.service";
import { PrintUploadFormFields } from "./print-settings-options.enum";
import { PrintQuality, PrintStrength } from '@printnuts/common';

@Component({
  selector: 'haus-model-upload',
  templateUrl: './model-upload.component.html',
  styleUrls: ['./model-upload.component.scss']
})
export class ModelUploadComponent implements OnInit {
  protected readonly ACCEPTS_HEADER: string = this.meshProcessingService.ACCEPTS_HEADER;
  protected readonly FIELDS = PrintUploadFormFields;

  @Input() styleClass: string = '';
  @Input() maxFileSize: number = 64 * 1000 * 1000; // 64 MB

  rejectedFile$ = new Subject<TuiFileLike | null>();
  loadingFile$: Observable<TuiFileLike | null>;
  loadedFile$: Observable<TuiFileLike | null>;

  loadedMesh$: Observable<Mesh | null>;

  printForm: FormGroup;

  constructor(private meshStore: MeshStore,
              private meshProcessingService: MeshProcessingService) {
  }

  ngOnInit(): void {
    this.buildSettingsFormGroup();
    this.bindFileChanges();
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
    this.loadedMesh$ = this.meshStore.getMeshAsObservable();
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
}
