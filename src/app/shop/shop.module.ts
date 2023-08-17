import { NgModule } from '@angular/core';
import { ShopComponent } from './components/shop/shop.component';
import { NutCommonModule } from "../common/nut-common.module";
import { NgOptimizedImage } from "@angular/common";
import { TuiElasticContainerModule, TuiPaginationModule } from "@taiga-ui/kit";



@NgModule({
    declarations: [
        ShopComponent
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
