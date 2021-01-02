/* eslint-disable react/display-name */
import React, { useEffect, useContext } from 'react';
import { Text, View } from 'react-native';
import { MenuProvider } from 'react-native-popup-menu';
import TimerErrorHandler from './src/utils/TimerErrorHandler';

import Providers from './src/navigation';
import { firebase } from './src/firebase/config'

TimerErrorHandler();

function SplashScreen() {
  return (
    <View>
      <Text>Loading...</Text>
    </View>
  );
}


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
