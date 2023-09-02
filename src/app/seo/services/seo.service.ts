import { Inject, Injectable } from "@angular/core";
import { DOCUMENT } from "@angular/common";
import { Meta, Title } from "@angular/platform-browser";
import { SectionMetadata } from "../models/sections.metadata";

@Injectable({
    providedIn: "root"
})
export class SeoService {
    constructor(@Inject(DOCUMENT) private dom: any,
                private titleSvc: Title,
                private metaSvc: Meta) {
    }

    public updateSectionMetadata(metadata: SectionMetadata) {
        this.updateTitle(metadata.title);
        this.updateDescription(metadata.description);
        this.updateKeywords(metadata.keywords);
    }

    private updateTitle(title: string) {
        this.titleSvc.setTitle(title);
    }

    private updateDescription(desc: string) {
        this.metaSvc.updateTag({ name: "description", content: desc });
    }

    private updateKeywords(keywords: string[]) {
        const content = keywords.join(', ');
        this.metaSvc.updateTag({ name: "keywords", content: content });
    }

    createCanonicalUrl(url: string) {
        const link: HTMLLinkElement = this.dom.createElement("link");
        link.setAttribute("rel", "canonical");
        this.dom.head.appendChild(link);
        link.setAttribute("href", url);
    }
}
