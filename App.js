/* eslint-disable react/display-name */
import React, { useEffect } from 'react';
import { MenuProvider } from 'react-native-popup-menu';
import TimerErrorHandler from './src/utils/TimerErrorHandler';

import Providers from './src/navigation';
import { firebase } from './src/firebase/config'

TimerErrorHandler();

export default function App() {
  useEffect(() => {
    const user = firebase.auth().currentUser;

    if (user !== null) {
      console.log("User: " + user.uid);
    }
  })

  return (
    <MenuProvider>
      <Providers />
    </MenuProvider>
  );
}
