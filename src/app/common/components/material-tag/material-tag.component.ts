import { Component, Input } from "@angular/core";
import { isDark } from "../../util/common.util";

@Component({
  selector: 'haus-material-tag',
  templateUrl: './material-tag.component.html',
  styleUrls: ['./material-tag.component.scss']
})
export class MaterialTagComponent {

    @Input() name: string = '';
    @Input() color: string = '#212121';
    @Input() size: 's' | 'm' | 'l' = 'm';
    @Input() showPointer: boolean = false;


    protected readonly isDark = isDark;
}
