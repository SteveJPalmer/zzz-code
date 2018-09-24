import { FormsModule }   from '@angular/forms';
import { ComponentFixture, TestBed, async } from '@angular/core/testing';
import { By }           from '@angular/platform-browser';
import { DebugElement } from '@angular/core';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { OrderSearchPanelComponent } from './order-search-panel.component';
import { ClPanelComponent } from '../cl-panel/cl-panel.component';
// import { OrderSearchService } from './order-search.service';
import { OrdersService as OrderSearchService } from '../../services/orders/api/api';
import { OrderSearchActions } from './order-search.actions';
import Any = jasmine.Any;
import { Http } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/of';
import { NgRedux } from '@angular-redux/store';

describe('orderSearchComponent - test env', () => {
  it('true is true', () => expect(true).toBe(true));
});

describe('orderSearchComponent', function () {
  let fixture: ComponentFixture<OrderSearchPanelComponent>,
      comp:    OrderSearchPanelComponent,
      input:   DebugElement,
      button:  DebugElement;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [FormsModule],
      declarations: [ OrderSearchPanelComponent],
      schemas: [ NO_ERRORS_SCHEMA ],
      providers: [
        { provide: Http, useValue: {} },
        // { provide: OrderSearchService,
        //   useValue: { getOrderByOrderNumber: Observable.of('base data') }},
        { provide: OrderSearchService,
          useValue: { apiOrdersGet: Observable.of('base data') }},
        { provide: NgRedux, useValue: {}},
        { provide: OrderSearchActions, useValue: {}},
      ]
    })
      .compileComponents().then( ()=> {
         fixture = TestBed.createComponent(OrderSearchPanelComponent);
    });
  }));


  it('should create component', () => {
    expect(fixture.componentInstance).toBeDefined()
  });

  it('should default input order number to empty', async(() => {
    fixture.detectChanges();
    fixture.whenStable().then(() => {
      input = fixture.debugElement.query(By.css('input'));
      let el = input.nativeElement;
      //--
      expect(el.value).toBe('');
    });
  }));

  it('should store provided order number in component state', async(() => {
    fixture.detectChanges();
    fixture.whenStable().then(() => {
      input = fixture.debugElement.query(By.css('input'));
      let el = input.nativeElement;
      //--
      el.value = '97531';
      el.dispatchEvent(new Event('input'));
      expect(fixture.componentInstance.search.orderNumber).toBe('97531');
    });
  }));

  it('should call resetOrderSearch method on cancel button event', async(() => {
    spyOn(fixture.componentInstance,'resetOrderSearch').and.callThrough();
    //
    fixture.detectChanges();
    fixture.whenStable().then(() => {
      button = fixture.debugElement.query(By.css('#resetOrder'));
      button.triggerEventHandler('click',null);
      expect(fixture.componentInstance.resetOrderSearch).toHaveBeenCalledTimes(1);
    });
  }));

  it('should clear order number value on cancel button event', async(() => {
    fixture.detectChanges();
    fixture.whenStable().then(() => {
      input = fixture.debugElement.query(By.css('input'));
      let el = input.nativeElement;
      el.value = '12345';
      el.dispatchEvent(new Event('input'));
      expect(fixture.componentInstance.search.orderNumber).toBe('12345');
      //
      fixture.detectChanges();
      fixture.whenStable().then(() => {
        button = fixture.debugElement.query(By.css('#resetOrder'));
        // console.info('>>>>Test variables - comp.search.orderNumber: ' + fixture.componentInstance.search.orderNumber);
        button.triggerEventHandler('click',null);
        expect(fixture.componentInstance.search.orderNumber).toBe('');
      });
    });
  }));

  it('should hide order search panel & reset search result data on cancel button event', async(() => {
    comp = fixture.componentInstance;
    comp.isData = true;
    comp.order = { "orderNumber": "777" };
    fixture.detectChanges();
    fixture.whenStable().then(() => {
      button = fixture.debugElement.query(By.css('#resetOrder'));
      // console.info('>>>>Test variables - comp.isData: ' + comp.isData);
      // console.info('>>>>Test variables - comp.order: ' + JSON.stringify(comp.order,null,2));
      button.triggerEventHandler('click',null);
      expect(comp.isData).toBeFalsy();
      expect(comp.order).toEqual({});
    });
  }));

  it('should call findOrderByOrderNumber method on search button event', async(() => {
    spyOn(fixture.componentInstance,'findOrderByOrderNumber').and.callThrough();
    //
    fixture.detectChanges();
    fixture.whenStable().then(() => {
      button = fixture.debugElement.query(By.css('#findOrder'));
      button.triggerEventHandler('click',null);
      expect(fixture.componentInstance.findOrderByOrderNumber).toHaveBeenCalled();
    });
  }));



  it('should set search result data, if order found for search', async(() => {
    // spyOn(OrderSearchService.prototype, 'getOrderByOrderNumber')
    spyOn(OrderSearchService.prototype, 'apiOrdersGet')
      .and.callFake(()=>
        // {return Observable.of("mock order data");
        {return Observable.of("  [{\n" +
          "    \"orderNumber\": \"501\",\n" +
          "    \"orderables\": [\n" +
          "    {\n" +
          "      \"testCode\": \"code1\"\n" +
          "    }\n" +
          "  ]\n" +
          "  }]\n");
      });
    //
    fixture.detectChanges();
    fixture.whenStable().then(() => {
      button = fixture.debugElement.query(By.css('#findOrder'));
      button.triggerEventHandler('click',null);
      // expect(OrderSearchService.prototype.getOrderByOrderNumber).toHaveBeenCalled();
      expect(OrderSearchService.prototype.apiOrdersGet).toHaveBeenCalled();
      //
      fixture.detectChanges();
      fixture.whenStable().then(() => {
        // console.info('>>test - order: ' + JSON.stringify(fixture.componentInstance.order, null,2));
        expect(fixture.componentInstance.order).not.toEqual({});
        expect(fixture.componentInstance.searchResults).toMatch(/"orderNumber": "501"/);
      });
    });
  }));

});


