import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {DashboardPage} from "./dashboard/pages/dashboard/dashboard.page";

const routes: Routes = [
  {
    path: '',
    component: DashboardPage
  },
  {
    path: '**',
    component: DashboardPage
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
