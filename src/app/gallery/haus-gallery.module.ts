import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { HausGalleryComponent } from "./components/gallery/haus-gallery.component";
import { GALLERY_CONFIG, GalleryComponent, GalleryConfig, GalleryImageDef, GalleryThumbDef } from "ng-gallery";
import { NutCommonModule } from "../common/nut-common.module";


@NgModule({
    declarations: [
        HausGalleryComponent
    ],
    imports: [
        CommonModule,
        GalleryComponent,
        NutCommonModule,
        GalleryImageDef,
        GalleryThumbDef
    ],
    exports: [
        HausGalleryComponent
    ],
    providers: [
        {
            provide: GALLERY_CONFIG,
            useValue: {
                autoHeight: true,
                imageSize: "cover"
            } as GalleryConfig
        }
    ]
})
export class HausGalleryModule {
}
