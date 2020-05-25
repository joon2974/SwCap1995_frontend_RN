import React, { Component } from 'react';
import { Picker } from 'react-native';
import propTypes from 'prop-types';

export default class TimePicker extends Component {
  static propTypes = {
    onValueChange: propTypes.func.isRequired,
  };

  render() {
    return (
      <Picker
        selectedValue={this.props.time}
        onValueChange={this.props.onValueChange}
        style={{ width: 130, height: 50, marginLeft: 5 }}
        itemStyle={{ height: 40 }}
      >
        {this.props.times.map((time) => (
          <Picker.Item key={time} label={time} value={time} />
        ))}
      </Picker>
    );
  }
}
