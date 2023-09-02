import { Injectable } from "@angular/core";
import { ShopItemDto } from "@printnuts/common";
import { map, Observable, of, tap } from "rxjs";
import { HttpClient } from "@angular/common/http";
import { Cacheable } from "ts-cacheable";

@Injectable({
    providedIn: "root"
})
export class ShopService {

    constructor(private http: HttpClient) {}

    // Keep an internal cache in order to minimize the number of requests
    @Cacheable()
    public getGalleryItems(): Observable<ShopItemDto[]> {
        return this.fetchGalleryItems();
    }

    @Cacheable()
    public getGalleryItem(id: string): Observable<ShopItemDto> {
        return this.getGalleryItems().pipe(
            map(items => items.find(item => item.id === id)!)
        );
    }

    private fetchGalleryItems(): Observable<ShopItemDto[]> {
        return this.http.get<ShopItemDto[]>("assets/mock/gallery-items.mock.json");
    }
}
