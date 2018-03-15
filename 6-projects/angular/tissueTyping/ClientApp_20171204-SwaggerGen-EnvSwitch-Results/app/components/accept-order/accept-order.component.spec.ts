/// <reference path="../../../../node_modules/@types/jasmine/index.d.ts" />

import { Component } from '@angular/core';
import { ComponentFixture, TestBed, async } from '@angular/core/testing';
import { By }           from '@angular/platform-browser';
import { DebugElement } from '@angular/core';
import { NO_ERRORS_SCHEMA } from '@angular/core';

import { Http } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/of';
import { NgReduxTestingModule, MockNgRedux } from '@angular-redux/store/testing';
import { NgRedux, select } from '@angular-redux/store';

import { AcceptOrderComponent } from './accept-order.component';
// import { AcceptOrderService } from './accept-order.service';
import { OrdersService as AcceptOrderService } from '../../services/orders/api/api';
import { OrderableDto, UpdateOrderDto } from '../../services/orders/model/models';


describe('AcceptOrderComponent', () => {

  let fixture: ComponentFixture<AcceptOrderComponent>;
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        NgReduxTestingModule,
      ],
      declarations: [
        AcceptOrderComponent
      ],
      schemas: [ NO_ERRORS_SCHEMA ],
      providers: [
        { provide: Http, useValue: {} },
        { provide: AcceptOrderService,
          useValue: { apiOrdersPut: Observable.of('base data') }},
      ]
    })
      .compileComponents();

    MockNgRedux.reset();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AcceptOrderComponent);
    fixture.detectChanges();
  })


  it('should create component', () => {
    expect(fixture.componentInstance).toBeDefined()
  });

  // xit('...trying out select decorator stub', () => {
  // const stub = MockNgRedux.getSelectorStub(selector);
  // stub.next(values);
  // stub.complete();
  // });

});
