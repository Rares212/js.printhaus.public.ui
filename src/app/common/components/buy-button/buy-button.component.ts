import { Component, EventEmitter, Inject, Input, OnDestroy, OnInit, Output } from "@angular/core";
import { FormControl, Validators } from "@angular/forms";
import { tuiInputNumberOptionsProvider } from "@taiga-ui/kit";
import { TUI_IS_MOBILE } from "@taiga-ui/cdk";
import { BehaviorSubject, combineLatest, distinctUntilChanged, filter, map, Observable, of, tap } from "rxjs";
import { SubSink } from "subsink";
import { isNonNull } from "../../util/common.util";
import { animate, state, style, transition, trigger } from "@angular/animations";

@Component({
    selector: "haus-buy-button",
    templateUrl: "./buy-button.component.html",
    styleUrls: ["./buy-button.component.scss"],
    animations: [
        trigger('fadeInOut', [
            state('void', style({ opacity: 0, height: '0px', overflow: 'hidden', position: 'absolute', width: '100%' })),
            state('*', style({ opacity: 1, height: '*', overflow: 'hidden', position: 'relative' })),
            transition(':enter', [
                style({ opacity: 0, height: '0px', overflow: 'hidden', position: 'absolute', width: '100%' }),
                animate(200)
            ]),
            transition(':leave',
                animate(200, style({ opacity: 0, height: '0px', overflow: 'hidden', position: 'absolute', width: '100%' }))
            )
        ])
    ]
})
export class BuyButtonComponent implements OnInit, OnDestroy {
    @Input() styleClass: string = "";
    @Input() size: 'm' | 'l' = 'l';
    @Input() label: string = "Add to cart";
    @Input() disabled: boolean = false;
    @Input() loading: boolean = false;

    unitCost$: BehaviorSubject<number> = new BehaviorSubject<number>(0);
    @Input() set unitCost(value: number) {
        this.unitCost$.next(value);
    }
    get unitCost(): number {
        return this.unitCost$.value;
    }

    @Input() costCurrency: string;

    @Output() quantityChange = new EventEmitter<number>();

    private subs = new SubSink();

    protected showQuantityControl$: Observable<boolean>;

    protected quantityControl = new FormControl(1,
        [Validators.required]);

    protected totalCostControl = new FormControl<number>(0);

    constructor() {
        this.showQuantityControl$ = this.quantityControl.valueChanges.pipe(
            distinctUntilChanged(),
            map(value => value !== 0)
        );

        this.subs.sink = this.quantityControl.valueChanges.pipe(
            distinctUntilChanged(),
            tap(value => this.quantityChange.emit(value || 0))
        ).subscribe();

        this.subs.sink = combineLatest([this.quantityControl.valueChanges, this.unitCost$]).pipe(
            map(([quantity, unitCost]) => (quantity || 0) * unitCost)
        ).subscribe(totalCost => this.totalCostControl.setValue(totalCost));

        // this.subs.sink = this.quantityControl.valueChanges.pipe(
        //     filter(value => !isNonNull(value)),
        // ).subscribe(() => this.quantityControl.setValue(0));
    }

    ngOnInit(): void {
    }

    ngOnDestroy(): void {
        this.subs.unsubscribe();
    }

    onBuyClick(): void {
        this.quantityControl.setValue(1);
    }


}
