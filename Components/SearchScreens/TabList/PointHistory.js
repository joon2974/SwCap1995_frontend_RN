import React, { Component } from 'react';
import {
  TouchableOpacity,
  Text,
  StyleSheet,
  Dimensions,
  Platform,
  Image,
} from 'react-native';

const { width, height } = Dimensions.get('window');

            
export default class PointHistory extends Component {
  state={
    convertedDate: '',
  }

  componentDidMount() {
    this.setDate();
  }

  setDate=() => {
    const date1 = this.props.data.date.split('-');
    let date2 = '';
    date2 = date2.concat(date1[1] + '월 ' + date1[2][0] + date1[2][1] + '일');
    this.setState({ convertedDate: date2 });
  }

  render() {    
    return (
      <TouchableOpacity 
        style={styles.container}
        >
        <Text style={styles.watcherInfo}>
          {this.state.convertedDate}
          {':'}
        </Text>
        <Text style={styles.watcherInfo}>
          {this.props.data.point}
          {' p'}
        </Text>

        
        <Image
          style={{ height: height / 24, width: height / 24, marginLeft: 15 }}
          source={require('../../../imgs/money.png')} />

      </TouchableOpacity>

    );
  }
}

const styles = StyleSheet.create({
  container: {
    width: width * 0.77,
    height: height / 12,
    alignItems: 'center',
    backgroundColor: 'white',
    margin: 4,
    marginLeft: 20,
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

  watcherInfo: {
    marginLeft: 60,
    fontSize: 14,
  },
});
