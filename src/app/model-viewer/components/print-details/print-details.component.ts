import { Component, Input } from "@angular/core";
import { PrintModelDetailsRespDto } from "@printnuts/common";
import { Vector3 } from "three";

@Component({
  selector: 'haus-print-details',
  templateUrl: './print-details.component.html',
  styleUrls: ['./print-details.component.scss']
})
export class PrintDetailsComponent {
  @Input() printDimensions: Vector3 | null;
  @Input() printDetails: PrintModelDetailsRespDto | null;
}
