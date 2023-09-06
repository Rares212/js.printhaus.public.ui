import { Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges } from "@angular/core";
import { AuthService } from "@auth0/auth0-angular";

@Component({
  selector: 'haus-rating-indicator',
  templateUrl: './rating-indicator.component.html',
  styleUrls: ['./rating-indicator.component.scss']
})
export class RatingIndicatorComponent implements OnInit, OnChanges {
    @Input() rating: number;
    @Input() numberOfRatings: number;

    private _userRating: number | null = null;
    get userRating(): number | null {
        return this._userRating;
    }
    @Input() set userRating(value: number | null) {
        this._userRating = value;
        this.userRatingChange.emit(value)
    }

    @Output() userRatingChange: EventEmitter<number | null> = new EventEmitter<number | null>();

    shownRating: number = 0;

    constructor(protected authService: AuthService) {
    }

    ngOnInit(): void {
        this.shownRating = this.userRating ?? this.rating;
    }

    ngOnChanges(changes: SimpleChanges): void {
        if ('userRating' in changes && this.userRating) {
            this.shownRating = this.userRating;
        } else if ('rating' in changes) {
            this.shownRating = this.rating;
        }
    }
}
