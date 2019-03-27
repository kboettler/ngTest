import { TestBed } from '@angular/core/testing';

import { UtoRequestService } from './uto-request.service';

describe('UtoRequestService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: UtoRequestService = TestBed.get(UtoRequestService);
    expect(service).toBeTruthy();
  });
});
