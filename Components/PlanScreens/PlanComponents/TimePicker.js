import React, { Component } from 'react';
import {
  Picker,
  View,
  Dimensions,
  StyleSheet,
  Platform,
} from 'react-native';
import propTypes from 'prop-types';

const { width } = Dimensions.get('window');
export default class TimePicker extends Component {
  static propTypes = {
    onValueChange: propTypes.func.isRequired,
  };

  render() {
    return (
      <View style={styles.viewStyle}>
        <Picker
          selectedValue={this.props.time}
          onValueChange={this.props.onValueChange}
          style={{
            width: width / 3 - 8,
            height: 50, 
            marginLeft: 3,
            marginRight: 3,
            marginTop: 1, 
            borderColor: '#FD8A69',
            borderWidth: 3,
            borderRadius: 10,
          }}
          itemStyle={{ height: 40 }}
          mode="dropdown"
        >
          {this.props.times.map((time) => (
            <Picker.Item key={time} label={time} value={time} />
          ))}
        </Picker>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  viewStyle: {
    ...Platform.select({
      android: {
        width: width / 3 - 8,
        marginLeft: 3,
        marginRight: 3,
        marginTop: 1, 
        borderColor: '#FD8A69',
        borderWidth: 3,
        borderRadius: 10,
      },
    }),
  },
});
