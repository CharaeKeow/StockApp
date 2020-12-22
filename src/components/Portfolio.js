/* eslint-disable react/prop-types */
import React, { useState, useEffect } from 'react';
import { FlatList, TouchableOpacity, View, Text, Linking, Alert } from 'react-native';
import { createStackNavigator } from '@react-navigation/stack';
import { SearchBar } from 'react-native-elements';
import { AreaChart } from 'react-native-svg-charts';
import * as shape from 'd3-shape';
import filter from 'lodash.filter';

import { firebase } from '../firebase/config';
import DetailsScreen from './PortfolioDetailsScreen';
import styles from '../styles/Portfolio.style';

const handlerLongClick = () => {
  Alert.alert(
    'DELETE',
    'Are you sure?', // <- this part is optional, you can pass an empty string
    [
      { text: 'Yes', onPress: () => console.log('YES Pressed') }, // insert DELETE function
      { text: 'No', onPress: () => console.log('NO Pressed') },
    ],
    { cancelable: false },
  );
};

const Item = ({ item, style }) => {
  return (
    <TouchableOpacity onLongPress={handlerLongClick} onPress={() => { Linking.openURL(item.companyUrl) }} style={[styles.item, style]} >
      <Text style={{ textAlign: 'center', fontSize: 18, fontWeight: "bold", paddingRight: 15 }}>{item.sharesName}<Text style={{ fontSize: 18, fontWeight: "bold", paddingLeft: 6, color: 'green' }}>   RM {item.sharesCurrPrice}</Text></Text>
      <View style={{ flexDirection: "row" }}>
        <View style={{ paddingTop: 20, paddingLeft: 12, backgroundColor: '#fff', flex: 1.5 }}>
          <Text>EMA 50   : <Text>{item.ema50}</Text></Text>
          <Text>EMA 100 : <Text>{item.ema100}</Text></Text>
          <Text>EMA 200 : <Text>{item.ema200}</Text></Text>
          <Text>SA Score : <Text>{item.sentiValue}</Text></Text>
          <Text>BB Status: <Text>{item.bbStatus}</Text></Text>
        </View>
        <View style={{ paddingRight: 12, flex: 1 }}>
          <AreaChart
            style={{ paddingTop: 15, height: 100, width: 110 }}
            data={[6.01, 8.02, 5.05, 9.59, 8.5, 9.1, 6.547, 5.03, 4.46, 5.01]}
            contentInset={{ top: 20, bottom: 20 }}
            curve={shape.curveNatural}
            svg={{ fill: 'rgba(134, 65, 244, 0.8)' }}
          >
          </AreaChart>
        </View>
      </View>
    </TouchableOpacity >
  );
};

function Portfolio({ navigation }) {
  const [selectedId, setSelectedId] = useState(null)
  //const [stockId, setStockId] = React.useState([]);
  const [search, setSearch] = useState(''); //for searchbar state
  //For handling query to filter the stock listed in portfolio
  const [filteredData, setFilteredData] = useState([]);
  //array to keep list of portfolio fetch from Firebase
  const [portfolioArr, setPortfolioArr] = useState([]);

  useEffect(() => {
    let isMounted = true;
    firebase.database().ref('/users/' + 'CF81IUxlLwMBIhvwpqrvm3ze0Mv2' + '/portfolio').on('value', (snapshot) => {
      if (isMounted) {
        let portfolio = [];
        if (snapshot !== undefined || null) { //because this node has child === null
          snapshot.forEach((child => {
            firebase.database().ref('/processedData/' + child.val()).on('value', (childSnapshot) => {
              if (childSnapshot.val() !== null) {
                portfolio.push({
                  id: childSnapshot.key,
                  bbStatus: childSnapshot.val().bbStatus,
                  ema50: childSnapshot.val().ema50,
                  ema100: childSnapshot.val().ema100,
                  ema200: childSnapshot.val().ema200,
                  sharesCurrPrice: childSnapshot.val().sharesCurrPrice,
                  sentiValue: childSnapshot.val().sentiValue,
                  sharesName: childSnapshot.val().sharesName,
                  companyUrl: childSnapshot.val().companyurl,
                });
              }
            });
          }))
        }
        if (portfolio !== null) { //ensure portfolio not null before set
          setPortfolioArr(portfolio);
        }
      }
    })
    return () => { isMounted = false };
  }, [portfolioArr === null]); //run useEffect as long as portfolioArr is null

  /*Handling search @TODO: Refactor this into a separate file to cleanup
  as this is used across Watchlist and Portfolio :)
  */
  const handleSearch = (text) => {
    const formattedQuery = text.toLowerCase();
    const filteredData = filter(portfolioArr, data => {
      return contains(data, formattedQuery);
    })
    console.log(filteredData);
    setFilteredData(filteredData); //set filtered data into new data to be passed into Flatlist
    //console.log(watchlistArr);
    setSearch(text); //contains the input in search box
  }

  const contains = ({ sharesName }, query) => {
    //destructuring sharesName from shares
    //console.log(sharesName)
    if (sharesName.toLowerCase().includes(query)) {
      return true; //true if found
    }
    return false; //if not found
  }

  const renderItem = ({ item }) => {
    return (
      <Item
        item={item}
        style={styles.flatlist}
        onPress={() => {
          setSelectedId(item.id);
          navigation.navigate('Details', {
            itemId: item.id,
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
          (text) => handleSearch(text)
        }
        //To get the query string. Will be use to filter the flatlist locally
        onSubmitEditing={(event) => {
          let query = event.nativeEvent.text;
          //console.log(query);
          //TODO: add query method to call
        }}
        value={search}
        platform="android"
        style={styles.searchBar}
      />
      <View style={styles.stockView}>
        <FlatList
          //data={DATA}
          data={search === '' ? portfolioArr : filteredData}
          renderItem={renderItem}
          keyExtractor={item => item.id}
          extraData={selectedId}
        />
      </View>
    </View>
  );
}

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
        options={({ route }) => ({ title: route.params.obj.sharesName })}
      />
    </PortfolioStack.Navigator>
  )
}