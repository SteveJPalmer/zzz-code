import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { FormBuilder } from '@angular/forms';                     // (if fb required)

import { forbiddenNameValidator, forbiddenNameValidator2, passwordValidator } from './username.validator';    //custom validators

@Component({
  selector: 'app-reactive-form-full',
  templateUrl: './reactive-form-full.component.html',
  styleUrls: ['./reactive-form-full.component.scss']
})
export class ReactiveFormFullComponent implements OnInit {
  title = 'baseReactiveApp';

  constructor(private formBuilder: FormBuilder) {}			  // inject FormBuilder service (if required)

  /* Create Form Model objs */
  /* ---------------------- */
  /* via native FormGroup constructor */
  loginForm = new FormGroup({  				          // pass in obj containing all the FormControl instances		Note: quite a mass of code
    //username - assert at least 3 chars & custom validator
    username: new FormControl('', [Validators.required, Validators.pattern('...+'), forbiddenNameValidator]),
    password: new FormControl(),
    otherField: new FormControl(true)   	      // can pass default value & validation rules
  }, { validators: passwordValidator } );      // FormGroup level Validator

  /* or via FormBuilder service */
  loginForm2 = this.formBuilder.group({
    //username - assert at least 3 chars & custom validator (check in correct array)
    username: ['S', [Validators.required, Validators.pattern('...+'), forbiddenNameValidator2(/admin/)] ],
    password: ['blar'],
    otherField: true
  });


  /* Manage Form Controls */
  /* -------------------- */
  ngOnInit(): void {
    /* loginForm */
    /* --------- */
    // typically, get data from XHR call - use returned JSON obj to update form
    this.loginForm.setValue({
      username: 'steve',
      password: 'blar',
      otherField: ''          /* setValue is strict about structure, must include all controls */
    });
    //can use patchValue, to just update a sub-set of form controls
    this.loginForm.patchValue({
      password: 'my NEW password'
    });
    //update a specific form control
    this.loginForm.get('username').setValue('NEW steve');   // Note: touched prop won't be set by setValue()
  }


  /* output form model */
  /* ----------------- */
  onSubmit(f: any) {
    /* debug via comp - FormGroup ref */
    console.info('>>>>debug via comp - FormGroup ref');
    console.log(this.loginForm);           // (obj) FormGroup instance
    console.log(this.loginForm.value);     // (obj) contains values of all forms control values
    console.log(this.loginForm.valid);     // (boolean)

    /* or via passed temp ref var - FormGroupDirective ref */
    console.info('>>>>debug via passed temp ref var - FormGroupDirective ref');
    console.log(f);                  // (obj) FormGroupDirective instance
    console.log(f.value);						 // (obj) (duplicated prop) - contains values of all forms control values (JSON.stringify for readability)
    console.log(f.valid); 					 // (true/false) (duplicated prop) form status
    //
    console.log(f.form);	 	 				 // (obj) FormGroup instance & nested FormControl instances
    console.log(f.form.value);			 // (obj) contains values of all forms control values (JSON.stringify for readability)
    console.log(f.form.valid);	     // (true/false) FormGroup valid prop (ie form level)
    console.log(f.form.controls);    // (obj) nested FormControl instances (each of type FormControl)
  }

  resetForm() {
    this.loginForm.reset();
  }

  /* niceu technique - se getter to returns the FormControl */
  get username() {
    return this.loginForm.get('username');
  }

}

