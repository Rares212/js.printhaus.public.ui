import { Component, OnInit } from "@angular/core";
import { Engine } from "tsparticles-engine";
import { loadSlim } from "tsparticles-slim";
import * as AOS from "aos";


@Component({
    selector: "app-dashboard",
    templateUrl: "./dashboard.page.html",
    styleUrls: ["./dashboard.page.scss"]
})
export class DashboardPage implements OnInit {
    particleConfigPath: string = "./assets/config/particle-nodes.conf.json";

    ngOnInit(): void {
        AOS.init({
            easing: "ease-in-out",
            mirror: true,
            duration: 1000,
            delay: 100
        });
    }

    async particlesInit(engine: Engine): Promise<void> {
        // Starting from 1.19.0 you can add custom presets or shape here, using the current tsParticles instance (main)
        // this loads the tsparticles package bundle, it's the easiest method for getting everything ready
        // starting from v2 you can add only the features you need reducing the bundle size
        await loadSlim(engine);
    }
}
