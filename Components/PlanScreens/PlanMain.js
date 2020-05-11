import React, { Component } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Button,
} from 'react-native';

export default class PlanMain extends Component {
  render() {
    return (
      <View style={styles.container}>
        <Text>플랜 메인</Text>
        <Button title="플랜 생성" onPress={() => this.props.navigation.navigate('MakePlanStep1')} />
      </View>
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
