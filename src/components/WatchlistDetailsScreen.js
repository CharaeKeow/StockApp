/* eslint-disable react/prop-types */
import React from 'react';
import { View, Text } from 'react-native';

import styles from '../styles/Watchlist.style';

export default function DetailsScreen({ route }) {
  const { obj } = route.params;

  const {
    sharesCurrentPrice,
    sharesName,
  } = obj;

  return (
    <View style={styles.detailsView}>
      <Text>Share Name: <Text>{sharesName}</Text></Text>
      <Text>Share Current Price: <Text>{sharesCurrentPrice}</Text></Text>
    </View>
  )
}