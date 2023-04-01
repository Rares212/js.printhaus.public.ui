import { NgModule } from '@angular/core';
import { AppComponent } from './app.component';
import {NutCommonModule} from "./common/nut-common.module";
import {DashboardModule} from "./dashboard/dashboard.module";
import {TUI_ICONS_PATH, TUI_SANITIZER, tuiIconsPathFactory} from "@taiga-ui/core";
import {NgDompurifySanitizer} from "@tinkoff/ng-dompurify";

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
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
