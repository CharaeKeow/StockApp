import React, { useContext, useEffect } from 'react';
import { NavigationContainer } from '@react-navigation/native';

import { firebase } from '../firebase/config';
import { AuthUserContext } from '../firebase/context';
import BottomTab from './BottomTabAppStack';
import AuthStack from './AuthStack';

export default function Routes() {
  const { user, setUser } = useContext(AuthUserContext);

  useEffect(() => {
    let isMounted = true;

    if (isMounted) {

      firebase.auth().onAuthStateChanged(user => {
        if (user !== null) {
          console.log('Email verified? ' + user.emailVerified)
          if (user.emailVerified) {            //firebase.auth().onAuthStateChanged(authUser => {
            let authUser = firebase.auth().currentUser;
            /*
            if (user !== null) {
              setUser(user.uid);
              console.log(user.uid);
            }
            */
            console.log('Auth user ' + authUser);
            try {
              authUser ? setUser(authUser) : setUser(null);
              console.log(user);
            } catch (error) {
              console.log(error)
            }
          }
        } else {
          console.log('user null?')
          setUser(null);
        }
      }
      )
    }
    return () => { isMounted = false };
  }); //run only if user change or during initial load

  return (
    <NavigationContainer>
      {console.log(user)}
      {user ? <BottomTab /> : <AuthStack />}
    </NavigationContainer>
  )
}