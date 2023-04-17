import { TestBed } from '@angular/core/testing';

import { MeshStore } from './mesh.store';

describe('MeshService', () => {
  let service: MeshStore;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(MeshStore);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
