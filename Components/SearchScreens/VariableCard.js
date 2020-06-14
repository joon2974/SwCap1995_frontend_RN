/* eslint-disable react/no-access-state-in-setstate */
/* eslint-disable react/no-unused-state */
import React, { Component } from 'react';
import {
  View,
  Text,
  Button,  
  TouchableWithoutFeedback,
  Keyboard,
  Dimensions,
} from 'react-native';
import axios from 'axios';
import { Input } from 'react-native-elements';
import Modal from 'react-native-modal';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { CardSix2, CardSeven2 } from './Cards';
import Watcher from './TabList/Watcher';

const { width, height } = Dimensions.get('window');


export default class VariableCard extends Component {
  state={
    isModalVisible: false,
    currentComment: '',
    currentWatchStatus: 0,
    watchStatusResult: 0,
    planData: [],
    watchers: [1, 2, 3],
    watchersComment: [1, 2, 3],
  }

  componentDidMount() {
    if (this.props.data.status === 'done') {
      this.setState({ watchStatusResult: 1 });
    }
    this.setTable();
  }
  
  setTable = () => {
    axios.get('http://49.50.172.58:3000/plans/' + this.props.data.plan_id).then((res) => {
      this.setState({ planData: res.data });
    }).catch((error) => {
      console.log(error);
      alert(error);
    });
  }

  toggleModal = () => {
    this.setState({ isModalVisible: !this.state.isModalVisible });
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
            title={this.props.data.id}
            subTitle={this.props.data.comment}
            image={{ uri: this.props.data.image_url }}
            
            icon1="check"
            iconColor1="#fff"
            iconBackground1="green"
            
            icon2="remove"
            iconColor2="#fff"
            iconBackground2="#FD8A69"
            

            icon3="exclamation"
            iconColor3="#fff"
            iconBackground3="#D1CC32"
            

            authData={this.props.data}
            checkBoxStatus={this.state.watchStatusResult}
            planData={this.state.planData}
      />
          <TouchableOpacity style={{ height: 50, width: 50, backgroundColor: 'red' }} onPress={this.toggleModal} />
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
                  감시자들의 코멘트
                </Text>
                
                <View>
                  {
                  this.state.watchers.map((data, index) => (
                    <View key={data}>
                      <Watcher 
                        key={data}
                        index={index}
                        comment={this.state.watchersComment}
                      />
                    </View>
                  ))                                
                }
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
            title={this.props.data.id}
            subTitle={this.props.data.comment}
            image={{ uri: this.props.data.image_url }}
            icon1="check"
            iconColor1="#fff"
            iconBackground1="green" 
          
            switchShowing={this.props.changeShowing}
            icon2="remove"
            iconColor2="#fff"
            iconBackground2="#FD8A69"
           
            
            icon3="exclamation"
            iconColor3="#fff"
            iconBackground3="#D1CC32"

            authData={this.props.data}
            checkBoxStatus={this.state.watchStatusResult}
            planData={this.state.planData}
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
