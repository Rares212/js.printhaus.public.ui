import {
    AfterViewInit,
    Component,
    ElementRef,
    HostListener,
    Input,
    OnChanges,
    OnDestroy, OnInit,
    SimpleChanges,
    ViewChild
} from "@angular/core";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";
import {
    ACESFilmicToneMapping,
    AmbientLight,
    Box3, BufferAttribute, BufferGeometry,
    Color,
    ColorRepresentation, DataTexture,
    DirectionalLight, EquirectangularReflectionMapping, GridHelper,
    Light,
    Material,
    Mesh,
    MeshPhysicalMaterial,
    PerspectiveCamera, PMREMGenerator, PointLight,
    Scene,
    Texture,
    TextureLoader, Vector2,
    Vector3,
    WebGLRenderer
} from "three";
import { isNonNull, removeAllFromScene } from "../../../common/util/common.util";
import { Geometry } from "three/examples/jsm/deprecated/Geometry";
import { PRINT_QUALITY_NORMAL_MAP_SCALE } from "@printnuts/common";
import { DEFAULT_PRINT_QUALITY } from "../../util/model-viewer.constants";
import { EXRLoader } from "three/examples/jsm/loaders/EXRLoader";

@Component({
    selector: "haus-model-viewer",
    templateUrl: "./model-viewer.component.html",
    styleUrls: ["./model-viewer.component.scss"]
})
export class ModelViewerComponent implements OnInit, AfterViewInit, OnDestroy, OnChanges {
    @ViewChild("rendererContainer") rendererContainer: ElementRef;
    @Input() mesh: Mesh | null = null;
    @Input() transparency: number = 1.0;
    @Input() materialColor: ColorRepresentation = "#e5ded4";
    @Input() styleClass: string = "";
    @Input() normalScale: number = 0.2;
    @Input() showGrid: boolean = true;
    @Input() gridDivisions: number = 22;
    @Input() gridSize: number = 220;

    private DEFAULT_COLOR: ColorRepresentation = "#e5ded4";
    private DEFAULT_TRANSPARENCY: number = 0.8;
    private DEFAULT_NORMAL_SCALE: number = PRINT_QUALITY_NORMAL_MAP_SCALE[DEFAULT_PRINT_QUALITY];

    material: Material | null = null;
    renderer = new WebGLRenderer({ alpha: true });
    scene = new Scene();
    camera = new PerspectiveCamera(75, window.innerWidth / window.innerHeight);
    controls = new OrbitControls(this.camera, this.renderer.domElement);

    private readonly normalMapUrl: string = "assets/maps/3DPrint_NormalMap_2K.png";
    private readonly envMapUrl: string = "assets/maps/studio_small_08_1k.exr";
    private normalMap: Texture;
    private envMapBackground: DataTexture;
    private exrCubeRenderTarget: any;

    private gridHelper: GridHelper;

    private resizeObserver: ResizeObserver;

    constructor() {

    }

    ngOnInit(): void {
        const textureLoader = new TextureLoader();
        this.normalMap = textureLoader.load(this.normalMapUrl);
        this.loadEnvMap();

        this.controls.enableZoom = true;
        this.controls.enableDamping = true;

        this.renderer.setClearColor(0xFFFFFF, 1); // Set background color to white
    }

    ngAfterViewInit() {
        this.updateRendererSize();
        this.rendererContainer.nativeElement.appendChild(this.renderer.domElement);
        this.renderer.toneMapping = ACESFilmicToneMapping;
        this.renderer.toneMappingExposure = 1;
        // this.scene.background = new Color(0xF0FFF0);

        this.gridHelper = new GridHelper(this.gridSize, this.gridDivisions);
        this.gridHelper.geometry.rotateX( Math.PI / 2 );

        this.resizeObserver = new ResizeObserver(entries => {
            entries.forEach(entry => {
                this.updateRendererSize();
            });
        });

        this.resizeObserver.observe(this.rendererContainer.nativeElement);

        this.animate();
    }

    ngOnDestroy() {
        this.renderer.dispose();
        this.renderer.forceContextLoss();
        if (this.mesh) {
            this.scene.remove(this.mesh);
        }
        if (this.resizeObserver) {
            this.resizeObserver.disconnect();
        }
    }

    ngOnChanges(changes: SimpleChanges) {
        if (changes["mesh"]) {
            const currentMesh = changes["mesh"].currentValue;
            if (isNonNull(currentMesh)) {
                removeAllFromScene(this.scene);

                if (isNonNull(this.material)) {
                    currentMesh.material = this.material;
                } else {
                    currentMesh.material = this.getMeshMaterial();
                }

                const geometry: BufferGeometry = currentMesh.geometry;

                this.updateUVArray(geometry);

                // this.getDefaultLights().forEach(light => this.scene.add(light));

                if (this.showGrid) {
                    this.scene.add(this.gridHelper);
                }

                const boundingBox = new Box3().setFromObject(currentMesh);
                const meshHeight = boundingBox.getSize(new Vector3()).z;
                currentMesh.position.z = meshHeight / 2 + 0.1;

                this.scene.add(currentMesh);
                this.adjustCamera();
            } else {
                removeAllFromScene(this.scene);
            }
        }

        if (changes["materialColor"]) {
            let color = changes["materialColor"].currentValue;
            if (color) {
                this.materialColor = color;
            } else {
                this.materialColor = this.DEFAULT_COLOR;
            }

            // apply the color change to the mesh
            if (this.mesh && this.mesh.material instanceof MeshPhysicalMaterial) {
                (this.mesh.material as MeshPhysicalMaterial).color = new Color(this.materialColor);
            }
        }

        if (changes["transparency"]) {
            let transparency = changes["transparency"].currentValue;
            if (transparency) {
                this.transparency = transparency;
            } else {
                this.transparency = this.DEFAULT_TRANSPARENCY;
            }

            // apply the transparency change to the mesh
            if (this.mesh && this.mesh.material instanceof MeshPhysicalMaterial) {
                // (this.mesh.material as MeshPhysicalMaterial).transmission = this.transparency;
            }
        }

        if (changes["normalScale"]) {
            let normalScale = changes["normalScale"].currentValue;
            if (normalScale) {
                this.normalScale = normalScale;
            } else {
                this.normalScale = this.DEFAULT_NORMAL_SCALE;
            }

            if (this.mesh && this.mesh.material instanceof MeshPhysicalMaterial) {
                (this.mesh.material as MeshPhysicalMaterial).normalScale = new Vector2(this.normalScale, this.normalScale);
            }
        }
    }

    private loadEnvMap(): void {
        const exrLoader = new EXRLoader();

        const pmremGenerator = new PMREMGenerator(this.renderer);

        exrLoader.load(this.envMapUrl, (texture: DataTexture) => {

            texture.mapping = EquirectangularReflectionMapping;

            this.exrCubeRenderTarget = pmremGenerator.fromEquirectangular(texture);
            this.envMapBackground = texture;

            this.scene.environment = this.exrCubeRenderTarget ? this.exrCubeRenderTarget.texture : null;
            // this.scene.background = this.envMapBackground;
        });

        pmremGenerator.compileEquirectangularShader();
    }

    private updateUVArray(geometry: BufferGeometry) {
        if (geometry.attributes["position"]) {
            const positions = geometry.attributes["position"].array;
            const uvs = geometry.attributes["uv"]?.array ? geometry.attributes["uv"].array : [];

            geometry.computeBoundingBox();
            const bbox: Box3 = geometry.boundingBox!;

            for (let i = 0; i < positions.length; i += 3) {
                const x = positions[i];
                const z = positions[i + 2];
                const uvX = (x - bbox.min.x) / (bbox.max.x - bbox.min.x);
                const uvY = (z - bbox.min.z) / (bbox.max.z - bbox.min.z);

                uvs[i / 3 * 2] = uvX;
                uvs[i / 3 * 2 + 1] = uvY;
            }

            geometry.setAttribute("uv", new BufferAttribute(new Float32Array(uvs), 2));

            geometry.attributes["uv"].needsUpdate = true;
        }
    }

    private updateRendererSize() {
        this.renderer.setSize(this.rendererContainer.nativeElement.clientWidth, this.rendererContainer.nativeElement.clientHeight);
        this.camera.aspect = this.rendererContainer.nativeElement.clientWidth / this.rendererContainer.nativeElement.clientHeight;
        this.camera.updateProjectionMatrix();
    }

    private getMeshMaterial(): Material {
        return new MeshPhysicalMaterial({
            color: this.materialColor,
            transmission: 0.05,
            clearcoat: 0.8,
            clearcoatRoughness: 0.4,
            envMapIntensity: 1.0,
            thickness: 3.0,
            attenuationDistance: 0.8,
            attenuationColor: new Color("c0c0c0"),
            normalMap: this.normalMap,
            normalScale: new Vector2(0.5, 0.5),
            roughness: 0.2,
            metalness: 0.01
        });
    }

    private getDefaultLights(): Light[] {
        // Ambient light for soft lighting
        const ambientLight = new AmbientLight(0xFFFFFF, 0.2);

        // Directional light for sun-like lighting
        const directionalLight = new DirectionalLight(0xFFFFFF, 1);
        directionalLight.position.set(1, 1, 1);

        // Point light attached to the camera
        const cameraLight = new PointLight(0xFFFFFF, 0.5); // Adjust the color and intensity as needed
        // this.camera.add(cameraLight);

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
        let cameraY = Math.abs(maxDim / 2 * Math.tan(fov * 4)); // Increase the divisor to decrease the zoom level

        cameraY *= 1.1; // Add some extra space

        boundingBox.getCenter(this.camera.position);
        this.camera.position.x = cameraY;

        const minZ = boundingBox.min.z;
        const cameraToFarEdge = (minZ < 0) ? -minZ + cameraY : cameraY - minZ;

        this.camera.far = cameraToFarEdge * 5;
        this.camera.updateProjectionMatrix();

        boundingBox.getCenter(this.controls.target);
        this.controls.maxDistance = cameraToFarEdge * 2;
        this.controls.saveState();
        this.controls.update();
    }

    private animate = () => {
        window.requestAnimationFrame(this.animate);
        this.controls.update();
        this.renderer.render(this.scene, this.camera);
    };
}
