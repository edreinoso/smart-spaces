import React from 'react';
import { useScreens } from 'react-native-screens';

import Navigators from './src/navigation/Navigators';
import ScreenNavigators from './src/navigation/ScreenNavigators';

useScreens();

export default function App() {
  return <ScreenNavigators/>
  
}
