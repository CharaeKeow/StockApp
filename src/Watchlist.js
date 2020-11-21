import * as React from 'react';
import { View, Text } from 'react-native';
import { createStackNavigator } from '@react-navigation/stack'

function Watchlist() {
  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Text>Watchlist</Text>
    </View>
  );
}

const WatchlistStack = createStackNavigator();

export default function WatchlistStackScreen() {
  return (
    <WatchlistStack.Navigator>
      <WatchlistStack.Screen name="Watchlist" component={Watchlist} />
    </WatchlistStack.Navigator>
  )
}