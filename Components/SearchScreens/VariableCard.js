/* eslint-disable react/no-access-state-in-setstate */
/* eslint-disable react/no-unused-state */
import React, { Component } from 'react';
import {
  View,
  Text,
  TouchableWithoutFeedback,
  Keyboard,
  Dimensions,
} from 'react-native';
import axios from 'axios';
import Modal from 'react-native-modal';
import { CardSix2, CardSeven2 } from './Cards';
import AuthWatcher from './TabList/AuthWatcher';

const { width } = Dimensions.get('window');

export default class VariableCard extends Component {
  state={
    isModalVisible: false,
    currentComment: '',
    currentWatchStatus: 0,
    watchStatusResult: 0,
    planData: [],
    watchers: [],
    testComment: '',
    authTitle: '',
  }

  componentDidMount() {
    if (this.props.data.status === 'done') {
      this.setState({ watchStatusResult: 1 });
    }
    this.setTable();
    this.setState({ watchers: this.props.data.daily_judges });


    const test = this.props.data.createdAt.split('-');
    let test2 = '';
    test2 = test2.concat(test[1], '월 ', test[2][0], test[2][1], '일 인증');
    this.setState({ authTitle: test2 });
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

  render() {
    let testVari = null;

    let comment = null;
    if (this.state.watchers.length === 0) {
      comment = (<View style={{ margin: 10 }}><Text>코멘트 없음</Text></View>);
    } else {
      comment = (
        <View style={{ marginVertical: 20 }}>
          {this.state.watchers.map((data) => (
            <View key={data}>
              <AuthWatcher 
                key={data}
                userID={data.user_id}
                comment={data.comment}
              />
            </View>
          ))}
        </View>
      ); 
    }

    if (this.props.onOff === this.props.index) {
      testVari = (
        <View>
          <CardSix2
            title={this.state.authTitle}
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
            exploreComment={this.toggleModal}
      />
          <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
              
            <Modal isVisible={this.state.isModalVisible} style={{ alignItems: 'center', justifyContent: 'center' }} onBackButtonPress={this.toggleModal}>
              <View style={{
                width: width / 1.05, backgroundColor: 'white', borderRadius: 10, alignItems: 'center', justifyContent: 'space-between', 
              }}>
                <Text style={{ 
                  color: 'white', 
                  fontSize: 20,
                  textAlign: 'center',
                  textAlignVertical: 'center',
                  backgroundColor: '#FD8A69',
                  width: width / 1.05,
                  borderTopLeftRadius: 10,
                  borderTopRightRadius: 10, 
                }}>
                  감시자들의 코멘트
                </Text>
                
                {comment}
               
              </View>
              
            </Modal>
          </TouchableWithoutFeedback>


        </View>
      );
    } else {
      testVari = (
        <View>
          <CardSeven2
            title={this.state.authTitle}
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
            exploreComment={this.toggleModal}
            />
          <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
              
            <Modal isVisible={this.state.isModalVisible} style={{ alignItems: 'center', justifyContent: 'center' }} onBackButtonPress={this.toggleModal}>
              <View style={{
                width: width / 1.05, backgroundColor: 'white', borderRadius: 10, alignItems: 'center', justifyContent: 'space-between', 
              }}>
                <Text style={{ 
                  color: 'white', 
                  fontSize: 20,
                  textAlign: 'center',
                  textAlignVertical: 'center',
                  backgroundColor: '#FD8A69',
                  width: width / 1.05,
                  borderTopLeftRadius: 10,
                  borderTopRightRadius: 10, 
                }}>
                  감시자들의 코멘트
                </Text>
                  
                {comment}
                 
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
