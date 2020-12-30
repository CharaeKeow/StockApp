/* eslint-disable react/display-name */
import React, { useEffect } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createStackNavigator } from '@react-navigation/stack';
import { MaterialCommunityIcons, AntDesign, Entypo } from '@expo/vector-icons';
import { MenuProvider } from 'react-native-popup-menu';

import MarketStackScreen from './src/components/Market';
import NewsStackScreen from './src/components/News';
import PortfolioStackScreen from './src/components/Portfolio';
import WatchlistStackScreen from './src/components/Watchlist';
import Registration from './src/components/Registration';
import Login from './src/components/Login'
import { firebase } from './src/firebase/config';
import TimerErrorHandler from './src/utils/TimerErrorHandler';


TimerErrorHandler();

const Tab = createBottomTabNavigator();

function BottomTab() {
  return (
    <Tab.Navigator initialRouteName="Portfolio" tabBarOptions={{ activeTintColor: '#e91e63' }} >
      <Tab.Screen
        name="Portfolio"
        component={PortfolioStackScreen}
        options={{
          tabBarLabel: 'Portfolio',
          tabBarIcon: ({ color, size }) => (
            <Entypo name="bookmarks" color={color} size={size} />
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
      <Tab.Screen
        name="Market"
        component={MarketStackScreen}
        options={{
          tabBarLabel: 'Market',
          tabBarIcon: ({ color, size }) => (
            <MaterialCommunityIcons name="store" size={size} color={color} />
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
    console.log(error);
  });
  */

  return (
    <MenuProvider>
      <NavigationContainer>
        {console.log(user)}
        {user !== null ? <BottomTab /> : (
          <Stack.Navigator>
            <Stack.Screen name="Login" component={Login} />
            <Stack.Screen name="Registration" component={Registration} />
          </Stack.Navigator>
        )}
      </NavigationContainer>
    </MenuProvider>
  );
}
