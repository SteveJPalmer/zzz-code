import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'baseApp';
  last: string;                                 // input field value (explicit binding)

  onSubmit(myForm: NgForm) {										// form instance passed as param
    console.log(myForm.value);									// (obj) direct access - contains values of all forms control values (JSON.stringify for readability)
    console.log(myForm.valid); 									// (true/false) direct access to form status (one of duplicated props)
    //
    console.log(myForm);
    console.log(myForm.form);	 	 							  // (obj) holds the FormGroup instance & nested FormControl instances ( type FormGroup)
    console.log(myForm.form.value);						  // (obj) contains values of all forms control values (JSON.stringify for readability)
    console.log(myForm.form.controls);	 	 	    // (obj) nested FormControl instances (each of type FormControl)
    console.log(myForm.form.valid);	            // the FormGroup instance, valid prop (form level)
    }

}
