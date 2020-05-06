import React, { Component } from 'react';
import { Text, TouchableOpacity } from 'react-native';
import propTypes from 'prop-types';

export default class CheckBox extends Component {
  static propTypes = {
    isChecked: propTypes.string.isRequired,
    categoryName: propTypes.string.isRequired,
    checkedStyle: propTypes.oneOfType.isRequired,
    unCheckedStyle: propTypes.oneOfType.isRequired,
    pressFunc: propTypes.func.isRequired,
  };

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
