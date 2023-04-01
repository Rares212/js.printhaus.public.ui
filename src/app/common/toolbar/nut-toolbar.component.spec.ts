import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NutToolbarComponent } from './nut-toolbar.component';

describe('ToolbarComponent', () => {
  let component: NutToolbarComponent;
  let fixture: ComponentFixture<NutToolbarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NutToolbarComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(NutToolbarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
