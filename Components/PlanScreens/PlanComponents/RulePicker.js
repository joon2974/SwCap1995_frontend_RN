import React, { Component } from 'react';
import { Picker } from 'react-native';
import propTypes from 'prop-types';

export default class RulePicker extends Component {
  static propTypes = {
    onValueChange: propTypes.func.isRequired,
  };

  render() {
    return (
      <Picker
        selectedValue={this.props.rule}
        onValueChange={this.props.onValueChange}
        style={{ width: this.props.pickerWidth, height: 50, marginLeft: 5 }}
        itemStyle={{ height: 40 }}
      >
        {this.props.rules.map((rule) => (
          <Picker.Item key={rule} label={rule} value={rule} />
        ))}
      </Picker>
    );
  }
}
