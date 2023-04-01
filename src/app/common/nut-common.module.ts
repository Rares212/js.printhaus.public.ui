import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {TuiButtonModule, TuiRootModule, TuiSvgModule} from "@taiga-ui/core";
import { NutToolbarComponent } from './toolbar/nut-toolbar.component';
import {AppModule} from "../app.module";
import {BrowserModule} from "@angular/platform-browser";
import {BrowserAnimationsModule} from "@angular/platform-browser/animations";
import {AppRoutingModule} from "../app-routing.module";
import {NgbModule} from "@ng-bootstrap/ng-bootstrap";
import {TuiTabsModule} from "@taiga-ui/kit";
import { StlViewerComponent } from './stl-viewer/stl-viewer.component';

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
    TuiTabsModule,
    TuiButtonModule,
    TuiSvgModule,
  ]
})
export class NutCommonModule { }
