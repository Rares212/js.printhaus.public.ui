import { Scene } from "three";

export function isNonNull<T>(value: T): value is NonNullable<T> {
    return value != null;
}

export function removeAllFromScene(scene: Scene) {
    while (scene.children.length) {
        scene.remove(scene.children[0]);
    }
}

export function getFileType(fileName: string): string | undefined {
    return fileName.split(".").pop()?.toLowerCase();
}

export function isDark(color: string): boolean {
    if (!color) {
        return false;
    }

    // convert hex to RGB first
    let r: number, g: number, b: number;

    const hex = color.substring(1);
    r = parseInt(hex.substring(0, 2), 16);
    g = parseInt(hex.substring(2, 4), 16);
    b = parseInt(hex.substring(4, 6), 16);


    // Then determine if the color is dark (source: https://www.w3.org/TR/AERT/#color-contrast)
    const brightness = (r * 299 + g * 587 + b * 114) / 1000;
    return brightness < 128;
}
