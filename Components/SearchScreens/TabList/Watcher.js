import React, { Component } from 'react';
import {
  TouchableOpacity,
  Text,
  StyleSheet,
  View,
  Dimensions,
  Platform,
  Image,
} from 'react-native';

const { width, height } = Dimensions.get('window');

export default class Watcher extends Component {
  render() {
    const uri = 'https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcQ6mNjNuuWUdzd5TSnJCzZVxeaH0H-QZG6TK0LtjfOVTD60e7Jo&usqp=CAU';
    return (
      <TouchableOpacity 
        style={styles.container}
        >
        <Image 
          source={{ uri: uri }} 
          style={styles.imageStyle}
            />
        <View>
          <Text style={styles.watcherInfo2}>
            {'감시자님 ID: '}
            {this.props.id}
          </Text>
          <View style={{ marginTop: 3 }} />
      
          <View style={{ flexDirection: 'row' }}>
            <Text style={styles.watcherInfo}>
              {'감시 참여 횟수: '}
              {this.props.data.count}
            </Text>
            <Text style={styles.watcherInfo}>
              {'획득 포인트: '}
              {this.props.data.point_sum.toFixed(2)}
            </Text>
          </View>
        </View>
      </TouchableOpacity>

    );
  }
}

const styles = StyleSheet.create({
  container: {
    width: width * 0.82,
    height: height / 12,
    alignItems: 'center',
    backgroundColor: 'white',
    margin: 4,
    borderRadius: 10,
    flexDirection: 'row',

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
  
  imageStyle: {
    width: width * 0.12,
    height: height * 0.06,
    borderRadius: 10,
    marginLeft: 8,
  },

  watcherInfo: {
    marginLeft: 20,
    fontSize: 14,
  },
  watcherInfo2: {
    color: 'gray',
    marginLeft: 20,
    fontSize: 14,
  },
});
