import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RatingIndicatorComponent } from './rating-indicator.component';

describe('RatingIndicatorComponent', () => {
  let component: RatingIndicatorComponent;
  let fixture: ComponentFixture<RatingIndicatorComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [RatingIndicatorComponent]
    });
    fixture = TestBed.createComponent(RatingIndicatorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
