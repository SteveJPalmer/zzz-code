import { FormsModule }   from '@angular/forms';
import { RouterTestingModule } from '@angular/router/testing';
import { ComponentFixture, TestBed, async } from '@angular/core/testing';
import { By }           from '@angular/platform-browser';
import { DebugElement } from '@angular/core';
import { NO_ERRORS_SCHEMA } from '@angular/core';

import Any = jasmine.Any;
import { Http } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/of';
import { NgRedux, select } from '@angular-redux/store';
import * as _ from "lodash";

import { HlaResultsEntryComponent } from './hla-results-entry.component';
import { HlaResultsEntryActions } from './hla-results-entry.actions';


describe('HLAResultsEntryComponent - test env', () => {
  it('true is true', () => expect(true).toBe(true));
});

describe('HLAResultsEntryComponent', function () {
  let fixture: ComponentFixture<HlaResultsEntryComponent>,
      comp:    HlaResultsEntryComponent,
      input:   DebugElement,
      button:  DebugElement;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [FormsModule,
                RouterTestingModule.withRoutes([]),
      ],
      declarations: [ HlaResultsEntryComponent],
      schemas: [ NO_ERRORS_SCHEMA ],
      providers: [
        { provide: Http, useValue: {} },
        { provide: NgRedux, useValue: {}},
        { provide: HlaResultsEntryActions, useValue: {}},
      ]
    })
      .compileComponents().then( ()=> {
         fixture = TestBed.createComponent(HlaResultsEntryComponent);
    });
  }));


  it('should create component', () => {
    expect(fixture.componentInstance).toBeDefined()
  });

  
});


