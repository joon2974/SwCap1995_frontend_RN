import React, { Component } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Dimensions,
  ScrollView,
} from 'react-native'; 

const { width } = Dimensions.get('window');
export default class EstimatePlan extends Component {
  render() {
    return (
      <ScrollView style={styles.container}>
        <Text>합의페이지</Text>
      </ScrollView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
