import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PriceIndicatorComponent } from './price-indicator.component';

describe('PriceIndicatorComponent', () => {
  let component: PriceIndicatorComponent;
  let fixture: ComponentFixture<PriceIndicatorComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [PriceIndicatorComponent]
    });
    fixture = TestBed.createComponent(PriceIndicatorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
