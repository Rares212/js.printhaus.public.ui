import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  TuiButtonModule,
  TuiGroupModule,
  TuiLinkModule,
  TuiLoaderModule,
  TuiRootModule,
  TuiSvgModule
} from "@taiga-ui/core";
import { NutToolbarComponent } from './components/toolbar/nut-toolbar.component';
import {AppModule} from "../app.module";
import {BrowserModule} from "@angular/platform-browser";
import {BrowserAnimationsModule} from "@angular/platform-browser/animations";
import {AppRoutingModule} from "../app-routing.module";
import {NgbModule} from "@ng-bootstrap/ng-bootstrap";
import {
  TuiAccordionModule, TuiCheckboxBlockModule,
  TuiInputFilesModule,
  TuiInputModule,
  TuiInputSliderModule,
  TuiIslandModule, TuiMarkerIconModule,
  TuiTabsModule, TuiToggleModule
} from "@taiga-ui/kit";
import { StlViewerComponent } from '../model-viewer/components/model-viewer/stl-viewer.component';
import {StlModelViewerModule} from "angular-stl-model-viewer";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {TranslateLoader, TranslateModule} from "@ngx-translate/core";
import {HttpClient, HttpClientModule} from "@angular/common/http";
import {TranslateHttpLoader} from "@ngx-translate/http-loader";
import {TuiIsPresentPipeModule} from "@taiga-ui/cdk";
@NgModule({
  declarations: [
    NutToolbarComponent,
    StlViewerComponent
  ],
    exports: [
        BrowserModule,
        BrowserAnimationsModule,
        AppRoutingModule,
        TuiRootModule,
        NgbModule,
        NutToolbarComponent,
        StlViewerComponent
    ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    TuiRootModule,
    NgbModule,
    StlModelViewerModule,
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: HttpLoaderFactory,
        deps: [HttpClient]
      }
    }),
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
  ]
})
export class NutCommonModule { }

export function HttpLoaderFactory(http: HttpClient): TranslateHttpLoader {
  return new TranslateHttpLoader(http);
}
