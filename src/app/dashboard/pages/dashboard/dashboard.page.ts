import { AfterViewInit, Component, ElementRef, OnDestroy, OnInit, ViewChild } from "@angular/core";
import { Engine } from "tsparticles-engine";
import { loadSlim } from "tsparticles-slim";
import { ActivatedRoute, Router } from "@angular/router";
import { SECTIONS_METADATA } from "../../../seo/models/sections.metadata";
import { BehaviorSubject, Observable, Subject } from "rxjs";



@Component({
    selector: "app-dashboard",
    templateUrl: "./dashboard.page.html",
    styleUrls: ["./dashboard.page.scss"]
})
export class DashboardPage implements OnInit, AfterViewInit, OnDestroy {
    particleConfigPath: string = "./assets/config/particle-nodes.conf.json";

    @ViewChild("welcome") dashboardIntro: ElementRef;
    @ViewChild("modelUpload") modelUpload: ElementRef;
    @ViewChild("shop") shop: ElementRef;

    private observer: IntersectionObserver;
    private initialScrollFinished: boolean = false;

    private isScrolling: boolean = false;

    private currentFragment: string;

    constructor(private route: ActivatedRoute,
                private router: Router) {
    }

    ngOnInit(): void {

    }

    ngAfterViewInit(): void {
        this.initIntersectionObserver();

        this.route.fragment.subscribe(fragment => {
            if (fragment) {
                if (this.initialScrollFinished) {
                    this.scrollToElement(fragment, "smooth");
                } else {
                    this.scrollToElement(fragment, "instant");
                }
            }
        });

        console.log(this.dashboardIntro.nativeElement)
    }

    ngOnDestroy(): void {
        if (this.observer) {
            this.observer.disconnect();
        }
    }

    private initIntersectionObserver(): void {
        this.observer = new IntersectionObserver((entries: any) => {
            entries.forEach((entry: any) => {
                if (entry.isIntersecting) {
                    const currentFragment = entry.target.id;
                    this.currentFragment = currentFragment;

                    if (currentFragment && !this.isScrolling) {

                        this.router.navigate([], {
                            fragment: currentFragment,
                            replaceUrl: true
                        });
                    }
                }
            });
        }, { threshold: 0.5 });

        this.observer.observe(this.dashboardIntro.nativeElement);
        this.observer.observe(this.modelUpload.nativeElement);
        this.observer.observe(this.shop.nativeElement);
    }

    private scrollToElement(elementId: string, behaviour: "smooth" | "instant" = "smooth"): void {
        if (elementId === this.currentFragment) {
            return;
        }

        this.isScrolling = true;
        let target: ElementRef;

        switch (elementId) {
            case SECTIONS_METADATA.dashboard.fragment:
                target = this.dashboardIntro;
                this.dashboardIntro.nativeElement.scrollIntoView({ behavior: behaviour });
                break;
            case SECTIONS_METADATA.modelUpload.fragment:
                target = this.modelUpload;
                this.modelUpload.nativeElement.scrollIntoView({ behavior: behaviour });
                break;
            case SECTIONS_METADATA.shop.fragment:
                target = this.shop;
                this.shop.nativeElement.scrollIntoView({ behavior: behaviour });
                break;
        }

        const checkScroll = setInterval(() => {
            if (target) {
                const rect = target.nativeElement.getBoundingClientRect();
                if (rect.top <= 0 && rect.bottom >= (window.innerHeight || document.documentElement.clientHeight)) {
                    clearInterval(checkScroll);
                    this.isScrolling = false;
                    this.initialScrollFinished = true;
                }
            }
        }, 100);

        this.initialScrollFinished = true;
    }

    async particlesInit(engine: Engine): Promise<void> {
        await loadSlim(engine);
    }
}
