import React, { Component } from 'react';
import { Text, TouchableOpacity } from 'react-native';

export default class CheckBox extends Component {
  render() {
    const {
      isChecked,
      categoryName,
      checkedStyle,
      unCheckedStyle,
      pressFunc,
    } = this.props;
    return (
      <TouchableOpacity
        style={isChecked ? checkedStyle : unCheckedStyle}
        onPress={pressFunc}
      >
        <Text>{categoryName}</Text>
      </TouchableOpacity>
    );
  }
}
