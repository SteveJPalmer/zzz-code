//ES6 imports
import { ComponentFixture, TestBed, async } from '@angular/core/testing';
import { By }              from '@angular/platform-browser';
import { DebugElement }    from '@angular/core';

import { ClPanelComponent } from './cl-panel.component';


//base test
describe('app.component suite - test env', () => {
  it('true is true', () => expect(true).toBe(true));
});

describe('clPanel component suite', () => {

  let fixture: ComponentFixture<ClPanelComponent>;
  let comp:    ClPanelComponent;
  let de:      DebugElement;
  let el:      HTMLElement;

  beforeEach(async( ()=> {
      TestBed.configureTestingModule({
        declarations: [ ClPanelComponent
                      ],
      })
        .compileComponents();
    }
  ));

  beforeEach(() => {

    fixture = TestBed.createComponent(ClPanelComponent);

    comp = fixture.componentInstance;

    de = fixture.debugElement.query(By.css('.panelTitle'));
    el = de.nativeElement;
  });


  //test cases
  it('should create component', () => expect(comp).toBeDefined() );

  it('should default to expanded', () => {
    fixture.detectChanges();
    expect(comp.isCollapsed).toBeFalsy();
    // expect(el.innerText).toMatch(/angular/i);   //alternative regexp
  });

});

