import { Component, Inject, OnInit, TemplateRef, ViewChild } from "@angular/core";
import { ShopItemDto } from "@printnuts/common";
import {POLYMORPHEUS_CONTEXT} from '@tinkoff/ng-polymorpheus';
import { TuiDialogContext } from "@taiga-ui/core";
import { TuiPreviewDialogService } from "@taiga-ui/addon-preview";

@Component({
    selector: "haus-detailed-item-view",
    templateUrl: "./detailed-item-view.component.html",
    styleUrls: ["./detailed-item-view.component.scss"]
})
export class DetailedItemViewComponent implements OnInit {

    product: ShopItemDto;


    constructor(@Inject(POLYMORPHEUS_CONTEXT)
                private readonly context: TuiDialogContext<any, any>) {
    }
    ngOnInit(): void {
        this.product = this.context.data;
    }
}
