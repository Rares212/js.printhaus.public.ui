import {
    AfterViewInit,
    Component,
    ElementRef,
    HostListener, Inject, Injector,
    Input,
    OnChanges, OnDestroy,
    OnInit,
    SimpleChanges,
    ViewChild
} from "@angular/core";
import { ShopService } from "../../services/shop.service";
import { finalize, map, Observable, shareReplay, tap } from "rxjs";
import { PaginatedRequestDto, ShopItemDto } from "@printnuts/common";
import { isNonNull } from "../../../common/util/common.util";
import { TUI_IS_MOBILE } from "@taiga-ui/cdk";
import { TuiDialogService } from "@taiga-ui/core";
import { PolymorpheusComponent } from '@tinkoff/ng-polymorpheus';
import { DetailedItemViewComponent } from "../detailed-item-view/detailed-item-view.component";

@Component({
  selector: 'haus-shop',
  templateUrl: './shop.component.html',
  styleUrls: ['./shop.component.scss']
})
export class ShopComponent implements OnInit, AfterViewInit, OnDestroy {
    @ViewChild('carouselParent', { static: true }) carouselParent: ElementRef;

    @Input() parentWidth: number = 0;
    @Input() cardWidth: number = this.isMobile ? 180 : 256;
    @Input() padding: number = 16;

    protected readonly imageWidth: number = 0.8 * this.cardWidth;
    protected readonly imageHeight: number = 0.8 * this.cardWidth;
    protected visibleItemCount: number = 0;

    protected galleryItems$: Observable<ShopItemDto[]>;
    protected itemCount: number = 0;
    protected loadingItems: boolean = false;

    private _activeIndex: number = 0;

    private resizeObserver: ResizeObserver;

    get activeIndex(): number {
        return this._activeIndex;
    }

    set activeIndex(value: number) {
        if (value || value === 0) {
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

    constructor(private shopService: ShopService,
                @Inject(TUI_IS_MOBILE) readonly isMobile: boolean,
                @Inject(TuiDialogService) private readonly dialogs: TuiDialogService,
                @Inject(Injector) private readonly injector: Injector) {}

    ngOnInit(): void {
        this.loadingItems = true;
        this.galleryItems$ = this.shopService.getGalleryItems().pipe(
            tap(items => this.itemCount = items.length),
            finalize(() => this.loadingItems = false)
        );
    }

    ngAfterViewInit(): void {
        this.calculateDimensions();

        this.resizeObserver = new ResizeObserver(entries => {
            entries.forEach(entry => {
                if (entry.target === this.carouselParent.nativeElement) {
                    this.calculateDimensions();
                }
            });
        });

        this.resizeObserver.observe(this.carouselParent.nativeElement);
    }

    ngOnDestroy(): void {
        this.resizeObserver.unobserve(this.carouselParent.nativeElement);
    }

    private calculateDimensions(): void {
        this.parentWidth = this.carouselParent.nativeElement.offsetWidth;
        this.visibleItemCount = Math.floor((this.parentWidth + this.padding) / (this.cardWidth + this.padding));
        // Force recalculation of activeIndex
        this.activeIndex = this.activeIndex;
    }

    openDetailedView(item: ShopItemDto): void {
        this.dialogs.open(
            new PolymorpheusComponent(DetailedItemViewComponent, this.injector), {
                dismissible: true,
                closeable: true,
                size: 'auto',
                data: item,
            }
        ).subscribe();
    }
}
