import React, { Component } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  Dimensions,
  TextInput,
} from 'react-native';
import PointPicker from './PlanComponents/PointPicker';

const { width, height } = Dimensions.get('window');

export default class MakePlanStep2 extends Component {
  state = {
    point: 1984,
    challPoint: 184,
    friends: ['5882', '닉네임', '닉네임2'],
    userBetPoint: 0,
    selectedPercent: 0,
    selectedDist: 0,
    percentList: ['5%', '10%', '20%'],
    distribList: ['공평하게 n분의 1', '선착순', '추첨'],
  };

  render() {
    const {
      point,
      challPoint,
      friends,
      userBetPoint,
      selectedPercent,
      selectedDist,
      percentList,
      distribList,
    } = this.state;
    return (
      <ScrollView style={styles.scrollContainer}>
        <View style={styles.container}>
          <View style={styles.pointContainer}>
            <View style={styles.currentPoint}>
              <View style={styles.currentPointEach}>
                <Text style={{ fontWeight: 'bold', fontSize: 20 }}>
                  잔여 포인트: 
                  {' '}
                  {point}
                </Text>
              </View>
              <View style={styles.currentPointEach}>
                <Text style={{ fontWeight: 'bold', fontSize: 20 }}>
                  도전 포인트: 
                  {' '}
                  {challPoint}
                </Text>
              </View>
            </View>
            <View style={styles.challengePoint}>
              <Text style={{ fontWeight: 'bold', fontSize: 20 }}>도전 금액:</Text>
              <TextInput
                value={userBetPoint}
                onChangeText={(Point) => this.setState({ userBetPoint: Point })}
                style={styles.betInput}
                placeholder="도전에 걸 금액"
              />
              <Text style={{ fontSize: 10 }}>최소 5000원 ~ 최대 50,000원</Text>
            </View>
            <View style={styles.distribPoint}>
              <View style={styles.distribPointEach}>
                <Text>실패시 차감 %</Text>
                <PointPicker
                  point={selectedPercent}
                  onValueChange={(itemValue) => this.setState({ selectedPercent: itemValue })}
                  points={percentList}
                  pickerWidth={width / 2}
                />
              </View>
              <View style={styles.distribPointEach}>
                <Text>실패 포인트 분배 방식</Text>
                <PointPicker
                  point={selectedDist}
                  onValueChange={(itemValue) => this.setState({ selectedDist: itemValue })}
                  points={distribList}
                  pickerWidth={width / 2}
                />
              </View>
            </View>
          </View>
          <View style={styles.friendContainer}>
            <Text>{friends}</Text>
          </View>
        </View>
      </ScrollView>
    );
  }
}

const styles = StyleSheet.create({
  scrollContainer: {
    flex: 1,
    backgroundColor: 'white',
  },
  container: {
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'white',
  },
  pointContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    width: width,
    height: height * 0.4,
  },
  currentPoint: {
    justifyContent: 'center',
    alignItems: 'center',
    width: width,
    height: height * 0.1,
    flexDirection: 'row',
  },
  currentPointEach: {
    justifyContent: 'center',
    alignItems: 'center',
    width: width / 2,
    height: height * 0.1,
  },
  challengePoint: {
    justifyContent: 'center',
    alignItems: 'center',
    width: width,
    height: height * 0.1,
    flexDirection: 'row',
  },
  betInput: {
    width: width * 0.3,
    height: height * 0.1,
    marginLeft: 10,
  },
  distribPoint: {
    justifyContent: 'center',
    alignItems: 'center',
    width: width,
    height: height * 0.2,
  },
  distribPointEach: {
    justifyContent: 'center',
    alignItems: 'center',
    width: width,
    height: height * 0.1,
    flexDirection: 'row',
  },
  friendContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'green',
    width: width,
    height: height / 2,
  },
});
