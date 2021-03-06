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
    myNickName: '',
  };

  componentDidMount() {
    this.getMyInfo();
  }

  onChangeText(targetNickname) {
    this.setState({ targetNickname });
  }

  getMyInfo = async () => {
    const response = await axios.get(
      'http://49.50.172.58:3000/users/me/' + this.props.route.params.userId,
    );
    this.setState({ myNickName: response.data.nickname });
  }

  sendFriendRequest=(userId, targetNickname, myNickName) => {
    if (myNickName === targetNickname) {
      alert('본인은 친구추가를 할 수 없습니다!');
      this.setState({ targetNickname: '' });
    } else {
      axios.put('http://49.50.172.58:3000/friends/add', {
        user_id: userId,
        nickname: targetNickname,
      }).then(() => {
        alert(targetNickname + '님께 친구요청을 보냈습니다');
        this.setState({ targetNickname: '' });
        this.props.navigation.popToTop();
      }).catch((err) => {
        if (err.response.status === 501) {
          alert('이미 친구로 등록된 사용자 입니다.');
          this.setState({ targetNickname: '' });
        } else {
          alert('없는 아이디 입니다.');
          this.setState({ targetNickname: '' });
        }
      });
    }
  }

  render() {
    const { targetNickname, userId, myNickName } = this.state;
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
          disabled={this.state.targetNickname.length === 0 ? true : false}

          onPress={() => {
            if (targetNickname !== '') {
              this.sendFriendRequest(userId, targetNickname, myNickName);
            } else {
              alert('닉네임이 입력되지 않았습니다');
            }
          }
        }
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
    paddingLeft: 10,
  },
});
