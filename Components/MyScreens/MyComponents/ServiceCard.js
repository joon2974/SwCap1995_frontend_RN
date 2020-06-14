import React, { Component } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Dimensions,
  Platform,
} from 'react-native';

const { width, height } = Dimensions.get('window');


export default class ServiceCard extends Component {
  componentDidMount() {
    console.log('섹', this.props);
  }

  render() {
    return (
        
      <View style={styles.noticeContainer}>
        <View>
          <Text style={{ fontWeight: 'bold', fontSize: 18 }}>{this.props.title}</Text>
        </View>
        <View style={styles.lineDivider} />
        <View style={styles.contentStyle}>
          <Text>내가 쓴 글:</Text>
          <Text style={{ width: width - 100 }}>
         
            {this.props.message}
          </Text>
        </View>
        
        <View style={styles.lineDivider} />
        <View style={styles.contentStyle}>
          
          <Text>답변내용:</Text>
          <Text>
            {this.props.answer}
          </Text>
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
    height: height / 3,
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
  },
});
