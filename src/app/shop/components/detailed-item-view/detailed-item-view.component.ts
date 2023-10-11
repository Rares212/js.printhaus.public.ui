import { Component, Inject, OnInit, TemplateRef, ViewChild } from "@angular/core";
import {POLYMORPHEUS_CONTEXT} from '@tinkoff/ng-polymorpheus';
import { TuiDialogContext } from "@taiga-ui/core";
import { PRINT_QUALITY_NORMAL_MAP_SCALE, PrintQuality, ShopItemDto } from "@printhaus/common";
import { ShopService } from "../../services/shop.service";
import { MeshProcessingService } from "../../../model-viewer/services/mesh-processing.service";
import { finalize, map, Observable, shareReplay, startWith, switchMap, tap } from "rxjs";
import { TuiPreviewDialogService } from "@taiga-ui/addon-preview";
import { GalleryItem, ImageItem } from "ng-gallery";
import { Mesh } from "three";

@Component({
    selector: "haus-detailed-item-view",
    templateUrl: "./detailed-item-view.component.html",
    styleUrls: ["./detailed-item-view.component.scss"]
})
export class DetailedItemViewComponent implements OnInit {

    @ViewChild('modelPreview')
    readonly modelPreview: TemplateRef<TuiDialogContext>;

    protected readonly PRINT_QUALITY_NORMAL_MAP_SCALE = PRINT_QUALITY_NORMAL_MAP_SCALE;
    protected readonly PrintQuality = PrintQuality;

    showModel: boolean = false;

    product: ShopItemDto;
    modelMesh$: Observable<Mesh>;
    loadingMesh$: Observable<boolean>;

    images: GalleryItem[] = [];

    constructor(@Inject(POLYMORPHEUS_CONTEXT)
                private readonly context: TuiDialogContext<any, any>,
                @Inject(TuiPreviewDialogService)
                private readonly previewDialogService: TuiPreviewDialogService,
                private readonly shopItemService: ShopService,
                private readonly meshProcessingService: MeshProcessingService) {
    }

    ngOnInit(): void {
        this.product = this.context.data;
        this.modelMesh$ = this.shopItemService.getModelSignedUrl(this.product.id).pipe(
            switchMap(resp => {
                return this.meshProcessingService.parseUrl(resp.signedUrl, resp.fileExtension, resp.compressed);
            }),
            shareReplay(1)
        );
        this.loadingMesh$ = this.modelMesh$.pipe(
            map(() => false),
            startWith(true),
            finalize(() => false)
        );

        this.images = this.product.galleryPhotos.map(image => {
            return new ImageItem({src: image.largeImageUrl, thumb: image.smallImageUrl, alt: this.product.name});
        });
    }
}
