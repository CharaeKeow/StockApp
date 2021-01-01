import { StyleSheet, Dimensions } from 'react-native';

export default StyleSheet.create({
  item: {
    padding: 18,
    height: 200,
    width: Dimensions.get('window').width - 25,
    marginVertical: 6,
    borderRadius: 15,
  },
  container: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  flatlist: {
    borderRadius: 10,
    backgroundColor: '#fff',
    alignSelf: 'center',
    shadowColor: "#000", shadowOffset: { width: 0, height: 2 }, 
    shadowOpacity: 0.1, shadowRadius: 5, elevation: 4,
  },
  detailsView: {
    backgroundColor: '#fff',
    margin: 10,
    padding: 10,
  },
})