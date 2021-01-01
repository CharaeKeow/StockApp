/* eslint-disable react/prop-types */
import React, { useState, useEffect } from 'react';
import { ScrollView, Text, View, Dimensions, TouchableOpacity, Modal } from 'react-native';
import { createStackNavigator } from '@react-navigation/stack';
import { VictoryPie } from "victory-native";
import { firebase } from '../firebase/config';
import styles from '../styles/Market.style';
import ImageView from 'react-native-image-view';

function array(param) {
    var values = new Array();
  
      if(param > 0) {
        values[0] = param;
        values[1] = 1-param;
      }
      else {
        values[0] = 1-(param*-1);
        values[1] = param*-1;
      }
    
    return values;
}


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



  function scaleToPercent(receiveInput) {

    if (receiveInput < 0 ) 
        receiveInput = (receiveInput * -1);
    return (receiveInput * 100).toFixed(2) + "%";
  }


  const [visibleL, setVisibleL] = useState(false);
  const [visibleG, setVisibleG] = useState(false);
  
  function onPressLocal() {
    setVisibleL(true);
  }
  function onPressGlobal() {
        setVisibleG(true);
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

  const imagesG = [
        {
            source: {
                uri: urlGlobal,
            },
            title: 'Global',
            width: 806,
            height: 720,
        },
    ];
    const imagesL = [
        {
            source: {
                uri: urlLocal,
            },
            title: 'Local',
            width: 806,
            height: 720,
        },
    ];

  return (
    <ScrollView>
        <View style={{alignItems:'center', flexDirection:'column'}}>
            <View style={{
                shadowColor: "#000", shadowOffset: { width: 0, height: 2 }, 
                shadowOpacity: 0.1, shadowRadius: 5, elevation: 4, 
                marginTop:12, borderRadius:20, marginBottom:12,
                width:Dimensions.get('window').width - 20,
                backgroundColor:'white', flex:1}}>

                <Text style={{ marginTop:25, fontSize: 23, fontWeight:'bold', textAlign:'center'}}>AVERAGE{'\n'}SENTIMENT ANALYSIS</Text>
                
                <View style={{ marginTop:-2, justifyContent:'center', flexDirection:'row'}}>
                    <View style={{ marginRight:-9, flexDirection:'column'}}>
                        <View>
                            <VictoryPie
                                height={160}
                                width={(Dimensions.get('window').width/2)-11}
                                padding={40}
                                innerRadius={20}
                                colorScale={["green","#D8D8D8"]}
                                data={array(averageSentimentLocal)}
                                style={{ labels: { display: "none" }}}
                            />
                        </View>
                        <View>
                            <Text style={{textAlign:'center', marginTop:-30, color: averageSentimentLocal > 0 ? "green" : "red", fontSize:25, fontWeight:'900'}}>{ scaleToPercent(averageSentimentLocal) }</Text>
                            <View style={{marginTop:0, justifyContent:'center', alignSelf:'center'}}>
                                <AppButtonLocal title="LOCAL"/>
                            </View>
                            {/* <Text style={{textAlign:'center', fontSize:16, marginBottom:30, fontWeight:'bold'}}>LOCAL</Text> */}
                        </View>
                    </View>

                    <View style={{ marginLeft:-9, flexDirection:'column' }}>
                        <View>
                            <VictoryPie
                                height={160}
                                width={(Dimensions.get('window').width/2)-11}
                                padding={40}
                                innerRadius={20}
                                colorScale={["#D8D8D8","red" ]}
                                data={array(averageSentimentGlobal)}
                                style={{ labels: { display: "none" }}}
                            />
                        </View>
                        <View>
                            <Text style={{textAlign:'center', marginTop:-30,color: averageSentimentGlobal > 0 ? "green" : "red", fontSize:25, fontWeight:'900'}}>{ scaleToPercent(averageSentimentGlobal) }</Text>
                            <View style={{marginTop:0, alignSelf:'center'}}>
                                <AppButtonGlobal title="GLOBAL"/>
                            </View>
                        </View>
                    </View>
                </View>

                <ImageView 
                    images={imagesG}
                    animationType="fade"
                    isVisible={visibleG}
                    onClose={() => {setVisibleG(false)}}
                />
                <ImageView 
                    images={imagesL}
                    animationType="fade"
                    isVisible={visibleL}
                    onClose={() => {setVisibleL(false)}}
                />
            </View>

            <View style={{
                    marginBottom:10,
                    shadowColor: "#000", shadowOffset: { width: 0, height: 2 }, 
                    shadowOpacity: 0.1, shadowRadius: 5, elevation: 4, height: 190,
                    borderRadius:20, width:Dimensions.get('window').width - 20, 
                    backgroundColor:'white', flex:1, justifyContent:'center'}}>

                    <Text style={{ fontSize: 23, fontWeight:'bold', textAlign:'center'}}>MARKET OVERVIEW</Text>
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
