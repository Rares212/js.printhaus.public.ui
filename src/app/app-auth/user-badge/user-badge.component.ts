import { Component, Inject, Input, OnInit } from "@angular/core";
import { AuthService, User } from "@auth0/auth0-angular";
import { DOCUMENT } from "@angular/common";
import { arrow } from "@popperjs/core";
import { TUI_ARROW } from "@taiga-ui/kit";
import { map, tap } from "rxjs";

@Component({
    selector: "haus-user-badge",
    templateUrl: "./user-badge.component.html",
    styleUrls: ["./user-badge.component.scss"]
})
export class UserBadgeComponent implements OnInit {
    @Input() size: "m" | "l" | "xl" | "s" | "xs" = "s";

    user$ = this.authService.user$;
    isAuthenticated$ = this.authService.isAuthenticated$;
    isLoading$ = this.authService.isLoading$.pipe(
        tap(value => console.log(`loading: ${value}`))
    );

    dropdownOpen: boolean = false;

    readonly arrow = TUI_ARROW;

    constructor(private authService: AuthService,
                @Inject(DOCUMENT) private doc: Document,) {
    }

    ngOnInit(): void {
    }

    login(): void {
        this.authService.loginWithRedirect();
    }

    logout(): void {
        this.authService.logout({ logoutParams: { returnTo: this.doc.location.origin } });
    }

    signup(): void {
        this.authService.loginWithRedirect({ authorizationParams: { screen_hint: "signup" }});
    }
}
