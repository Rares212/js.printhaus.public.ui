import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DashboardIntroComponent } from './dashboard-intro.component';

describe('DashboardIntroComponent', () => {
  let component: DashboardIntroComponent;
  let fixture: ComponentFixture<DashboardIntroComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DashboardIntroComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DashboardIntroComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
