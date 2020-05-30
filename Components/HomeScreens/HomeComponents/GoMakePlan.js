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
      <View style={styles.addContainer}>
        <TouchableOpacity
          style={styles.addBtnContainer}
          onPress={this.props.navigateFunc}
        >
          <AntDesign name="pluscircleo" size={70} color="black" />
          <Text>플랜 만들러 가기</Text>
        </TouchableOpacity>
      </View>

    );
  }
}

const styles = StyleSheet.create({
  addContainer: {
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
  addBtnContainer: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  
});
