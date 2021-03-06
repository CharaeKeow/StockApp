/* eslint-disable no-undef */
/* eslint-disable react/prop-types */
import React, { useState, useEffect, useContext } from 'react';
import { FlatList, TouchableOpacity, View, Text, Alert } from 'react-native';
import { createStackNavigator } from '@react-navigation/stack';
import { SearchBar } from 'react-native-elements';
import filter from 'lodash.filter'; //for filtering searchbar
import { AreaChart } from 'react-native-svg-charts'; // Line chart
import * as shape from 'd3-shape';

import { firebase } from '../firebase/config';
import styles from '../styles/Watchlist.style';
import { AuthUserContext } from '../firebase/context'; // to get user including id from context
//import DetailsScreen from './WatchlistDetailsScreen';

const uid = 'CF81IUxlLwMBIhvwpqrvm3ze0Mv2'; //temp. change later to get the signed in uid
const userPortfolioListRef = firebase.database().ref('/users/' + uid + '/portfolio');

//for pressing item on the watchlist, which will trigger an alert
//asking user to add item to portfolio or not

const Item = ({ item, style, id }) => { //id is the stock id passed from Portfolio component
  const { user, setUser } = useContext(AuthUserContext); //for getting the login user data
  const [newPortfolioRef, setNewPortfolioRef] = useState(null); //this will auto generate key based on timestamp. prevent duplicate
  const [exist, setExist] = useState(false); //already exist in porfolio or not
  //const [uid, setUid] = useState(null);

  const addToPortfolio = (id) => {
    console.log(id);
    newPortfolioRef.set(
      id
    );
  }

  //for pressing item on the watchlist, which will trigger an alert
  //asking user to add item to portfolio or not
  const handleClickItem = () => {
    Alert.alert(
      'Adding Stock',
      'Confirm adding stock to Portfolio?', // <- this part is optional, you can pass an empty string
      [
        {
          text: 'Yes', onPress: () => {
            exist ?  //add to firebase user's portfolio
              alert(`The stock is already in portfolio`) : addToPortfolio(id)
          }
        }, // insert ADD TO PORTFOLIO function
        { text: 'No', onPress: () => console.log('NO Pressed') },
      ],
      { cancelable: false },
    );
  };

  //for checking if it's already added in portfolio
  React.useEffect(() => {
    const user = firebase.auth().currentUser; //get id of current user
    let uid;
    if (user !== null) {
      uid = user.uid;
    }
    const userPortfolioListRef = firebase.database().ref('/users/' + uid + '/portfolio');

    userPortfolioListRef.on('value', (snapshot) => {
      snapshot.forEach((child) => {
        if (child.val() === id) {
          setExist(true)
        }
      })
    })
    setNewPortfolioRef(userPortfolioListRef.push()); //set the new portfolio ref
  }, [newPortfolioRef === null])

  function riskColor(riskValue) {
    if (riskValue >= -5 && riskValue <= 5) {
      return 'orange';
    }

    if (riskValue > 5) {
      if (riskValue > 70) { return 'red'; }
      else { return 'green'; }
    }

    if (riskValue < -5) {
      return 'red';
    }
  }

  return (
    <TouchableOpacity onPress={handleClickItem} style={[styles.item, style]} >
      <View style={styles.container}>
        <View style={{ justifyContent: 'center', flex: 15 }}>
          <Text style={{ textAlign: 'center', fontSize: 17, fontWeight: "bold", paddingRight: 15 }} >{item.sharesName}</Text>
          <Text style={{ textAlign: 'center', fontSize: 15, paddingRight: 15, color: riskColor(item.riskStatus) }}>Risk: {item.riskStatus}%</Text>
        </View>
        <View style={{ flex: 10 }}>
          <Text style={{ fontSize: 15, fontWeight: "bold", paddingLeft: 6, paddingTop: 11, color: 'green' }}>{"RM " + item.sharesCurrentPrice.toFixed(3)}</Text>
        </View>
        <View style={{ flex: 10, paddingRight: 15 }}>
          <AreaChart
            style={{ height: 40, width: 90 }}
            data={item.days30ClosePriceData.split(',').map(n => parseFloat(n * -1))}
            contentInset={{ top: 30, bottom: 30 }}
            curve={shape.curveNatural}
            svg={{ fill: 'rgba(134, 65, 244, 0.8)' }}
          >
          </AreaChart>
        </View>
      </View>
    </TouchableOpacity >
  );
};

function Watchlist() {
  //const [selectedId, setSelectedId] = useState([]); //for storing selected id on clicked flatlist
  const [search, setSearch] = useState(""); //for searchbar state
  const [watchlistArr, setWatchlistArr] = useState([]);
  const [filteredData, setFilteredData] = useState([]);

  useEffect(() => {
    let isMounted = true;

    const watchlistRef = firebase.database().ref('/watchlist/shares');

    watchlistRef.on('value', (snapshot) => {
      if (isMounted) {
        let watchlist = [];
        if (snapshot !== null) {
          snapshot.forEach((child) => {
            firebase.database().ref('/watchlist/shares/' + child.key).on('value', (childSnapshot) => {
              //console.log(childSnapshot.val().sharesName.includes('BON'))
              if (childSnapshot.val() !== null) {
                watchlist.push({
                  id: childSnapshot.key,
                  sharesCurrentPrice: childSnapshot.val().sharesCurrPrice,
                  sharesName: childSnapshot.val().sharesName,
                  days30ClosePriceData: childSnapshot.val().days30ClosePriceData,
                  riskStatus: childSnapshot.val().riskStatus,
                  confidenceLevel: childSnapshot.val().confidenceLevel
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
  }, []) //run as long as watchlistArr is null

  //For handling query to filter the watchlist queried from Firebase
  const handleSearch = (text) => {
    const formattedQuery = text.toLowerCase();
    const filteredData = filter(watchlistArr, data => {
      return contains(data, formattedQuery);
    })
    //console.log(filteredData);
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
        id={item.id} //stock id
        item={item}
        style={styles.flatlist}
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
          data={search === '' ? watchlistArr : filteredData}
          renderItem={renderItem}
          keyExtractor={item => item.id}
        //extraData={selectedId}
        />
      </View>
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