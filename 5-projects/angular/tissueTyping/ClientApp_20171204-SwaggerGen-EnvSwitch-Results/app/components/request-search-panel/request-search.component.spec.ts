import { FormsModule }   from '@angular/forms';
import { RouterModule, Router  } from '@angular/router';
import { ComponentFixture, TestBed, async } from '@angular/core/testing';
import { By }           from '@angular/platform-browser';
import { DebugElement } from '@angular/core';
import { NO_ERRORS_SCHEMA } from '@angular/core';

import Any = jasmine.Any;
import { Http } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/of';
import { NgRedux } from '@angular-redux/store';
import * as _ from "lodash";

import { RequestSearchPanelComponent } from './request-search-panel.component';
import { RequestsService } from '../../services/requests/api/api';
import { RequestSearchActions } from './request-search.actions';


describe('RequestSearchComponent - test env', () => {
  it('true is true', () => expect(true).toBe(true));
});

describe('RequestSearchComponent', function () {
  let fixture: ComponentFixture<RequestSearchPanelComponent>,
      comp:    RequestSearchPanelComponent,
      input:   DebugElement,
      button:  DebugElement;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [FormsModule,
                RouterModule
      ],
      declarations: [ RequestSearchPanelComponent],
      schemas: [ NO_ERRORS_SCHEMA ],
      providers: [
        { provide: Http, useValue: {} },
        { provide: RequestsService,
          useValue: { apiRequestsGet: Observable.of('base data') }},
        { provide: NgRedux, useValue: {}},
        { provide: RequestSearchActions, useValue: {}},
        { provide: Router, useValue: {} }
      ]
    })
      .compileComponents().then( ()=> {
         fixture = TestBed.createComponent(RequestSearchPanelComponent);
    });
  }));


  it('should create component', () => {
    expect(fixture.componentInstance).toBeDefined()
  });

  it('should default input lab number to empty', async(() => {
    fixture.detectChanges();
    fixture.whenStable().then(() => {
      input = fixture.debugElement.query(By.css('input'));
      let el = input.nativeElement;
      //--
      expect(el.value).toBe('');
    });
  }));

  it('should store entered lab number in model', async(() => {
    fixture.detectChanges();
    fixture.whenStable().then(() => {
      input = fixture.debugElement.query(By.css('input'));
      let el = input.nativeElement;
      //--
      el.value = '123a4-aa1b';
      el.dispatchEvent(new Event('input'));
      expect(fixture.componentInstance.search.labNumber).toBe('123a4-aa1b');
    });
  }));

  it('should call resetRequestSearch on cancel event', async(() => {
    spyOn(fixture.componentInstance,'resetRequestSearch').and.callThrough();
    //
    fixture.detectChanges();
    fixture.whenStable().then(() => {
      button = fixture.debugElement.query(By.css('#resetRequest'));
      button.triggerEventHandler('click',null);
      expect(fixture.componentInstance.resetRequestSearch).toHaveBeenCalledTimes(1);
    });
  }));

  it('should clear lab number value on cancel event', async(() => {
    fixture.detectChanges();
    fixture.whenStable().then(() => {
      input = fixture.debugElement.query(By.css('input'));
      let el = input.nativeElement;
      el.value = '123a4-aa1c';
      el.dispatchEvent(new Event('input'));
      expect(fixture.componentInstance.search.labNumber).toBe('123a4-aa1c');
      //
      fixture.detectChanges();
      fixture.whenStable().then(() => {
        button = fixture.debugElement.query(By.css('#resetRequest'));
        button.triggerEventHandler('click',null);
        expect(fixture.componentInstance.search.labNumber).toBe('');
        expect(fixture.componentInstance.request).toEqual({});
      });
    });
  }));

  it('should call findRequestByLabNumber method on search event', async(() => {
    spyOn(fixture.componentInstance,'findRequestByLabNumber').and.callThrough();
    //
    fixture.detectChanges();
    fixture.whenStable().then(() => {
      button = fixture.debugElement.query(By.css('#findRequest'));
      button.triggerEventHandler('click',null);
      expect(fixture.componentInstance.findRequestByLabNumber).toHaveBeenCalled();
    });
  }));


  it('should set request property, if request retrieved for search', async(() => {
    spyOn(RequestsService.prototype, 'apiRequestsGet')
      .and.callFake(()=> {
         return Observable.of({"labNumber":"abc", "orderNumber":"123"});
       });

    //
    fixture.detectChanges();
    fixture.whenStable().then(() => {
      button = fixture.debugElement.query(By.css('#findRequest'));
      button.triggerEventHandler('click',null);
      expect(RequestsService.prototype.apiRequestsGet).toHaveBeenCalled();
      //
      fixture.detectChanges();
      fixture.whenStable().then(() => {
        expect(fixture.componentInstance.request).not.toEqual({});
        expect(_.get(fixture.componentInstance.request, 'labNumber')).toEqual("abc");
      });
    });
  }));


});


