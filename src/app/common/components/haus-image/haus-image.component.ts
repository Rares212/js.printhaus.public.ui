import { Component, Inject, Input, TemplateRef, ViewChild } from "@angular/core";
import { ImageInfoRespDto } from "@printhaus/common";
import { TuiDialogContext } from "@taiga-ui/core";
import { TuiPreviewDialogService } from "@taiga-ui/addon-preview";
import { GalleryItem, ImageItemData } from "ng-gallery";

@Component({
  selector: 'haus-image',
  templateUrl: './haus-image.component.html',
  styleUrls: ['./haus-image.component.scss']
})
export class HausImageComponent {
    @ViewChild('preview')
    readonly preview: TemplateRef<TuiDialogContext>;

    @Input() image?: ImageInfoRespDto;
    @Input() galleryItem?: ImageItemData;

    @Input() imageQuality: ImageQuality = 'low';
    @Input() previewImageQuality: ImageQuality = 'high';

    @Input() width?: number = 256;
    @Input() height?: number = 256;
    @Input() fill?: boolean = false;

    @Input() rounding: 'none' | 'small' | 'island' = 'none';
    @Input() shadow: boolean = false;
    @Input() imageFit: 'cover' | 'contain' = 'cover';

    @Input() imageStyleClass: string = "";
    @Input() previewImageStyleClass: string = "";

    @Input() allowPreview: boolean = true;
    @Input() stopPropagation: boolean = false;

    constructor(@Inject(TuiPreviewDialogService)
                private readonly previewDialogService: TuiPreviewDialogService) {
    }

    get imageSrc(): string {
        if (this.galleryItem) {
            switch (this.imageQuality) {
                case "low": return this.galleryItem.thumb as string;
                default: return this.galleryItem.src as string;
            }
        }

        return this.getImageSrc(this.image!, this.imageQuality);
    }

    get previewImageSrc(): string {
        if (this.galleryItem) {
            switch (this.previewImageQuality) {
                case "low": return this.galleryItem.thumb as string;
                default: return this.galleryItem.src as string;
            }
        }

        return this.getImageSrc(this.image!, this.previewImageQuality);
    }

    get imageStyleClassTemplate(): string {
        return `${this.imageStyleClass} ${this.roundingStyleClass} ${this.shadow ? 'subtle-shadow-static' : ''} ${this.imageFitStyleClass} ${this.allowPreview ? 'preview-image' : ''}}`;
    }

    get previewStyleClassTemplate(): string {
        return `${this.previewImageStyleClass} ${this.roundingStyleClass}`;
    }

    get roundingStyleClass(): string {
        switch (this.rounding) {
            case 'none': return '';
            case 'small': return 'rounded';
            case 'island': return 'island-rounding';
        }
    }

    get imageFitStyleClass(): string {
        switch (this.imageFit) {
            case 'cover': return 'object-fit-cover';
            case 'contain': return 'object-fit-contain';
        }
    }

    openPreviewImage(event: any): void {
        if (!this.allowPreview) return;

        if (this.stopPropagation)  {
            event.stopPropagation();
        }

        this.previewDialogService.open(this.preview).subscribe();
    }

    private getImageSrc(image: ImageInfoRespDto, quality: ImageQuality): string {
        switch (quality) {
            case "low": return image.smallImageUrl;
            case "medium": return image.mediumImageUrl;
            case "high": return image.largeImageUrl;
            case "original": return image.originalImageUrl;
        }
    }
}

export type ImageQuality = 'low' | 'medium' | 'high' | 'original';
