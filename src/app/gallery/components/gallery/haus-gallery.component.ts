import { Component, Input, OnInit, ViewChild } from "@angular/core";
import { ImageInfoRespDto } from "@printhaus/common";
import { Gallery, GalleryImageDef, GalleryItem, ImageItem } from "ng-gallery";

@Component({
  selector: 'haus-gallery',
  templateUrl: './haus-gallery.component.html',
  styleUrls: ['./haus-gallery.component.scss']
})
export class HausGalleryComponent implements OnInit {
    @ViewChild(GalleryImageDef, { static: true }) imageDef: GalleryImageDef;

    @Input() images: ImageInfoRespDto[] = [];

    @Input() alt: string = '';

    galleryImages: GalleryItem[] = [];

    constructor(public gallery: Gallery) {
    }

    ngOnInit(): void {
        this.galleryImages = this.images.map(image => {
            return new ImageItem({src: image.largeImageUrl, thumb: image.smallImageUrl, alt: this.alt});
        });

        this.gallery.ref()
    }
}
