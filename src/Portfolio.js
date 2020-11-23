import React, { useState } from 'react';
import { FlatList, TouchableOpacity, View, Text, StyleSheet } from 'react-native';
import { createStackNavigator } from '@react-navigation/stack'

const DATA = [
  {
    id: '001',
    title: 'APPL',
    fullname: 'Apple Inc.',
    sector: 'Technology',
    change: '+0.005',
    percentageChange: '+2.78',
    volume: '73,604,287',
    buy: '0.185',
    buyVolume: '227,027',
    sell: '0.190',
    sellVolume: '231,498',
    lacp: '0.180',
    open: '0.185',
    high: '0.195',
    low: '0.180'
  },
  {
    id: '002',
    title: 'AMZN',
    sector: 'Technology',
    fullname: 'Amazon Inc.',
    change: '+0.005',
    percentageChange: '+2.78',
    volume: '73,604,287',
    buy: '0.185',
    buyVolume: '227,027',
    sell: '0.190',
    sellVolume: '231,498',
    lacp: '0.180',
    open: '0.185',
    high: '0.195',
    low: '0.180'
  }, {
    id: '003',
    title: 'TSLA',
    sector: 'Automotive',
    fullname: 'Tesla Inc',
    change: '+0.005',
    percentageChange: '+2.78',
    volume: '73,604,287',
    buy: '0.185',
    buyVolume: '227,027',
    sell: '0.190',
    sellVolume: '231,498',
    lacp: '0.180',
    open: '0.185',
    high: '0.195',
    low: '0.180'
  }, {
    id: '004',
    title: 'GOOG',
    fullname: 'Google Inc.',
    sector: 'Technology',
    change: '+0.005',
    percentageChange: '+2.78',
    volume: '73,604,287',
    buy: '0.185',
    buyVolume: '227,027',
    sell: '0.190',
    sellVolume: '231,498',
    lacp: '0.180',
    open: '0.185',
    high: '0.195',
    low: '0.180'
  }
];

const Item = ({ item, onPress, style }) => (
  <TouchableOpacity onPress={onPress} style={[styles.item, style]}>
    <View style={styles.container}>
      <Text style={[styles.title, styles.header]}>{item.title}</Text>
      <Text>{item.change}</Text>
    </View>
  </TouchableOpacity>
);

function DetailsScreen({ route }) {

  return (
    <View>
      <Text>{ }</Text>
    </View>
  )

}

function Portfolio({ navigation }) {
  const [selectedId, setSelectedId] = React.useState(""); //for storing selected id on clicked flatlist

  const renderItem = ({ item }) => {

    return (
      <Item
        item={item}
        onPress={() => {
          setSelectedId(item.id);
          navigation.navigate('Details', {
            itemid: selectedId,
          });
        }
        }
      />
    )
  }

  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <FlatList
        data={DATA}
        renderItem={renderItem}
        keyExtractor={item => item.id}
        extraData={selectedId}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  item: {
    padding: 20,
    height: 100,
    width: 300,
    marginVertical: 8,
    marginHorizontal: 16,
    borderRadius: 10,
  },
  container: {
    flexDirection: "row",
    justifyContent: "space-between"
  },
  header: {
    fontSize: 20,
    fontWeight: "400",
  }
})

const PortfolioStack = createStackNavigator();

export default function PortfolioStackScreen() {
  return (
    <PortfolioStack.Navigator>
      <PortfolioStack.Screen name="Portfolio" component={Portfolio} />
      <PortfolioStack.Screen name="Details" component={DetailsScreen} />
    </PortfolioStack.Navigator>
  )
}