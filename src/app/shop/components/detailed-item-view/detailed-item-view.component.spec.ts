import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DetailedItemViewComponent } from './detailed-item-view.component';

describe('DetailedItemViewComponent', () => {
  let component: DetailedItemViewComponent;
  let fixture: ComponentFixture<DetailedItemViewComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [DetailedItemViewComponent]
    });
    fixture = TestBed.createComponent(DetailedItemViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
