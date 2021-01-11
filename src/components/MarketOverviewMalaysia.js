import React, { useEffect, useState } from 'react';
import { View, Text } from 'react-native';
import { VictoryBar, VictoryAxis, VictoryChart } from "victory-native";

import { firebase } from '../firebase/config';

export default function MarketOverviewMalaysia() {
  const [sectorsArr, setSectorsArr] = useState(null);
  const marketSectorsRef = firebase.database().ref('/market/sectors');

  useEffect(() => {
    marketSectorsRef.once('value', (snapshot) => {
      let sectors = []; //temp array to hold snapshot values
      sectors.push({ //push snapshot values into array
        construction: snapshot.val().CONSTRUCTION,
        consumerProductsServices: snapshot.val()['CONSUMER PRODUCTS & SERVICES'],
        energy: snapshot.val().ENERGY,
        financialServices: snapshot.val()['FINANCIAL SERVICES'],
        healthCare: snapshot.val()['HEALTH CARE'],
        industrialProductsServices: snapshot.val()['INDUSTRIAL PRODUCTS & SERVICES'],
        plantation: snapshot.val().PLANTATION,
        property: snapshot.val().PROPERTY,
        reit: snapshot.val().REIT,
        technology: snapshot.val().TECHNOLOGY,
        telecommunicationsMedia: snapshot.val()['TELECOMMUNICATIONS & MEDIA'],
        transportationLogistics: snapshot.val()['TRANSPORTATION & LOGISTICS'],
        utilities: snapshot.val().UTILITIES,
      });
      if (sectors !== null && sectors !== []) {
        setSectorsArr(sectors);
      }
    })
    console.log("test");
  }, [sectorsArr === null])

  return (
    <View>
      <Text style={{ textAlign: 'center', marginTop: 15, fontWeight: 'bold', fontSize: 20 }}>Malaysia's Sectors</Text>
      <View style={{ alignItems: 'center' }}>
        <View style={{ flexDirection: 'row' }}>
          <Text style={{ marginTop: 18, marginBottom: -25 }}>
            RE  :   REIT{'\n'}
                            PP  :   Property{'\n'}
                            UL  :   Ultilities{'\n'}
                            HC :   Health Care{'\n'}
          </Text>
          <Text style={{ marginLeft: 12, marginTop: 18, marginBottom: -25 }}>
            ER   :  Energy{'\n'}
                            TN  :  Technology{'\n'}
                            PT  :   Plantation{'\n'}
                            CT  :   Construction{'\n'}
          </Text>
        </View>
        <Text style={{ marginTop: 18, marginBottom: -18 }}>
          FS    :    Financial Services{'\n'}
                            CS   :    Consumers Products{'\n'}
                            TL   :    Transportation & Logistics{'\n'}
                            TM  :    Telecommunications & Media{'\n'}
                            IP     :    Industrial Products & Services
                          </Text>
        <VictoryChart>
          <VictoryBar
            // horizontal
            style={{ data: { fill: 'rgba(134, 65, 244, 0.8)' }/*({data}) => data >= 0 ? 'green' : 'red'}*/ }}
            //data={[0, 2, 5, 6, 3, 4, 7, 2, 5, 4, 7, 6, 8, 6]} //this is preset data
            //data from firebase
            data={sectorsArr !== null ? [0,
              sectorsArr[0].construction,
              sectorsArr[0].consumerProductsServices,
              sectorsArr[0].energy,
              sectorsArr[0].financialServices,
              sectorsArr[0].healthCare,
              sectorsArr[0].industrialProductsServices,
              sectorsArr[0].plantation,
              sectorsArr[0].property,
              sectorsArr[0].reit,
              sectorsArr[0].technology,
              sectorsArr[0].telecommunicationsMedia,
              sectorsArr[0].transportationLogistics,
              sectorsArr[0].utilities] : [0]}
                          /*labels={[,2,5,6,3,4,-7,2,5,4,7,6,8,6]}*/ />
          <VictoryAxis
            offsetX={190}
            style={{ tickLabels: { fontWeight: 'bold', fontSize: 11, angle: 90 } }}
            crossAxis={false}
            tickValues={['CT', 'CS', 'ER', 'FS', 'HC', 'IP', 'PT', 'PP', 'RE', 'TN', 'TM', 'TL', 'UL']} />
        </VictoryChart>
      </View>
    </View>
  );
}