import { Component, Inject, OnInit, TemplateRef, ViewChild } from "@angular/core";
import {POLYMORPHEUS_CONTEXT} from '@tinkoff/ng-polymorpheus';
import { TuiDialogContext } from "@taiga-ui/core";
import { PRINT_QUALITY_NORMAL_MAP_SCALE, PrintQuality, ShopItemDto } from "@printhaus/common";
import { ShopService } from "../../services/shop.service";
import { STLLoader } from "three/examples/jsm/loaders/STLLoader";
import { MeshProcessingService } from "../../../model-viewer/services/mesh-processing.service";
import { Observable, switchMap, tap } from "rxjs";
import { Mesh } from "three";
import { DEFAULT_PRINT_QUALITY } from "../../../model-viewer/util/model-viewer.constants";

@Component({
    selector: "haus-detailed-item-view",
    templateUrl: "./detailed-item-view.component.html",
    styleUrls: ["./detailed-item-view.component.scss"]
})
export class DetailedItemViewComponent implements OnInit {

    product: ShopItemDto;
    modelMesh$: Observable<Mesh>;

    constructor(@Inject(POLYMORPHEUS_CONTEXT)
                private readonly context: TuiDialogContext<any, any>,
                private readonly shopItemService: ShopService,
                private readonly meshProcessingService: MeshProcessingService) {
    }

    ngOnInit(): void {
        this.product = this.context.data;
        this.modelMesh$ = this.shopItemService.getModelSignedUrl(this.product.id).pipe(
            switchMap(resp => {
                return this.meshProcessingService.parseUrl(resp.url, resp.fileType)
            }),
            tap(mesh => console.log(mesh))
        );
    }

    protected readonly PRINT_QUALITY_NORMAL_MAP_SCALE = PRINT_QUALITY_NORMAL_MAP_SCALE;
    protected readonly PrintQuality = PrintQuality;
}
