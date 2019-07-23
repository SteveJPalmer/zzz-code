import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { Router, ActivatedRoute } from '@angular/router';
import { ActivatedRouteStub } from './activated-route-stub';
import { FormsModule } from '@angular/forms';
import { SearchUsersComponent } from './search-users.component';
import { NavMenuService } from '../../nav-menu/nav-menu.service';
import { OrgsService } from '../../Services';
import { NgxSpinnerService } from 'ngx-spinner';

describe('SearchUsersComponent', () => {
  let component: SearchUsersComponent;
  let fixture: ComponentFixture<SearchUsersComponent>;
  let routerSpy: Router;
  let activatedRoute: ActivatedRouteStub;
  let MockOrgsService;

  // define jasmine spies
  let navMenuServiceSpy: jasmine.SpyObj<NavMenuService>;
  let routerSpyObj = jasmine.createSpyObj('Router', ['navigate']);

  beforeEach(async(() => {
    const navMenuSpyObj = jasmine.createSpyObj('NavMenuService', ['setPageTitle', 'setupUserAccount']);
    const spinnerSpyObj = jasmine.createSpyObj('NgxSpinnerService', ['show', 'hide']);
    activatedRoute = new ActivatedRouteStub();
    MockOrgsService = {
      data: {},
      error: 'test error',
      searchUsers() {
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
      declarations: [ SearchUsersComponent ],
      imports: [
        NoopAnimationsModule,
        FormsModule
      ],
      providers: [
        { provide: Router, useValue: routerSpyObj },
        { provide: ActivatedRoute, useValue: activatedRoute },
        { provide: NavMenuService, useValue: navMenuSpyObj },
        { provide: NgxSpinnerService, useValue: spinnerSpyObj },
        { provide: OrgsService, useValue: MockOrgsService }
      ],
      schemas: [ NO_ERRORS_SCHEMA ]
    })
    .compileComponents();

    // create jasmine spy instances
    routerSpy = TestBed.get(Router);
    navMenuServiceSpy = TestBed.get(NavMenuService);
  }));

  beforeEach(() => {
    activatedRoute.setParamMap({ orgType: 2 });
    fixture = TestBed.createComponent(SearchUsersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should have orgType === 2', () => {
    expect(component.orgType).toBe(2);
  });
});
