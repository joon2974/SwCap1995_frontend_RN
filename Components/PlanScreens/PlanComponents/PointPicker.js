import React, { Component } from 'react';
import {
  Picker,
  View,
  Platform,
} from 'react-native';
import propTypes from 'prop-types';

export default class PointPicker extends Component {
  static propTypes = {
    onValueChange: propTypes.func.isRequired,
  };

  render() {
    return (
      <View
        style={{
          ...Platform.select({
            android: {
              width: this.props.pickerWidth,
              marginLeft: 3,
              marginRight: 3,
              marginTop: 1, 
              borderColor: '#FD8A69',
              borderWidth: 3,
              borderRadius: 10,
            },
          }),
        }}
      >
        <Picker
          selectedValue={this.props.point}
          onValueChange={this.props.onValueChange}
          style={{
            width: this.props.pickerWidth,
            height: 45,
            marginLeft: 3,
            marginRight: 3,
            marginTop: 1, 
            borderColor: '#FD8A69',
            borderWidth: 3,
            borderRadius: 10,
          }}
          itemStyle={{ height: 42 }}
          mode="dropdown"
        >
          {this.props.points.map((point) => (
            <Picker.Item
              key={point}
              label={point}
              value={point}
              style={{ alignText: 'center' }}
            />
          ))}
        </Picker>
      </View>
    );
  }
}
