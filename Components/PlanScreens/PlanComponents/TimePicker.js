import React, { Component } from 'react';
import { Picker, View, Dimensions } from 'react-native';
import propTypes from 'prop-types';

const { width } = Dimensions.get('window');
export default class TimePicker extends Component {
  static propTypes = {
    onValueChange: propTypes.func.isRequired,
  };

  render() {
    return (
      <View
        style={{
          borderColor: '#FD8A69',
          borderWidth: 3,
          borderRadius: 10,
          width: 130,
        }}
      >
        <Picker
          selectedValue={this.props.time}
          onValueChange={this.props.onValueChange}
          style={{ width: 130, height: 50, marginLeft: 5 }}
          itemStyle={{ height: 40 }}
          mode="dropdown"
        >
          {this.props.times.map(time => (
            <Picker.Item key={time} label={time} value={time} />
          ))}
        </Picker>
      </View>
    );
  }
}
