import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DashboardPage } from './pages/dashboard/dashboard.page';
import {NutCommonModule} from "../common/nut-common.module";
import {NutToolbarComponent} from "../common/toolbar/nut-toolbar.component";



@NgModule({
  declarations: [
    DashboardPage,
  ],
  imports: [
    NutCommonModule
  ],
  exports: [
    DashboardPage
  ]
})
export class DashboardModule { }
