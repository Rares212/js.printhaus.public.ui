import { NgModule } from "@angular/core";
import { DashboardPage } from "./pages/dashboard/dashboard.page";
import { NutCommonModule } from "../common/nut-common.module";
import { DashboardIntroComponent } from "./components/dashboard-intro/dashboard-intro.component";
import { NgParticlesModule } from "ng-particles";
import { TuiTagModule } from "@taiga-ui/kit";
import { ModelViewerModule } from "../model-viewer/model-viewer.module";
import { ShopModule } from "../shop/shop.module";
import { DashboardRoutingModule } from './dashboard-routing.module';

@NgModule({
    declarations: [
        DashboardPage,
        DashboardIntroComponent
    ],
    imports: [
        NutCommonModule,
        NgParticlesModule,
        TuiTagModule,
        ModelViewerModule,
        ShopModule,
        DashboardRoutingModule
    ],
    exports: [
        DashboardPage
    ]
})
export class DashboardModule {
}
