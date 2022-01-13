/* basic Redux example */

const { createStore, applyMiddleware }  = require('redux');    //pull in redux createStore fn

/* --------- optionally ADD MIDDLEWARE -------------------  */

//log out messages each time reducer is fired
const logger = store => next => action => {
  console.log('dispatching', action);                   //log action
  let result = next(action);                            //apply the action
  console.log('state after action', store.getState());  //log resulting state
  return result;                                        //returns result for next middleware in chain
}

/* --------- INITIAL STATE -------------------  */

/* initial state obj */
var defaultState = {
  courses: [
    {
      name: 'Learning Flux',
      topic: 'Flux',
    },
    {
      name: 'Learning Angular2',
      topic: 'Angular2',
    },
    {
      name: 'Using Redux with Angular2',
      topic: 'Angular2',
    }
  ]
};

/* --------- STORE -------------------  */


/* create our Redux store */
//const store = createStore(reducer, defaultState);   //first param is reducer fn, 2nd is the initial state
const store = createStore(reducer, defaultState, applyMiddleware(logger));   //enhance with some middleware


/* create the Reducer for the store  - calculates updated state  - all actions will be fed through it */
// function reducer(state, action) {
//   return state;
// }
function reducer(state, action) {
  switch (action.type) {
    case 'ADD_COURSE':
      return Object.assign({}, state, {
        courses: [...state.courses, action.course]
      });
    default:
      return state;
  }
}


/* --------- VIEWS -------------------  */

/* our basic view engine */
//takes fn arg & calls it with the state
function addView(viewFunc) {
  viewFunc(defaultState);

  //wire up views - views need subscribe to store to receive state changes
  store.subscribe(() => {
    //just call the viewFunction again
    viewFunc(store.getState())
  });
};


/* create our first view  - reports number of courses */
//Note: passed fn has state parameter, as addView passes the default state as arg when calls the fn..
addView((state) => {
  console.log(`There are ${state.courses.length} courses in the library`);
});

/* create our second view  - reports latest course */
addView((state) => {
  console.log(`The latest course in the library: ${state.courses[state.courses.length -1].name}`);
});

/* Note: we are not reliant on any global variables for state, functions get provided with state */


/* --------- ACTION -------------------  */

//if change state manually is not reflected in out views...  need to change via Redux
// defaultState.courses.push(
//   {
//     name: 'My new course2',
//     topic: 'new stuff2'
//   }
// );

/* dispatch an action  - will run through Stores' reducer */
store.dispatch({
  type: 'ADD_COURSE',
  course: {
    name: 'My new course2',
    topic: 'new stuff2'
  }
});

