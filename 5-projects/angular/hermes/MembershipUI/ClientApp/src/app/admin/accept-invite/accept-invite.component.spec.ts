import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { Router } from '@angular/router';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { AcceptInviteComponent } from './accept-invite.component';
import { NgxSpinnerService } from 'ngx-spinner';
import { OrgsService } from '../../Services';

////// Test Host Component //////
import { Component } from '@angular/core';
@Component({
  template: `
    <admin-accept-invite
      [invite]="pendingInvite"
      (accepted)="onAccepted($event)">
    </admin-accept-invite>`
})
class TestHostComponent {
  pendingInvite: any = {};
  isInvite: boolean;
  onAccepted( event: string) { this.isInvite = true; }
};
/////////////////////////////////

describe('AcceptInviteComponent', () => {
  let component: AcceptInviteComponent;
  let fixture: ComponentFixture<AcceptInviteComponent>;
  let routerSpy: Router;
  let MockOrgsService;

  // define jasmine spies
  let routerSpyObj = jasmine.createSpyObj('Router', ['navigate']);

  beforeEach(async(() => {
    const spinnerSpyObj = jasmine.createSpyObj('NgxSpinnerService', ['show', 'hide']);

    MockOrgsService = {
      data: {},
      error: 'test error',
      acceptInvite() {
        return this;
      },
      rejectInvite() {
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
      declarations: [ AcceptInviteComponent, TestHostComponent ],
      imports: [ NoopAnimationsModule ],
      schemas: [ NO_ERRORS_SCHEMA ],
      providers: [
        { provide: Router, useValue: routerSpyObj },
        { provide: NgxSpinnerService, useValue: spinnerSpyObj },
        { provide: OrgsService, useValue: MockOrgsService }
      ]
    })
    .compileComponents();

    // create jasmine spy instances
    routerSpy = TestBed.get(Router);
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TestHostComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
