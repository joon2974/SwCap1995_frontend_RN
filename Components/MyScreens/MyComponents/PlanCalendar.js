import React, { Component } from 'react';
import {
  View,
  StyleSheet,
  Dimensions,
  Text,
} from 'react-native';

const { width } = Dimensions.get('window');

export default class MyPlan extends Component {
  render() {
    return (
      <View style={styles.container}>
          
        <View style={styles.rowContainer}>
          <View style={styles.weekBox}><Text>Mon</Text></View>
          <View style={styles.weekBox}><Text>Tue</Text></View>
          <View style={styles.weekBox}><Text>Wed</Text></View>
          <View style={styles.weekBox}><Text>Thu</Text></View>
          <View style={styles.weekBox}><Text>Fri</Text></View>
          <View style={styles.weekBox}><Text>Sat</Text></View>
          <View style={styles.weekBox}><Text>Sun</Text></View>
        </View>
        <View style={styles.rowContainer}>
          <View style={styles.daliyBox} />
          <View style={styles.daliyBox} />
          <View style={styles.daliyBox} />
          <View style={styles.daliyBox} />
          <View style={styles.daliyBox} />
          <View style={styles.daliyBox} />
          <View style={styles.daliyBox} />
        </View>
        <View style={styles.rowContainer}>
          <View style={styles.daliyBox} />
          <View style={styles.daliyBox} />
          <View style={styles.daliyBox} />
          <View style={styles.daliyBox} />
          <View style={styles.daliyBox} />
          <View style={styles.daliyBox} />
          <View style={styles.daliyBox} />
        </View>
        <View style={styles.rowContainer}>
          <View style={styles.daliyBox} />
          <View style={styles.daliyBox} />
          <View style={styles.daliyBox} />
          <View style={styles.daliyBox} />
          <View style={styles.daliyBox} />
          <View style={styles.daliyBox} />
          <View style={styles.daliyBox} />
        </View>
        <View style={styles.rowContainer}>
          <View style={styles.daliyBox} />
          <View style={styles.daliyBox} />
          <View style={styles.daliyBox} />
          <View style={styles.daliyBox} />
          <View style={styles.daliyBox} />
          <View style={styles.daliyBox} />
          <View style={styles.daliyBox} />
        </View>
      </View>
      
  
    );
  }
}
  

const styles = StyleSheet.create({
  container: {
    width: width * 0.75,
    height: width / 2,
    backgroundColor: 'white',
    marginTop: 5,
    marginBottom: 5,
    borderRadius: 25,
    marginRight: 20,
    borderWidth: 1,
    alignContent: 'center',
    justifyContent: 'space-between',
    padding: 10,
  },
  rowContainer: {
    flexDirection: 'row',
  },
  daliyBox: {
    borderWidth: 1,
    marginRight: 5,
    marginLeft: 5,
    width: width / 13,
    height: width / 13,
    justifyContent: 'center',
    alignContent: 'center',
  },
  weekBox: {
    marginRight: 5,
    marginLeft: 5,
    width: width / 13,
    height: width / 13,
    justifyContent: 'center',
    alignContent: 'center',
  },
  weekStyle: {
    fontSize: 5,
  },
});
