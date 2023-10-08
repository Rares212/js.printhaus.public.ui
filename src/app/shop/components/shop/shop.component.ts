import {
    AfterViewInit,
    Component, computed, effect,
    ElementRef,
    HostListener, Inject, Injector,
    Input, NgZone,
    OnChanges, OnDestroy,
    OnInit, Signal, signal,
    SimpleChanges,
    ViewChild, WritableSignal
} from "@angular/core";
import { ShopService } from "../../services/shop.service";
import {
    BehaviorSubject,
    debounceTime, distinctUntilChanged,
    finalize,
    forkJoin,
    map,
    Observable,
    shareReplay,
    Subject,
    switchMap,
    tap
} from "rxjs";
import { TUI_IS_MOBILE } from "@taiga-ui/cdk";
import { TuiDialogService } from "@taiga-ui/core";
import { PolymorpheusComponent } from '@tinkoff/ng-polymorpheus';
import { DetailedItemViewComponent } from "../detailed-item-view/detailed-item-view.component";
import { PaginatedRequestDto, ShopItemDto } from "@printhaus/common";
import { before } from "../../../common/util/http.util";

@Component({
  selector: 'haus-shop',
  templateUrl: './shop.component.html',
  styleUrls: ['./shop.component.scss']
})
export class ShopComponent implements OnInit, AfterViewInit, OnDestroy {
    @ViewChild('carouselParent', { static: true }) carouselParent: ElementRef;

    @Input() parentWidth: number = 0;
    @Input() cardWidth: number = this.isMobile ? 256 : 256;
    @Input() padding: number = 16;

    readonly imageWidth: number = 0.8 * this.cardWidth;
    readonly imageHeight: number = 0.8 * this.cardWidth;

    visibleItemCount: WritableSignal<number> = signal(1);
    activePage: WritableSignal<number> = signal(0);
    itemCount: WritableSignal<number> = signal(0);
    numberOfPages: Signal<number> = computed(() => {
        return Math.ceil(this.itemCount() / this.visibleItemCount());
    });
    numPageChangeEffect = effect(() => {
        this.numberOfPages();
        this.activePage.set(0);
    }, {allowSignalWrites: true});
    loadEffect = effect(() => {
        this.itemCount();
        this.visibleItemCount();
        this.loadingItemsSubject$.next(true);
        this.loadItems();
    });

    galleryItems: ShopItemDto[] = [];

    private loadingItemsSubject$: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
    loadingItems$: Observable<boolean> = this.loadingItemsSubject$.pipe(
        debounceTime(100),
        distinctUntilChanged(),
    );

    autoScroll: boolean = false;

    private resizeObserver: ResizeObserver;

    private loadItemsTrigger = new Subject<void>();

    constructor(private shopService: ShopService,
                private ngZone: NgZone,
                @Inject(TUI_IS_MOBILE) readonly isMobile: boolean,
                @Inject(TuiDialogService) private readonly dialogs: TuiDialogService,
                @Inject(Injector) private readonly injector: Injector) {}

    ngOnInit(): void {

        this.loadItemsTrigger.pipe(
            switchMap(() => {
                return forkJoin({
                    itemCount: this.shopService.getShopItemCount(),
                    items: this.shopService.getShopItems({
                        page: this.activePage(),
                        pageSize: this.visibleItemCount(),
                        sortBy: 'viewPriority',
                        sortDirection: 'ASC',
                    })
                });
            }),
            finalize(() => this.loadingItemsSubject$.next( false)),
        ).subscribe(({ itemCount, items }) => {
            this.galleryItems = items;
            this.itemCount.set(itemCount);
            this.loadingItemsSubject$.next( false);
        });

        this.shopService.getShopItemCount().subscribe(itemCount =>
            this.itemCount.set(itemCount)
        );
    }

    ngAfterViewInit(): void {
        // Run within ngZone to avoid change detection issues
        this.resizeObserver = new ResizeObserver(entries => {
            this.ngZone.run(() => {
                entries.forEach(entry => {
                    if (entry.target === this.carouselParent.nativeElement) {
                        this.calculateDimensions();
                    }
                });
            });
        });

        this.resizeObserver.observe(this.carouselParent.nativeElement);
    }

    ngOnDestroy(): void {
        this.resizeObserver.unobserve(this.carouselParent.nativeElement);
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

    loadItems(): void {
        this.loadItemsTrigger.next();
    }

    private calculateDimensions(): void {
        this.parentWidth = this.carouselParent.nativeElement.offsetWidth;
        this.visibleItemCount.set(Math.max(1, Math.floor((this.parentWidth + this.padding) / (this.cardWidth + this.padding))));
    }

    protected readonly Math = Math;
}
