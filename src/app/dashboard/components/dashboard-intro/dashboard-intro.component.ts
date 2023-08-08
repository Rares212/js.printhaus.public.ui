import { Component, Input, OnInit } from "@angular/core";
// @ts-ignore
import * as AOS from "aos";

@Component({
    selector: "nut-dashboard-intro",
    templateUrl: "./dashboard-intro.component.html",
    styleUrls: ["./dashboard-intro.component.scss"]
})
export class DashboardIntroComponent implements OnInit {

    @Input()
    styleClass: string = "";

    ngOnInit(): void {
        AOS.init({
            easing: "ease-in-out",
            mirror: false,
            once: false,
            duration: 1000,
            delay: 100,
        });
    }

}
