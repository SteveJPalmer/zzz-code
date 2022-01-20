import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReactiveFormsArrayComponent } from './reactive-forms-array.component';

describe('ReactiveFormsArrayComponent', () => {
  let component: ReactiveFormsArrayComponent;
  let fixture: ComponentFixture<ReactiveFormsArrayComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ReactiveFormsArrayComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ReactiveFormsArrayComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
