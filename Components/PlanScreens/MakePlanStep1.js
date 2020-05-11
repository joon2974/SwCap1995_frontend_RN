import React, { Component } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  Dimensions,
} from 'react-native';

const { height, width } = Dimensions.get('window');

export default class PlanMain extends Component {
  render() {
    return (
      <ScrollView style={styles.container}>
        <View style={styles.viewContainer}>
          <View style={styles.selectedInformContainer}>
            <Text>정보창</Text>
          </View>

          <View style={styles.rulesContainer}>
            <Text>룰 리스트</Text>
          </View>

          <View style={styles.photoSelectContainer}>
            <Text>카메라 선택 버튼</Text>
          </View>
        </View>
      </ScrollView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  viewContainer: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  selectedInformContainer: {
    flexDirection: 'row',
    width: width,
    height: height / 6,
    justifyContent: 'flex-start',
    alignItems: 'center',
    backgroundColor: 'pink',
  },
  rulesContainer: {
    flexDirection: 'column',
    width: width,
    height: height / 2,
    backgroundColor: 'blue',
    justifyContent: 'flex-start',
    alignItems: 'flex-start',
  },
  photoSelectContainer: {
    flexDirection: 'row',
    width: width,
    height: height / 4,
    alignItems: 'center',
    justifyContent: 'flex-start',
    backgroundColor: 'green',
  },
});
