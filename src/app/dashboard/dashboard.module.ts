import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DashboardPage } from './pages/dashboard/dashboard.page';
import {NutCommonModule} from "../common/nut-common.module";
import {NutToolbarComponent} from "../common/components/toolbar/nut-toolbar.component";
import {NgxPageScrollCoreModule} from "ngx-page-scroll-core";
import {NgxPageScrollModule} from "ngx-page-scroll";
import { DashboardIntroComponent } from './components/dashboard-intro/dashboard-intro.component';
import {NgParticlesModule} from "ng-particles";
import {TuiTagModule} from "@taiga-ui/kit";
import { ModelViewerModule } from "../model-viewer/model-viewer.module";
import { TuiScrollbarModule } from "@taiga-ui/core";



@NgModule({
  declarations: [
    DashboardPage,
    DashboardIntroComponent,
  ],
  imports: [
    NutCommonModule,
    NgxPageScrollModule,
    NgParticlesModule,
    NgxPageScrollCoreModule,
    TuiTagModule,
    ModelViewerModule,
    TuiScrollbarModule
  ],
  exports: [
    DashboardPage
  ]
})
export class DashboardModule { }
