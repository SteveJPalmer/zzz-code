import { Component } from '@angular/core';

@Component({
  selector: 'my-app',
  templateUrl : 'app/app.component.html'
})
export class AppComponent {
  ///model properties
  title = 'Basic Directives';
  myHero = 'Steve';

  myTrueProp: boolean = true;
  myFalseProp: boolean = false;

  /* ngClass - adv example returns obj managing state of 3 CSS classes */
  setClasses() {
    let classes = {
      saveable: true,      //typically assign to comp prop:  saveable: this.canSave,
      modified: false,
      special: true
    };
    return classes;
  }

  /* ngStyles - adv example returns obj managing styles */
  setStyles() {
    let styles = {
      // CSS property names
      'font-style':  'myTrueProp'   ? 'italic' : 'normal',  // italic
      'font-weight': 'myFalseProp'  ? 'bold'   : 'normal',  // normal
      'font-size':   'myTrueProp'   ? '24px'   : '8px',     // 24px
    };
    return styles;
  }

  /* ngIf & ngSwitch */
  toeChoice = '';
  toeChooser(picker: HTMLFieldSetElement) {
    let choices = picker.children;
    //iterate until find checked one
    for (let i = 0; i < choices.length; i++) {
      let choice = <HTMLInputElement>choices[i];
      if (choice.checked) {
        return this.toeChoice = choice.value;
      }
    }
  }


}
