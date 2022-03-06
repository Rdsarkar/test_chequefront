import { TestBed } from '@angular/core/testing';

import { PrintcqService } from './printcq.service';

describe('PrintcqService', () => {
  let service: PrintcqService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PrintcqService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
