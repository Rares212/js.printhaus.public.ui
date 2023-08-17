import {Injectable} from '@angular/core';
import {
  BufferGeometry,
  Group,
  Loader,
  Material,
  Matrix4,
  Mesh,
  MeshPhongMaterial,
  MeshStandardMaterial, Object3D,
  Vector3
} from "three";
import {from, map, Observable, switchMap} from "rxjs";
import {STLLoader} from "three/examples/jsm/loaders/STLLoader";
import {TuiFileLike} from "@taiga-ui/kit";
import {OBJLoader} from "three/examples/jsm/loaders/OBJLoader";
import {getFileType, isNonNull} from "../../common/util/common.util";
import {
  PrintModelDetailsRespDto,
  PrintQuality,
  PrintSettingsDto,
  PrintStrength,
  SupportedMeshFileTypes
} from '@printnuts/common';
import {gzipSync} from "fflate"
import {HttpClient} from "@angular/common/http";
import {mergeBufferGeometries} from "three/examples/jsm/utils/BufferGeometryUtils";
import {PrintModelDetailsReqDto} from "../models/print-model-details.req.dto";

@Injectable({
  providedIn: 'root'
})
export class MeshProcessingService {

  public readonly ACCEPTED_FILE_TYPES: string[] = ['stl', 'obj']
  public readonly ACCEPTS_HEADER: string;
  private stlLoader: STLLoader = new STLLoader();
  private objLoader: OBJLoader = new OBJLoader();

  private defaultMaterial: Material = new MeshStandardMaterial({
    color: 0x808080, // gray color
    roughness: 0.4, // how rough the surface appears (higher values mean rougher surface)
    metalness: 0.1, // how metallic the surface appears (lower values mean less metallic)
  });

  constructor(private httpClient: HttpClient) {
    this.ACCEPTS_HEADER = '';
    for (const fileType of this.ACCEPTED_FILE_TYPES) {
      this.ACCEPTS_HEADER += '.' + fileType + ',';
    }
  }

  public parseFile(file: TuiFileLike,
                   material: Material = this.defaultMaterial,
                   centered: boolean = true): Observable<Mesh> {

    const fileType: string = getFileType(file.name)!;
    switch (fileType.toLowerCase()) {
      case SupportedMeshFileTypes.STL: {
        return from((file as File).arrayBuffer()).pipe(
          map(buffer => this.parseStl(buffer)),
          map(buffer => this.meshFromGeometry(buffer, material!, centered))
        );
      }
      case SupportedMeshFileTypes.OBJ: {
        return from((file as File).arrayBuffer()).pipe(
          map(buffer => this.parseObj(buffer)),
          map(buffer => this.meshFromGeometry(buffer, material!, centered))
        );
      }
      default: {
        throw new Error('Error parsing mesh file');
      }
    }
  }

  public getModelDetails(file: TuiFileLike, materialId: string, printSettings: PrintSettingsDto): Observable<PrintModelDetailsRespDto> {
    const apiUrl = 'printnuts-api/print/model-details';

    const fileType: SupportedMeshFileTypes = getFileType(file.name)! as SupportedMeshFileTypes;

    return from((file as File).arrayBuffer()).pipe(
      map(buffer => gzipSync(new Uint8Array(buffer), {mtime: 0})),

      switchMap(buffer => {
        const body = new PrintModelDetailsReqDto();
        body.compressedMeshFile = new File([buffer], file.name, {type: 'application/gzip'});
        body.fileType = fileType;
        body.materialId = materialId;
        body.printSettings = printSettings;

        return this.httpClient.post<PrintModelDetailsRespDto>(apiUrl, body.toFormData());
      })
    );
  }

  private meshFromGeometry(geometry: BufferGeometry, material: Material, centered: boolean): Mesh {
    const mesh: Mesh = new Mesh(geometry, material);

    if (centered) {
      let middle: Vector3 = new Vector3();
      geometry.computeBoundingBox()
      geometry.boundingBox!.getCenter(middle);
      mesh.geometry.applyMatrix4(
        new Matrix4().makeTranslation(
          -middle.x,
          -middle.y,
          -middle.z
        )
      );
    }

    return mesh;
  }

  private parseStl(buffer: ArrayBuffer): BufferGeometry {
    return this.stlLoader.parse(buffer);
  }

  private parseObj(buffer: ArrayBuffer): BufferGeometry {
    const group: Group = this.objLoader.parse(new Uint8Array(buffer).toString());
    console.log(group);
    return this.combineMeshes(group);
  }

  private combineMeshes(group: Group): BufferGeometry {
    const geometries: BufferGeometry[] = [];
    group.traverse((child: Object3D) => {
      if (child instanceof Mesh) {
        geometries.push(child.geometry);
      }
    });

    return mergeBufferGeometries(geometries, true);
  }

}
