/* eslint-disable react/prop-types */
import React, { useState, useEffect } from 'react';
import { Button, Text, View, ToastAndroid } from 'react-native';

import styles from '../styles/Portfolio.style';
import { firebase } from '../firebase/config'


//@TODO LOW PRIORITY Use react-native-toast-message instead of default toast as that one can be styled.

//first obtain the user node
const uid = 'CF81IUxlLwMBIhvwpqrvm3ze0Mv2'; //temp. change later to get the signed in uid


const Toast = ({ visible, message }) => {
  if (visible) {
    ToastAndroid.showWithGravity(message, ToastAndroid.SHORT, ToastAndroid.BOTTOM, 20, 500);
    return null;
  }
  return null;
};

export default function DetailsScreen({ route }) {
  const { obj } = route.params; //destructuring
  const {
    id,
    bbStatus,
    ema50,
    ema100,
    ema200,
    sharesCurrPrice,
    sentiValue,
    sharesName,
    companyUrl,
  } = obj;
  const [exist, setExist] = useState(true); //it exists in db (as it's already in portfolio), hence TRUE
  const [stockId, setStockId] = useState(null);
  const [visibleToast, setVisibleToast] = useState(false); //for showing toast during button press
  const userPortfolioListRef = firebase.database().ref('/users/' + uid + '/portfolio');
  const userPortfolioListRemoveChildRef = (stockId) => firebase.database().ref('/users/' + uid + '/portfolio/' + stockId);

  useEffect(() => {
    setVisibleToast(false);
  }, [visibleToast]);

  useEffect(() => {
    userPortfolioListRef.once('value', (snapshot) => {
      console.log(snapshot);
      snapshot.forEach((child) => {
        if (child.val() === id) {
          setStockId(child.key);
        }
      })
    })
  }, [])

  const handleButtonPress = () => {
    setVisibleToast(true);
  }

  return (
    <View style={styles.detailsView}>
      <Text>BB status: <Text>{bbStatus}</Text></Text>
      <Text>ema 50: <Text>{ema50}</Text></Text>
      <Text>ema 100: <Text>{ema100}</Text></Text>
      <Text>ema 200: <Text>{ema200}</Text></Text>
      <Text>sharesCurrentPrice: <Text>{sharesCurrPrice}</Text></Text>
      <Text>Sentiment Value: <Text>{sentiValue}</Text></Text>
      <Text>Shares Name: <Text>{sharesName}</Text></Text>
      <Text>Company URL: <Text>{companyUrl}</Text></Text>
      <Toast visible={visibleToast} message="Successfully removed from your portfolio" />
      <Button
        title={exist ? 'Remove from Portfolio' : 'Removed'}
        color={'#e91e63'}
        disabled={exist ? false : true}
        onPress={() => {
          handleButtonPress();
          userPortfolioListRemoveChildRef(stockId).remove();
        }}
      />
    </View>
  )
}