import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, FormBuilder } from '@angular/forms';
import { FormGroupDirective } from '@angular/forms';      // if required - (passing temp ref var)

@Component({
  selector: 'app-reactive-form-base',
  templateUrl: './reactive-form-base.component.html',
  styleUrls: ['./reactive-form-base.component.scss']
})
export class ReactiveFormBaseComponent implements OnInit {
  title = 'baseReactiveApp';

  constructor(private formBuilder: FormBuilder) {}			  // inject FormBuilder service (if required)

  ngOnInit(): void {
  }

  /* Create Form Model objs */
  /* via FormGroup constructor */
  // /*
  loginForm = new FormGroup({
    username: new FormControl(),
    password: new FormControl(),
    otherField: new FormControl(true)
  });
  // */

  /* or via FormBuilder service */
  /*
  loginForm = this.formBuilder.group({
    username: 'S',
    password: 'blar',
    otherField: true
  });
  */

  /* getters - ** nice technique - getter to returns the FormControl */
  get username() {
    return this.loginForm.get('username');
  }

  onSubmit(f: FormGroupDirective) {
    /* debug via comp FormGroup ref */
    console.log(this.loginForm);          // (obj) FormGroup instance
    console.log(this.loginForm.value);    // (obj) contains values of all forms control values
    console.log(this.loginForm.valid);    // (boolean)

    /* or via passed temp ref var - FormGroupDirective ref */
    console.log(f);                  // (obj) FormGroupDirective instance
    console.log(f.value);						 // (obj) (duplicated prop) - contains values of all forms control values (JSON.stringify for readability)
    console.log(f.valid); 					 // (true/false) (duplicated prop) form status
    //
    console.log(f.form);	 	 				 // (obj) FormGroup instance & nested FormControl instances
    console.log(f.form.value);			 // (obj) contains values of all forms control values (JSON.stringify for readability)
    console.log(f.form.valid);	     // (true/false) FormGroup valid prop (ie form level)
    console.log(f.form.controls);    // (obj) nested FormControl instances (each of type FormControl)
  }
}
