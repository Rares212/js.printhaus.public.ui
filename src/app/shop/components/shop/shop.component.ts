import {
    AfterViewInit,
    Component,
    ElementRef,
    HostListener, Inject,
    Input,
    OnChanges,
    OnInit,
    SimpleChanges,
    ViewChild
} from "@angular/core";
import { ShopService } from "../../services/shop.service";
import { finalize, map, Observable, shareReplay, tap } from "rxjs";
import { GalleryItemDto, PaginatedRequestDto } from "@printnuts/common";
import { isNonNull } from "../../../common/util/common.util";
import { TUI_IS_MOBILE } from "@taiga-ui/cdk";

@Component({
  selector: 'haus-shop',
  templateUrl: './shop.component.html',
  styleUrls: ['./shop.component.scss']
})
export class ShopComponent implements OnInit, AfterViewInit {
    @ViewChild('carouselParent', { static: true }) carouselParent: ElementRef;

    @Input() parentWidth: number = 0;
    @Input() cardWidth: number = this.isMobile ? 180 : 256;
    @Input() padding: number = 16;

    protected readonly imageWidth: number = 0.8 * this.cardWidth;
    protected readonly imageHeight: number = 0.8 * this.cardWidth;
    protected visibleItemCount: number = 0;

    protected galleryItems$: Observable<GalleryItemDto[]>;
    protected itemCount: number = 0;
    protected loadingItems: boolean = false;

    private _activeIndex: number = 0;

    get activeIndex(): number {
        return this._activeIndex;
    }

    set activeIndex(value: number) {
        if (isNonNull(value)) {
            if (value < 0) {
                this._activeIndex = this.itemCount - this.visibleItemCount;
            } else if (value > this.itemCount - this.visibleItemCount) {
                this._activeIndex = 0;
            } else {
                this._activeIndex = value;
            }
        } else {
            this._activeIndex = 0;
        }

        if (this._activeIndex < 0) {
            this._activeIndex = 0;
        }
    }

    protected autoScroll: boolean = true;

    constructor(private galleryService: ShopService,
                @Inject(TUI_IS_MOBILE) readonly isMobile: boolean) {}

    ngOnInit(): void {
        this.loadingItems = true;
        this.galleryItems$ = this.galleryService.getGalleryItems().pipe(
            tap(items => this.itemCount = items.length),
            finalize(() => this.loadingItems = false)
        );
    }

    ngAfterViewInit(): void {
        this.calculateDimensions();
    }

    @HostListener('window:resize', ['$event'])
    onResize(event: any) {
        this.calculateDimensions();
    }

    // onIndexChange(index: number): void {
    //     // Make sure there are always items displayed by forcing a circular rotation at the end of the gallery
    //     if (this.itemCount - index < this.visibleItemCount) {
    //         this.activeIndex = 0
    //     }
    // }

    private calculateDimensions(): void {
        this.parentWidth = this.carouselParent.nativeElement.offsetWidth;
        this.visibleItemCount = Math.floor((this.parentWidth + this.padding) / (this.cardWidth + this.padding));
    }


}
