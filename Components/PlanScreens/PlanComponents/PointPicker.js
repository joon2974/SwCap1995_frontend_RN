import React, { Component } from 'react';
import { Picker, View, Dimensions } from 'react-native';
import propTypes from 'prop-types';

const { width } = Dimensions.get('window');

export default class PointPicker extends Component {
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
          width: this.props.pickerWidth,
        }}
      >
        <Picker
          selectedValue={this.props.point}
          onValueChange={this.props.onValueChange}
          style={{
            width: this.props.pickerWidth,
            height: 45,
            marginLeft: 5,
            borderRadius: 15,
          }}
          itemStyle={{ height: 40 }}
          mode="dropdown"
        >
          {this.props.points.map(point => (
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
