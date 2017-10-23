//ES6 imports
import { AppComponent } from './app.component';

import { ComponentFixture, TestBed, async } from '@angular/core/testing';   //ensure include async
import { By }           from '@angular/platform-browser';
import { DebugElement } from '@angular/core';


//base test
describe('app.component suite - test env', () => {
  it('true is true', () => expect(true).toBe(true));
});


describe('app.component suite (external template)', function () {

  let fixture: ComponentFixture<AppComponent>;
  let comp: AppComponent;
  let de: DebugElement;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AppComponent ]            // declare the test component
    })
    .compileComponents();                       // compile template and css
  }));
  
  beforeEach(() => {
  
    fixture = TestBed.createComponent(AppComponent);
    comp = fixture.componentInstance;
  
    de = fixture.debugElement.query(By.css('h3'));
  });


  //or can use .then() to wait for promise to be resolved
  // beforeEach(async(() => {
  //   TestBed.configureTestingModule({
  //     declarations: [ AppComponent ]
  //   })
  //     .compileComponents().then( ()=> {
  //        fixture = TestBed.createComponent(AppComponent);
  //        comp = fixture.componentInstance;
  //        de = fixture.debugElement.query(By.css('h3'));
  //     }
  //   );
  // }));


  //test cases
  it('should create component', () => expect(comp).toBeDefined() );

  it('should display original title', () => {
    //Ng change detection cycle
    fixture.detectChanges();                       //needed as createComponent doesn't fire change Detection cycle
    const h3 = de.nativeElement;
    expect(h3.innerText).toContain(comp.name);     //'Angular2'
    // expect(el.innerText).toMatch(/angular/i);   //alternative regexp
  });

  it('should display a different test title', () => {
    comp.name = 'Angular4';
    fixture.detectChanges();
    const h3 = de.nativeElement;
    expect(h3.innerText).toContain('Angular4');
    // expect(h1.innerText).toMatch(/angular/i,
    //   '<h1> should say something about "Angular"');
  });

});
