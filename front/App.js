import React, { Component } from 'react';
import { useScreens } from 'react-native-screens';
import Amplify from 'aws-amplify';
import config from './src/config';
import Root from './src/redux';

import ScreenNavigators from './src/navigation/ScreenNavigators';

useScreens();

Amplify.configure({
  Auth: {
    mandatorySignIn: true,
    region: config.cognito.REGION,
    userPoolId: config.cognito.USER_POOL_ID,
    identityPoolId: config.cognito.IDENTITY_POOL_ID,
    userPoolWebClientId: config.cognito.APP_CLIENT_ID
  },
  API: {
    endpoints: [
      {
        name: 'user',
        endpoint: config.apiGateway.URL,
        region: config.apiGateway.REGION,
      },
      {
        name: 'rooms',
        endpoint: config.apiGateway.URL,
        region: config.apiGateway.REGION,
      },
    ]
  }
})

export default class App extends Component {
  render() {
    return (
      <Root>
        <ScreenNavigators />
      </Root>
    )
  }
}
