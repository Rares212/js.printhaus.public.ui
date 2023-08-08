import { AfterViewInit, Component, ElementRef, HostListener, Input, OnInit, ViewChild } from "@angular/core";
import { GalleryService } from "../../services/gallery.service";
import { finalize, map, Observable, shareReplay, tap } from "rxjs";
import { GalleryItemDto, PaginatedRequestDto } from "@printnuts/common";

@Component({
  selector: 'haus-gallery',
  templateUrl: './gallery.component.html',
  styleUrls: ['./gallery.component.scss']
})
export class GalleryComponent implements OnInit, AfterViewInit {
    @ViewChild('carouselParent', { static: true }) carouselParent: ElementRef;

    @Input() parentWidth: number = 920;
    @Input() cardWidth: number = 300;
    @Input() padding: number = 16;

    protected readonly imageWidth: number = 0.8 * this.cardWidth;
    protected readonly imageHeight: number = 0.8 * this.cardWidth;
    protected visibleItemCount: number = 0;

    protected galleryItems$: Observable<GalleryItemDto[]>;
    protected itemCount$: Observable<number>;
    protected loadingItems: boolean = false;

    protected activeIndex: number = 0;

    protected autoScroll: boolean = true;

    constructor(private galleryService: GalleryService) {}

    ngOnInit(): void {
        this.loadingItems = true;
        this.galleryItems$ = this.galleryService.getGalleryItems().pipe(
            finalize(() => this.loadingItems = false)
        );
        this.itemCount$ = this.galleryItems$.pipe(
            map((items: GalleryItemDto[]) => items.length)
        );
    }

    ngAfterViewInit(): void {
        this.calculateDimensions();
    }

    @HostListener('window:resize', ['$event'])
    onResize(event: any) {
        this.calculateDimensions();
    }

    get currentPage(): number {
        return Math.floor(this.activeIndex / this.visibleItemCount);
    }

    private calculateDimensions(): void {
        this.parentWidth = this.carouselParent.nativeElement.offsetWidth;
        this.visibleItemCount = Math.floor((this.parentWidth + this.padding) / (this.cardWidth + this.padding));
    }
}
