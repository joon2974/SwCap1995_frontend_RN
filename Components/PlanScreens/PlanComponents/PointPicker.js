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
        style={{
          width: this.props.pickerWidth, height: 45, marginLeft: 5, borderRadius: 15,
        }}
        itemStyle={{ height: 40 }}
        mode="dropdown"
      >
        {this.props.points.map((point) => (
          <Picker.Item key={point} label={point} value={point} style={{ alignText: 'center' }} />
        ))}
      </Picker>
    );
  }
}
