/* eslint-disable react/prop-types */
import React, { useState } from 'react';
import { FlatList, TouchableOpacity, View, Text, StyleSheet } from 'react-native';
import { createStackNavigator } from '@react-navigation/stack';
import { SearchBar } from 'react-native-elements';

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
    low: '0.180',
  },
  {
    id: '002',
    title: 'AMZN',
    sector: 'Technology',
    fullname: 'Amazon Inc.',
    change: '-0.002',
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
    change: '+0.125',
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
  }, {
    id: '005',
    title: 'ABC',
    fullname: 'ABC Inc.',
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
  }, {
    id: '006',
    title: 'CIMB',
    fullname: 'CIMB Bank',
    sector: 'Technology',
    change: '-0.015',
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
    id: '007',
    title: 'KANGER',
    fullname: 'Kanger International Berhad',
    sector: 'Technology',
    change: '+0.225',
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
    id: '008',
    title: 'IRIS',
    fullname: 'Iris Corporation Berhad',
    sector: 'Technology',
    change: '-0.215',
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

/* For checking is the change of the stock is positive or negative, which will later
   be used for assigning the right color to <Text> component to display the colour
 */
const isPositive = (val) => {
  if (val.charAt(0) === '+') {
    return true; //early exit if true
  }
  return false; //no else, default return false
}

const Item = ({ item, onPress, style }) => {

  return (
    < TouchableOpacity onPress={onPress} style={[styles.item, style]} >
      <View style={styles.container}>
        <Text style={[styles.title, styles.header]}>{item.title}</Text>
        {isPositive(item.change) ?
          <Text style={{ color: 'green' }}>{item.change}</Text>
          : <Text style={{ color: 'red' }}>{item.change}</Text>}
      </View>
    </TouchableOpacity >
  );
};

function DetailsScreen({ route }) {
  const { obj } = route.params; //destructuring

  //destructure. Maybe it's cleaner this way
  const {
    title,
    fullname,
    sector,
    change,
    percentageChange,
    volume,
    buy,
    buyVolume,
    sell,
    sellVolume,
    lacp,
    open,
    high,
    low
  } = obj;

  return (
    <View style={styles.detailsView}>
      <Text>Title: <Text>{title}</Text></Text>
      <Text>Name: <Text>{fullname}</Text></Text>
      <Text>Sector: <Text>{sector}</Text></Text>
      <Text>Change: <Text>{change}</Text></Text>
      <Text>Percentage Change: <Text>{percentageChange}</Text></Text>
      <Text>Volume: <Text>{volume}</Text></Text>
      <Text>Buy: <Text>{buy}</Text></Text>
      <Text>Buy Volume: <Text>{buyVolume}</Text></Text>
      <Text>Sell: <Text>{sell}</Text></Text>
      <Text>Sell Volume: <Text>{sellVolume}</Text></Text>
      <Text>LACP: <Text>{lacp}</Text></Text>
      <Text>Open: <Text>{open}</Text></Text>
      <Text>High: <Text>{high}</Text></Text>
      <Text>Low: <Text>{low}</Text></Text>
    </View>
  )
}

function Portfolio({ navigation }) {
  //const [selectedId, setSelectedId] = useState([]); //for storing selected id on clicked flatlist
  const [search, setSearch] = useState(""); //for searchbar state
  const [data, setData] = useState(DATA); //empty array to store list of items during query

  //For handling query to filter the stock listed in portfolio
  const handleSearch = (text) => {
    const newData = data.filter(item => {
      const itemData = item.fullname.toLowerCase();
      const textData = text.toLowerCase();
      return itemData.indexOf(textData) > -1;
    });
    setData(newData); //set new data into data
    setSearch(text);
  }


  const renderItem = ({ item }) => {
    return (
      <Item
        item={item}
        style={styles.flatlist}
        onPress={() => {
          //setSelectedId(item.id);
          navigation.navigate('Details', {
            //itemId: item.id,
            obj: item, //objects of clicked element
          });
        }}
      />
    );
  }

  return (
    <View style={styles.view}>
      <SearchBar
        placeholder="Search stock"
        onChangeText={
          //(text) => { setSearch(text) }
          //set arr = DATA obj upon clicking on this component. But think this is
          //not the best idea because fulldata should contains element beforehand.
          //Will refactor later
          //setFullData(DATA);
          (text) => handleSearch(text)
        }
        //To get the query string. Will be use to filter the flatlist locally
        onSubmitEditing={(event) => {
          let query = event.nativeEvent.text;
          console.log(query);
          //TODO: add query method to call
        }}
        value={search}
        platform="android"
        style={styles.searchBar}
      />
      <View style={styles.stockView}>
        <FlatList
          //data={DATA}
          data={data}
          renderItem={renderItem}
          keyExtractor={item => item.id}
        //extraData={selectedId}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  item: {
    padding: 20,
    height: 100,
    width: 300,
    marginVertical: 8,
    marginHorizontal: 16,
    //marginRight: 50,
    borderRadius: 10,
  },
  container: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  header: {
    fontSize: 20,
    fontWeight: "400",
  },
  flatlist: {
    borderRadius: 10,
    backgroundColor: '#fff',
    alignSelf: 'center',
  },
  view: {
    flex: 1,
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  stockView: {
    width: '100%',
    marginBottom: 60
  },
  searchBar: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'flex-start',
  },
  detailsView: {
    backgroundColor: '#fff',
    margin: 10,
    padding: 10,
  },
})

const PortfolioStack = createStackNavigator();

export default function PortfolioStackScreen() {
  return (
    <PortfolioStack.Navigator>
      <PortfolioStack.Screen
        name="Portfolio"
        component={Portfolio}
      />
      <PortfolioStack.Screen
        name="Details"
        component={DetailsScreen}
        options={({ route }) => ({ title: route.params.obj.fullname })}
      />
    </PortfolioStack.Navigator>
  )
}