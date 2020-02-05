import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UserDetailsComponent } from './user-details.component';
import { NgxSpinnerService } from 'ngx-spinner';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';

describe('UserDetailsComponent', () => {
  let component: UserDetailsComponent;
  let fixture: ComponentFixture<UserDetailsComponent>;

  // define jasmine spies
  let spinnerServiceSpy: jasmine.SpyObj<NgxSpinnerService>;

  beforeEach(async(() => {
    const spinnerSpyObj = jasmine.createSpyObj('NgxSpinnerService', ['show', 'hide']);

    TestBed.configureTestingModule({
      declarations: [ UserDetailsComponent ],
      imports: [ NoopAnimationsModule ],
      providers: [
        { provide: NgxSpinnerService, useValue: spinnerSpyObj },
      ]
    })
    .compileComponents();
    // create jasmine spy instances
    spinnerServiceSpy = TestBed.get(NgxSpinnerService);
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UserDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
