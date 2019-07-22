import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { Router, RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { SearchUsersComponent } from './search-users.component';

describe('SearchUsersComponent', () => {
  let component: SearchUsersComponent;
  let fixture: ComponentFixture<SearchUsersComponent>;
  let routerSpy: Router;
  // define jasmine spies
  let routerSpyObj = jasmine.createSpyObj('Router', ['navigate']);

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SearchUsersComponent ],
      imports: [
        NoopAnimationsModule,
        FormsModule,
        RouterModule.forRoot([])
      ],
      providers: [
        { provide: Router, useValue: routerSpyObj }
      ],
      schemas: [ NO_ERRORS_SCHEMA ]
    })
    .compileComponents();

    // create jasmine spy instances
    routerSpy = TestBed.get(Router);
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SearchUsersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  // it('should create', () => {
  //   expect(component).toBeTruthy();
  // });
});
