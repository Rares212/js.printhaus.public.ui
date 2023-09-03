import { NgModule } from "@angular/core";
import { AppComponent } from "./app.component";
import { HttpLoaderFactory, NutCommonModule } from "./common/nut-common.module";
import { DashboardModule } from "./dashboard/dashboard.module";
import { TUI_SANITIZER } from "@taiga-ui/core";
import { NgDompurifySanitizer } from "@tinkoff/ng-dompurify";
import { HTTP_INTERCEPTORS, HttpClient } from "@angular/common/http";
import { HttpErrorInterceptor } from "./common/interceptors/http-error.interceptor";
import { BrowserModule } from "@angular/platform-browser";
import { RouterOutlet } from "@angular/router";
import { AppRoutingModule } from "./app-routing.module";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { TranslateLoader, TranslateModule } from "@ngx-translate/core";
import { AppAuthModule } from "./app-auth/app-auth.module";

@NgModule({
    declarations: [
        AppComponent
    ],
    imports: [
        BrowserModule,
        BrowserAnimationsModule,
        AppRoutingModule,
        AppAuthModule,
        NutCommonModule,
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
