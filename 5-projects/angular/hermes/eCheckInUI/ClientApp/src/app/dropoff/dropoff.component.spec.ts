import { TestBed,  ComponentFixture, async, ComponentFixtureAutoDetect } from '@angular/core/testing';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { Router } from '@angular/router';

import { DropOffComponent } from './dropoff.component';
import { AwbService } from '../Services/awb.service';
import { NgxSpinnerService } from 'ngx-spinner';
import { NavMenuService } from '../nav-menu/nav-menu.service';
import { FormsModule } from '@angular/forms';

import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { OrgsService, UldService, VctService } from '../Services';

// base - check unit test  env
describe('Test Framework', () => {
  it('running ok', () => expect(true).toBe(true));
});

describe('DropOffComponent', () => {
  let fixture: ComponentFixture<DropOffComponent>;
  // comp:   DropOffComponent;
  // input:  DebugElement,
  // button: DebugElement;
  let routerSpy: Router;

  // define jasmine spies
  let awbServiceSpy: jasmine.SpyObj<AwbService>;
  let uldServiceSpy: jasmine.SpyObj<UldService>;
  let MockVCTService;
  let MockOrgsService;
  let navMenuServiceSpy: jasmine.SpyObj<NavMenuService>;
  let spinnerServiceSpy: jasmine.SpyObj<NgxSpinnerService>;
  let routerSpyObj = jasmine.createSpyObj('Router', ['navigate']);


  beforeEach(async(() => {
    const awbSpyObj = jasmine.createSpyObj('AwbService', ['searchDropoffAWBs']);
    const navMenuSpyObj = jasmine.createSpyObj('NavMenuService', ['setPageTitle', 'mblBackImg']);
    const spinnerSpyObj = jasmine.createSpyObj('NgxSpinnerService', ['show', 'hide']);
    const uldSpyObj = jasmine.createSpyObj('UldService',
                                           ['extractULDs', 'createReqULD', 'updateReqULD',
                                                         'searchReqULD', 'initializeULDCargoInfo', 'getULDCargoInfo']);

    MockOrgsService = {
      data: {"dev":"DEV"},
      error: 'test error',
      getThisUserGroundHandlers() {
        return this;
      },
      then(callback) {
        if (!this.error) {
          callback(this.data);
        }
        return this;
      }
    };

    MockVCTService = {
      data: {},
      error: 'test error',
      exportVCTRequest() {
        return this;
      },
      then(callback) {
        if (!this.error) {
          callback(this.data);
        }
        return this;
      }
    };


    TestBed.configureTestingModule({
      declarations: [ DropOffComponent ],
      imports: [
        NoopAnimationsModule,
        FormsModule
      ],
      providers: [
        { provide: ComponentFixtureAutoDetect, useValue: true },
        { provide: AwbService, useValue: awbSpyObj },
        { provide: UldService, useValue: uldSpyObj },
        { provide: VctService, useValue: MockVCTService },
        { provide: OrgsService, useValue: MockOrgsService },
        { provide: NgxSpinnerService, useValue: spinnerSpyObj },
        { provide: NavMenuService, useValue: navMenuSpyObj },
        { provide: Router, useValue: routerSpyObj }
      ],
      schemas: [ NO_ERRORS_SCHEMA ]
    })
    .compileComponents().then(() => {
      fixture = TestBed.createComponent(DropOffComponent);
    });

    // create jasmine spy instances
    awbServiceSpy = TestBed.get(AwbService);
    uldServiceSpy = TestBed.get(UldService);
    navMenuServiceSpy = TestBed.get(NavMenuService);
    spinnerServiceSpy = TestBed.get(NgxSpinnerService);
    routerSpy = TestBed.get(Router);
  }));

  it('should create component instance', () => {
    expect(fixture.componentInstance).toBeDefined();
  });

  it('should do something else...', () => {
    expect(true).toEqual(true);
  });

});
