/* eslint-disable react/prop-types */
import React from 'react';
import { View, Text } from 'react-native';

import styles from '../styles/Portfolio.style';

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
    </View>
  )
}