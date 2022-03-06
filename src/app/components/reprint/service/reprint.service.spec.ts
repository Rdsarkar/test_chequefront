import { TestBed } from '@angular/core/testing';

import { ReprintService } from './reprint.service';

describe('ReprintService', () => {
  let service: ReprintService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ReprintService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
