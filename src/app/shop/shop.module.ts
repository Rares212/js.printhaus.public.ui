import { NgModule } from '@angular/core';
import { ShopComponent } from './components/shop/shop.component';
import { NutCommonModule } from "../common/nut-common.module";
import { NgOptimizedImage } from "@angular/common";
import { TuiElasticContainerModule, TuiPaginationModule } from "@taiga-ui/kit";
import { DetailedItemViewComponent } from './components/detailed-item-view/detailed-item-view.component';



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
        TuiElasticContainerModule
    ]
})
export class ShopModule { }
