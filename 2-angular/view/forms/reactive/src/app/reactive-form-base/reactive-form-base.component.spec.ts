import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule } from "@angular/forms";

import { ReactiveFormBaseComponent } from './reactive-form-base.component';

describe('BaseReactiveFormComponent', () => {
  let component: ReactiveFormBaseComponent;
  let fixture: ComponentFixture<ReactiveFormBaseComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ ReactiveFormsModule ],
      declarations: [ ReactiveFormBaseComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ReactiveFormBaseComponent);
    component = fixture.componentInstance;
    // fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should update model on change in view )', () => {
    fixture.detectChanges();
    const input = fixture.nativeElement.querySelector('input[formControlName="username"]');

    input.value = 'Red';
    input.dispatchEvent(new Event('input'));
    expect(component.username.value).toEqual('Red');
  });

  it('should update view on change of model)', () => {
    fixture.detectChanges();
    const input = fixture.nativeElement.querySelector('input[formControlName="username"]');

    component.username.setValue('Blue');
    expect(input.value).toEqual('Blue');
  });

});
