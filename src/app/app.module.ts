import { NgModule } from "@angular/core";
import { AppComponent } from "./app.component";
import { NutCommonModule } from "./common/nut-common.module";
import { DashboardModule } from "./dashboard/dashboard.module";
import { TUI_SANITIZER } from "@taiga-ui/core";
import { NgDompurifySanitizer } from "@tinkoff/ng-dompurify";
import { HTTP_INTERCEPTORS } from "@angular/common/http";
import { HttpErrorInterceptor } from "./common/interceptors/http-error.interceptor";

@NgModule({
    declarations: [
        AppComponent
    ],
    imports: [
        DashboardModule,
        NutCommonModule
    ],
    providers: [
        {
            provide: TUI_SANITIZER,
            useValue: NgDompurifySanitizer
        },
        {
            provide: HTTP_INTERCEPTORS,
            useClass: HttpErrorInterceptor,
            multi: true
        }
    ],
    bootstrap: [AppComponent]
})
export class AppModule {
}
