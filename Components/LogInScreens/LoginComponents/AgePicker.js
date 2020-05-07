import React, { Component } from 'react';
import { Picker } from 'react-native';
import propTypes from 'prop-types';

export default class AgePicker extends Component {
  static propTypes = {
    onValueChange: propTypes.func.isRequired,
  };

  render() {
    return (
      <Picker
        selectedValue={this.props.age}
        onValueChange={this.props.onValueChange}
        style={{ width: 200, height: 45, marginLeft: 5 }}
        itemStyle={{ height: 45 }}
      >
        {this.props.ages.map((age) => (
          <Picker.Item key={age} label={age} value={age} />
        ))}
      </Picker>
    );
  }
}
