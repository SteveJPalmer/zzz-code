/* Custom Validator - checks username field content */
/* ------------------------------------------------ */
import { AbstractControl } from '@angular/forms';                  //if required
import { ValidatorFn } from '@angular/forms';                      //if required
import { FormGroup, ValidationErrors } from '@angular/forms';      //if required

/* Basic fn receives control & returns either null (if passes) or key:value error obj (if fails) */
export function forbiddenNameValidator(control: AbstractControl): {[key: string]: any} | null {
  //check text is not 'admin'
  const forbidden = /admin/.test(control.value);                          //regexp returns true(if match) else false
  return forbidden ? {'forbiddenName': {value: control.value}} : null;    //if true, return error obj, else null
}

/* Factory fn - which has string as param & returns the validator fn itself */
//now pass in regexp to test against & return the validator fn
export function forbiddenNameValidator2(nameRe: RegExp): ValidatorFn {
  return (control: AbstractControl): {[key: string]: any} | null => {			 // actual validator fn is same
    const forbidden = nameRe.test(control.value);
    return forbidden ? {'forbiddenName2': {value: control.value}} : null;
  };
}


/* Form level Validator */
/* -------------------- */
/* password can't match username */
export const passwordValidator: ValidatorFn = (control: FormGroup): ValidationErrors | null => {
  /* control is now FormGroup, so can access all FormControl’s */
  const username = control.get('username');
  const password = control.get('password');
  return username && password && username.value === password.value ? { 'passwordCheck': true } : null;
};
