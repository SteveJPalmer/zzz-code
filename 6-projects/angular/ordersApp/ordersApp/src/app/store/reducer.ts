// import { ICourse } from '../courses/ICourse';
import { IAppState } from  './IAppState';
// import {jitStatements} from "@angular/compiler/src/output/output_jit";


/* initial state obj  - of IAppState structure*/
// const initialState: IAppState = {
//   courses: [
//     {
//       id: 1,
//       name: 'Learning Flux',
//       topic: 'Flux',
//     },
//     {
//       id: 2,
//       name: 'Learning Angular2',
//       topic: 'Angular2',
//     },
//     {
//       id: 3,
//       name: 'Using Redux with Angular2',
//       topic: 'Angular2',
//     }
//   ]
// };
/* or can set initial state to empty... */
//  - a getCourses method can retrieve then dispatch action (with initial courses attached)
//  - reducer case 'REQUEST_COURSES_SUCCESS': that adds these initial courses to store
const courses = [];

const initialState: IAppState = {
  courses
};

function storeCourses(state, action): IAppState {
  return Object.assign({}, state, {
    courses: action.coursesFetchedData
  });
};


//use default parameter to initialise initial state
export function reducer(state = initialState, action:any) {
  switch (action.type) {
    case 'ADD_COURSE':
      return { ...state, courses: [ ...state.courses, action.course ] };   //recommended to split out into standalone fns
    case 'GET_COURSES_SUCCESS':
      return storeCourses(state, action);
    default:
      return state;
  }
};