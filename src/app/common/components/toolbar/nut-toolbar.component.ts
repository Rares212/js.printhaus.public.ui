import { Component } from '@angular/core';
import { SECTIONS_METADATA } from "../../../seo/models/sections.metadata";
import { IsActiveMatchOptions } from "@angular/router";

@Component({
  selector: 'nut-toolbar',
  templateUrl: './nut-toolbar.component.html',
  styleUrls: ['./nut-toolbar.component.scss']
})
export class NutToolbarComponent {
    protected readonly URL_MATCH_OPTIONS: IsActiveMatchOptions = {
        fragment: 'exact',
        matrixParams: 'ignored',
        queryParams: 'ignored',
        paths: 'subset'
    }

    protected readonly SECTIONS_METADATA = SECTIONS_METADATA;
}
