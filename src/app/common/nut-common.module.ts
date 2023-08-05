import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  TuiButtonModule, TuiErrorModule,
  TuiGroupModule, TuiHintModule, TuiLabelModule,
  TuiLinkModule,
  TuiLoaderModule,
  TuiRootModule,
  TuiSvgModule, TuiTextfieldControllerModule
} from "@taiga-ui/core";
import { NutToolbarComponent } from './components/toolbar/nut-toolbar.component';
import {AppModule} from "../app.module";
import {BrowserModule} from "@angular/platform-browser";
import {BrowserAnimationsModule} from "@angular/platform-browser/animations";
import {AppRoutingModule} from "../app-routing.module";
import {NgbModule} from "@ng-bootstrap/ng-bootstrap";
import {
  TuiAccordionModule, TuiActionModule, TuiCheckboxBlockModule, TuiDataListWrapperModule, TuiFieldErrorPipeModule,
  TuiInputFilesModule,
  TuiInputModule,
  TuiInputSliderModule,
  TuiIslandModule, TuiLineClampModule, TuiMarkerIconModule, TuiSelectModule,
  TuiTabsModule, TuiTagModule, TuiToggleModule
} from "@taiga-ui/kit";
import { ModelUploadComponent } from '../model-viewer/components/model-upload/model-upload.component';
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {TranslateLoader, TranslateModule} from "@ngx-translate/core";
import {HttpClient, HttpClientModule} from "@angular/common/http";
import {TranslateHttpLoader} from "@ngx-translate/http-loader";
import {TuiIsPresentPipeModule} from "@taiga-ui/cdk";
import { ReplaceUnderscorePipe } from './pipes/replace-underscore.pipe';
import { HourToTimePipe } from './pipes/hour-to-time.pipe';
import { TuiMoneyModule } from "@taiga-ui/addon-commerce";
@NgModule({
  declarations: [
    NutToolbarComponent,
    ReplaceUnderscorePipe,
    HourToTimePipe
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
    TuiTextfieldControllerModule,
    TuiLineClampModule,
    TuiActionModule,
    TuiErrorModule,
    TuiFieldErrorPipeModule,
    TuiMoneyModule,
    TuiLabelModule,
    ReactiveFormsModule,
    TuiIslandModule,
    ReplaceUnderscorePipe,
    HourToTimePipe
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
    TuiTabsModule
  ]
})
export class NutCommonModule { }

export function HttpLoaderFactory(http: HttpClient): TranslateHttpLoader {
  return new TranslateHttpLoader(http);
}
