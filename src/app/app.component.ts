import { Component, OnInit } from "@angular/core";
import * as AOS from "aos";
import { Object3D } from "three";

@Component({
    selector: "app-root",
    templateUrl: "./app.component.html",
    styleUrls: ["./app.component.scss"]
})
export class AppComponent implements OnInit {
    title = "js.printnuts.ui";

    constructor() {
        Object3D.DEFAULT_UP.set(0, 0, 1);
    }

    ngOnInit(): void {
        AOS.init({
            easing: "ease-in-out",
            mirror: false,
            once: false,
            duration: 1000,
            delay: 0
        });
    }
}
