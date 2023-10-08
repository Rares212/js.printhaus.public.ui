import { NgModule } from "@angular/core";
import {
    TuiAlertModule,
    TuiButtonModule,
    TuiDialogModule,
    TuiErrorModule,
    TuiGroupModule,
    TuiHintModule,
    TuiLabelModule,
    TuiLinkModule,
    TuiLoaderModule,
    TuiRootModule,
    TuiScrollbarModule,
    TuiSvgModule,
    TuiTextfieldControllerModule, TuiTooltipModule
} from "@taiga-ui/core";
import { NutToolbarComponent } from "./components/toolbar/nut-toolbar.component";
import { NgbModule } from "@ng-bootstrap/ng-bootstrap";
import {
    TuiAccordionModule,
    TuiActionModule, TuiAvatarModule, TuiBadgeModule, TuiCarouselModule,
    TuiCheckboxBlockModule,
    TuiDataListWrapperModule, TuiElasticContainerModule,
    TuiFieldErrorPipeModule,
    TuiInputFilesModule,
    TuiInputModule, TuiInputNumberModule,
    TuiInputSliderModule,
    TuiIslandModule,
    TuiLineClampModule,
    TuiMarkerIconModule, TuiRatingModule,
    TuiSelectModule,
    TuiTabsModule,
    TuiTagModule,
    TuiToggleModule
} from "@taiga-ui/kit";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { HttpClient, HttpClientModule } from "@angular/common/http";
import { TranslateHttpLoader } from "@ngx-translate/http-loader";
import { TuiHoveredModule, TuiIsPresentPipeModule } from "@taiga-ui/cdk";
import { ReplaceUnderscorePipe } from "./pipes/replace-underscore.pipe";
import { HourToTimePipe } from "./pipes/hour-to-time.pipe";
import { TuiCurrencyPipeModule, TuiMoneyModule } from "@taiga-ui/addon-commerce";
import { BuyButtonComponent } from './components/buy-button/buy-button.component';
import { TuiLegendItemModule, TuiRingChartModule } from "@taiga-ui/addon-charts";
import { MaterialTagComponent } from './components/material-tag/material-tag.component';
import { CommonModule, NgOptimizedImage } from "@angular/common";
import { RouterLink, RouterModule } from "@angular/router";
import { AppAuthModule } from "../app-auth/app-auth.module";
import { TuiMobileTabsModule } from "@taiga-ui/addon-mobile";
import { PriceIndicatorComponent } from './components/price-indicator/price-indicator.component';
import { RatingIndicatorComponent } from './components/rating-indicator/rating-indicator.component';
import { HausImageComponent } from './components/haus-image/haus-image.component';
import { TuiPreviewModule } from "@taiga-ui/addon-preview";

@NgModule({
    declarations: [
        NutToolbarComponent,
        ReplaceUnderscorePipe,
        HourToTimePipe,
        BuyButtonComponent,
        MaterialTagComponent,
        PriceIndicatorComponent,
        RatingIndicatorComponent,
        HausImageComponent
    ],
    exports: [
        CommonModule,
        TuiRootModule,
        NgbModule,
        NutToolbarComponent,
        TuiTabsModule,
        TuiButtonModule,
        TuiSvgModule,
        TuiIslandModule,
        TuiInputModule,
        TuiGroupModule,
        HttpClientModule,
        TuiInputSliderModule,
        FormsModule,
        ReactiveFormsModule,
        TuiInputFilesModule,
        TuiAccordionModule,
        TuiLoaderModule,
        TuiIsPresentPipeModule,
        TuiMarkerIconModule,
        TuiLinkModule,
        TuiToggleModule,
        TuiCheckboxBlockModule,
        TuiInputSliderModule,
        TuiCheckboxBlockModule,
        TuiAccordionModule,
        TuiIsPresentPipeModule,
        TuiLoaderModule,
        TuiInputFilesModule,
        TuiMarkerIconModule,
        TuiHintModule,
        TuiSelectModule,
        TuiDataListWrapperModule,
        TuiTagModule,
        TuiBadgeModule,
        TuiTextfieldControllerModule,
        TuiLineClampModule,
        TuiActionModule,
        TuiErrorModule,
        TuiFieldErrorPipeModule,
        TuiMoneyModule,
        TuiLabelModule,
        ReactiveFormsModule,
        TuiIslandModule,
        TuiScrollbarModule,
        TuiAlertModule,
        TuiCarouselModule,
        TuiTooltipModule,
        TuiElasticContainerModule,
        TuiRingChartModule,
        TuiLegendItemModule,
        TuiHoveredModule,
        ReplaceUnderscorePipe,
        HourToTimePipe,
        BuyButtonComponent,
        TuiTabsModule,
        TuiInputNumberModule,
        TuiCurrencyPipeModule,
        TuiDialogModule,
        TuiAvatarModule,
        MaterialTagComponent,
        PriceIndicatorComponent,
        RatingIndicatorComponent,
        HausImageComponent
    ],
    imports: [
        CommonModule,
        RouterModule,
        TuiRootModule,
        NgbModule,
        TuiTabsModule,
        TuiInputNumberModule,
        TuiButtonModule,
        TuiInputModule,
        TuiMoneyModule,
        TuiGroupModule,
        ReactiveFormsModule,
        TuiLabelModule,
        FormsModule,
        TuiTextfieldControllerModule,
        TuiCurrencyPipeModule,
        TuiTagModule,
        TuiSvgModule,
        AppAuthModule,
        TuiMobileTabsModule,
        TuiRatingModule,
        NgOptimizedImage,
        TuiPreviewModule
    ]
})
export class NutCommonModule {
}

export function HttpLoaderFactory(http: HttpClient): TranslateHttpLoader {
    return new TranslateHttpLoader(http);
}
