import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { SECTIONS_METADATA } from "./seo/models/sections.metadata";

const routes: Routes = [
    {
        path: SECTIONS_METADATA.dashboard.path,
        data: SECTIONS_METADATA.dashboard.meta,
        loadChildren: () => import("./dashboard/dashboard.module").then(m => m.DashboardModule)
    },
    {
        path: SECTIONS_METADATA.shop.path,
        data: SECTIONS_METADATA.shop.meta,
        loadChildren: () => import("./cart/cart.module").then(m => m.CartModule)
    }
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})
export class AppRoutingModule {
}
