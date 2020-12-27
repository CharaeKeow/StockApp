/* eslint-disable react/prop-types */
import React, { useState, useEffect } from 'react';
import {View} from 'react-native';
import { createStackNavigator } from '@react-navigation/stack';

import { firebase } from '../firebase/config';
import styles from '../styles/Portfolio.style';



function Market({ navigation }) {
 
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
                  Days30ClosePriceData: childSnapshot.val().Days30ClosePriceData
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

  return (
    <View style={styles.stockView}>
    </View>
  );
}

const MarketStack = createStackNavigator();

export default function MarketStackScreen() {
  return (
    <MarketStack.Navigator>
      <MarketStack.Screen
        name="Market"
        component={Market}
      />
    </MarketStack.Navigator>
  )
}