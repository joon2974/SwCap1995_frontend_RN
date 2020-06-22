import React, { Component } from 'react';
import { Picker, View, Dimensions } from 'react-native';
import propTypes from 'prop-types';

const { width } = Dimensions.get('window');
export default class RulePicker extends Component {
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
          width: width - 20,
        }}
      >
        <Picker
          selectedValue={this.props.rule}
          onValueChange={this.props.onValueChange}
          style={{
            width: this.props.pickerWidth,
            width: width - 20,
            height: 50,
            marginLeft: 5,
          }}
          itemStyle={{ height: 40 }}
          mode="dropdown"
        >
          {this.props.rules.map(rule => (
            <Picker.Item key={rule} label={rule} value={rule} />
          ))}
        </Picker>
      </View>
    );
  }
}
