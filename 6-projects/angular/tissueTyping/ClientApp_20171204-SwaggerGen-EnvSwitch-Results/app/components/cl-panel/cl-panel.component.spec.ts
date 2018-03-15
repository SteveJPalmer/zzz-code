/// <reference path="../../../../node_modules/@types/jasmine/index.d.ts" />
import { Component } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ClPanelComponent } from './cl-panel.component';

describe('ClPanelComponent', () => {

    let fixture: ComponentFixture<ClPanelComponent>;

    beforeEach(() => {
        TestBed.configureTestingModule({ declarations: [ClPanelComponent] })
            .compileComponents();
    });

    beforeEach(() => {
        fixture = TestBed.createComponent(ClPanelComponent);
        fixture.detectChanges();
    })

    it('should display empty title', () => {
        fixture.detectChanges();
        expect(fixture.nativeElement.querySelector('#title').textContent).toEqual('');
    });

    it('should update to new title', () => {     /* simulates the host template passing the input 'title' */
        const title = 'New Title';
        fixture.componentInstance.title = title;
        fixture.detectChanges();
        expect(fixture.nativeElement.querySelector('#title').textContent).toEqual(title);
    });
});

@Component({                                     /* realistic binding of the input 'title' */
    template: `    
    <cl-panel title="Test">                          
      <div id="test-body" panel-body>Test</div>
    </cl-panel>`
})
class TestHostComponent {
}

describe('ClPanelComponent - hosted', () => {

    let fixture: ComponentFixture<TestHostComponent>;

    beforeEach(() => {
        TestBed.configureTestingModule({ declarations: [TestHostComponent, ClPanelComponent] })
            .compileComponents();
    });

    beforeEach(() => {
        fixture = TestBed.createComponent(TestHostComponent);
        fixture.detectChanges();
    })

    it('should display title', () => {                           /* realistic binding of the input 'title' */
        fixture.detectChanges();
        expect(fixture.nativeElement.querySelector('#title').textContent).toEqual('Test');
    });

    it('should add panel body content projection', () => {     /* realistic simulation of content projection */
        fixture.detectChanges();
        expect(fixture.nativeElement.querySelector('#test-body').textContent).toMatch(/Test/i);
    });

});
