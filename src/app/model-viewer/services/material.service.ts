import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { MaterialType, PrintMaterialDto } from "@printnuts/common";
import { map, Observable } from "rxjs";

@Injectable({
  providedIn: "root"
})
export class MaterialService {

  constructor(private httpClient: HttpClient) {
  }

  getMaterials(): Observable<PrintMaterialDto[]> {
    const apiUrl: string = "printnuts-api/print/materials";

    return this.httpClient.get<PrintMaterialDto[]>(apiUrl);
  }

  getMaterialsGrouped(): Observable<Map<MaterialType, PrintMaterialDto[]>> {
    return this.getMaterials().pipe(
      map(materials => {
        const materialsGrouped: Map<MaterialType, PrintMaterialDto[]> = new Map<MaterialType, PrintMaterialDto[]>();
        for (const material of materials) {
          if (!materialsGrouped.has(material.materialType)) {
            materialsGrouped.set(material.materialType, []);
          }
          materialsGrouped.get(material.materialType)!.push(material);
        }
        return materialsGrouped;
      })
    );
  }
}
