import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { PrintMaterialDto } from "@printnuts/common";
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

  getMaterialsGrouped(): Observable<Map<string, PrintMaterialDto[]>> {
    return this.getMaterials().pipe(
      map(materials => {
        const materialsGrouped: Map<string, PrintMaterialDto[]> = new Map<string, PrintMaterialDto[]>();
        for (const material of materials) {
          if (!materialsGrouped.has(material.materialTypeShortName)) {
            materialsGrouped.set(material.materialTypeShortName, []);
          }
          materialsGrouped.get(material.materialTypeShortName)!.push(material);
        }
        return materialsGrouped;
      })
    );
  }
}
