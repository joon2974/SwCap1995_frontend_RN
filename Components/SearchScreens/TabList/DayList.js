import React, { Component } from 'react';
import {
  TouchableOpacity,
  StyleSheet,
  Dimensions,
  Platform,
} from 'react-native';
import { CardFour } from '../Cards';

const { width, height } = Dimensions.get('window');

export default class DayList extends Component {
  state={
    date: '',
  }

  componentDidMount() {
    this.time();
  }

  time = () => {
    const date = new Date(this.props.item.updatedAt);
    this.setState({ date: date });
  }

  render() {
    return (
      <TouchableOpacity 
        style={styles.container}
        onPress={this.props.explore}
      >
        <CardFour
          image={{
            uri:
              this.props.item.image_url,
          }}
          date={this.state.date}
          off="일일 인증"
          offText="Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum."
          buttonText="BUY NOW!"
          />
      </TouchableOpacity>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    width: width / 2.4,
    height: height / 4.4,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'white',
    margin: 12,
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
});
