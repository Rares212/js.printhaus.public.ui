import { Injectable } from "@angular/core";
import { from, map, Observable, of, switchMap } from "rxjs";
import { TuiFileLike } from "@taiga-ui/kit";
import { getFileType } from "../../common/util/common.util";
import { gunzip, gunzipSync, gzipSync } from "fflate";
import { HttpClient } from "@angular/common/http";
import { PrintModelDetailsReqDto } from "../models/print-model-details.req.dto";
import { buildUrlPath } from "../../common/util/http.util";
import { environment } from "../../../environments/environment";
import {
    MeshParserService, PrintDimensionsDto,
    PrintModelDetailsRespDto,
    PrintSettingsDto,
    SupportedMeshFileTypes
} from "@printhaus/common";
import { BufferGeometry, Material, Matrix4, Mesh, MeshStandardMaterial, Vector3 } from "three";

@Injectable({
    providedIn: "root"
})
export class MeshProcessingService {

    public readonly ACCEPTS_HEADER: string;

    private meshParser: MeshParserService = new MeshParserService();

    private defaultMaterial: Material = new MeshStandardMaterial({
        color: 0x808080, // gray color
        roughness: 0.4, // how rough the surface appears (higher values mean rougher surface)
        metalness: 0.1 // how metallic the surface appears (lower values mean less metallic)
    });

    constructor(private httpClient: HttpClient) {
        this.ACCEPTS_HEADER = "";
        for (const fileType of Object.values(SupportedMeshFileTypes)) {
            this.ACCEPTS_HEADER += "." + fileType + ",";
        }
    }

    public parseFile(file: TuiFileLike,
                     material: Material = this.defaultMaterial,
                     centered: boolean = true): Observable<Mesh> {

        const fileType: SupportedMeshFileTypes = getFileType(file.name) as SupportedMeshFileTypes;
        return from((file as File).arrayBuffer()).pipe(
            map(buffer => this.meshParser.parseFile(buffer, fileType)),
            map(buffer => this.meshFromGeometry(buffer, material, centered))
        );
    }

    public parseUrl(url: string,
                    fileType: string,
                    compressed: boolean,
                    material: Material = this.defaultMaterial,
                    centered: boolean = true): Observable<Mesh> {
        // Get the file from the url. If compressed, use gunzip to decompress the file.
        // If not, process the file directly

        let file$: Observable<ArrayBuffer> = this.httpClient.get(url, { responseType: "arraybuffer" });
        if (compressed) {
            file$ = file$.pipe(
                map(buffer => gunzipSync(new Uint8Array(buffer))),
                map(buffer => buffer.buffer)
            );
        }

        return file$.pipe(
            map(buffer => this.meshParser.parseFile(buffer, fileType as SupportedMeshFileTypes)),
            map(buffer => this.meshFromGeometry(buffer, material, centered))
        );
    }

    public getModelDetails(file: TuiFileLike, materialId: string, printSettings: PrintSettingsDto): Observable<PrintModelDetailsRespDto> {
        const apiUrl = buildUrlPath(environment.printhausApi.rootUrl,
                                           environment.printhausApi.apiVersion,
                                           environment.printhausApi.print.modelDetails.get.url);

        const fileType: SupportedMeshFileTypes = getFileType(file.name)! as SupportedMeshFileTypes;

        return from((file as File).arrayBuffer()).pipe(
            map(buffer => gzipSync(new Uint8Array(buffer), { mtime: 0 })),

            switchMap(buffer => {
                const body = new PrintModelDetailsReqDto();
                body.compressedMeshFile = new File([buffer], file.name, { type: "application/gzip" });
                body.fileType = fileType;
                body.materialId = materialId;
                body.printSettings = printSettings;

                return this.httpClient.post<PrintModelDetailsRespDto>(apiUrl, body.toFormData());
            })
        );
    }

    public getPrintBedDimensions(): Observable<PrintDimensionsDto> {
        const apiUrl = buildUrlPath(environment.printhausApi.rootUrl,
                                           environment.printhausApi.apiVersion,
                                           environment.printhausApi.print.printBedDimensions.get.url);

        return this.httpClient.get<PrintDimensionsDto>(apiUrl);
    }

    private meshFromGeometry(geometry: BufferGeometry, material: Material, centered: boolean): Mesh {
        const mesh: Mesh = new Mesh(geometry, material);

        if (centered) {
            let middle: Vector3 = new Vector3();
            geometry.computeBoundingBox();
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
}
