import {AfterViewInit, Component, ElementRef, Input, OnInit, ViewChild} from '@angular/core';
import {
  AmbientLight,
  Box3,
  Camera,
  HemisphereLight,
  Light,
  Object3D,
  PerspectiveCamera,
  PointLight,
  Vector3
} from "three";
import {OrbitControls} from "three/examples/jsm/controls/OrbitControls";
import {FormControl, FormGroup} from "@angular/forms";
import {StlViewerOptions} from "./stl-viewer-options.enum";
import {StlViewerOptionsModel} from "./stl-viewer-options.model";
import {StlModelViewerComponent} from "angular-stl-model-viewer";
import {combineLatest, filter, finalize, map, Observable, of, Subject, switchMap, tap} from "rxjs";
import {TuiFileLike} from "@taiga-ui/kit";
import {MeshStore} from "../../stores/mesh.store";
import {isNonNull, removeAllFromScene} from "../../../common/util/common.util";
import {MeshProcessingService} from "../../services/mesh-processing.service";

@Component({
  selector: 'nut-stl-viewer',
  templateUrl: './stl-viewer.component.html',
  styleUrls: ['./stl-viewer.component.scss',
              './stl-viewer-component.less']
})
export class StlViewerComponent implements OnInit, AfterViewInit {
  @ViewChild('modelViewer', {static: true}) modelViewer: StlModelViewerComponent;

  @ViewChild('modelViewer', {static: true, read: ElementRef}) modelViewerElementRef: ElementRef;

  FIELDS = StlViewerOptions;
  ACCEPTS_HEADER: string = this.meshProccesingService.ACCEPTS_HEADER;

  @Input() styleClass: string = '';

  stlFileControl: FormControl<TuiFileLike | null> = new FormControl<TuiFileLike | null>(null);

  rejectedFile$ = new Subject<TuiFileLike | null>();
  loadingFile$: Observable<TuiFileLike | null>;
  loadedFile$: Observable<TuiFileLike | null>;

  camera: PerspectiveCamera;
  controls: OrbitControls;
  settingsForm: FormGroup;

  constructor(private meshStore: MeshStore,
              private meshProccesingService: MeshProcessingService) {
  }

  ngOnInit(): void {
    this.buildSettingsFormGroup();
    this.initSettings();
    this.bindSettingsToRenderer();
    this.bindFileChanges();
    this.bindMeshChangesToViewer();

  }

  ngAfterViewInit(): void {
    this.modelViewer.render = () => {
      this.modelViewer.renderer.render(this.modelViewer.scene, this.modelViewer.camera)
      this.modelViewer.controls.update();
    }
    this.modelViewer.scene.clear();
  }

  private buildSettingsFormGroup(): void {
    let controls: any = {};
    controls[StlViewerOptions.FOV] = new FormControl<number>(80);
    controls[StlViewerOptions.SHADOWS] = new FormControl<boolean> (true);

    this.settingsForm = new FormGroup<any>(controls);
  }

  private bindFileChanges(): void {
    this.stlFileControl.valueChanges.subscribe(
      file => {
        this.meshStore.setFile(file);
      }
    );
    this.loadedFile$ = this.meshStore.getFileAsObservable();
    this.loadingFile$ = this.meshStore.getLoadingFileAsObservable();
  }

  private bindSettingsToRenderer(): void {
    this.settingsForm.valueChanges.subscribe(
      () => {
        if (this.settingsForm.valid) {
          this.changeSettings();
        }
      }
    )
  }

  private initSettings(): void {
    const settings: StlViewerOptionsModel = this.settingsForm.getRawValue();
    this.camera = new PerspectiveCamera(settings.fov, window.innerWidth / window.innerHeight, 0.1, 1);
    this.controls = new OrbitControls(this.camera, this.modelViewerElementRef.nativeElement);
    this.controls.minDistance = 4;
    this.controls.maxDistance = 14;
    this.controls.enableDamping = true;

    this.controls.update();
    this.modelViewer.render();
  }

  changeSettings(): void {
    const settings: StlViewerOptionsModel = this.settingsForm.getRawValue();

    this.camera.fov = settings.fov;
    this.camera.updateProjectionMatrix();
    this.modelViewer.render();
  }

  onReject(file: TuiFileLike | readonly TuiFileLike[]): void {
    this.rejectedFile$.next(file as TuiFileLike);
  }

  removeFile(): void {
    this.stlFileControl.setValue(null);
  }

  clearRejected(): void {
    this.removeFile();
    this.rejectedFile$.next(null);
  }

  private bindMeshChangesToViewer(): void {
    this.meshStore.getMeshAsObservable().subscribe(
      mesh => {
        if (!mesh) {
          this.modelViewer.meshGroup = [];
          this.modelViewer.scene.clear();
          this.modelViewer.render();
        } else {
          this.modelViewer.meshGroup = [mesh];
          this.modelViewer.scene.add(mesh);
          this.modelViewer.scene.add(this.getNewLight());
          this.fitCameraToObject(this.modelViewer.camera, mesh, 1.25, this.modelViewer.controls);
          this.modelViewer.render();
        }
      }
    )
  }

  private getNewLight(): Light {
    const hemisphereLight = new HemisphereLight(0xffffff, 0x080820, 1);
    return hemisphereLight;
  }

  private fitCameraToObject(camera: PerspectiveCamera, object: Object3D, offset: number, controls: OrbitControls) {

    offset = offset || 1.25;

    const boundingBox = new Box3();

    // get bounding box of object - this will be used to setup controls and camera
    boundingBox.setFromObject(object);

    const center = boundingBox.getCenter(new Vector3());

    const size = boundingBox.getSize(new Vector3());

    // get the max side of the bounding box (fits to width OR height as needed )
    const maxDim = Math.max(size.x, size.y, size.z);
    const fov = this.modelViewer.camera.fov * (Math.PI / 180);
    let cameraZ = Math.abs(maxDim / 4 * Math.tan(fov * 2));

    cameraZ *= offset; // zoom out a little so that objects don't fill the screen

    camera.position.z = cameraZ;

    const minZ = boundingBox.min.z;
    const cameraToFarEdge = (minZ < 0) ? -minZ + cameraZ : cameraZ - minZ;

    camera.far = cameraToFarEdge * 4;
    camera.updateProjectionMatrix();

    if (controls) {

      // set camera to rotate around center of loaded object
      controls.target = center;
      controls.minDistance = cameraToFarEdge

      // prevent camera from zooming out far enough to create far plane cutoff
      controls.maxDistance = cameraToFarEdge * 3;

      controls.saveState();

    } else {
      camera.lookAt(center)
    }
  }
}
