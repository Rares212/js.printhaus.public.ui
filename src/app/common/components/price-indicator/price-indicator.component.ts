import { Component, Input } from "@angular/core";

@Component({
  selector: 'haus-price-indicator',
  templateUrl: './price-indicator.component.html',
  styleUrls: ['./price-indicator.component.scss']
})
export class PriceIndicatorComponent {
    @Input() price: number;
    @Input() reducedPrice: number | null = null;
    @Input() currency: string;
}
