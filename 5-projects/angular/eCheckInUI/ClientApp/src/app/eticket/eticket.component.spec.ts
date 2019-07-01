import { TestBed,  ComponentFixture, async, ComponentFixtureAutoDetect } from '@angular/core/testing';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { EticketComponent } from './eticket.component';
import { VctService } from '../Services';
import { NavMenuService } from '../nav-menu/nav-menu.service';
import { VctStatusDirective, VctStatusPipe, RejectReasonPipe } from '../shared';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { NgxSpinnerService } from 'ngx-spinner';
import { OrgsService } from '../Services';
import { HlPaginationService } from '../common';

describe('ETicketComponent', () => {
  let fixture: ComponentFixture<EticketComponent>;
  // comp:   DropOffComponent;
  // input:  DebugElement,
  // button: DebugElement;

  // define jasmine spies
  let MockVCTService;
  let MockOrgsService;
  let navMenuServiceSpy: jasmine.SpyObj<NavMenuService>;
  let spinnerServiceSpy: jasmine.SpyObj<NgxSpinnerService>;

  beforeEach(async(() => {
    const navMenuSpyObj = jasmine.createSpyObj('NavMenuService', ['setPageTitle','mblBackImg']);
    const spinnerSpyObj = jasmine.createSpyObj('NgxSpinnerService', ['show','hide']);

    MockVCTService = {
      data: ['test data'],
      error: 'test error',
      searchVCTs() {
        return this;
      },
      then(callback) {
        if (!this.error) {
          callback(this.data);
        }
        return this;
      }
    };

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

    TestBed.configureTestingModule({
      declarations: [
        EticketComponent,
        VctStatusPipe,
        VctStatusDirective,
        RejectReasonPipe
      ],
      schemas: [ NO_ERRORS_SCHEMA ],
      imports: [
        NoopAnimationsModule
      ],
      providers: [
        { provide: ComponentFixtureAutoDetect, useValue: true },
        { provide: VctService, useValue: MockVCTService },
        { provide: NavMenuService, useValue: navMenuSpyObj },
        { provide: NgxSpinnerService, useValue: spinnerSpyObj },
        { provide: OrgsService, useValue: MockOrgsService },
        HlPaginationService
      ]
    })
      .compileComponents().then(() => {
      fixture = TestBed.createComponent(EticketComponent);
    });

    // create jasmine spy instances
    navMenuServiceSpy = TestBed.get(NavMenuService);
    spinnerServiceSpy = TestBed.get(NgxSpinnerService);
  }));

  it('should create component instance', () => {
    expect(fixture.componentInstance).toBeDefined();
  });

  it('should do something else...', () => {
    expect(true).toEqual(true);
  });

});

