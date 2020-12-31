import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';

import Login from '../components/Login.js';
import Registration from '../components/Registration';

const Stack = createStackNavigator();

export default function AuthStack() {

  return (
    <Stack.Navigator initialRouteName="Login" headerMode="none">
      <Stack.Screen name="Login" component={Login} />
      <Stack.Screen name="Registration" component={Registration} />
    </Stack.Navigator>
  )
}