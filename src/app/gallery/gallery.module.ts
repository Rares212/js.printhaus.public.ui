import { NgModule } from '@angular/core';
import { GalleryComponent } from './components/gallery/gallery.component';
import { NutCommonModule } from "../common/nut-common.module";
import { NgOptimizedImage } from "@angular/common";
import { TuiElasticContainerModule, TuiPaginationModule } from "@taiga-ui/kit";



@NgModule({
    declarations: [
        GalleryComponent
    ],
    exports: [
        GalleryComponent
    ],
    imports: [
        NutCommonModule,
        NgOptimizedImage,
        TuiPaginationModule,
        TuiElasticContainerModule
    ]
})
export class GalleryModule { }
