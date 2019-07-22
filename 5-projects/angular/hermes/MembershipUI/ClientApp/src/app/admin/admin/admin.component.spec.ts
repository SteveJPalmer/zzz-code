import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { AdminComponent } from './admin.component';
import { NavMenuService } from '../../nav-menu/nav-menu.service';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';

describe('AdminComponent', () => {
  let component: AdminComponent;
  let fixture: ComponentFixture<AdminComponent>;

  // define jasmine spies
  let navMenuServiceSpy: jasmine.SpyObj<NavMenuService>;

  beforeEach(async(() => {
    const navMenuSpyObj = jasmine.createSpyObj('NavMenuService', ['setPageTitle', 'setupUserAccount']);

    TestBed.configureTestingModule({
      declarations: [ AdminComponent ],
      imports: [ NoopAnimationsModule ],
      schemas: [ NO_ERRORS_SCHEMA ],
      providers: [
        { provide: NavMenuService, useValue: navMenuSpyObj }
      ]
    })
    .compileComponents();

    // create jasmine spy instances
    navMenuServiceSpy = TestBed.get(NavMenuService);
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
