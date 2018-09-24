import { IAppState } from './index';
import { ADD_ORDER, RESET_ORDER } from '../components/order-search-panel/order-search.actions';
import { ADD_REQUEST, RESET_REQUEST } from '../components/request-search-panel/request-search.actions';


const order:any = {};
const request:any = {};

const initialState: IAppState = {
  order, request
};

function storeOrder(state:IAppState, action:any): IAppState {
  return { ...state, order: action.order};
};

function clearOrder(state:IAppState): IAppState {
  return { ...state, order: {} };
};

function storeRequest(state:IAppState, action:any): IAppState {
  return Object.assign({}, state, {
    request: action.request
  });
};

function clearRequest(state:IAppState): IAppState {
  return { ...state, request: {} };
};

//use default parameter to initialise initial state
export function reducer(state = initialState, action:any) {
  switch (action.type) {
    case ADD_ORDER:
      return storeOrder(state, action);
    case RESET_ORDER:
      return clearOrder(state);
    case ADD_REQUEST:
      return storeRequest(state, action);
    case RESET_REQUEST:
      return clearRequest(state);
    default:
      return state;
  }
};