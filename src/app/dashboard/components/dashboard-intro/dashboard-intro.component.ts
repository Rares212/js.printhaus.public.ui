import { Component, Input, OnInit } from "@angular/core";
// @ts-ignore
import * as AOS from "aos";
import { animate, state, style, transition, trigger } from "@angular/animations";

@Component({
    selector: "nut-dashboard-intro",
    templateUrl: "./dashboard-intro.component.html",
    styleUrls: ["./dashboard-intro.component.scss"],
    animations: [
        trigger('bounceAnimation', [
            state('up', style({
                transform: 'translateY(-10px)'
            })),
            state('down', style({
                transform: 'translateY(10px)'
            })),
            transition('up <=> down', [
                animate('0.5s ease-in-out')
            ])
        ])
    ]
})
export class DashboardIntroComponent implements OnInit {

    @Input()
    styleClass: string = "";

    protected arrowIconState: 'up' | 'down' = 'up';

    ngOnInit(): void {
        AOS.init({
            easing: "ease-in-out",
            mirror: false,
            once: false,
            duration: 1000,
            delay: 100,
        });
    }

    toggleArrowState() {
        this.arrowIconState = this.arrowIconState === 'down' ? 'up' : 'down';
    }

}
