/* eslint-disable react/no-access-state-in-setstate */
/* eslint-disable react/no-unused-state */
import React, { Component } from 'react';
import {
  View, Text, Dimensions, Button, TouchableWithoutFeedback, Keyboard,
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
  }


  componentDidMount() {
    this.setWatcherPage();
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
    this.setState({ isModalVisible: !this.state.isModalVisible, currentWatchStatus: select });
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
        emoticon: 0,
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
            subTitle={'작성일: ' + this.props.data.createdAt + '\n수정일: ' + this.props.data.updatedAt}
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
    } else {
      testVari = (
        <View>
          <CardSeven
            title={this.props.data.comment}
            subTitle={'작성일: ' + this.props.data.createdAt + '\n수정일: ' + this.props.data.updatedAt}
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
