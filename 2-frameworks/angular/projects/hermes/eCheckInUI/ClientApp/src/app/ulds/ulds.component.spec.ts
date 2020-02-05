import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { UldsComponent } from './ulds.component';

describe('UldsComponent', () => {
  let component: UldsComponent;
  let fixture: ComponentFixture<UldsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UldsComponent ],
      imports: [ FormsModule ],
      schemas: [ NO_ERRORS_SCHEMA ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UldsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
