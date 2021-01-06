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

      //firebase.auth().onAuthStateChanged(user => {
      //why - because normal onAuthStateChanged only listen to signing in and out, but no token change such as verifiedEmail
      firebase.auth().onIdTokenChanged(user => {
        if (user !== null) {
          if (user.emailVerified) {
            //firebase.auth().onAuthStateChanged(authUser => {
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
          } else {
            setUser(null);
          }
        } else {
          console.log('user null?')
          setUser(null);
        }
      })
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