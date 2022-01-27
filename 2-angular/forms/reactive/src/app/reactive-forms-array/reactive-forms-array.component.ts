import { Component, OnInit} from '@angular/core';
import { FormBuilder, FormArray, Validators} from "@angular/forms";

@Component({
  selector: 'app-reactive-forms-array',
  templateUrl: './reactive-forms-array.component.html',
  styleUrls: ['./reactive-forms-array.component.scss']
})
export class ReactiveFormsArrayComponent implements OnInit {

  form = this.fb.group({
      studentName: 'Steve',
      lessons: this.fb.array([])
  });

  constructor(private fb:FormBuilder) {}

  ngOnInit(): void {
    this.loadData();    // set initial dats
  }

  get studentName() {
    return this.form.controls["studentName"];
  }

  get lessons() {
    return this.form.controls["lessons"] as FormArray;
  }

  addLesson() {
    const lessonForm = this.fb.group({
      title: ['', Validators.required],
      level: ['beginner', Validators.required]
    });
    this.lessons.push(lessonForm);
  }

  deleteLesson(lessonIndex: number) {
    this.lessons.removeAt(lessonIndex);
  }

  loadData() {
    // Note: need build the form control, not just add data
    /* build model */
    this.lessons.clear();
    let lessonForm = this.fb.group({
      title: ['Initial Course 1', Validators.required],
      level: ['beginner', Validators.required]
    });
    this.lessons.push(lessonForm);
    lessonForm = this.fb.group({
      title: ['Initial Course 2', Validators.required],
      level: ['beginner', Validators.required]
    });
    this.lessons.push(lessonForm);

    /* set data */
    //this.lessons.at(0).patchValue({ title: 'changed' });
    // this.lessons.at(0).patchValue({ title: 'changed', level: 'Advanced' });
    this.lessons.patchValue([ { title: 'changed2', level: 'Advanced2' } ]);
    this.lessons.patchValue([
      { title: 'changed1', level: 'changed level 1' },
      { title: 'changed2', level: 'changed level 2' } ]);
  }

}