/* eslint-disable react/prop-types */
import React, { useState } from 'react';
import { Button, Text, View } from 'react-native';

import styles from '../styles/Watchlist.style';
import { firebase } from '../firebase/config';

const uid = 'CF81IUxlLwMBIhvwpqrvm3ze0Mv2'; //temp. change later to get the signed in uid
const userPortfolioListRef = firebase.database().ref('/users/' + uid + '/portfolio');



export default function DetailsScreen({ route }) {
  const [exist, setExist] = useState(false); //already exist in porfolio or not
  const { obj } = route.params;
  const {
    id,
    sharesCurrentPrice,
    sharesName,
  } = obj;


  const newPortfolioRef = userPortfolioListRef.push(); //this will auto generate key based on timestamp. prevent duplicate
  const addToPortfolio = (id) => {
    newPortfolioRef.set(
      id
    )
  }

  //for checking if it's already added in portfolio
  React.useEffect(() => {
    userPortfolioListRef.on('value', (snapshot) => {
      snapshot.forEach((child) => {
        if (child.val() === id) {
          setExist(true)
        }
      })
    })
  })

  return (
    <View style={styles.detailsView}>
      <Text>Share Name: <Text>{sharesName}</Text></Text>
      <Text>Share Current Price: <Text>{sharesCurrentPrice}</Text></Text>
      <Button
        title={exist ? 'Already in Portfolio' : 'Add to Portfolio'}
        color={'#e91e63'}
        disabled={exist ? true : false}
        onPress={() => {
          addToPortfolio(id);
        }}
      />
    </View >
  )
}