import React, { Component } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Picker,
  TouchableOpacity,
  AsyncStorage,
  Platform,
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
    await AsyncStorage.getItem('UserID').then((id) => {
      this.state.userId = id;
    });
  };

onRefresh = () => {
  this.props.route.params.onRefresh();
}

requestAddPoint(selectedValue) {
  axios.post(
    'http://49.50.172.58:3000/points/add', {
      user_id: this.state.userId,
      class: 'challenge',
      amount: selectedValue,
    },
  ).then(() => {
    alert(selectedValue + '원 충전신청이 되었습니다');
    this.props.route.params.onRefresh();
    this.props.navigation.popToTop();
  });
}

render() {
  const { selectedValue, userId } = this.state;

  return (
    <View style={styles.container}>
      <Text style={styles.textContainer}>충전 금액</Text>
      <View style={styles.addPointContainer}>
        <Picker
          selectedValue={selectedValue}
          style={{ width: 200, height: 45, marginLeft: 5 }}
          itemStyle={{ height: 45 }}
          onValueChange={(selectedValue) => this.setState({ selectedValue: selectedValue })}>
          <Picker.Item label="5000" value="5000" />
          <Picker.Item label="10000" value="10000" />
          <Picker.Item label="15000" value="15000" />
          <Picker.Item label="20000" value="20000" />
        </Picker>
      </View>
      <TouchableOpacity
        activeOpacity={0.8}
        style={styles.button}
        onPress={() => this.props.navigation.navigate('결제', { userId: userId, payment: selectedValue, onRefresh: this.onRefresh })}>
        <Text style={styles.text}>충전하기</Text>
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
    fontSize: 20,
    fontWeight: 'bold',
  },
  addPointContainer: {
    marginTop: 10,
  },
  button: {
    marginTop: 10,
    borderRadius: 10,
    backgroundColor: '#FD8A69',
    width: 80,
    height: 40,
    alignItems: 'center',
    justifyContent: 'center',
    ...Platform.select({
      ios: {
        shadowColor: 'rgb(50, 50, 50)',
        shadowOpacity: 0.2,
        shadowRadius: 5,
        shadowOffset: {
          height: -1,
          width: 0,
        },
      },
      android: {
        elevation: 4,
      },
    }),
  },
  text: {
    color: 'white',
  },
});
