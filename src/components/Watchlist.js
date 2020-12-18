/* eslint-disable react/prop-types */
import React, { useState, useEffect } from 'react';
import { FlatList, TouchableOpacity, View, Text, StyleSheet } from 'react-native';
import { createStackNavigator } from '@react-navigation/stack';
import { SearchBar } from 'react-native-elements';

import { firebase } from '../firebase/config';

function DetailsScreen({ route }) {
  const { obj } = route.params;

  const {
    sharesCurrentPrice,
    sharesName,
  } = obj;

  return (
    <View style={styles.detailsView}>
      <Text>Share Name: <Text>{sharesName}</Text></Text>
      <Text>Share Current Price: <Text>{sharesCurrentPrice}</Text></Text>
    </View>
  )
}

const Item = ({ item, onPress, style }) => {
  return (
    < TouchableOpacity onPress={onPress} style={[styles.item, style]} >
      <View style={styles.container}>
        <Text style={[styles.title, styles.header]}>{item.sharesName}</Text>
        <Text style={{ color: 'green' }}>{item.sharesCurrentPrice}</Text>
      </View>
    </TouchableOpacity >
  );
};

function Watchlist({ navigation }) {
  //const [selectedId, setSelectedId] = useState([]); //for storing selected id on clicked flatlist
  const [search, setSearch] = useState(""); //for searchbar state
  const [data, setData] = useState([]); //empty array to store list of items during query
  const [watchlistArr, setWatchlistArr] = useState([]);

  useEffect(() => {
    let isMounted = true;

    const watchlistRef = firebase.database().ref('/watchlist/shares');

    watchlistRef.on('value', (snapshot) => {
      if (isMounted) {
        let watchlist = [];
        if (snapshot !== null) {
          snapshot.forEach((child) => {
            firebase.database().ref('/watchlist/shares/' + child.key).on('value', (childSnapshot) => {
              //console.log(childSnapshot.val())
              if (childSnapshot.val() !== null) {
                watchlist.push({
                  id: childSnapshot.key,
                  sharesCurrentPrice: childSnapshot.val().sharesCurrPrice,
                  sharesName: childSnapshot.val().sharesName
                })
              }
            })
          })
        }
        if (watchlist !== null) {
          setWatchlistArr(watchlist);
        }
      }
    })
    return () => { isMounted = false };
  }, [watchlistArr === null]) //run as long as watchlistArr is null

  console.log(watchlistArr);

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
          data={watchlistArr}
          renderItem={renderItem}
          keyExtractor={item => item.id}
        //extraData={selectedId}
        />
      </View>
    </View>
  );
}
const WatchlistStack = createStackNavigator();

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

export default function WatchlistStackScreen() {
  return (
    <WatchlistStack.Navigator>
      <WatchlistStack.Screen name="Watchlist" component={Watchlist} />
      <WatchlistStack.Screen
        name="Details"
        component={DetailsScreen}
        options={({ route }) => ({ title: route.params.obj.fullname })}
      />
    </WatchlistStack.Navigator>
  )
}
