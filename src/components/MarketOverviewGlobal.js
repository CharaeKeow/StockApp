import React, { useEffect, useState } from 'react';
import { View, Text } from 'react-native';
import { VictoryBar, VictoryAxis, VictoryChart } from "victory-native";

import { firebase } from '../firebase/config';

export default function MarketOverviewGlobal() {
  const [globalMarketArr, setGlobalMarketArr] = useState(null);
  const globalMarketSummaryRef = firebase.database().ref('/market/summary/global');

  useEffect(() => {
    globalMarketSummaryRef.once('value', (snapshot) => {
      console.log(snapshot)
      let globalMarket = [];
      console.log(snapshot);
      globalMarket.push({
        brentCrudeOil: snapshot.val()['BRENT CRUDE OIL'],
        crudeOil: snapshot.val()['CRUDE OIL'],
        dowJones: (snapshot.val()['DOW JONES ']),
        dowJonesFuture: snapshot.val()['DOW JONES FUTURES'],
        gold: snapshot.val()['GOLD'],
        nasdaq: snapshot.val()['NASDAQ '],
        nasdaqFuture: snapshot.val()['NASDAQ FUTURES'],
        sp500: snapshot.val()['S&P 500 '],
        sp500Vix: snapshot.val()['S&P 500 VIX'],
        sp500Future: snapshot.val()['S&P FUTURES'],
      })
      if (globalMarket !== null && globalMarket !== []) {
        setGlobalMarketArr(globalMarket);
      }
      console.log(globalMarketArr);
    })
  }, [globalMarketArr === null])

  return (
    <View>
      <Text style={{ marginTop: 30, textAlign: 'center', fontWeight: 'bold', fontSize: 20 }}>Global's Market Action</Text>
      <View style={{ marginBottom: 20, alignItems: 'center' }}>
        <Text style={{ marginTop: 18, marginBottom: -5 }}>
          GD       :    Gold{'\n'}
                              WCO   :    WTI Crude Oil{'\n'}
                              BCO    :    Brent Crude Oil{'\n'}
                              SPV     :    S&P 500 Vix
                      </Text>
        <View style={{ flexDirection: 'row' }}>
          <Text style={{ marginTop: 18, marginBottom: -25 }}>
            DJ   :   Dow Jones{'\n'}
                            NS  :   Nasdaq{'\n'}
                            SP  :   S&P 500{'\n'}
          </Text>
          <Text style={{ marginLeft: 12, marginTop: 18, marginBottom: -25 }}>
            DJF  :   Dow Jones Futures{'\n'}
                            NSF  :   Nasdaq Futures{'\n'}
                            SPF  :   S&P 500 Futures{'\n'}
          </Text>
        </View>
        <VictoryChart>
          <VictoryBar
            // horizontal
            style={{ data: { fill: 'rgba(134, 65, 244, 0.8)' }/*({data}) => data >= 0 ? 'green' : 'red'}*/ }}
            data={(globalMarketArr !== undefined && globalMarketArr !== null) ? [0,
              globalMarketArr[0].dowJones,
              globalMarketArr[0].sp500,
              globalMarketArr[0].nasdaq,
              globalMarketArr[0].gold,
              globalMarketArr[0].crudeOil,
              globalMarketArr[0].brentCrudeOil,
              globalMarketArr[0].sp500Vix,
              globalMarketArr[0].nasdaqFuture,
              globalMarketArr[0].sp500Future,
              globalMarketArr[0].dowJonesFuture,
            ] : [0]}
                          /*labels={[,2,5,6,3,4,-7,2,5,4,7,6,8,6]}*/ />
          <VictoryAxis
            style={{ tickLabels: { fontWeight: 'bold', fontSize: 11, angle: 90 } }}
            tickValues={['DJ', 'SP', 'NS', 'GD', 'WCO', 'BCO', 'SPV', 'NSF', 'SPF', 'DJF']} />
        </VictoryChart>
      </View>
    </View>
  );
}