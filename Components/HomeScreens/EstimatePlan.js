import React, { Component } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Dimensions,
  Image,
  TouchableOpacity,
  Platform,
  AsyncStorage,

} from 'react-native';

import { RadioButton } from 'react-native-paper';
import axios from 'axios'; 


const { width, height } = Dimensions.get('window');
export default class EstimatePlan extends Component {
  state={
    planData: [],
    imgPoint: '0',
    rulePoint: '0',
    userId: '',
  }

  componentDidMount() {
    this.loadUserID();
    this.loadPlanInfo();
  }

  loadUserID = async () => {
    await AsyncStorage.getItem('UserID').then((id) => {
      this.setState({ userId: id });
    });
  };

  loadPlanInfo() {
    axios.get(
      'http://49.50.172.58:3000/plans/' + this.props.route.params.id,
    ).then((res) => {
      const planInfo = res.data;
      const obj = {
        title: planInfo.title,
        uri: planInfo.image_url,
        rule1: planInfo.custom_picture_rule_1,
        rule2: planInfo.custom_picture_rule_2,
        rule3: planInfo.custom_picture_rule_3,
      };
      this.setState({ planData: obj });
    });
  }

  checkSubmit() {
    console.log('아이디', this.state.userId);
    console.log('플랜', this.props.route.params.id);
    console.log(this.state.imgPoint, this.state.rulePoint);
    if (this.state.imgPoint !== '0' && this.state.rulePoint !== '0') {
      axios.post(
        'http://49.50.172.58:3000/agreements/is_exist', {
          user_id: this.state.userId,
          plan_id: this.props.route.params.id,
        },
      ).then((res) => { console.log('성공', res); this.estimateSubmit(); })
        .catch((res) => {
          console.log('실패', res);
          alert('이미 평가하셨습니다');
        }); 
    } else {
      alert('체크하지 않은 항목이 있습니다');
    } 
  }
  
  estimateSubmit() {
    axios.post(
      'http://49.50.172.58:3000/agreements', {
        user_id: this.state.userId,
        plan_id: this.props.route.params.id,
        rule_1_point: this.state.imgPoint,
        rule_2_point: this.state.rulePoint,
        
      },
    );
  }

  render() {
    const { planData, imgPoint, rulePoint } = this.state;
    return (
      <View style={styles.container}>
        <View style={styles.estimateContainer}>
          <View style={styles.InfoContainer}>
            <Text style={styles.titlestyle}>
              {planData.title}
            </Text>
            <Image
              style={styles.imgstyle}
              source={{
                uri: planData.uri,
              }}
          />
          </View>
          <View style={{ flexDirection: 'row' }}>
            <Text>마음에 들지 않아요                                    마음에 들어요</Text>
          </View>
          <View style={{
            flexDirection: 'row', justifyContent: 'space-between', width: width, paddingHorizontal: 80, 
          }}>
            <RadioButton
              value="1"
              status={imgPoint === '1' ? 'checked' : 'unchecked'}
              onPress={() => { this.setState({ imgPoint: '1' }); }}
           />
            <RadioButton
              value="2"
              status={imgPoint === '2' ? 'checked' : 'unchecked'}
              onPress={() => { this.setState({ imgPoint: '2' }); }}
        />
            <RadioButton
              value="3"
              status={imgPoint === '3' ? 'checked' : 'unchecked'}
              onPress={() => { this.setState({ imgPoint: '3' }); }}
        />
            <RadioButton
              value="4"
              status={imgPoint === '4' ? 'checked' : 'unchecked'}
              onPress={() => { this.setState({ imgPoint: '4' }); }}
        />
            <RadioButton
              value="5"
              status={imgPoint === '5' ? 'checked' : 'unchecked'}
              onPress={() => { this.setState({ imgPoint: '5' }); }}
        />  
          </View>

          <View style={styles.ruleContainer}>
            <Text>
              Rule1:
              {planData.rule1}
            </Text>
            <Text>
              Rule2:
              {planData.rule2}
            </Text>
            <Text>
              Rule3:
              {planData.rule3}
            </Text>
          </View>
          <View style={{ flexDirection: 'row' }}>
            <Text>마음에 들지 않아요                                    마음에 들어요</Text>
          </View>
          <View style={{
            flexDirection: 'row', justifyContent: 'space-between', width: width, paddingHorizontal: 80, 
          }}>
            <RadioButton
              value="1"
              status={rulePoint === '1' ? 'checked' : 'unchecked'}
              onPress={() => { this.setState({ rulePoint: '1' }); }}
           />
            <RadioButton
              value="2"
              status={rulePoint === '2' ? 'checked' : 'unchecked'}
              onPress={() => { this.setState({ rulePoint: '2' }); }}
        />
            <RadioButton
              value="3"
              status={rulePoint === '3' ? 'checked' : 'unchecked'}
              onPress={() => { this.setState({ rulePoint: '3' }); }}
        />
            <RadioButton
              value="4"
              status={rulePoint === '4' ? 'checked' : 'unchecked'}
              onPress={() => { this.setState({ rulePoint: '4' }); }}
        />
            <RadioButton
              value="5"
              status={rulePoint === '5' ? 'checked' : 'unchecked'}
              onPress={() => { this.setState({ rulePoint: '5' }); }}
        />  
          </View>
          
          <TouchableOpacity
            activeOpacity={0.8}
            style={styles.button}
            onPress={() => this.checkSubmit()}>
            <Text style={styles.text}>제출</Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
    width: width,
    height: height,
  },
  estimateContainer: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  imgstyle: {
    width: width * 0.4,
    height: width / 1.6 - 40,
    marginTop: 10,
  },
  titlestyle: {
    fontSize: 20,
  },
  button: {
    borderRadius: 15,
    width: 60,
    height: 30,
    backgroundColor: '#FD8A69',
    justifyContent: 'center',
    alignItems: 'center',
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
  
  InfoContainer: {
    marginVertical: 10,
    width: width * 0.9,
    height: height / 2.5,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 15,
    backgroundColor: 'white',
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
  ruleContainer: {
    marginVertical: 10,
    width: width * 0.9,
    height: height / 6,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 15,
    backgroundColor: 'white',
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
