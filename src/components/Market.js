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

  const [bco, setBco] = useState(null);
  const [wco, setWco] = useState(null);
  const [dj, setDj] = useState(null);
  const [djf, setDjf] = useState(null);
  const [gold, setGold] = useState(null);
  const [nadq, setNadq] = useState(null);
  const [nadqf, setNadqf] = useState(null);
  const [sp500, setSp500] = useState(null);
  const [sp500Vix, setSp500Vix] = useState(null);
  const [sp500f, setSp500f] = useState(null);

  const bcoRef = firebase.database().ref('/market/summary/global/BRENT CRUDE OIL');
  const wcoRef = firebase.database().ref('/market/summary/global/CRUDE OIL');
  const djRef = firebase.database().ref('/market/summary/global/"DOW JONES "');
  const djfRef = firebase.database().ref('/market/summary/global/DOW JONES FUTURES');
  const goldRef = firebase.database().ref('/market/summary/global/GOLD');
  const nadqRef = firebase.database().ref('/market/summary/global/"NASDAQ "');
  const nadqfRef = firebase.database().ref('/market/summary/global/NASDAQ FUTURES');
  const sp500Ref = firebase.database().ref('/market/summary/global/"S&P 500 "');
  const sp500VixRef = firebase.database().ref('/market/summary/global/S&P 500 VIX');
  const sp500fRef = firebase.database().ref('/market/summary/global/S&P FUTURES');

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


    bcoRef.on('value', (snapshot) => {
      setBco(snapshot.val());
    });
    wcoRef.on('value', (snapshot) => {
      setWco(snapshot.val());
    });
    djRef.on('value', (snapshot) => {
      setDj(snapshot.val());
    });
    djfRef.on('value', (snapshot) => {
      setDjf(snapshot.val());
    })
    goldRef.on('value', (snapshot) => {
      setGold(snapshot.val());
    });
    nadqRef.on('value', (snapshot) => {
      setNadq(snapshot.val());
    });
    nadqfRef.on('value', (snapshot) => {
      setNadqf(snapshot.val());
    });
    sp500Ref.on('value', (snapshot) => {
      setSp500(snapshot.val());
    })
    sp500VixRef.on('value', (snapshot) => {
      setSp500Vix(snapshot.val());
    })
    sp500fRef.on('value', (snapshot) => {
      setSp500f(snapshot.val());
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
                    <Text style={{ textAlign:'center', marginBottom:15,fontWeight:'bold', fontSize:20}}>Malaysia's Market Action</Text>
                    <View style={{ marginLeft:15, flexDirection:'row'}}>
                      <VictoryPie
                        height={120}
                        width={120}
                        padding={10}
                        innerRadius={25}
                        colorScale={['green','red','orange']}
                        data={[gainers, losers, unchanged]}
                        style={{ labels: { display: "none" }}}
                      />
                      <View style={{marginTop:25,flexDirection:'column'}}>
                        <Text style={{color:'green',fontWeight:'bold', marginLeft:20}}>
                          Gainers         : {gainers}
                        </Text>
                        <Text style={{color:'red',fontWeight:'bold', marginLeft:20}}>
                          Losers           : {losers}
                        </Text>
                        <Text style={{color:'orange',fontWeight:'bold', marginLeft:20}}>
                          Unchanged  : {unchanged}
                        </Text>
                      </View>
                    </View>
                    <Text style={{ textAlign:'center', marginTop:12, marginBottom:15,fontWeight:'900', fontSize:18}}>Volume: {volume}</Text>
                  </View>

                    
                    <Text style={{ textAlign:'center', marginTop:15, fontWeight:'bold', fontSize:20}}>Malaysia's Sectors</Text>
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
                        <VictoryBar horizontal
                          style={{data: { fill: 'rgba(134, 65, 244, 0.8)'}/*({data}) => data >= 0 ? 'green' : 'red'}*/}}
                          data={[0,2,5,6,3,4,7,2,5,4,7,6,8,6]}
                          /*labels={[,2,5,6,3,4,-7,2,5,4,7,6,8,6]}*//>
                        <VictoryAxis
                          style={{ tickLabels: {fontWeight:'bold',fontSize: 11}}}
                          crossAxis={false}
                          tickValues={['CT','CS','ER','FS','HC','IP','PT','PP','RE','TN','TM','TL','UL']}/>
                      </VictoryChart>
                    </View>

                    <Text style={{ textAlign:'center', fontWeight:'bold', fontSize:20}}>Global's Market Action</Text>
                    <View style={{marginBottom:30, justifyContent:'center', flexDirection:'row'}}>
                      <VictoryChart>
                        <VictoryBar horizontal
                          width={100}
                          style={{data: { fill: 'rgba(134, 65, 244, 0.8)'}/*({data}) => data >= 0 ? 'green' : 'red'}*/}}
                          data={[0,dj,sp500,nadq,gold,wco,bco,sp500Vix,nadqf,sp500f,djf]}
                          /*labels={[,2,5,6,3,4,-7,2,5,4,7,6,8,6]}*//>
                        <VictoryAxis
                          style={{ tickLabels: {fontWeight:'bold', fontSize: 11}}}
                          crossAxis={false}
                          tickValues={['DOW JONES','S&P 500','NASDAQ','GOLD','WTI CRUDE OIL','BRENT CRUDE OIL','S&P 500 VIX','NASDAQ FUTURES','S&P 500 FUTURES','DOW JONES FUTURES']}/>
                      </VictoryChart>
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
