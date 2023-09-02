import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { PrintMaterialDto } from "@printnuts/common";
import { map, Observable } from "rxjs";
import { environment } from "../../../environments/environment";
import { buildUrlPath } from "../../common/util/http.util";

@Injectable({
    providedIn: "root"
})
export class MaterialService {

    constructor(private httpClient: HttpClient) {
    }

    getMaterials(): Observable<PrintMaterialDto[]> {
        const apiUrl: string = buildUrlPath(environment.printhausApi.rootUrl,
                                            environment.printhausApi.print.materials.get.url,
                                            environment.printhausApi.apiVersion);

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
