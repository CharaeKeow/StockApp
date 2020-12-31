import React, { useContext, useEffect, useState } from 'react';
import { NavigationContainer } from '@react-navigation/native';

import { firebase } from '../firebase/config';
import { AuthUserContext } from '../firebase/context';
import BottomTab from './BottomTabAppStack';
import AuthStack from './AuthStack';

export default function Routes() {
  const { user, setUser } = useContext(AuthUserContext);

  useEffect(() => {
    let unsubscribeAuth;

    if (firebase.auth().currentUser !== null) {
      if (firebase.auth().currentUser.emailVerified) {
        unsubscribeAuth = firebase.auth().onAuthStateChanged(authUser => {
          /*
          if (user !== null) {
            setUser(user.uid);
            console.log(user.uid);
          }
          */
          try {
            authUser ? setUser(authUser) : setUser(null);
            console.log(user);
          } catch (error) {
            console.log(error)
          }
        });
      }
    }

    return unsubscribeAuth;
  }, []); //run only if user change or during initial load

  return (
    <NavigationContainer>
      {user ? <BottomTab /> : <AuthStack />}
    </NavigationContainer>
  )
}