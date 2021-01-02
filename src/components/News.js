//* eslint-disable react/prop-types */
import React, { useState, useEffect } from 'react';
import { FlatList, TouchableOpacity, View, Text, Linking, Dimensions } from 'react-native';
import { createStackNavigator } from '@react-navigation/stack';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import { VictoryPie } from "victory-native";
import { firebase } from '../firebase/config';
import styles from '../styles/News.style';

const Tab = createMaterialTopTabNavigator();

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

const Item = ({ item, style }) => {
  return (
    <TouchableOpacity onPress={()=>{ Linking.openURL(item.url)}} style={[styles.item, style]}>
        <Text style={{fontSize:16, fontWeight:'bold'}}>{item.title}</Text>
        <View  style={{flexDirection: "row"}}>
          <View style={{flex:1.2}}>
            <Text style={{fontSize:15,paddingTop:3}}>{item.date}</Text>

            <View style={{
                shadowColor: "#000", shadowOffset: { width: 0, height: 2 }, 
                shadowOpacity: 0.1, shadowRadius: 5, elevation: 4, width:110,
                marginTop:12, marginBottom:40, borderRadius:20, backgroundColor:'white', flex:1}}>

                <Text style={{ fontWeight:'900', textAlign:'center', marginTop:20}}>SA Score:</Text>
                <Text style={{  textAlign:'center', fontSize:25, marginTop:3, color: item.compound >= 0 ? (item.compound === 0 ? "orange" : "green") : (item.compound === 0 ? "orange" : "red")}}>{scaleToPercent(item.compound)}</Text>
              </View>
          </View>
          <View style={{ marginTop:-30, flex:1.8}}>
            <VictoryPie
              height={200}
              width={200}
              padding={55}
              innerRadius={20}
              colorScale={pieChartColours(item.compound)}
              data={array(item.compound)}
              style={{ labels: { display: "none" }}}
            />
          </View>
        </View>
    </TouchableOpacity >
  );
};

function NewsGlobal({ navigation }) { //Global

  const [selectedId, setSelectedId] = useState(null)
  const [data, setData] = useState('');
  const [NewsArr, setNewsArr] = React.useState(null);

  useEffect(() => {
    let isMounted = true;

    const newsRef = firebase.database().ref('/news/global/list');
    newsRef.on('value', (snapshot) => {
      if (isMounted) {
        let news = [];
        if (snapshot !== null) {
          snapshot.forEach((child) => {
            firebase.database().ref('/news/global/list/' + child.key).on('value', (childSnapshot) => {
              //console.log(childSnapshot.val())
              if (childSnapshot.val() !== null) {
                news.push({
                  id: childSnapshot.key,
                  compound: childSnapshot.val().Compound,
                  date: childSnapshot.val().Date,
                  title: childSnapshot.val().Title,
                  url: childSnapshot.val().Url
                })
              }
            })
          })
        }
        if (news !== null) {
          setNewsArr(news);
        }
      }
    })
    return () => { isMounted = false };
  }, [NewsArr === null]) //run as long as newsArr is null

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
      <View style={styles.stockView}>
        <FlatList
          //data={DATA}
          data={NewsArr}
          renderItem={renderItem}
          keyExtractor={item => item.id}
        //extraData={selectedId}
        />
      </View>
    </View>

  );
}

function NewsLocal({ navigation }) { //Local

  const [selectedId, setSelectedId] = useState(null)
  const [data, setData] = useState('');
  const [NewsArr, setNewsArr] = React.useState(null);

  useEffect(() => {
    let isMounted = true;

    const newsRef = firebase.database().ref('/news/local/list');
    newsRef.on('value', (snapshot) => {
      if (isMounted) {
        let news = [];
        if (snapshot !== null) {
          snapshot.forEach((child) => {
            firebase.database().ref('/news/local/list/' + child.key).on('value', (childSnapshot) => {
              //console.log(childSnapshot.val())
              if (childSnapshot.val() !== null) {
                news.push({
                  id: childSnapshot.key,
                  compound: childSnapshot.val().Compound,
                  date: childSnapshot.val().Date,
                  title: childSnapshot.val().Title,
                  url: childSnapshot.val().Url
                })
              }
            })
          })
        }
        if (news !== null) {
          setNewsArr(news);
        }
      }
    })
    return () => { isMounted = false };
  }, [NewsArr === null]) //run as long as newsArr is null

  const renderItem = ({ item }) => {
    return (
      <Item
        item={item}
        style={styles.flatlist}
      />
    );
  }

  return (
    <View style={styles.view}>
      <View style={styles.stockView}>
        <FlatList
          //data={DATA}
          data={NewsArr}
          renderItem={renderItem}
          keyExtractor={item => item.id}
        //extraData={selectedId}
        />
      </View>
    </View>

  );
}

//Stack for global and local news
//Create stack to keep global news tab history
const GlobalStack = createStackNavigator();

//component and stack for Global news
function Global() {
  return (
    <GlobalStack.Navigator screenOptions={{
      headerShown: false
    }}>
      <GlobalStack.Screen name="Global" component={NewsGlobal} screenOptions={{
        headerShown: false
      }}
      />
    </GlobalStack.Navigator>
  )
}

//Create stack to keep local news tab history
const LocalStack = createStackNavigator();

//component and stack for Global news
function Local() {
  return (
    <LocalStack.Navigator screenOptions={{
      headerShown: false
    }}>
      <LocalStack.Screen name="Local" component={NewsLocal}
      />
    </LocalStack.Navigator>
  )
}

export default function NewsStackScreen() {
  return (
    <Tab.Navigator>
      <Tab.Screen name="Global" component={Global}
      />
      <Tab.Screen name="Local" component={Local} />
    </Tab.Navigator>
  );
}