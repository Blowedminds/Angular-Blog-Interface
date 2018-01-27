import { TestBed, inject } from '@angular/core/testing';

import { PublicRequestService } from './public-request.service';

describe('PublicRequestService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [PublicRequestService]
    });
  });

  it('should be created', inject([PublicRequestService], (service: PublicRequestService) => {
    expect(service).toBeTruthy();
  }));
});
