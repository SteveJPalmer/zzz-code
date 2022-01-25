import { Component, Input } from '@angular/core';
import {
  AbstractControl,
  ControlValueAccessor,
  NG_VALIDATORS,
  NG_VALUE_ACCESSOR,
  ValidationErrors
} from "@angular/forms";

@Component({
  selector: 'app-custom-quantity',
  templateUrl: './reactive-forms-custom-quantity.component.html',
  styleUrls: ['./reactive-forms-custom-quantity.component.scss'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      multi:true,
      useExisting: ReactiveFormsCustomQuantityComponent
    },
    {
      provide: NG_VALIDATORS,
      multi: true,
      useExisting: ReactiveFormsCustomQuantityComponent
    }
  ]
})
export class ReactiveFormsCustomQuantityComponent implements ControlValueAccessor{
  /* comp state */
  quantity = 0;
  @Input() increment: number;

  /* ControlValueAccessor state */
  onChange = (quantity) => {};
  onTouched = () => {};
  touched = false;
  disabled = false;

  /* comp methods */
  onAdd() {
    this.markAsTouched();
    if (!this.disabled) {
      this.quantity+= this.increment;
      this.onChange(this.quantity);
    }
  }

  onRemove() {
    this.markAsTouched();
    if (!this.disabled) {
      this.quantity-= this.increment;
      this.onChange(this.quantity);
    }
  }

  /* ControlValueAccessor interface methods */
  writeValue(quantity: number) {
    this.quantity = quantity;
  }

  registerOnChange(onChange: any) {
    this.onChange = onChange;
  }

  registerOnTouched(onTouched: any) {
    this.onTouched = onTouched;
  }

  markAsTouched() {
    if (!this.touched) {
      this.onTouched();
      this.touched = true;
    }
  }

  setDisabledState(disabled: boolean) {
    this.disabled = disabled;
  }

  /* Validator interface methods */
  validate(control: AbstractControl): ValidationErrors | null {
    const quantity = control.value;
    if (quantity <= 0) {
      return {
        mustBePositive: {
          quantity
        }
      };
    } else {
      return null;
    }
  }


}
