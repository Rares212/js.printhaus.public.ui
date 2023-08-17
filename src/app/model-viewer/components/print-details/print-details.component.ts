import { Component, Input, OnChanges, OnInit, SimpleChanges } from "@angular/core";
import { PrintModelDetailsRespDto } from "@printnuts/common";
import { Vector3 } from "three";
import { FormControl } from "@angular/forms";

@Component({
    selector: "haus-print-details",
    templateUrl: "./print-details.component.html",
    styleUrls: ["./print-details.component.scss",
                "./print-details.component.less"],
})
export class PrintDetailsComponent implements OnChanges {
    protected readonly NaN = NaN;

    @Input() styleClass: string = '';
    @Input() printDimensions: Vector3 | null;
    @Input() printDetails: PrintModelDetailsRespDto | null;

    protected costChartLabels: string[] = [];
    protected costChartValues: number[] = [];
    protected costChartTotal: number;
    protected costChartCurrency: string;
    protected activeCostChartIndex: number = NaN;

    protected showCostInfoControl = new FormControl<boolean>(false);

    ngOnChanges(changes: SimpleChanges): void {
        if (changes['printDetails'] && changes['printDetails'].currentValue) {
            const newPrintDetails = changes['printDetails'].currentValue as PrintModelDetailsRespDto;
            this.costChartValues = [];
            this.costChartLabels = [];
            newPrintDetails.printCostParts.forEach((part) => {
                this.costChartLabels.push(part.reason);
                this.costChartValues.push(part.cost.amount);
            });
            this.costChartTotal = newPrintDetails.cost.amount;
            this.costChartCurrency = newPrintDetails.cost.currency;
        }
    }

    get sum(): number {
        return Number.isNaN(this.activeCostChartIndex) ? this.costChartTotal : this.costChartValues[this.activeCostChartIndex];
    }

    get label(): string {
        return Number.isNaN(this.activeCostChartIndex) ? 'Total' : this.costChartLabels[this.activeCostChartIndex];
    }

    getColor(index: number): string {
        return `var(--tui-chart-${index})`;
    }

    onHover(index: number, hovered: boolean): void {
        this.activeCostChartIndex = hovered ? index : 0;
    }
}
