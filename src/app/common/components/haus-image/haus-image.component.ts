import { Component, Inject, Input, TemplateRef, ViewChild } from "@angular/core";
import { ImageInfoRespDto } from "@printhaus/common";
import { TuiDialogContext } from "@taiga-ui/core";
import { TuiPreviewDialogService } from "@taiga-ui/addon-preview";

@Component({
  selector: 'haus-image',
  templateUrl: './haus-image.component.html',
  styleUrls: ['./haus-image.component.scss']
})
export class HausImageComponent {
    @ViewChild('preview')
    readonly preview?: TemplateRef<TuiDialogContext>;

    @Input() image: ImageInfoRespDto;
    @Input() imageQuality: ImageQuality = 'low';
    @Input() previewImageQuality: ImageQuality = 'high';

    @Input() width: number = 256;
    @Input() height: number = 256;

    @Input() imageStyleClass: string = "island-rounding object-fit-cover subtle-shadow-static";
    @Input() previewImageStyleClass: string = "object-fit-contain";

    @Input() allowPreview: boolean = true;
    @Input() stopPropagation: boolean = false;

    constructor(@Inject(TuiPreviewDialogService)
                private readonly previewDialogService: TuiPreviewDialogService,) {
    }

    get imageSrc(): string {
        return this.getImageSrc(this.image, this.imageQuality);
    }

    get previewImageSrc(): string {
        return this.getImageSrc(this.image, this.previewImageQuality);
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
