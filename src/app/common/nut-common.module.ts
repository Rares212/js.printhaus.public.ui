import { NgModule } from "@angular/core";
import {
    TuiAlertModule,
    TuiButtonModule,
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
import { BrowserModule } from "@angular/platform-browser";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { AppRoutingModule } from "../app-routing.module";
import { NgbModule } from "@ng-bootstrap/ng-bootstrap";
import {
    TuiAccordionModule,
    TuiActionModule, TuiBadgeModule, TuiCarouselModule,
    TuiCheckboxBlockModule,
    TuiDataListWrapperModule, TuiElasticContainerModule,
    TuiFieldErrorPipeModule,
    TuiInputFilesModule,
    TuiInputModule, TuiInputNumberModule,
    TuiInputSliderModule,
    TuiIslandModule,
    TuiLineClampModule,
    TuiMarkerIconModule,
    TuiSelectModule,
    TuiTabsModule,
    TuiTagModule,
    TuiToggleModule
} from "@taiga-ui/kit";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { TranslateLoader, TranslateModule } from "@ngx-translate/core";
import { HttpClient, HttpClientModule } from "@angular/common/http";
import { TranslateHttpLoader } from "@ngx-translate/http-loader";
import { TuiHoveredModule, TuiIsPresentPipeModule } from "@taiga-ui/cdk";
import { ReplaceUnderscorePipe } from "./pipes/replace-underscore.pipe";
import { HourToTimePipe } from "./pipes/hour-to-time.pipe";
import { TuiCurrencyPipeModule, TuiMoneyModule } from "@taiga-ui/addon-commerce";
import { BuyButtonComponent } from './components/buy-button/buy-button.component';
import { TuiLegendItemModule, TuiRingChartModule } from "@taiga-ui/addon-charts";
import { MaterialTagComponent } from './components/material-tag/material-tag.component';

@NgModule({
    declarations: [
        NutToolbarComponent,
        ReplaceUnderscorePipe,
        HourToTimePipe,
        BuyButtonComponent,
        MaterialTagComponent
    ],
    exports: [
        BrowserModule,
        BrowserAnimationsModule,
        AppRoutingModule,
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
        MaterialTagComponent
    ],
    imports: [
        BrowserModule,
        BrowserAnimationsModule,
        AppRoutingModule,
        TuiRootModule,
        NgbModule,
        TranslateModule.forRoot({
            loader: {
                provide: TranslateLoader,
                useFactory: HttpLoaderFactory,
                deps: [HttpClient]
            }
        }),
        TuiTabsModule,
        TuiInputNumberModule,
        TuiButtonModule,
        TuiInputModule,
        TuiMoneyModule,
        TuiGroupModule,
        ReactiveFormsModule,
        TuiLabelModule,
        BrowserAnimationsModule,
        FormsModule,
        TuiTextfieldControllerModule,
        TuiCurrencyPipeModule,
        TuiTagModule
    ]
})
export class NutCommonModule {
}

export function HttpLoaderFactory(http: HttpClient): TranslateHttpLoader {
    return new TranslateHttpLoader(http);
}
