import React, { Component } from 'react';
import {
  View,
  TouchableOpacity,
  Text,
  StyleSheet,
  Dimensions,

  Platform,

} from 'react-native'; 
import { AntDesign } from '@expo/vector-icons'; 

const { width } = Dimensions.get('window');

export default class MyPlan extends Component {
  render() {
    return (
      <View style={styles.container}>
        <TouchableOpacity
          style={styles.btnContainer}>
          <AntDesign name="pluscircleo" size={70} color="black" />
          <Text>플랜 만들러 가기</Text>
        </TouchableOpacity>
      </View>

    );
  }
}

const styles = StyleSheet.create({
  container: {
    width: width * 0.7,
    height: width / 1.6,
    backgroundColor: 'white',
    marginTop: 5,
    marginBottom: 5,
    borderRadius: 5,
    marginRight: 20,
    justifyContent: 'center',
    alignContent: 'center',
    ...Platform.select({
      ios: {
        shadowColor: 'rgb(50, 50, 50)',
        shadowOpacity: 0.1,
        shadowRadius: 5,
        shadowOffset: {
          height: -1,
          width: 0,
        },
      },
      android: {
        elevation: 4,
      },
    }),
  },
  btnContainer: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  textstyle: {
    fontSize: 18, paddingLeft: 10, paddingRight: 10,
  },
});
