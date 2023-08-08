import { Injectable } from "@angular/core";
import { GalleryItemDto, PaginatedRequestDto } from "@printnuts/common";
import { map, Observable, of, tap } from "rxjs";
import { HttpClient } from "@angular/common/http";
import { Cacheable } from "ts-cacheable";

@Injectable({
    providedIn: "root"
})
export class GalleryService {

    constructor(private http: HttpClient) {}

    // Keep an internal cache in order to minimize the number of requests
    @Cacheable()
    public getGalleryItems(): Observable<GalleryItemDto[]> {
        return this.fetchGalleryItems();
    }

    private fetchGalleryItems(): Observable<GalleryItemDto[]> {
        return this.http.get<GalleryItemDto[]>("assets/mock/gallery-items.mock.json");
    }
}
