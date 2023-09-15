import { TestBed, inject } from '@angular/core/testing';
import { HttpClient } from "@angular/common/http";

import { VctService } from './vct.service';
import {getBaseUrl} from "../../main";

describe('VctService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        VctService,
        { provide: HttpClient, useValue: {} },
        { provide: 'BASE_URL', useValue: "https://localhost:44392/" }
      ],
    });
  });

  it('should be created', inject([VctService], (service: VctService) => {
    expect(service).toBeTruthy();
  }));
});
