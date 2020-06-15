/* eslint-disable react/no-access-state-in-setstate */
/* eslint-disable react/no-unused-state */
import React, { Component } from 'react';
import {
  View,
  Text, 
  Dimensions, 
  Button, 
  TouchableWithoutFeedback, 
  Keyboard, 
  Image, 
  TouchableOpacity, 
  StyleSheet,
} from 'react-native';
import Modal from 'react-native-modal';
import { Input } from 'react-native-elements';
import axios from 'axios';
import { CardSix, CardSeven } from '../SearchScreens/Cards';

const { width, height } = Dimensions.get('window');

export default class VariableCard extends Component {
  state={
    isModalVisible: false,
    currentComment: '',
    currentWatchStatus: -1,
    watchStatusResult: -1,
    authTitle: '',
    emoticon: [1, 2, 3, 4, 5],
    test4: './emoticons/emoticon1.png',
    currentEmoticon: 0,
  }


  async componentDidMount() {
    this.setWatcherPage();
   
    const test = this.props.data.createdAt.split('-');
    const test3 = this.props.data.updatedAt.split('-');
    let test2 = '';
    test2 = test2.concat('작성일: ', test[1], '월 ', test[2][0], test[2][1], '일\n수정일: ', test3[1], '월 ', test3[2][0], test3[2][1], '일');
    this.setState({ authTitle: test2 });
  }

  
  setWatcherPage=() => {
    axios
      .post('http://49.50.172.58:3000/daily_judges/is_exist', {
        headers: {
          'content-type': 'x-www-form-urlencoded',
        },
        user_id: this.props.userID,    
        daily_auth_id: this.props.data.id,
      })
      .then((res) => {
        if (res.data.count !== 0) {
          if (res.data.rows[0].is_correct === true) this.setState({ watchStatusResult: 1 });
          else this.setState({ watchStatusResult: 0 });
        }
      })
      .catch((error) => {
        console.log(error);
      });
  }


  toggleModal = (select) => {
    this.setState({
      isModalVisible: !this.state.isModalVisible,
      currentWatchStatus: select,
      currentEmoticon: 0, 
    });
  };

  toggleModal2 = () => {
    this.setState({ isModalVisible: !this.state.isModalVisible });
  }
  

  updateComment = (changedComment) => {
    this.setState({ currentComment: changedComment });
  };

  sendComment = () => {
    axios
      .post('http://49.50.172.58:3000/daily_judges', {
        headers: {
          'content-type': 'x-www-form-urlencoded',
        },
        user_id: this.props.userID,    
        daily_auth_id: this.props.data.id,
        is_correct: this.state.currentWatchStatus,
        emoticon: this.state.currentEmoticon,
        comment: this.state.currentComment,
        
      })
      .then((res) => {
        console.log(res.status);
      })
      .catch((error) => {
        console.log(error);
      });
      

    this.setState({ watchStatusResult: this.state.currentWatchStatus });
  }


  render() {
    let testVari = null;
    if (this.props.onOff === this.props.index) {
      testVari = (
        <View>
          <CardSix
            title={this.props.data.comment}
            subTitle={this.state.authTitle}
            image={{ uri: this.props.data.image_url }}
            icon1="check"
            iconColor1="#fff"
            iconBackground1="green"
            onClicked1={() => {
              this.toggleModal(1);
            }}
            switchShowing={this.props.changeShowing}
            icon2="remove"
            iconColor2="#fff"
            iconBackground2="#FD8A69"
            onClicked2={() => {
              this.toggleModal(0);
            }}
            checkBoxStatus={this.state.watchStatusResult}
            planData={this.props.planData}
      />
          <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
              
            <Modal isVisible={this.state.isModalVisible} style={{ alignItems: 'center', justifyContent: 'center' }} onBackButtonPress={this.toggleModal2}>
              <View style={{
                height: height / 3.8, width: width / 1.05, backgroundColor: 'white', borderRadius: 10, alignItems: 'center', justifyContent: 'space-between', 
              }}>
                <Text style={{ 
                  color: 'white', 
                  fontSize: 20,
                  textAlign: 'center',
                  textAlignVertical: 'center',
                  backgroundColor: '#FD8A69',
                  height: height / 20,
                  width: width / 1.05,
                  borderTopLeftRadius: 10,
                  borderTopRightRadius: 10, 
                }}>
                  당신의 느낌을 적어주세요
                </Text>
                <Input
                  placeholder="코멘트를 입력해 주세요"
                  onChangeText={(changedComment) => {
                    this.updateComment(changedComment);
                  }}
                  onSubmitEditing={() => {
                    this.toggleModal2();
                    this.sendComment();
                  }}
            />
                <View style={{ flexDirection: 'row' }}>
                  <TouchableOpacity 
                    style={this.state.currentEmoticon === 1 
                      ? styles.clickedEmoticon 
                      : styles.unclickedEmoticon} 
                    onPress={() => this.setState({ currentEmoticon: 1 })}>
                    <Image style={{ height: height / 15, width: width / 8 }} source={require('./emoticons/emoticon1.png')} />
                  </TouchableOpacity>
                  <TouchableOpacity 
                    style={this.state.currentEmoticon === 2 
                      ? styles.clickedEmoticon 
                      : styles.unclickedEmoticon} 
                    onPress={() => this.setState({ currentEmoticon: 2 })}>
                    <Image style={{ height: height / 15, width: width / 8 }} source={require('./emoticons/emoticon2.png')} />
                  </TouchableOpacity>
                  <TouchableOpacity 
                    style={this.state.currentEmoticon === 3 
                      ? styles.clickedEmoticon 
                      : styles.unclickedEmoticon} 
                    onPress={() => this.setState({ currentEmoticon: 3 })}>
                    <Image style={{ height: height / 15, width: width / 8 }} source={require('./emoticons/emoticon3.png')} />
                  </TouchableOpacity>
                  <TouchableOpacity 
                    style={this.state.currentEmoticon === 4 
                      ? styles.clickedEmoticon 
                      : styles.unclickedEmoticon} 
                    onPress={() => this.setState({ currentEmoticon: 4 })}>
                    <Image style={{ height: height / 15, width: width / 8 }} source={require('./emoticons/emoticon4.png')} />
                  </TouchableOpacity>
                  <TouchableOpacity 
                    style={this.state.currentEmoticon === 5 
                      ? styles.clickedEmoticon 
                      : styles.unclickedEmoticon} 
                    onPress={() => this.setState({ currentEmoticon: 5 })}>
                    <Image style={{ height: height / 15, width: width / 8 }} source={require('./emoticons/emoticon5.png')} />
                  </TouchableOpacity>
                </View>
                <View style={{ marginBottom: 10 }}>
                  <Button
                    title="코멘트 보내기"
                    type="solid"
                    color="#FD8A69"
                    onPress={() => {
                      this.toggleModal2();
                      this.sendComment();
                    }}
            />
                </View>
              </View>
            
            </Modal>
          </TouchableWithoutFeedback>

        </View>
      );
    } else {
      testVari = (
        <View>
          <CardSeven
            title={this.props.data.comment}
            subTitle={this.state.authTitle}
            image={{ uri: this.props.data.image_url }}
            icon1="check"
            iconColor1="#fff"
            iconBackground1="green" 
            onClicked1={() => {
              this.toggleModal(1);
            }}
            switchShowing={this.props.changeShowing}
            icon2="remove"
            iconColor2="#fff"
            iconBackground2="#FD8A69"
            onClicked2={() => {
              this.toggleModal(0);
            }}
            checkBoxStatus={this.state.watchStatusResult}
          />
          <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
         
            <Modal isVisible={this.state.isModalVisible} style={{ alignItems: 'center', justifyContent: 'center' }} onBackButtonPress={this.toggleModal}>
              <View style={{
                height: height / 5, width: width / 1.05, backgroundColor: 'white', borderRadius: 10, alignItems: 'center', justifyContent: 'space-between', 
              }}>
                <Text style={{ 
                  color: 'white', 
                  fontSize: 20,
                  textAlign: 'center',
                  textAlignVertical: 'center',
                  backgroundColor: '#FD8A69',
                  height: height / 20,
                  width: width / 1.05,
                  borderTopLeftRadius: 10,
                  borderTopRightRadius: 10, 
                }}>
                  당신의 느낌을 적어주세요
                </Text>
                <Input
                  placeholder="코멘트를 입력해 주세요"
                  onChangeText={(changedComment) => {
                    this.updateComment(changedComment);
                  }}  
                  onSubmitEditing={() => {
                    this.toggleModal2();
                    this.sendComment();
                  }}
            />

                <View style={{ marginBottom: 10 }}>
                  <Button
                    title="코멘트 보내기"
                    type="solid"
                    color="#FD8A69"
                    onPress={() => {
                      this.toggleModal2();
                      this.sendComment();
                    }}
            />
                </View>
              </View>
            </Modal>
          </TouchableWithoutFeedback>
        </View>
      );
    } 

    return (

      <View>
        {testVari}
      </View>
      
    );
  }
}


const styles = StyleSheet.create({
  clickedEmoticon: { 
    height: height / 14, 
    width: width / 7,
    justifyContent: 'center',
    alignItems: 'center',
    margin: 8,
    backgroundColor: '#FD8A69',
    borderRadius: 5, 
  },
  unclickedEmoticon: {
    height: height / 14, 
    width: width / 7,
    justifyContent: 'center',
    alignItems: 'center',
    margin: 8,
    backgroundColor: 'white',   
  },
}); 
