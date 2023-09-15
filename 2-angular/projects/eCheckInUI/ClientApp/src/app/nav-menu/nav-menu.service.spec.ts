import { TestBed, inject } from '@angular/core/testing';

import { NavMenuService } from './nav-menu.service';
import { NgxSpinnerService } from 'ngx-spinner';
import { OrgsService } from "../Services";

describe('NavMenuService', () => {

  // define jasmine spies
  let MockOrgsService;

  beforeEach(() => {

    MockOrgsService = {
      dataUser: {
        "name": "Steve",
        "email": "spalmer@hermes-cargo.com ",
        "defaultGroundHandler": "dev"
      },
      dataGH: {"dev":"DEV"},
      error: 'test error',
      getThisUserGroundHandlers() {
        return this;
      },
      getThisUserProfile() {
        return this;
      },
      updateThisUserDefaultGroundHandler() {
        return this;
      },
      then(callback) {
        if (!this.error) {
          callback(this.dataUser);
        }
        return this;
      }
    };

    TestBed.configureTestingModule({
      providers: [
        NavMenuService,
        { provide: OrgsService, useValue: MockOrgsService },
        { provide: NgxSpinnerService, useValue: {} }
      ]
    });
  });

  it('should be created', inject([NavMenuService], (service: NavMenuService) => {
    expect(service).toBeTruthy();
  }));
});
