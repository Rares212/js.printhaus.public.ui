import { Injectable } from '@angular/core';
import {BufferGeometry, Loader, Material, Matrix4, Mesh, MeshPhongMaterial, MeshStandardMaterial, Vector3} from "three";
import {from, map, Observable} from "rxjs";
import {STLLoader} from "three/examples/jsm/loaders/STLLoader";
import {TuiFileLike} from "@taiga-ui/kit";
import {OBJLoader} from "three/examples/jsm/loaders/OBJLoader";
import {getFileType, isNonNull} from "../../common/util/common.util";
import {ConvexGeometry} from "three/examples/jsm/geometries/ConvexGeometry";
import {DENSITY_MAP, MaterialType} from "../models/material-type.enum";

@Injectable({
  providedIn: 'root'
})
export class MeshProcessingService {

  public readonly ACCEPTED_FILE_TYPES: string[] = ['stl', 'obj']
  public readonly ACCEPTS_HEADER: string;
  private stlLoader: STLLoader =  new STLLoader();
  private objLoader: OBJLoader = new OBJLoader();
  private middle: Vector3 = new Vector3();

  private defaultMaterial: Material = new MeshStandardMaterial({
    color: 0x808080, // gray color
    roughness: 0.4, // how rough the surface appears (higher values mean rougher surface)
    metalness: 0.1, // how metallic the surface appears (lower values mean less metallic)
  });

  constructor() {
    this.ACCEPTS_HEADER = '';
    for (const fileType of this.ACCEPTED_FILE_TYPES) {
      this.ACCEPTS_HEADER += '.' + fileType + ',';
    }
  }

  public parseFile(file: TuiFileLike,
                   material: Material = this.defaultMaterial,
                   centered: boolean = true): Observable<Mesh> {
    console.log(file);

    const fileType: string = getFileType(file.name)!;
    switch (fileType) {
      case 'stl': {
        return from((file as File).arrayBuffer()).pipe(
          map(buffer => this.meshFromBuffer(buffer, this.stlLoader, material!, centered))
        );
      }
      case 'obj': {
        return from((file as File).arrayBuffer()).pipe(
          map(buffer => this.meshFromBuffer(buffer, this.objLoader, material!, centered))
        );
      }
      default: {
        throw new Error('Error parsing mesh file');
      }
    }
  }

  private meshFromBuffer(buffer: ArrayBuffer, loader: Loader, material: Material, centered: boolean) {
    let geometry: BufferGeometry = (loader as any).parse(buffer);

    const mesh: Mesh = new Mesh(geometry, material);

    if (centered) {
      geometry.computeBoundingBox()
      geometry.boundingBox!.getCenter(this.middle);
      mesh.geometry.applyMatrix4(
        new Matrix4().makeTranslation(
          -this.middle.x,
          -this.middle.y,
          -this.middle.z
        )
      );
    }

    return mesh;
  }



  // Returns the mass in grams
  private getMass(volume: number, materialType: MaterialType) {
    return DENSITY_MAP[materialType] * volume;
  }

  // Returns the volume in cubic centimeters
  private getVolume(geometry: BufferGeometry) {
    if (!geometry.isBufferGeometry) {
      console.log("'geometry' must be an indexed or non-indexed buffer geometry");
      return 0;
    }
    let position = geometry.attributes['position'];
    let sum = 0;
    let p1 = new Vector3(),
      p2 = new Vector3(),
      p3 = new Vector3();
    if (!isNonNull(geometry.index)) {
      let faces = position.count / 3;
      for (let i = 0; i < faces; i++) {
        // @ts-ignore
        p1.fromBufferAttribute(position, i * 3 + 0);
        // @ts-ignore
        p2.fromBufferAttribute(position, i * 3 + 1);
        // @ts-ignore
        p3.fromBufferAttribute(position, i * 3 + 2);
        sum += this.signedVolumeOfTriangle(p1, p2, p3);
      }
    }
    else {
      let index = geometry.index;
      let faces = index.count / 3;
      for (let i = 0; i < faces; i++){
        // @ts-ignore
        p1.fromBufferAttribute(position, index.array[i * 3 + 0]);
        // @ts-ignore
        p2.fromBufferAttribute(position, index.array[i * 3 + 1]);
        // @ts-ignore
        p3.fromBufferAttribute(position, index.array[i * 3 + 2]);
        sum += this.signedVolumeOfTriangle(p1, p2, p3);
      }
    }
    return sum;
  }

  private signedVolumeOfTriangle(p1: Vector3, p2: Vector3, p3: Vector3) {
    return p1.dot(p2.cross(p3)) / 6.0;
  }
}
