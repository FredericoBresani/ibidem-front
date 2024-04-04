import { TestBed } from '@angular/core/testing';

import { DestaqueService } from './destaque.service';

describe('DestaqueService', () => {
  let service: DestaqueService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DestaqueService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
