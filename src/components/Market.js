/* eslint-disable react/prop-types */
import React, { useState, useEffect } from 'react';
import { Image, ScrollView, Text, View } from 'react-native';
import { createStackNavigator } from '@react-navigation/stack';

import { firebase } from '../firebase/config';
import styles from '../styles/Market.style';

function Market({ navigation }) {
  const [urlLocal, setUrlLocal] = useState(null); //url of local wordcloud img
  const [urlGlobal, setUrlGlobal] = useState(null); //url of global wordcloud img
  const [averageSentimentLocal, setAverageSentimentLocal] = useState(null);
  const [averageSentimentGlobal, setAverageSentimentGlobal] = useState(null);

  const urlLocalRef = firebase.database().ref('/news/local/sentiment/urlglobal');
  const urlGlobalRef = firebase.database().ref('/news/global/sentiment/urlglobal');
  const averageLocalRef = firebase.database().ref('/news/local/sentiment/Average');
  const averageGlobalRef = firebase.database().ref('/news/global/sentiment/Average');

  useEffect(() => {
    urlLocalRef.on('value', (snapshot) => {
      setUrlLocal(snapshot.val());
    });
    urlGlobalRef.on('value', (snapshot) => {
      setUrlGlobal(snapshot.val());
    });
    averageGlobalRef.on('value', (snapshot) => {
      setAverageSentimentGlobal(snapshot.val());
    });
    averageLocalRef.on('value', (snapshot) => {
      setAverageSentimentLocal(snapshot.val());
    })
  }, []); //run once on component load


  return (
    <ScrollView>
      <View style={styles.container}>
        <Text>Average Sentiment Local: <Text>{averageSentimentLocal}</Text></Text>
        <View style={styles.imgContainer}>
          <Image
            style={styles.img}
            source={{
              uri: urlLocal
            }}
          />
        </View>
        <View style={styles.imgContainer}>
          <Text>Average Sentiment Global:
          <Text>{averageSentimentGlobal}</Text></Text>
          <Image
            style={styles.img}
            source={{
              uri: urlGlobal
            }}
          />
        </View>
      </View>
    </ScrollView>
  )
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
