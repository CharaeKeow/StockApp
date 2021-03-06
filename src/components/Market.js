/* eslint-disable react/prop-types */
import React, { useState, useEffect } from 'react';
import { ScrollView, Text, View, Dimensions, TouchableOpacity, LogBox } from 'react-native';
import { createStackNavigator } from '@react-navigation/stack';
import { VictoryPie } from "victory-native";
import ImageView from 'react-native-image-view';

import { firebase } from '../firebase/config';
import styles from '../styles/Market.style';
import MarketOverviewMalaysia from './MarketOverviewMalaysia';
import MarketOverviewGlobal from './MarketOverviewGlobal';

function array(param) {
  var values = new Array();

  if (param > 0) {
    values[0] = param;
    values[1] = 1 - param;
  }
  if (param < 0) {
    values[0] = 1 - (param * -1);
    values[1] = param * -1;
  }
  if (param === 0) {
    values[0] = 1;
  }

  return values;
}


function pieChartColours(param2) {

  var values = new Array();

  if (param2 > 0) {
    values[0] = 'green';
    values[1] = '#D8D8D8';
  }
  if (param2 < 0) {
    values[1] = 'red';
    values[0] = '#D8D8D8';
  }
  if (param2 === 0) {
    values[0] = 'orange';
  }

  return values;
}

function scaleToPercent(receiveInput) {

  if (receiveInput < 0)
    receiveInput = (receiveInput * -1);
  return (receiveInput * 100).toFixed(2) + "%";
}

function Market() {
  const [urlLocal, setUrlLocal] = useState(null); //url of local wordcloud img
  const [urlGlobal, setUrlGlobal] = useState(null); //url of global wordcloud img
  const [averageSentimentLocal, setAverageSentimentLocal] = useState(null);
  const [averageSentimentGlobal, setAverageSentimentGlobal] = useState(null);

  const urlLocalRef = firebase.database().ref('/news/local/sentiment/urlglobal');
  const urlGlobalRef = firebase.database().ref('/news/global/sentiment/urlglobal');
  const averageLocalRef = firebase.database().ref('/news/local/sentiment/Average');
  const averageGlobalRef = firebase.database().ref('/news/global/sentiment/Average');

  const [gainers, setGainers] = useState(null);
  const [losers, setLosers] = useState(null);
  const [unchanged, setUnchanged] = useState(null);
  const [volume, setVolume] = useState(null);

  const gainersRef = firebase.database().ref('/market/summary/local/gainers');
  const losersRef = firebase.database().ref('/market/summary/local/losers');
  const unchangedRef = firebase.database().ref('/market/summary/local/unchanged');
  const volumeRef = firebase.database().ref('/market/summary/local/volume');

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


    gainersRef.on('value', (snapshot) => {
      setGainers(snapshot.val());
    })
    losersRef.on('value', (snapshot) => {
      setLosers(snapshot.val());
    })
    unchangedRef.on('value', (snapshot) => {
      setUnchanged(snapshot.val());
    })
    volumeRef.on('value', (snapshot) => {
      setVolume(snapshot.val());
    })
  }, []); //run once on component load

  useEffect(() => {
    //to hide the yellowbox warning (issue with Animated nativeDriver), as per:
    //https://stackoverflow.com/questions/61014661/animated-usenativedriver-was-not-specified-issue-of-reactnativebase-input
    LogBox.ignoreLogs(['Animated: `useNativeDriver`']);
  }, [])

  const [visibleLocal, setVisibleLocal] = useState(false);
  const [visibleGlobal, setVisibleGlobal] = useState(false);

  function onPressLocal() {
    setVisibleLocal(true);
  }
  function onPressGlobal() {
    setVisibleGlobal(true);
  }

  const AppButtonLocal = ({ title }) => (
    <TouchableOpacity onPress={onPressLocal} style={styles.appButtonContainer}>
      <Text style={styles.appButtonText}>{title}</Text>
    </TouchableOpacity>
  );
  const AppButtonGlobal = ({ title }) => (
    <TouchableOpacity onPress={onPressGlobal} style={styles.appButtonContainer}>
      <Text style={styles.appButtonText}>{title}</Text>
    </TouchableOpacity>
  );

  const imagesGlobal = [
    {
      source: {
        uri: urlGlobal,
      },
      title: 'Global',
      //width: 806, //removing width make it scale nicely on screen
      //height: 720,
      resizeMode: 'contain'
    },
  ];
  const imagesLocal = [
    {
      source: {
        uri: urlLocal,
      },
      title: 'Local',
      //width: 806,
      //height: 720,
      resizeMode: 'contain'
    },
  ];

  return (
    <ScrollView>
      <View style={{ alignItems: 'center', flexDirection: 'column' }}>
        <View style={{
          shadowColor: "#000", shadowOffset: { width: 0, height: 2 },
          shadowOpacity: 0.1, shadowRadius: 5, elevation: 4,
          marginTop: 12, borderRadius: 20, marginBottom: 12,
          width: Dimensions.get('window').width - 20,
          backgroundColor: 'white', flex: 1
        }}>

          <Text style={{ marginTop: 25, fontSize: 23, fontWeight: 'bold', textAlign: 'center' }}>AVERAGE{'\n'}SENTIMENT ANALYSIS</Text>

          <View style={{ marginTop: -2, justifyContent: 'center', flexDirection: 'row' }}>
            <View style={{ marginRight: -9, flexDirection: 'column' }}>
              <View>
                <VictoryPie
                  height={160}
                  width={(Dimensions.get('window').width / 2) - 11}
                  padding={40}
                  innerRadius={20}
                  colorScale={pieChartColours(averageSentimentGlobal)}
                  data={array(averageSentimentGlobal)}
                  style={{ labels: { display: "none" } }}
                />
              </View>
              <View>
                <Text style={{ textAlign: 'center', marginTop: -30, color: averageSentimentGlobal >= 0 ? (averageSentimentGlobal === 0 ? "orange" : "green") : "red", fontSize: 25, fontWeight: '900' }}>{scaleToPercent(averageSentimentGlobal)}</Text>
                <View style={{ marginTop: 0, alignSelf: 'center' }}>
                  <AppButtonGlobal title="GLOBAL" />
                </View>
              </View>
            </View>
            <View style={{ marginLeft: -9, flexDirection: 'column' }}>
              <View>
                <VictoryPie
                  height={160}
                  width={(Dimensions.get('window').width / 2) - 11}
                  padding={40}
                  innerRadius={20}
                  colorScale={pieChartColours(averageSentimentLocal)}
                  data={array(averageSentimentLocal)}
                  style={{ labels: { display: "none" } }}
                />
              </View>
              <View>
                <Text style={{ textAlign: 'center', marginTop: -30, color: averageSentimentLocal >= 0 ? (averageSentimentLocal === 0 ? "orange" : "green") : "red", fontSize: 25, fontWeight: '900' }}>{scaleToPercent(averageSentimentLocal)}</Text>
                <View style={{ marginTop: 0, justifyContent: 'center', alignSelf: 'center' }}>
                  <AppButtonLocal title="MALAYSIA" />
                </View>
                {/* <Text style={{textAlign:'center', fontSize:16, marginBottom:30, fontWeight:'bold'}}>LOCAL</Text> */}
              </View>
            </View>
          </View>

          <ImageView
            images={imagesGlobal}
            style={styles.img}
            animationType="fade"
            isVisible={visibleGlobal}
            onClose={() => { setVisibleGlobal(false) }}
          />
          <ImageView
            images={imagesLocal}
            style={styles.img}
            animationType="fade"
            isVisible={visibleLocal}
            onClose={() => { setVisibleLocal(false) }}
          />
        </View>

        <View style={{
          marginBottom: 10,
          shadowColor: "#000", shadowOffset: { width: 0, height: 2 },
          shadowOpacity: 0.1, shadowRadius: 5, elevation: 4,
          borderRadius: 20, width: Dimensions.get('window').width - 20,
          backgroundColor: 'white', flex: 1, justifyContent: 'center'
        }}>

          <Text style={{ marginTop: 35, fontSize: 25, fontWeight: 'bold', textAlign: 'center' }}>MARKET OVERVIEW</Text>

          <View style={{ marginTop: 25, marginLeft: 20, marginRight: 20, marginBottom: 20 }}>
            <Text style={{ textAlign: 'center', marginBottom: 15, fontWeight: 'bold', fontSize: 20 }}>Malaysia's Market Action</Text>
            <View style={{ marginLeft: 15, flexDirection: 'row' }}>
              <VictoryPie
                height={120}
                width={120}
                padding={10}
                innerRadius={25}
                colorScale={['green', 'red', 'orange']}
                data={[gainers, losers, unchanged]}
                style={{ labels: { display: "none" } }}
              />
              <View style={{ marginTop: 25, flexDirection: 'column' }}>
                <Text style={{ color: 'green', fontWeight: 'bold', marginLeft: 20 }}>
                  Gainers         : {gainers}
                </Text>
                <Text style={{ color: 'red', fontWeight: 'bold', marginLeft: 20 }}>
                  Losers           : {losers}
                </Text>
                <Text style={{ color: 'orange', fontWeight: 'bold', marginLeft: 20 }}>
                  Unchanged  : {unchanged}
                </Text>
              </View>
            </View>
            <Text style={{ textAlign: 'center', marginTop: 12, marginBottom: 15, fontWeight: '900', fontSize: 18 }}>Volume: {volume}</Text>
          </View>

          {/*Malaysia's sector market section*/}
          <MarketOverviewMalaysia />

          {/*Global market activity section*/}
          <MarketOverviewGlobal />
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