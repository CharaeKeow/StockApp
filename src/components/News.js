/* eslint-disable react/prop-types */
import React, { useState } from 'react';
import { FlatList, TouchableOpacity, View, Text, StyleSheet } from 'react-native';
import { createStackNavigator } from '@react-navigation/stack';
import { SearchBar } from 'react-native-elements';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';

const DATA = [
  {
    global: {
      list: [null, {
        title: 'Huawei founder says phone unit sale will free it from US curbs',
        url: 'https://www.theedgemarkets.com/article/huawei-founder-says-phone-unit-sale-will-free-it-us-curbs'
      }],
      sentiment: {
        value: '0.585',
        wordCloud: 'https://firebase....'
      }
    },
    local: {
      list: [null, {
        title: 'Sarawak Consolidated Industries 3Q net profit leaps to RM12.43m',
        url: 'https://www.theedgemarkets.com/article/sarawak-consolidated-industries-3q-net-profit-leaps-rm1243m'
      }],
      sentiment: {
        value: '0.653',
        wordCloud: 'https://firebase...'
      }
    }
  }
];

const Item = ({ item, onPress, style }) => {

  return (
    < TouchableOpacity onPress={onPress} style={[styles.item, style]} >
      <View><Text>{item.title}</Text></View>
      <View><Text>{item.url}</Text></View>
      <View><Text>{item.value}</Text></View>
      <View><Text>{item.wordCloud}</Text></View>
    </TouchableOpacity >
  );
};

function DetailsScreen({ route }) {
  const { obj } = route.params; //destructuring

  //destructure. Maybe it's cleaner this way
  const {
    //list,
    title,
    url,
    //sentiment,
    value,
    wordCloud,
  } = obj;

  return (
    <View style={styles.detailsView}>

      <Text>Title: <Text>{title}</Text></Text>
      <Text>Url: <Text>{url}</Text></Text>
      <Text>Value: <Text>{value}</Text></Text>
      <Text>Word Cloud: <Text>{wordCloud}</Text></Text>

    </View>
  )
}

function News({ navigation }) {
  //const [selectedId, setSelectedId] = useState([]); //for storing selected id on clicked flatlist
  const [search, setSearch] = useState(""); //for searchbar state
  const [data, setData] = useState(DATA); //empty array to store list of items during query

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
          data={[data[0].global.list[1]]}
          renderItem={renderItem}
          keyExtractor={item => item.title}
        //extraData={selectedId}
        />
      </View>
    </View>
  );
}

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

//<NewsStack.Screen name="News" component={News} />

/* depreceated as it cannot keep the respective tabs history
function MyTabs() { //component top tab
  return (
    <Tab.Navigator>
      <Tab.Screen name="Global" component={News} />
      <Tab.Screen name="Local" component={News} />
    </Tab.Navigator>
  )
}
*/


//Create stack to keep global news tab history
const GlobalStack = createStackNavigator();

//component and stack for Global news
function Global() {
  return (
    <GlobalStack.Navigator>
      <GlobalStack.Screen name="Global" component={News} />
    </GlobalStack.Navigator>
  )
}

//Create stack to keep local news tab history
const LocalStack = createStackNavigator();

//component and stack for Global news
function Local() {
  return (
    <LocalStack.Navigator>
      <LocalStack.Screen name="Local" component={News} />
    </LocalStack.Navigator>
  )
}

//create top tab stack
const Tab = createMaterialTopTabNavigator();

//For rendering the screen for Global and Local tabs.
export default function NewsStackScreen() {
  return (
    <Tab.Navigator>
      <Tab.Screen name="Global" component={Global} />
      <Tab.Screen name="Local" component={Local} />
    </Tab.Navigator>
  );
}