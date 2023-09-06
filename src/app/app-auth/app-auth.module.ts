import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { UserBadgeComponent } from "./user-badge/user-badge.component";
import { NutCommonModule } from "../common/nut-common.module";
import { environment } from "../../environments/environment";
import { AuthHttpInterceptor, AuthModule } from "@auth0/auth0-angular";
import { TuiAvatarModule } from "@taiga-ui/kit";
import {
    TuiButtonModule,
    TuiDataListModule,
    TuiDropdownModule,
    TuiHostedDropdownModule,
    TuiLoaderModule
} from "@taiga-ui/core";
import { HTTP_INTERCEPTORS } from "@angular/common/http";
import { TuiIsPresentPipeModule, TuiItemModule } from "@taiga-ui/cdk";


@NgModule({
    declarations: [
        UserBadgeComponent
    ],
    exports: [
        UserBadgeComponent
    ],
    imports: [
        CommonModule,
        AuthModule.forRoot({
            domain: environment.auth.domain,  // Use domain from environment
            clientId: environment.auth.clientId,  // Use clientId from environment
            authorizationParams: {
                redirect_uri: window.location.origin
            },
            httpInterceptor: {
                allowedList: [
                    environment.printhausApi.rootUrl
                ]
            }
        }),
        TuiAvatarModule,
        TuiHostedDropdownModule,
        TuiDataListModule,
        TuiButtonModule,
        TuiDropdownModule,
        TuiItemModule,
        TuiLoaderModule,
        TuiIsPresentPipeModule
    ],
    providers: [
        {
            provide: HTTP_INTERCEPTORS,
            useClass: AuthHttpInterceptor,
            multi: true,
        },
    ],
})
export class AppAuthModule {
}
