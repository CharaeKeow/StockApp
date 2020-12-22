/* eslint-disable react/prop-types */
/* eslint-disable react/display-name */
import React, { useEffect, useState } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createStackNavigator } from '@react-navigation/stack';
import { MaterialCommunityIcons, AntDesign } from '@expo/vector-icons';

import NewsStackScreen from './src/components/News';
import PortfolioStackScreen from './src/components/Portfolio';
import WatchlistStackScreen from './src/components/Watchlist';
import Registration from './src/components/Registration';
import Login from './src/components/Login'
import { firebase } from './src/firebase/config';
import TimerErrorHandler from './src/utils/TimerErrorHandler';

/*To suppress (hide) yellow warning due to firebase setting a long timer. It's just a warning and nothing
 * can be done to fix it unless using a native Adroid firebase (which I plan to)
 * So for now hiding it seems to be the best fix :)
 * And this is for development only (I think)
 */
TimerErrorHandler();

const Tab = createBottomTabNavigator();

function BottomTab() {
  return (
    <Tab.Navigator
      initialRouteName="Portfolio"
      tabBarOptions={{
        activeTintColor: '#e91e63',
      }}
    >
      <Tab.Screen
        name="Portfolio"
        component={PortfolioStackScreen}
        options={{
          tabBarLabel: 'Portfolio',
          tabBarIcon: ({ color, size }) => (
            <MaterialCommunityIcons name="home" color={color} size={size} />
          ),
        }}
      />
      <Tab.Screen
        name="Watchlist"
        component={WatchlistStackScreen}
        options={{
          tabBarLabel: 'Watchlist',
          tabBarIcon: ({ color, size }) => (
            <AntDesign name="star" color={color} size={size} />
          ),
        }}
      />
      <Tab.Screen
        name="News"
        component={NewsStackScreen}
        options={{
          tabBarLabel: 'News',
          tabBarIcon: ({ color, size }) => (
            <MaterialCommunityIcons name="newspaper" size={size} color={color} />

          ),
        }}
      />
    </Tab.Navigator>
  );
}

const Stack = createStackNavigator();

export default function App() {
  const [user, setUser] = React.useState(null);

  useEffect(() => {
    firebase.auth().onAuthStateChanged(user => {
      if (user !== null) {
        setUser(user.uid);
      }
    });
  }, []); //run only if user change or during initial load

  /*
    firebase.auth().signOut().then(function () {
      // Sign-out successful.
    }).catch(function (error) {
      // An error happened.
    });
  */


  return (
    <NavigationContainer>
      {user !== null ? <BottomTab /> : (
        <Stack.Navigator>
          <Stack.Screen name="Login" component={Login} />
          <Stack.Screen name="Registration" component={Registration} />
        </Stack.Navigator>
      )}
    </NavigationContainer>
  );
}
