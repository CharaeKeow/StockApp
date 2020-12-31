/* eslint-disable react/display-name */
import React, { useEffect, useContext } from 'react';
import { Text, View } from 'react-native';
import { MenuProvider } from 'react-native-popup-menu';

import TimerErrorHandler from './src/utils/TimerErrorHandler';
import Providers from './src/navigation';

TimerErrorHandler();

function SplashScreen() {
  return (
    <View>
      <Text>Loading...</Text>
    </View>
  );
}


export default function App() {


  /*
  firebase.auth().signOut().then(function () {
    // Sign-out successful.
  }).catch(function (error) {
    console.log(error);
  });
  */


  return (
    <MenuProvider>
      <Providers />
    </MenuProvider>
  );
}
