import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HausImageComponent } from './haus-image.component';

describe('HausImageComponent', () => {
  let component: HausImageComponent;
  let fixture: ComponentFixture<HausImageComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [HausImageComponent]
    });
    fixture = TestBed.createComponent(HausImageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
