import React, { Component } from 'react';
import { useScreens } from 'react-native-screens';
// import Amplify from 'aws-amplify';
// import config from './src/config';
// import Root from './src/redux';

// import { createStore, combineReducers } from 'redux';
// import { Provider } from 'react-redux';

import ScreenNavigators from './src/navigation/ScreenNavigators';

useScreens();

// Amplify.configure({
//   Auth: {
//     mandatorySignIn: true,
//     region: config.cognito.REGION,
//     userPoolId: config.coginto.USER_POOL_ID,
//     identityPoolId: config.coginto.IDENTITY_POOL_ID,
//     userPoolWebClientId: config.coginto.APP_CLIENT_ID
//   },
//   API: {
//     endpoints: [
//       {
//         name: 'testApi',
//         endpoint: config.apiGateway.URL,
//         region: config.apiGateway.REGION,
//       }
//     ]
//   }
// })

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
