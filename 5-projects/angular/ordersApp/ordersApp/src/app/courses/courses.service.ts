import { Injectable } from '@angular/core';

import { store } from '../store/store';
import { ICourse } from './ICourse';

@Injectable()
export class CoursesService {

  getCourses() {
    let coursesFetchedData: ICourse[] = [
      {
        id: 1,
        name: 'Facebook - Flux Architecture solution',
        topic: 'Flux',
      },
      {
        id: 2,
        name: 'pluralsight - React & Flux for Angular developers ',
        topic: 'Angular2',
      },
      {
        id: 3,
        name: 'pluralsight - Using Redux to Manage State in Angular2',
        topic: 'ng2-redux',
      }
    ];

    store.dispatch({
      type: 'GET_COURSES_SUCCESS',
      coursesFetchedData
    });

  };


}

