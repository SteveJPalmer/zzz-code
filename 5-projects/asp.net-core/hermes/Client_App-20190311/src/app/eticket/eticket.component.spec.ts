import { TestBed,  ComponentFixture, async, ComponentFixtureAutoDetect } from '@angular/core/testing';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { EticketComponent } from './eticket.component';
import { VctService } from '../Services/vct.service';
import { NavMenuService } from '../nav-menu/nav-menu.service';
import { VctStatusDirective, VctStatusPipe } from '../shared';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';

describe('ETicketComponent', () => {
  let fixture: ComponentFixture<EticketComponent>;
  // comp:   DropOffComponent;
  // input:  DebugElement,
  // button: DebugElement;

  // define jasmine spies
  //let vctServiceSpy: jasmine.SpyObj<VctService>;
  let MockVCTService;
  let navMenuServiceSpy: jasmine.SpyObj<NavMenuService>;

  beforeEach(async(() => {
    //const vctSpyObj = jasmine.createSpyObj('VctService', ['searchVCTs']);
    const navMenuSpyObj = jasmine.createSpyObj('NavMenuService', ['setPageTitle','mblBackImg']);

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

    TestBed.configureTestingModule({
      declarations: [
        EticketComponent,
        VctStatusPipe,
        VctStatusDirective
      ],
      imports: [
        NoopAnimationsModule
      ],
      providers: [
        { provide: ComponentFixtureAutoDetect, useValue: true },
        //{ provide: VctService, useValue: vctSpyObj },
        { provide: VctService, useValue: MockVCTService },
        { provide: NavMenuService, useValue: navMenuSpyObj }
      ],
      schemas: [ NO_ERRORS_SCHEMA ]
    })
      .compileComponents().then(() => {
      fixture = TestBed.createComponent(EticketComponent);
    });

    // create jasmine spy instances
    //vctServiceSpy = TestBed.get(VctService);
    navMenuServiceSpy = TestBed.get(NavMenuService);
  }));

  it('should create component instance', () => {
    expect(fixture.componentInstance).toBeDefined();
  });

  it('should do something else...', () => {
    expect(true).toEqual(true);
  });

});

