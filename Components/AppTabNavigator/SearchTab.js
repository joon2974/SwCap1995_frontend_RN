import React, { Component } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

export default class SearchTab extends Component {
    static navigationOptions = {
      tabBarIcon: ({ tintColor }) => (
        <Ionicons name="ios-search" style={{ color: tintColor }} />
      ),
    }

    render() {
      return (
        <View style={styles.container}>
          <Text>Search</Text>
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
