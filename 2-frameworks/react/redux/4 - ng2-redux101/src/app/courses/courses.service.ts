import { Injectable } from '@angular/core';

//Angular native redux solution
// import { store } from '../store/store';
import { ICourse } from './ICourse';

//Angular ng2-redux solution
import { NgRedux } from '@angular-redux/store';
import { IAppState } from '../store/index';

@Injectable()
export class CoursesService {

  constructor(
    private ngRedux: NgRedux<IAppState>
  ) {}

  getCourses() {
    let coursesFetchedData: ICourse[] = [
      {
        id: 1,
        name: 'Learning Flux',
        topic: 'Flux',
      },
      {
        id: 2,
        name: 'Learning Angular2',
        topic: 'Angular2',
      },
      {
        id: 3,
        name: 'Using Redux with Angular2',
        topic: 'Angular2',
      }
    ];

    // store.dispatch({
    //   type: 'GET_COURSES_SUCCESS',
    //   coursesFetchedData
    // });

    /* note: in advanced version, this will be its own layer/injectable service - removed from Ng Data/http services */
    this.ngRedux.dispatch({
      type: 'GET_COURSES_SUCCESS',
      coursesFetchedData,
    });

  };


}

