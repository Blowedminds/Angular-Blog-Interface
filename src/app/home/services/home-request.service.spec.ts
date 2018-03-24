import { TestBed, inject } from '@angular/core/testing';

import { HomeRequestService } from './home-request.service';

describe('HomeRequestService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [HomeRequestService]
    });
  });

  it('should be created', inject([HomeRequestService], (service: HomeRequestService) => {
    expect(service).toBeTruthy();
  }));
});
