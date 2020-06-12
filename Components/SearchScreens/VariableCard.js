/* eslint-disable react/no-access-state-in-setstate */
/* eslint-disable react/no-unused-state */
import React, { Component } from 'react';
import {
  View, Text, Dimensions, Button, TouchableWithoutFeedback, Keyboard,
} from 'react-native';
import Modal from 'react-native-modal';
import { Input } from 'react-native-elements';
import { CardSix2, CardSeven2 } from './Cards';

const { width, height } = Dimensions.get('window');

export default class VariableCard extends Component {
  state={
    isModalVisible: false,
    currentComment: '',
    currentWatchStatus: 0,
    watchStatusResult: 1,
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
    alert('구현해이새기야\n\ncomment: ' + this.state.currentComment);
    this.setState({ watchStatusResult: this.state.currentWatchStatus });
  }

  render() {
    let testVari = null;
    if (this.props.onOff === this.props.index) {
      testVari = (
        <View>
          <CardSix2
            title="Vinny’s Barber"
            subTitle="852 N Virgil Ave, Beverly Hills"
            profile={{
              uri:
            'https://lemag.nikonclub.fr/wp-content/uploads/2016/11/Photo-selection-pour-Nikon-France-Mattia-Bonavida-2016-6.jpg',
            }}
            image={{
              uri:
            'https://idinterdesign.ca/wp-content/uploads/2016/07/paysage-ID-02-750x468.jpg',
            }}
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
              this.toggleModal(2);
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
    } else {
      testVari = (
        <View>
          <CardSeven2
            title="Vinny’s Barber"
            subTitle="852 N Virgil Ave, Beverly Hills"
            image={{
              uri:
                'https://idinterdesign.ca/wp-content/uploads/2016/07/paysage-ID-02-750x468.jpg',
            }}
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
              this.toggleModal(2);
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
