import React, { Component } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';


export default class PlanTab extends Component {
    static navigationOptions = {
      tabBarIcon: ({ tintColor }) => (
        <Ionicons name="ios-calendar" style={{ color: tintColor }} />
      ),
    }

    render() {
      return (
        <View style={styles.container}>
          <Text>Plan</Text>
        </View>
      );
    }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
