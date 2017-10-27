import { Component, OnInit } from '@angular/core';

//interfaces
import { ICourse } from './ICourse';

//components
import { CoursesService } from './courses.service';

//native Redux solution
// import { store, IAppState } from '../store/index';

//Angular ng2-redux solution (ng2 bindings)
import { NgRedux, select } from '@angular-redux/store';
import { Observable } from 'rxjs/observable';
import { IAppState } from '../store/IAppState';

@Component({
  selector: 'course-list',
  templateUrl: './course-list.component.html',
  providers: [ CoursesService ]
})
export class CourseListComponent implements OnInit {

  constructor(
    private coursesService: CoursesService,
    private ngRedux: NgRedux<IAppState>             /* inject ng2-redux */
    ) {
  }

  title = 'app works!';
  courses: ICourse[];             //array of ICourse Interface (populated via native redux)

  /* populate from local component */
  public coursesOriginal: ICourse[] = [       //array of ICourse Interface (local comp state)
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


  /****************************
   * bind redux store to comp *
   ****************************/
  /* replaces the store.subscribe() & store.getState() methods */

  // a) what require from store  - b) then variable you want it on  & type
  @select('courses') coursesNgRedux$: Observable<ICourse>;

  // $ convention indicates that is var is an observable
  // TypeScript can be used to define the Observable type



  /****************************
   * addCourses event methods *
   ****************************/

  /* add native action event for a new Course*/
  // addCourse(){
  //   store.dispatch( {
  //     type: 'ADD_COURSE',
  //     course: {
  //       id: 4,
  //       name: 'My new course',
  //       topic: 'lots of new stuff'
  //     }
  //   });
  // };

  /* add ng-redux action event for a new Course*/
  addNgCourse() {
    console.log('>> addNgCourse ');
    //dispatch via ng2-redux
    this.ngRedux.dispatch({
      type: 'ADD_COURSE',
      course: {
        id: 4,
        name: 'My new course',
        topic: 'lots of new stuff'
      }
    });
  }


  /* populate from Redux store */
  // updateFromState() {
  //   const allState = store.getState();
  //   this.courses = allState.courses;
  // };


  ngOnInit() {
    console.log('>> course-list - ngOnInit');
    // this.getCourses();
    this.coursesService.getCourses();

    //need bind to initial state
/*
    this.updateFromState();            //runs once, sorts out initial state
*/
      //  - or if set state empty initially, can call a getCourses() method to
      //  - retrieve data, then dispatch action 'GET_COURSES_SUCCESS' (with initial courses attached)

    //need bind to store - so comp gets notified of store state changes
/*
    store.subscribe( () => {    //when state changes
      this.updateFromState();
    });
*/
  };
}
