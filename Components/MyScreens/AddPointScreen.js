import React, { Component } from 'react';
import {
  View, Text, StyleSheet, Picker, TouchableOpacity, AsyncStorage,
} from 'react-native';

import axios from 'axios';

export default class AddPointScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      userId: '',
      selectedValue: '5000',
    };
  }

  componentDidMount() {
    this.loadUserID();
  }

  loadUserID = async () => {
    console.log(this.state.userId);
    await AsyncStorage.getItem('UserID').then((id) => {
      this.state.userId = id;

      console.log('완료', this.state.userId);
    });
  };
onRefresh=()=>{
  this.props.route.params.onRefresh();
}
  requestAddPoint(selectedValue) {
    console.log('보낼때 유저아이디', this.state.userId);
    axios.post(
      'http://49.50.172.58:3000/points/add', {
        user_id: this.state.userId,
        class: 'challenge',
        amount: selectedValue,
      },
    ).then(() => {
      console.log(this.props);
      alert(selectedValue + '원 충전신청이 되었습니다');
      this.props.route.params.onRefresh();
      this.props.navigation.popToTop();
    });
  }

  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.textContainer}>포인트 충전페이지</Text>

        <View style={styles.addPointContainer}>
          <Text>충전금액</Text>
          <Picker
            selectedValue={this.state.selectedValue}
            style={{ height: 50, width: 150 }}
            onValueChange={(selectedValue) => this.setState({ selectedValue: selectedValue })
            }
          >
            <Picker.Item label="5000" value="5000" />
            <Picker.Item label="10000" value="10000" />
            <Picker.Item label="15000" value="15000" />
            <Picker.Item label="20000" value="20000" />
          </Picker>
        </View>
        <TouchableOpacity
          activeOpacity={0.8}
          style={styles.button}
          onPress={() => this.props.navigation.navigate('결제', { userId: this.state.userId, payment: this.state.selectedValue,onRefresh: this.onRefresh })}>
          <Text style={styles.text}>충전</Text>
        </TouchableOpacity>
      </View>
    );
  }
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
    alignItems: 'center',
    justifyContent: 'center',
  },
  textContainer: {
    color: 'black',
  },
});
