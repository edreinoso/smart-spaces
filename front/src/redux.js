// Here is where the redux set up really happen. We initialize the store at this layer

import React from 'react';
// import { createStore, applyMiddleware } from 'redux';
import { createStore } from 'redux';
import { Provider } from 'react-redux';
// import reducers from './store/index.js'; // maybe this has to be ./store or ./store/

export default ({ children, initialState = {} }) => {
  const store = createStore(
    reducers,
    initialState,
    // applyMiddleware(reduxPromise, reduxThunk)
  );
  return (
    <Provider store={store}>
      { children }
    </Provider>
  )
}