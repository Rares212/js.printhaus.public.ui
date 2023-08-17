import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MaterialTagComponent } from './material-tag.component';

describe('MaterialTagComponent', () => {
  let component: MaterialTagComponent;
  let fixture: ComponentFixture<MaterialTagComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [MaterialTagComponent]
    });
    fixture = TestBed.createComponent(MaterialTagComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
