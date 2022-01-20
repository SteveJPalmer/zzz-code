import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReactiveFormFullComponent } from './reactive-form-full.component';

describe('ReactiveFormFullComponent', () => {
  let component: ReactiveFormFullComponent;
  let fixture: ComponentFixture<ReactiveFormFullComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ReactiveFormFullComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ReactiveFormFullComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
