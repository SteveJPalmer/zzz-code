import { TestBed,  ComponentFixture, async, ComponentFixtureAutoDetect } from '@angular/core/testing';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { Router } from '@angular/router';

import { DropOffComponent } from './dropoff.component';
import { AwbService } from '../Services/awb.service';
import { NgxSpinnerService } from 'ngx-spinner';
import { NavMenuService } from '../nav-menu/nav-menu.service';

import { NoopAnimationsModule } from '@angular/platform-browser/animations';

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
  let navMenuServiceSpy: jasmine.SpyObj<NavMenuService>;
  let routerSpyObj = jasmine.createSpyObj('Router', ['navigate']);

  beforeEach(async(() => {
    const awbSpyObj = jasmine.createSpyObj('AwbService', ['searchAWBs']);
    const navMenuSpyObj = jasmine.createSpyObj('NavMenuService', ['setPageTitle','mblBackImg']);

    TestBed.configureTestingModule({
      declarations: [ DropOffComponent ],
      imports: [
        NoopAnimationsModule
      ],
      providers: [
        { provide: ComponentFixtureAutoDetect, useValue: true },
        { provide: AwbService, useValue: awbSpyObj },
        { provide: NgxSpinnerService, useValue: {} },
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
    navMenuServiceSpy = TestBed.get(NavMenuService);
    routerSpy = TestBed.get(Router);
  }));

  it('should create component instance', () => {
    expect(fixture.componentInstance).toBeDefined();
  });

  it('should do something else...', () => {
    expect(true).toEqual(true);
  });

});
