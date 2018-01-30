import { Injectable } from '@angular/core';

import { store } from '../store/store';
import { ICourse } from './ICourse';

@Injectable()
export class CoursesService {

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

    store.dispatch({
      type: 'GET_COURSES_SUCCESS',
      coursesFetchedData
    });

  };


}

