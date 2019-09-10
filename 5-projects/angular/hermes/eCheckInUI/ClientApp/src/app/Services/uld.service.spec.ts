import { TestBed, inject } from '@angular/core/testing';

import { UldService } from './uld.service';

describe('UldService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [UldService]
    });
  });

  it('should be created', inject([UldService], (service: UldService) => {
    expect(service).toBeTruthy();
  }));
});
