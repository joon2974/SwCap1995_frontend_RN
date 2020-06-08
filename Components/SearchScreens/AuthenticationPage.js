/* eslint-disable react/no-unused-state */
/* eslint-disable no-unused-vars */
import React, { Component } from 'react';
import {
  View,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  Dimensions,
  Text,
  Platform,
} from 'react-native';
import axios from 'axios';
import VariableCard from './VariableCard';

const { width, height } = Dimensions.get('window');

export default class AuthenticationPage extends Component {
  state = {
    title: '',
    isPublic: false,
    data: [1, 2, 3, 4, 5, 6],
    onOff: 0,
    selectedTab: 0,
    tabState: 0,
  }

  // sendPlanInfo = () => {
  //   const today = new Date();
  //   today.setDate(Number(this.props.route.params.startDate));

  //   axios
  //     .post('http://49.50.172.58:3000/plans', {
  //       headers: {
  //         'Content-type': 'application/x-www-form-urlencoded',
  //       },
  //       user_id: Number(this.props.route.params.userID),
  //       title: this.state.title,
  //       category: this.props.route.params.category,
  //       detailedCategory: this.props.route.params.planName,
  //       picture_rule_1: this.props.route.params.selectedMainRule,
  //       picture_rule_2: this.props.route.params.subRule1,
  //       picture_rule_3: this.props.route.params.subRule2,
  //       custom_picture_rule_1: '없음',
  //       custom_picture_rule_2: '없음',
  //       custom_picture_rule_3: '없음',
  //       plan_period: Number(this.props.route.params.endDate),
  //       picture_time: Number(this.props.route.params.certifyTime),
  //       plan_start_day: today,
  //       bet_money: Number(this.props.route.params.challPoint),
  //       is_public: this.state.isPublic,
  //       percent: Number(this.props.route.params.percent),
  //       spectors: this.props.route.params.spectors.join(),
  //       distribMethod: this.props.route.params.distribMethod,
  //     })
  //     .then((res) => {
  //       console.log(res.status);
  //     })
  //     .catch((error) => {
  //       console.log(error);
  //     });
  // };


  render() {
    return (

      <View>
        <View style={{ flexDirection: 'row' }}>
          <TouchableOpacity
            style={
            this.state.selectedTab === 0
              ? styles.selectedCategoryBtnStyle
              : styles.categoryBtnStyle
        }
            onPress={() => this.setState({ selectedTab: 0, tabState: 0 })}
      >
            <Text style={this.state.selectedTab === 0 ? { color: 'white' } : { color: 'black' }}>인증</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={
          this.state.selectedTab === 1
            ? styles.selectedCategoryBtnStyle
            : styles.categoryBtnStyle
        }
            onPress={() => this.setState({ selectedTab: 1, tabState: 1 })}
      >
            <Text style={this.state.selectedTab === 1 ? { color: 'white' } : { color: 'black' }}>??</Text>
          </TouchableOpacity>
        </View>
        
        {this.state.tabState === 0 ? (

          <ScrollView style={{ marginBottom: 40 }}>
       
            <View style={styles.container}>
              {
                this.state.data.map((data, index) => (
                  <VariableCard 
                    index={index} 
                    onOff={this.state.onOff}
                    changeShowing={() => {
                      this.setState({ onOff: index });
                    }} 
                />
                ))
              }
              <View style={styles.lineDivider} />

            </View>
          </ScrollView>
        ) : (<View />) }
       
    
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'white',
  },
  lineDivider: {
    backgroundColor: '#F2F2F2',
    width: width - 30,
    height: 1.5,
    marginLeft: 15,
    marginBottom: 10,
    marginTop: 15,
  },
  categoryBtnStyle: {
    width: width * 0.495,
    height: 40,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 5,
    margin: 1,
  },

  selectedCategoryBtnStyle: {
    width: width * 0.495,
    height: 40,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#FD8A69',
    borderRadius: 5,
    margin: 1,
  },
 
});
