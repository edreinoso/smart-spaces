// Here is where the redux set up really happen. We initialize the store at this layer

import React from 'react';
import { createStore, applyMiddleware } from 'redux';
import reduxThunk from 'redux-thunk';
// import reduxPromise from 'redux-promise';
import { Provider } from 'react-redux';
import reducers from './store/reducers/index.js'; // maybe this has to be ./store or ./store/

export default ({ children, initialState = {} }) => {
  const store = createStore(
    reducers,
    initialState,
    applyMiddleware(reduxThunk)
    // applyMiddleware(reduxPromise, reduxThunk)
  );
  return (
    <Provider store={store}>
      {children}
    </Provider>
  )
}