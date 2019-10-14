import React, { Component } from 'react';
import { useScreens } from 'react-native-screens';
// import Root from './src/redux';

// import { createStore, combineReducers } from 'redux';
// import { Provider } from 'react-redux';

import ScreenNavigators from './src/navigation/ScreenNavigators';

useScreens();

// Reducers should goes inside of ./src/store/index.js file
// const rootReducer = combineReducers({})

// Store should initialization goes inside of ./src/redux.js
// const store = createStore();

export default class App extends Component {
  render() {
    return (
      // <Provider store={store}>
      <ScreenNavigators />
      // </Provider>
      // <Root>
      // <ScreenNavigators />
      // </Root>
    )
  }
}
