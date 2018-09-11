import { createStore, applyMiddleware, compose, GenericStoreEnhancer } from 'redux';
import { reducer } from './reducer';
import { IAppState } from './IAppState';

/* Redux dev tools extension */
declare var window:any;   //going to get extension from window (with key devToolsExtension)

//get devTools middleware onto a variable
//if find extension call it, otherwise provide fn that does nothing
const devToolsExtension: GenericStoreEnhancer = (window.devToolsExtension)
  ? window.devToolsExtension() : (f) => f;


export const store = createStore<IAppState>(reducer,
  compose(devToolsExtension) as GenericStoreEnhancer);
