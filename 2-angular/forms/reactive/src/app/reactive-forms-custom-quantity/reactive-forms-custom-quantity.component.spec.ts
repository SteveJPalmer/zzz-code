import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReactiveFormsCustomQuantityComponent } from './reactive-forms-custom-quantity.component';

describe('ReactiveFormsCustomQuantityComponent', () => {
  let component: ReactiveFormsCustomQuantityComponent;
  let fixture: ComponentFixture<ReactiveFormsCustomQuantityComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ReactiveFormsCustomQuantityComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ReactiveFormsCustomQuantityComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
