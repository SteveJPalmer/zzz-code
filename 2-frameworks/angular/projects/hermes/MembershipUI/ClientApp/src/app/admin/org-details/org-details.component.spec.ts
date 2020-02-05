import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { OrgDetailsComponent } from './org-details.component';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { NavMenuService } from '../../nav-menu/nav-menu.service'
import { NgxSpinnerService } from 'ngx-spinner';
import { OrgsService } from '../../Services';

describe('OrgDetailsComponent', () => {
  let component: OrgDetailsComponent;
  let fixture: ComponentFixture<OrgDetailsComponent>;
  let routerSpy: Router;
  let MockOrgsService;

  // define jasmine spies
  let navMenuServiceSpy: jasmine.SpyObj<NavMenuService>;
  let routerSpyObj = jasmine.createSpyObj('Router', ['navigate']);

  beforeEach(async(() => {
    const navMenuSpyObj = jasmine.createSpyObj('NavMenuService', ['setPageTitle', 'setupUserAccount']);
    const spinnerSpyObj = jasmine.createSpyObj('NgxSpinnerService', ['show', 'hide']);

    MockOrgsService = {
      data: {},
      error: 'test error',
      getUserOrgs() {
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
      declarations: [ OrgDetailsComponent ],
      imports: [
        FormsModule,
        NoopAnimationsModule
      ],
      schemas: [ NO_ERRORS_SCHEMA ],
      providers: [
        { provide: NavMenuService, useValue: navMenuSpyObj },
        { provide: Router, useValue: routerSpyObj },
        { provide: NgxSpinnerService, useValue: spinnerSpyObj },
        { provide: OrgsService, useValue: MockOrgsService }
      ]
    })
    .compileComponents();

    // create jasmine spy instances
    navMenuServiceSpy = TestBed.get(NavMenuService);
    routerSpy = TestBed.get(Router);
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OrgDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
