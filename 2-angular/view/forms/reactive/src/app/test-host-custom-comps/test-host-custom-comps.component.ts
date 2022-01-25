import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormGroupDirective, Validators } from '@angular/forms';

@Component({
  selector: 'app-test-host-custom-comps',
  templateUrl: './test-host-custom-comps.component.html',
  styleUrls: ['./test-host-custom-comps.component.scss']
})
export class TestHostCustomCompsComponent implements OnInit {

  hostForm: FormGroup;

  constructor(private formBuilder: FormBuilder) {}

  ngOnInit(): void {
    /* create form model with custom comps */
    this.hostForm = this.formBuilder.group({
      designer: 'S',
      comments: 'blar',
      totalQuantity: [10, [Validators.required, Validators.max(100)]]
    });
  }

  /* getters - ** nice technique - getter to returns the FormControl */
  get designer() {
    return this.hostForm.get('designer');
  }

  get totalQuantity() {
    return this.hostForm.get('totalQuantity');
  }

  /* methods */
  setTotalQuantity() {
    this.totalQuantity.setValue(50);
  }

  onSubmit(f: FormGroupDirective) {
    /* debug via comp FormGroup ref */
    console.log(this.hostForm);          // (obj) FormGroup instance
    console.log(this.hostForm.value);    // (obj) contains values of all forms control values
    console.log(this.hostForm.valid);    // (boolean)
    /* or via passed temp ref var - FormGroupDirective ref */
    console.log(f);                  // (obj) FormGroupDirective instance
  }
}
