import React, { Component } from 'react';
import { Picker } from 'react-native';
import propTypes from 'prop-types';

export default class PointPicker extends Component {
  static propTypes = {
    onValueChange: propTypes.func.isRequired,
  };

  render() {
    return (
      <Picker
        selectedValue={this.props.point}
        onValueChange={this.props.onValueChange}
        style={{ width: this.props.pickerWidth, height: 50, marginLeft: 5 }}
        itemStyle={{ height: 40 }}
      >
        {this.props.points.map((point) => (
          <Picker.Item key={point} label={point} value={point} />
        ))}
      </Picker>
    );
  }
}
