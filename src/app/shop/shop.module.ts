import { NgModule } from '@angular/core';
import { ShopComponent } from './components/shop/shop.component';
import { NutCommonModule } from "../common/nut-common.module";
import { NgOptimizedImage } from "@angular/common";
import { TuiElasticContainerModule, TuiPaginationModule } from "@taiga-ui/kit";
import { DetailedItemViewComponent } from './components/detailed-item-view/detailed-item-view.component';
import { TuiPreviewModule } from "@taiga-ui/addon-preview";
import { ModelViewerModule } from "../model-viewer/model-viewer.module";



@NgModule({
    declarations: [
        ShopComponent,
        DetailedItemViewComponent
    ],
    exports: [
        ShopComponent
    ],
  imports: [
    NutCommonModule,
    NgOptimizedImage,
    TuiPaginationModule,
    TuiElasticContainerModule,
    TuiPreviewModule,
    ModelViewerModule
  ]
})
export class ShopModule { }
