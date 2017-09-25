/* provide structure of the state */

import { ICourse } from '../courses/ICourse';    //import interface for course

// interface ICourse {
//   id: number;
//   name: string;
//   topic: string;
// }

export interface IAppState {
  courses: ICourse[],
}

//
// interface IAppState2 {
//   courses: ICourse[],
// }
// export { IAppState2 };
