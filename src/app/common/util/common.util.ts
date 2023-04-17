import {Scene} from "three";

export function isNonNull<T>(value: T): value is NonNullable<T> {
  return value != null;
}

export function removeAllFromScene(scene: Scene) {
  while (scene.children.length) {
    scene.remove(scene.children[0]);
  }
}

export function getFileType(fileName: string): string | undefined {
  return fileName.split('.').pop();
}
