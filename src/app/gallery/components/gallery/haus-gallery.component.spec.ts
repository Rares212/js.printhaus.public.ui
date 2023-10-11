import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HausGalleryComponent } from './haus-gallery.component';

describe('GalleryComponent', () => {
  let component: HausGalleryComponent;
  let fixture: ComponentFixture<HausGalleryComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [HausGalleryComponent]
    });
    fixture = TestBed.createComponent(HausGalleryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
