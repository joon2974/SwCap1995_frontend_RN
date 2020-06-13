/* eslint-disable react/no-access-state-in-setstate */
/* eslint-disable react/no-unused-state */
import React, { Component } from 'react';
import {
  View,
} from 'react-native';
import axios from 'axios';
import { CardSix2, CardSeven2 } from './Cards';


export default class VariableCard extends Component {
  state={
    isModalVisible: false,
    currentComment: '',
    currentWatchStatus: 0,
    watchStatusResult: 0,
    planData: [],
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
