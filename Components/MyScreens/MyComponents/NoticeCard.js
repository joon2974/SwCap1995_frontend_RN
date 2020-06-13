import React, { Component } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Dimensions,
  Platform,
} from 'react-native';

const { width, height } = Dimensions.get('window');

export default class NoticeCard extends Component {
  render() {
    return (
        
      <View style={styles.noticeContainer}>
        <View>
          <Text style={{ fontWeight: 'bold', fontSize: 18 }}>{this.props.title}</Text>
        </View>
        <View style={styles.lineDivider} />
        <View style={styles.contentStyle}>
          <Text numberOfLines={2}>{this.props.content}</Text>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
    
  lineDivider: {
    backgroundColor: '#F2F2F2',
    width: width - 30,
    height: 1.5,
    marginLeft: 15,
    marginBottom: 15,
    marginTop: 5,
  },
  noticeContainer: {
    marginTop: 30,
    width: width * 0.9,
    height: height / 8,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 15,
    backgroundColor: 'white',
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
  contentStyle: {
    flex: 1,
    alignContent: 'center',
    textAlign: 'center',
    width: width - 100,
  },
});
