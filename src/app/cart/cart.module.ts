import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";

import { CartRoutingModule } from "./cart-routing.module";
import { CartComponent } from "./cart.component";
import { NutCommonModule } from "../common/nut-common.module";
import { TuiInputNumberModule } from "@taiga-ui/kit";


@NgModule({
    declarations: [
        CartComponent
    ],
    imports: [
        CommonModule,
        CartRoutingModule,
        TuiInputNumberModule
    ]
})
export class CartModule {
}
