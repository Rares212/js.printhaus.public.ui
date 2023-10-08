import { Injectable } from "@angular/core";
import { map, Observable } from "rxjs";
import { HttpClient, HttpParams } from "@angular/common/http";
import { PaginatedRequestDto, ShopItemDto } from "@printhaus/common";
import { environment } from "../../../environments/environment";
import { plainToClass } from "class-transformer";
import { buildUrlPath } from "../../common/util/http.util";
import { Cacheable } from "ts-cacheable";

@Injectable({
    providedIn: "root"
})
export class ShopService {

    constructor(private http: HttpClient) {}

    public getShopItems(pagination: PaginatedRequestDto): Observable<ShopItemDto[]> {
        const apiUrl: string = buildUrlPath(environment.printhausApi.rootUrl,
            environment.printhausApi.shop.items.get.url,
            environment.printhausApi.apiVersion);

        return this.http.post<ShopItemDto[]>(apiUrl, pagination).pipe(
            map(items => {
                return items.map(item => plainToClass(ShopItemDto, item));
            })
        );
    }

    public getShopItemCount(): Observable<number> {
        const apiUrl: string = buildUrlPath(environment.printhausApi.rootUrl,
            environment.printhausApi.shop.itemCount.get.url,
            environment.printhausApi.apiVersion);

        return this.http.get<number>(apiUrl);
    }

    public getModelSignedUrl(shopItemId: string): Observable<SignedUrlResponse> {
        const apiUrl: string = buildUrlPath(environment.printhausApi.rootUrl,
            environment.printhausApi.shop.modelSignedUrl.get.url,
            environment.printhausApi.apiVersion);

        const params = new HttpParams().set("id", shopItemId);

        // change http to get text instead of json
        return this.http.get<string>(apiUrl, { params, responseType: "text" as "json" }).pipe(
            map(url => {
                const fileType: string = 'stl'
                return { url, fileType };
            })
        );
    }
}

export interface SignedUrlResponse {
    url: string;
    fileType: string;
}
