import { Component, ElementRef, OnDestroy, OnInit, ViewChild } from "@angular/core";
import { Engine } from "tsparticles-engine";
import { loadSlim } from "tsparticles-slim";
import { ActivatedRoute, Router } from "@angular/router";
import { SECTIONS_METADATA } from "../../../seo/models/sections.metadata";


@Component({
    selector: "app-dashboard",
    templateUrl: "./dashboard.page.html",
    styleUrls: ["./dashboard.page.scss"]
})
export class DashboardPage implements OnInit, OnDestroy {
    particleConfigPath: string = "./assets/config/particle-nodes.conf.json";

    @ViewChild("welcome") dashboardIntro: ElementRef;
    @ViewChild("modelUpload") modelUpload: ElementRef;
    @ViewChild("shop") shop: ElementRef;

    constructor(private route: ActivatedRoute,
                private router: Router) {
    }

    ngOnInit(): void {
        this.route.fragment.subscribe(fragment => {
            if (fragment) {
                this.scrollToElement(fragment);
            }
        });

        window.addEventListener("scroll", this.onScroll.bind(this), true);
    }

    ngOnDestroy(): void {
        window.removeEventListener("scroll", this.onScroll.bind(this), true);
    }

    onScroll(): void {
        let currentFragment: string | undefined;

        if (this.isElementInViewport(this.dashboardIntro)) {
            currentFragment = SECTIONS_METADATA.dashboard.fragment;
        } else if (this.isElementInViewport(this.modelUpload)) {
            currentFragment = SECTIONS_METADATA.modelUpload.fragment;
        } else if (this.isElementInViewport(this.shop)) {
            currentFragment = SECTIONS_METADATA.shop.fragment;
        }

        if (currentFragment) {
            this.router.navigate([], {
                fragment: currentFragment,
                replaceUrl: true
            });
        }
    }

    isElementInViewport(el: ElementRef): boolean {
        const rect = el.nativeElement.getBoundingClientRect();
        return (
            rect.top >= 0 &&
            rect.left >= 0 &&
            rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
            rect.right <= (window.innerWidth || document.documentElement.clientWidth)
        );
    }

    private scrollToElement(elementId: string) {
        switch (elementId) {
            case SECTIONS_METADATA.dashboard.fragment:
                this.dashboardIntro.nativeElement.scrollIntoView({ behavior: "smooth" });
                break;
            case SECTIONS_METADATA.modelUpload.fragment:
                this.modelUpload.nativeElement.scrollIntoView({ behavior: "smooth" });
                break;
            case SECTIONS_METADATA.shop.fragment:
                this.shop.nativeElement.scrollIntoView({ behavior: "smooth" });
                break;
        }
    }

    async particlesInit(engine: Engine): Promise<void> {
        // Starting from 1.19.0 you can add custom presets or shape here, using the current tsParticles instance (main)
        // this loads the tsparticles package bundle, it's the easiest method for getting everything ready
        // starting from v2 you can add only the features you need reducing the bundle size
        await loadSlim(engine);
    }
}
