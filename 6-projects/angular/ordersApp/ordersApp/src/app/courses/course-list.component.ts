import { Component, OnInit } from '@angular/core';

//interfaces
import { ICourse } from './ICourse';

//components
import { CoursesService } from './courses.service';

//native Redux solution
import { store, IAppState } from '../store/index';

//Angular ng2-redux solution (ng2 bindings)
import { NgRedux, select } from '@angular-redux/store';



@Component({
  selector: 'course-list',
  templateUrl: './course-list.component.html',
  styleUrls: ['./course-list.css'],
  providers: [ CoursesService ]
})
export class CourseListComponent implements OnInit {

  constructor(private coursesService: CoursesService) { }

  /* comp state */
  title = 'app works!';
  courses: ICourse[];    //array of ICourse Interface


  /* comp methods */
  addCourse(){
    store.dispatch( {
      type: 'ADD_COURSE',
      course: {
        id: 4,
        name: 'Please dont break me.. test me!',
        topic: 'study...'
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
    // this.getCourses();
    this.coursesService.getCourses();

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
