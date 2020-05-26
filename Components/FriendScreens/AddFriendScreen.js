import React, { Component } from 'react';
import { 
  View,
  StyleSheet,
  Button,
  Dimensions,
  TextInput,
} from 'react-native';
import axios from 'axios';

const { width } = Dimensions.get('window');
export default class AddFriendScreen extends Component {
  state = {
    targetNickname: '',
    userId: this.props.route.params.userId,
  };

  onChangeText(targetNickname) {
    this.setState({ targetNickname });
  }

  sendFriendRequest=(userId, targetNickname) => {
    console.log(targetNickname);
    console.log(this.props.route.params.userId);
    
    axios.put('http://49.50.172.58:3000/friends/add', {
      user_id: userId,
      nickname: targetNickname,
    }).then(function () {
      alert(targetNickname + '님께 친구요청을 보냈습니다');
    });
  }

  render() {
    const { targetNickname, userId } = this.state;
    return (
      <View style={styles.container}>
        <TextInput
          style={styles.inputTextcontainer}
          placeholder="닉네임을 입력하세요"
          value={this.state.targetNickname}
          onChangeText={(targetNickname) => this.setState({ targetNickname })}
         />
        <Button
          title="친구 요청 보내기"
          onPress={() => {
            this.sendFriendRequest(userId, targetNickname);
            this.props.navigation.popToTop();
          }}
         />
         
      </View>
    );
  }
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'white',
  },
  inputTextcontainer: {
    width: width - 40,
    height: 45,
    borderRadius: 10,
    borderWidth: 1,
    marginBottom: 5,
  },
});
