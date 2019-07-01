import { TestBed, inject } from '@angular/core/testing';
import { HlPaginationService } from '../';

describe('HlPaginationService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [HlPaginationService]
    });
  });

  it('should be created', inject([HlPaginationService], (service: HlPaginationService) => {
    expect(service).toBeTruthy();
  }));
});
