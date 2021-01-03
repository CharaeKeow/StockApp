/* eslint-disable react/prop-types */
import React, { useState, useEffect } from 'react';
import { ScrollView, Text, View, Dimensions, TouchableOpacity } from 'react-native';
import { createStackNavigator } from '@react-navigation/stack';
import { VictoryPie, VictoryBar, VictoryAxis, VictoryChart } from "victory-native";
import { firebase } from '../firebase/config';
import styles from '../styles/Market.style';
import ImageView from 'react-native-image-view';

function array(param) {
    var values = new Array();
  
      if(param > 0) {
        values[0] = param;
        values[1] = 1-param;
      }
      if(param < 0) {
        values[0] = 1-(param*-1);
        values[1] = param*-1;
      }
      if(param === 0) {
        values[0] = 1;
      }
    
    return values;
}


function pieChartColours(param2) {

  var values = new Array();
  
      if(param2 > 0) {
        values[0] = 'green';
        values[1] = '#D8D8D8';
      }
      if(param2 < 0) {
        values[1] = 'red';
        values[0] = '#D8D8D8';
      }
      if(param2 === 0) {
        values[0] = 'orange';
      }
    
    return values;
}

function scaleToPercent(receiveInput) {

  if (receiveInput < 0 ) 
      receiveInput = (receiveInput * -1);
  return (receiveInput * 100).toFixed(2) + "%";
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
                  <View style={{ marginRight:-9, flexDirection:'column' }}>
                          <View>
                              <VictoryPie
                                  height={160}
                                  width={(Dimensions.get('window').width/2)-11}
                                  padding={40}
                                  innerRadius={20}
                                  colorScale={pieChartColours(averageSentimentGlobal)}
                                  data={array(averageSentimentGlobal)}
                                  style={{ labels: { display: "none" }}}
                              />
                          </View>
                          <View>
                              <Text style={{textAlign:'center', marginTop:-30,color: averageSentimentGlobal >= 0 ? (averageSentimentGlobal === 0 ? "orange" : "green") : "red", fontSize:25, fontWeight:'900'}}>{ scaleToPercent(averageSentimentGlobal) }</Text>
                              <View style={{marginTop:0, alignSelf:'center'}}>
                                  <AppButtonGlobal title="GLOBAL"/>
                              </View>
                          </View>
                      </View>
                      <View style={{ marginLeft:-9, flexDirection:'column'}}>
                          <View>
                              <VictoryPie
                                  height={160}
                                  width={(Dimensions.get('window').width/2)-11}
                                  padding={40}
                                  innerRadius={20}
                                  colorScale={pieChartColours(averageSentimentLocal)}
                                  data={array(averageSentimentLocal)}
                                  style={{ labels: { display: "none" }}}
                              />
                          </View>
                          <View>
                              <Text style={{textAlign:'center', marginTop:-30, color: averageSentimentLocal >= 0 ? (averageSentimentLocal === 0 ? "orange" : "green") : "red", fontSize:25, fontWeight:'900'}}>{ scaleToPercent(averageSentimentLocal) }</Text>
                              <View style={{marginTop:0, justifyContent:'center', alignSelf:'center'}}>
                                  <AppButtonLocal title="MALAYSIA"/>
                              </View>
                              {/* <Text style={{textAlign:'center', fontSize:16, marginBottom:30, fontWeight:'bold'}}>LOCAL</Text> */}
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
                    shadowOpacity: 0.1, shadowRadius: 5, elevation: 4,
                    borderRadius:20, width:Dimensions.get('window').width - 20, 
                    backgroundColor:'white', flex:1, justifyContent:'center'}}>

                  <Text style={{ marginTop:35, fontSize: 25, fontWeight:'bold', textAlign:'center'}}>MARKET OVERVIEW</Text>

                  <View style={{marginTop:25,marginLeft:20, marginRight:20, marginBottom:20}}>
                    <Text style={{ textAlign:'center', marginBottom:15,fontWeight:'bold', fontSize:20}}>MALAYSIA</Text>
                    <View style={{ marginLeft:15, flexDirection:'row'}}>
                      <VictoryPie
                        height={120}
                        width={120}
                        padding={10}
                        innerRadius={25}
                        colorScale={pieChartColours(averageSentimentLocal)}
                        data={array(averageSentimentLocal)}
                        style={{ labels: { display: "none" }}}
                      />
                      <View style={{marginTop:25,flexDirection:'column'}}>
                        <Text style={{color:'green',fontWeight:'bold', marginLeft:20}}>
                          Gainers         :
                        </Text>
                        <Text style={{color:'red',fontWeight:'bold', marginLeft:20}}>
                          Losers           :
                        </Text>
                        <Text style={{color:'orange',fontWeight:'bold', marginLeft:20}}>
                          Unchanged  :
                        </Text>
                      </View>
                    </View>
                  </View>

                    
                    {/* <Text style={{ textAlign:'center', marginTop:15, fontWeight:'bold', fontSize:20}}>Malaysia's Sectors</Text> */}
                    <View style={{alignItems:'center'}}>
                      <View style={{flexDirection:'row'}}>
                          <Text style={{marginTop:18, marginBottom:-25}}>
                            RE  :   REIT{'\n'}
                            PP  :   Property{'\n'}
                            UL  :   Ultilities{'\n'}
                            HC :   Health Care{'\n'}
                          </Text>
                          <Text style={{marginLeft:12,marginTop:18, marginBottom:-25}}>
                            ER   :  Energy{'\n'}
                            TN  :  Technology{'\n'}
                            PT  :   Plantation{'\n'}
                            CT  :   Construction{'\n'}
                          </Text>
                        </View>
                        <Text style={{marginTop:18, marginBottom:-18}}>
                            FS    :    Financial Services{'\n'}
                            CS   :    Consumers Products{'\n'}
                            TL   :    Transportation & Logistics{'\n'}
                            TM  :    Telecommunications & Media{'\n'}
                            IP     :    Industrial Products & Services
                          </Text>
                      <VictoryChart>
                        <VictoryBar
                          style={{data: { fill: 'rgba(134, 65, 244, 0.8)'}/*({data}) => data >= 0 ? 'green' : 'red'}*/}}
                          data={[0,2,5,6,3,4,-7,2,5,4,7,6,8,6]}
                          /*labels={[,2,5,6,3,4,-7,2,5,4,7,6,8,6]}*//>
                        <VictoryAxis
                          style={{ tickLabels: {fontSize: 11}}}
                          crossAxis={false}
                          tickValues={['CT','CS','ER','FS','HC','IP','PT','PP','RE','TN','TM','TL','UL']}/>
                      </VictoryChart>
                    </View>

                    <Text style={{ textAlign:'center', marginBottom:25, fontWeight:'bold', fontSize:20}}>GLOBAL</Text>

                    <View style={{marginBottom:50,justifyContent:'center', flexDirection:'row'}}>
                      <View>
                          <Text style={{ textAlign:'right', marginBottom:5, fontSize:17}}>DOW JONES</Text>
                          <Text style={{ textAlign:'right', marginBottom:5, fontSize:17}}>S&P 500</Text>
                          <Text style={{ textAlign:'right',marginBottom:5, fontSize:17}}>NASDAQ</Text>
                          <Text style={{ textAlign:'right',marginBottom:5, fontSize:17}}>S&P 500 VIX</Text>
                          <Text style={{ textAlign:'right',marginBottom:5, fontSize:17}}>Crude Oil WTI</Text>
                          <Text style={{ textAlign:'right',marginBottom:5, fontSize:17}}>Brent Oil </Text>
                      </View>
                      <View>
                          <Text style={{marginLeft:15,marginBottom:5,fontSize:17/*color:item.compound >= 0 ? (item.compound === 0 ? "orange" : "green") : "red"*/}}>GLOBAL</Text>
                          <Text style={{marginLeft:15,marginBottom:5,fontSize:17/*color:item.compound >= 0 ? (item.compound === 0 ? "orange" : "green") : "red"*/}}>GLOBAL</Text>
                          <Text style={{marginLeft:15,marginBottom:5,fontSize:17/*color:item.compound >= 0 ? (item.compound === 0 ? "orange" : "green") : "red"*/}}>GLOBAL</Text>
                          <Text style={{marginLeft:15,marginBottom:5,fontSize:17/*color:item.compound >= 0 ? (item.compound === 0 ? "orange" : "green") : "red"*/}}>GLOBAL</Text>
                          <Text style={{marginLeft:15,marginBottom:5,fontSize:17/*color:item.compound >= 0 ? (item.compound === 0 ? "orange" : "green") : "red"*/}}>GLOBAL</Text>
                          <Text style={{marginLeft:15,marginBottom:5,fontSize:17/*color:item.compound >= 0 ? (item.compound === 0 ? "orange" : "green") : "red"*/}}>GLOBAL</Text>
                      </View>
                    </View>
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
