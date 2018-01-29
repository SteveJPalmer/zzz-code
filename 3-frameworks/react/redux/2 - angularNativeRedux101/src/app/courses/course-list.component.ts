import { Component, OnInit } from '@angular/core';

import { store } from '../store/store';
import { ICourse } from './ICourse';

@Component({
  selector: 'course-list',
  templateUrl: './course-list.component.html'
})
export class CourseListComponent implements OnInit {

  title = 'app works!';
  courses: ICourse[];    //array of ICourse Interface (same as IAppState uses)

  /* populate from local component */
  public coursesOriginal = [
    {
      id: 1,
      name: 'Original - Learning Flux',
      topic: 'Flux',
    },
    {
      id: 2,
      name: 'Original - Learning Angular2',
      topic: 'Angular2',
    },
    {
      id: 3,
      name: 'Original - Using Redux with Angular2',
      topic: 'Angular2',
    }
  ];


  /* add action event for a new Course*/
  addCourse(){
    store.dispatch( {
      type: 'ADD_COURSE',
      course: {
        id: 4,
        name: 'My new course',
        topic: 'lots of new stuff'
      }
    });
  };


  /* populate from Redux store */
  updateFromState() {
    const allState = store.getState();
    this.courses = allState.courses;
  };


  ngOnInit() {
    console.log('>> course-list - ngOnInit');

    //need bind to initial state
    this.updateFromState();            //runs once, sorts out initial state
      //  - or if set state empty initially, can call a getCourses() method to
      //  - retrieve data, then dispatch action 'GET_COURSES_SUCCESS' (with initial courses attached)

    //need bind to store - so comp gets notified of store state changes
    store.subscribe( () => {    //when state changes
      this.updateFromState();
    });

  };
}
