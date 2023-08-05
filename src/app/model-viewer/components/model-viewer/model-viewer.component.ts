import {
    AfterViewInit,
    Component,
    ElementRef, HostListener,
    Input,
    OnChanges,
    OnDestroy,
    OnInit,
    SimpleChanges,
    ViewChild
} from "@angular/core";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";
import {
    AmbientLight,
    Box3, Color, ColorRepresentation,
    DirectionalLight, Light,
    Material,
    Mesh,
    MeshPhongMaterial, MeshPhysicalMaterial, MeshStandardMaterial,
    PerspectiveCamera, PointLight,
    Scene,
    Vector3,
    WebGLRenderer
} from "three";
import { isNonNull, removeAllFromScene } from "../../../common/util/common.util";

@Component({
    selector: "haus-model-viewer",
    templateUrl: "./model-viewer.component.html",
    styleUrls: ["./model-viewer.component.scss"]
})
export class ModelViewerComponent implements AfterViewInit, OnDestroy, OnChanges {
    @ViewChild("rendererContainer") rendererContainer: ElementRef;
    @Input() mesh: Mesh | null;
    @Input() material: Material | null;
    @Input() materialColor: ColorRepresentation = "#e5ded4";
    @Input() styleClass: string = "";

    renderer = new WebGLRenderer({ alpha: true });
    scene = new Scene();
    camera = new PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
    controls = new OrbitControls(this.camera, this.renderer.domElement);

    constructor() {
        this.camera.position.z = 5;
        this.controls.enableZoom = true;
        this.controls.enableDamping = true;
        this.renderer.setClearColor(0xFFFFFF, 1); // Set background color to white
    }

    ngAfterViewInit() {
        this.updateRendererSize();
        this.rendererContainer.nativeElement.appendChild(this.renderer.domElement);

        this.animate();
    }

    ngOnDestroy() {
        this.renderer.dispose();
        this.renderer.forceContextLoss();
        if (this.mesh) {
            this.scene.remove(this.mesh);
        }
    }

    ngOnChanges(changes: SimpleChanges) {
        if (changes["mesh"]) {
            if (isNonNull(changes["mesh"].currentValue)) {
                removeAllFromScene(this.scene);

                if (isNonNull(this.material)) {
                    changes["mesh"].currentValue.material = this.material;
                } else {
                    changes["mesh"].currentValue.material = this.getMeshMaterial();
                }

                this.getDefaultLights().forEach(light => this.scene.add(light));

                this.scene.add(changes["mesh"].currentValue);
                this.adjustCamera();
            } else {
                removeAllFromScene(this.scene);
            }
        }

        if (changes['materialColor']) {
            let color = changes['materialColor'].currentValue;
            if (color) {
                this.materialColor = color;
            } else {
                this.materialColor = '#e5ded4'; // default color
            }

            // apply the color change to the mesh
            if (this.mesh && this.mesh.material instanceof MeshStandardMaterial) {
                (this.mesh.material as MeshStandardMaterial).color = new Color(this.materialColor);
            }
        }
    }

    @HostListener("window:resize", ["$event"])
    onWindowResize(event: any): void {
        this.updateRendererSize();
    }

    private updateRendererSize() {
        this.renderer.setSize(this.rendererContainer.nativeElement.clientWidth, this.rendererContainer.nativeElement.clientHeight);
        this.camera.aspect = this.rendererContainer.nativeElement.clientWidth / this.rendererContainer.nativeElement.clientHeight;
        this.camera.updateProjectionMatrix();
    }

    private getMeshMaterial(): Material {
        return new MeshStandardMaterial({
            color: this.materialColor,
            roughness: 0.96,
            metalness: 0.01
        });
    }

    private getDefaultLights(): Light[] {
        // Ambient light for soft lighting
        const ambientLight = new AmbientLight(0xFFFFFF, 0.2);

        // Directional light for sun-like lighting
        const directionalLight = new DirectionalLight(0xFFFFFF, 1);
        directionalLight.position.set(1, 1, 1);

        return [ambientLight, directionalLight];
    }

    private adjustCamera() {
        if (!this.mesh) {
            return;
        }

        // Adjust camera distance based on the size of the object
        const boundingBox = new Box3().setFromObject(this.mesh);
        const size = boundingBox.getSize(new Vector3());
        const maxDim = Math.max(size.x, size.y, size.z);
        const fov = this.camera.fov * (Math.PI / 180);
        let cameraZ = Math.abs(maxDim / 2 * Math.tan(fov * 4)); // Increase the divisor to decrease the zoom level

        cameraZ *= 1.1; // Add some extra space
        this.camera.position.z = cameraZ;

        const minZ = boundingBox.min.z;
        const cameraToFarEdge = (minZ < 0) ? -minZ + cameraZ : cameraZ - minZ;

        this.camera.far = cameraToFarEdge * 3;
        this.camera.updateProjectionMatrix();

        if (this.controls) {
            this.controls.target.copy(boundingBox.getCenter(new Vector3()));
            this.controls.maxDistance = cameraToFarEdge * 2;
            this.controls.saveState();
        } else {
            this.camera.lookAt(boundingBox.getCenter(new Vector3()));
        }
    }

    private animate = () => {
        window.requestAnimationFrame(this.animate);
        this.controls.update();
        this.renderer.render(this.scene, this.camera);
    };

}
