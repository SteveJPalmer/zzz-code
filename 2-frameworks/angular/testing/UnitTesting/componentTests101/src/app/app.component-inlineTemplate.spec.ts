//ES6 imports
import { AppComponent } from './app.component';

import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By }              from '@angular/platform-browser';
import { DebugElement }    from '@angular/core';


//base test
describe('app.component suite - test env', () => {
  it('true is true', () => expect(true).toBe(true));
});

describe('app.component suite (inline template)', () => {

  let fixture: ComponentFixture<AppComponent>;
  let comp:    AppComponent;
  let de:      DebugElement;
  let el:      HTMLElement;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ AppComponent ], // declare the test component
    });

    fixture = TestBed.createComponent(AppComponent);

    comp = fixture.componentInstance;     // Component test instance - gives access (get & set) to all comp props

    // query for h3 elem via CSS element selector
    de = fixture.debugElement.query(By.css('h3'));   // returns: DebugElement
    el = de.nativeElement;                                  // returns: HTMLElement
  });


  //test cases
  it('should create component', () => expect(comp).toBeDefined() );


  it('should display original title', () => {
    //Ng change detection cycle
    fixture.detectChanges();                       //needed as createComponent doesn't fire change Detection cycle
    expect(el.innerText).toContain(comp.name);     //'Angular2'
    // expect(el.innerText).toMatch(/angular/i);   //alternative regexp
  });

  it('should display a different test title', () => {
    comp.name = 'Angular4';
    fixture.detectChanges();
    expect(el.innerText).toContain('Angular4');
  });


});







