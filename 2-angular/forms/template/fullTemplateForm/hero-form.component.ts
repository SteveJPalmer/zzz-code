import { Component } from '@angular/core';
import { Hero }    from './hero';

@Component({
  selector: 'hero-form',
  templateUrl: './hero-form.component.html'
})
export class HeroFormComponent {
  //typically inject data service to get/save real data
  powers = ['Really Smart', 'Super Flexible', 'Super Hot', 'Weather Changer'];

  model = new Hero(18, 'Dr IQ', this.powers[0], 'Chuck Overstreet');

  /* submit */
  submitted = false;
  onSubmit() {
    this.submitted = true;
    console.log('form submitted');
  }

  newHero() {
    this.model = new Hero(42, '', '');
  }

  // TODO: Remove this when we're done
  get diagnostic() { return JSON.stringify(this.model); }


  manualValidation(heroForm: any) {
     console.log('manual validation called... heroForm.form:');
     console.log( heroForm.form );

     //typically add condition
     if (heroForm.form.controls['copyAlterEgo'].value != 'correct') {
       heroForm.form.controls['copyAlterEgo'].setErrors({'myError': true});   // false to switch off
     }
     /* to switch off my custom Error */
     // heroForm.form.controls['copyAlterEgo'].setErrors({'myError': false});

     /* to clear all errors */
     // formData.form.controls['email'].setErrors(null);

     /* to set value */
     //heroForm.form.controls['copyAlterEgo'].setValue("");


    /* to get All Errors for Form */
    Object.keys(heroForm.form.controls).forEach(key => {        									 	// main loop through controls

      const controlErrors = heroForm.form.get(key).errors;		                      // get errors array for a control
      if (controlErrors != null) {																									// if errors…
        Object.keys(controlErrors).forEach(keyError => {														// package up each error
          //set to comp prop & console log
          console.log('Key control: ' + key + ', keyError: ' + keyError + ', err value: ', controlErrors[keyError]);
        });
      }

    });

  }

}

