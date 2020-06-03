/* eslint-disable no-unused-vars */
import React, { Component } from 'react';
import {
  Text,
  View,
  StyleSheet,
  ScrollView,
  Dimensions,
  Image,
  TouchableOpacity,
  Platform,
  TextInput,
} from 'react-native';
import axios from 'axios';
import SpectorIcon from '../PlanScreens/PlanComponents/SpectorIcon';
import VariableCard from './VariableCard';

const { width, height } = Dimensions.get('window');

export default class MakePlanStepTest2 extends Component {
  state = {
    title: '',
    isPublic: false,
    data: [1, 2, 3, 4],
    onOff:0,
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
    const { title, isPublic } = this.state;

    return (
      <ScrollView style={styles.scrollViewStyle}>
       
        <View style={styles.container}>
          {
            this.state.data.map((data, index) => (
            <VariableCard 
              index={index} 
              onOff={this.state.onOff}
              changeShowing={() => {
                this.setState({onOff:index})
                console.log('bbbbbbbbbbbbbb')
              }} 
            />))
          }
          <View style={styles.lineDivider} />

        </View>
      </ScrollView>
    );
  }
}

const styles = StyleSheet.create({
  scrollViewStyle: {
    flex: 1,
  },
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
  componentTitleContainer: {
    width: width - 20,
    height: 30,
    alignItems: 'flex-start',
    justifyContent: 'center',
    marginLeft: 10,
    marginTop: 5,
    marginBottom: 5,
  },
  categoryContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    width: width,
    height: height * 0.2,
    flexDirection: 'row',
  },
  categoryImgContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    width: width * 0.3,
    height: height * 0.2,
  },
  imageStyle: {
    width: width * 0.3,
    height: width * 0.3,
    borderRadius: 20,
    marginLeft: 20,
  },
  categoryInfoContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    width: width * 0.7,
    height: height * 0.2,
  },
  timeContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    width: width,
    height: height * 0.2,
  },
  lineContainer: {
    alignItems: 'center',
    justifyContent: 'flex-start',
    width: width - 20,
    height: height / 17,
    flexDirection: 'row',
    marginLeft: 10,
  },
  friendtitle: {
    width: 80,
    height: 40,
    marginLeft: 5,
  },
  friends: {
    alignItems: 'center',
    justifyContent: 'flex-start',
    width: width - 100,
    height: height / 12,
    flexDirection: 'row',
    marginLeft: 10,
    flexWrap: 'wrap',
  },
  ruleContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    width: width,
    height: height * 0.2,
    marginTop: 5,
  },
  rulesContainerStyle: {
    alignItems: 'center',
    justifyContent: 'center',
    width: width,
    height: height * 0.2,
    flexDirection: 'row',
  },
  pointContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    width: width,
    height: height * 0.2,
  },
  friendsContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    width: width,
    height: height * 0.10,
    flexDirection: 'row',
  },
  additionalInfoContainer: {
    width: width,
    height: height * 0.2,
    alignItems: 'center',
    justifyContent: 'center',
  },
  titleContainer: {
    width: width,
    height: height * 0.1,
    alignItems: 'flex-start',
    justifyContent: 'center',
    flexDirection: 'row',
  },
  isPublicStyle: {
    width: width - 140,
    height: height * 0.1,
    alignItems: 'flex-start',
    justifyContent: 'center',
  },
  isPublicSelectContainer: {
    width: width,
    height: height * 0.1,
    alignItems: 'flex-start',
    justifyContent: 'center',
    flexDirection: 'row',
  },
  titleStyle: {
    width: 130,
    height: height * 0.1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  input: {
    width: width - 140,
    height: height * 0.1,
    borderRadius: 10,
    fontSize: 16,
    paddingLeft: 5,
  },
  selectedBtnStyle: {
    width: 80,
    height: 50,
    borderRadius: 10,
    backgroundColor: '#FFC0B0',
    alignItems: 'center',
    justifyContent: 'center',
  },
  unselectedBtmStyle: {
    width: 80,
    height: 50,
    borderRadius: 10,
    backgroundColor: '#F2F2F2',
    alignItems: 'center',
    justifyContent: 'center',
  },
  nextStepBtn: {
    width: width / 2,
    height: 40,
    backgroundColor: '#FD8A69',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 15,
    marginTop: 20,
    marginBottom: 10,
    ...Platform.select({
      ios: {
        shadowColor: 'rgb(50, 50, 50)',
        shadowOpacity: 0.1,
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
});
