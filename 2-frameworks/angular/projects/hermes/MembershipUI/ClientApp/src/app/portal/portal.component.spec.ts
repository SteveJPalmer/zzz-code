import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PortalComponent } from './portal.component';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { NavMenuService } from '../nav-menu/nav-menu.service';
import { NgxSpinnerService } from 'ngx-spinner';

describe('PortalComponent', () => {
  let component: PortalComponent;
  let fixture: ComponentFixture<PortalComponent>;

  // define jasmine spies
  let navMenuServiceSpy: jasmine.SpyObj<NavMenuService>;
  let spinnerServiceSpy: jasmine.SpyObj<NgxSpinnerService>;

  beforeEach(async(() => {
    const navMenuSpyObj = jasmine.createSpyObj('NavMenuService', ['setPageTitle', 'setupUserAccount', 'isSuperUser']);
    const spinnerSpyObj = jasmine.createSpyObj('NgxSpinnerService', ['show', 'hide']);

    TestBed.configureTestingModule({
      declarations: [ PortalComponent ],
      imports: [ NoopAnimationsModule ],
      providers: [
        { provide: NavMenuService, useValue: navMenuSpyObj },
        { provide: NgxSpinnerService, useValue: spinnerSpyObj },
      ]
    })
    .compileComponents();

    // create jasmine spy instances
    navMenuServiceSpy = TestBed.get(NavMenuService);
    spinnerServiceSpy = TestBed.get(NgxSpinnerService);
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PortalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
