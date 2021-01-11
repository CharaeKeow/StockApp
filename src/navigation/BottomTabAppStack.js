/* eslint-disable react/display-name */
import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { MaterialCommunityIcons, AntDesign, Entypo } from '@expo/vector-icons';

import MarketStackScreen from '../components/Market';
import NewsStackScreen from '../components/News';
import PortfolioStackScreen from '../components/Portfolio';
import WatchlistStackScreen from '../components/Watchlist';

const Tab = createBottomTabNavigator();

export default function BottomTab() {
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
