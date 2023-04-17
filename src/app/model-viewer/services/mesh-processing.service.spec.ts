import { TestBed } from '@angular/core/testing';

import { MeshProcessingService } from './mesh-processing.service';

describe('MeshProcessingService', () => {
  let service: MeshProcessingService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(MeshProcessingService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
