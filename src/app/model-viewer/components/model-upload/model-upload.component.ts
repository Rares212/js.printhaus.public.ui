import { Component, Inject, Input, OnInit } from "@angular/core";
import { Box3, Mesh, Vector3 } from "three";
import { FormControl, FormGroup, Validators } from "@angular/forms";
import { catchError, distinctUntilChanged, finalize, map, Observable, of, Subject, switchMap, tap } from "rxjs";
import { TuiFileLike } from "@taiga-ui/kit";
import { MeshStore } from "../../stores/mesh.store";
import { MeshProcessingService } from "../../services/mesh-processing.service";
import { PrintUploadFormFields } from "./print-settings-options.enum";
import {
    PrintMaterialDto,
    PrintModelDetailsRespDto,
    PrintQuality,
    PrintSettingsDto,
    PrintStrength,
    PRINT_QUALITY_NORMAL_MAP_SCALE
} from "@printnuts/common";
import { MaterialService } from "../../services/material.service";
import { isDark, isNonNull } from "../../../common/util/common.util";
import { DEFAULT_PRINT_QUALITY, DEFAULT_PRINT_STRENGTH } from "../../util/model-viewer.constants";
import { tuiIsMobile } from "@taiga-ui/core";
import { TUI_IS_MOBILE } from "@taiga-ui/cdk";
import { animate, state, style, transition, trigger } from "@angular/animations";

@Component({
    selector: "haus-model-upload",
    templateUrl: "./model-upload.component.html",
    styleUrls: ["./model-upload.component.scss"],
    animations: [
        trigger('expandCollapse', [
            state(
                'collapsedFully',
                style({
                    height: '0%',
                    overflow: 'hidden',
                    opacity: '1',
                })
            ),
            state(
                'collapsed',
                style({
                    height: '50%',
                    overflow: 'hidden',
                    opacity: '1',
                })
            ),
            state(
                'expanded',
                style({
                    height: '*',
                    overflow: '*',
                    opacity: '1',
                })
            ),
            state(
                'expandedFully',
                style({
                    height: '100%',
                    overflow: 'auto',
                    opacity: '1',
                })
            ),
            transition('* <=> *', [animate('300ms ease-in-out')]),
        ]),
    ],
})
export class ModelUploadComponent implements OnInit {
    protected readonly ACCEPTS_HEADER: string = this.meshProcessingService.ACCEPTS_HEADER;
    protected readonly FIELDS = PrintUploadFormFields;
    protected readonly isNonNull = isNonNull;
    protected readonly isDark = isDark;
    protected readonly PRINT_QUALITY_NORMAL_MAP_SCALE = PRINT_QUALITY_NORMAL_MAP_SCALE;
    protected readonly DEFAULT_PRINT_QUALITY = DEFAULT_PRINT_QUALITY;

    @Input() styleClass: string = "";
    @Input() maxFileSize: number = 64 * 1000 * 1000; // 64 MB

    rejectedFile$ = new Subject<TuiFileLike | null>();
    loadingFile$: Observable<TuiFileLike | null>;
    loadedFile$: Observable<TuiFileLike | null>;

    loadedMesh$: Observable<Mesh | null>;

    printDetailsResponse$: Observable<PrintModelDetailsRespDto | null>;
    loadingPrintDetails: boolean = false;

    printForm: FormGroup;

    printDimensions: Vector3 | null = null;

    materials: PrintMaterialDto[][] = [];
    materialLabels: string[] = [];

    qualityList: PrintQuality[] = Object.values(PrintQuality);
    strengthList: PrintStrength[] = Object.values(PrintStrength);

    normalMapScale$: Observable<number>;

    constructor(private meshStore: MeshStore,
                private meshProcessingService: MeshProcessingService,
                private materialService: MaterialService,
                @Inject(TUI_IS_MOBILE) readonly isMobile: boolean) {
    }

    ngOnInit(): void {
        this.buildSettingsFormGroup();
        this.bindFileChanges();
        this.bindFormCompletion();
        this.bindQualityToNormalMapChanges();
        this.loadMaterials();
    }

    private buildSettingsFormGroup(): void {
        let controls: any = {};
        controls[PrintUploadFormFields.FILE] = new FormControl<TuiFileLike | null>(null, [Validators.required]);
        controls[PrintUploadFormFields.MATERIAL] = new FormControl<string>("", [Validators.required]);
        controls[PrintUploadFormFields.QUALITY] = new FormControl<PrintQuality>(DEFAULT_PRINT_QUALITY, [Validators.required]);
        controls[PrintUploadFormFields.STRENGTH] = new FormControl<PrintStrength>(DEFAULT_PRINT_STRENGTH, [Validators.required]);

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
                if (this.printForm.status === "VALID") {
                    const file: TuiFileLike = this.printForm.get(PrintUploadFormFields.FILE)?.value;
                    const material: PrintMaterialDto = this.printForm.get(PrintUploadFormFields.MATERIAL)?.value;
                    const quality: PrintQuality = this.printForm.get(PrintUploadFormFields.QUALITY)?.value;
                    const strength: PrintStrength = this.printForm.get(PrintUploadFormFields.STRENGTH)?.value;

                    this.loadingPrintDetails = true;
                    return this.meshProcessingService.getModelDetails(file, material.id, new PrintSettingsDto(quality, strength)).pipe(
                        finalize(() => this.loadingPrintDetails = false),
                        catchError(() => {
                            return of(null);
                        })
                    );
                } else {
                    return of(null);
                }
            })
        );
    }

    private bindQualityToNormalMapChanges(): void {
        this.normalMapScale$ = this.printForm.get(PrintUploadFormFields.QUALITY)!.valueChanges.pipe(
            map((quality: PrintQuality) => {
                return PRINT_QUALITY_NORMAL_MAP_SCALE[quality] || PRINT_QUALITY_NORMAL_MAP_SCALE[DEFAULT_PRINT_QUALITY];
            })
        )
    }

    private loadMaterials(): void {
        this.materialService.getMaterialsGrouped().subscribe(
            materials => {
                for (const key of materials.keys()) {
                    this.materialLabels.push(key);
                    this.materials.push(materials.get(key)!);
                }
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

    protected readonly tuiIsMobile = tuiIsMobile;
}
