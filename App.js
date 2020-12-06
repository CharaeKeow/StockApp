/* eslint-disable react/prop-types */
/* eslint-disable react/display-name */
import * as React from 'react';
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

//const isSignedIn = false; //set sign in to false for testing Login and Registration screens

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
  //manually set for now to easier testing the main UI
  //will need to properly implement later as this one is extreme
  //important
  const [isSignedIn, setSignedIn] = React.useState(false);

  return (
    <NavigationContainer>
      {isSignedIn ? <BottomTab /> : (
        <Stack.Navigator>
          <Stack.Screen name="Login" component={Login} />
          <Stack.Screen name="Registration" component={Registration} />
        </Stack.Navigator>
      )}
    </NavigationContainer>
  );
}
