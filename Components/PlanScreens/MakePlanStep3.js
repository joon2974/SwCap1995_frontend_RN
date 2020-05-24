import React, { Component } from 'react';
import {
  Text,
  View,
  StyleSheet,
  ScrollView,
  Dimensions,
  Image,
  TouchableOpacity,
} from 'react-native';

const { width, height } = Dimensions.get('window');

export default class MakePlanStep3 extends Component {
  render() {
    return (
      <ScrollView style={styles.scrollViewStyle}>
        <View style={styles.container}>
          <View style={styles.categoryContainer}>
            <View style={styles.categoryImgContainer}>
              <Image 
                source={{ uri: 'https://ifh.cc/g/BHltgC.jpg' }} 
                style={styles.imageStyle}
              />
            </View>
            <View style={styles.categoryInfoContainer}>
              <Text style={{ fontWeight: 'bold', fontSize: 25 }}>{this.props.route.params.category}</Text>
              <Text>{this.props.route.params.planName}</Text>
            </View>
          </View>
          <View style={styles.timeContainer}>
            <View style={styles.lineContainer}>
              <Text style={{ fontWeight: 'bold', fontSize: 20 }}>시작 날짜  </Text>
              <Text>{this.props.route.params.startDate}</Text>
            </View>
            <View style={styles.lineContainer}>
              <Text style={{ fontWeight: 'bold', fontSize: 20 }}>플랜 기간  </Text>
              <Text>{this.props.route.params.endDate}</Text>
            </View>
            <View style={styles.lineContainer}>
              <Text style={{ fontWeight: 'bold', fontSize: 20 }}>인증 시간  </Text>
              <Text>{this.props.route.params.certifyTime}</Text>
            </View>
          </View>
          <View style={styles.ruleContainer}>
            <View style={styles.categoryImgContainer}>
              <Image 
                source={{ uri: this.props.route.params.certifyImgUri }} 
                style={styles.imageStyle}
              />
            </View>
            <View style={styles.categoryInfoContainer}>
              <Text>{this.props.route.params.selectedMainRule}</Text>
              <Text>{this.props.route.params.subRule1}</Text>
              <Text>{this.props.route.params.subRule2}</Text>
            </View>
          </View>
          <View style={styles.pointContainer}>
            <View style={styles.lineContainer}>
              <Text style={{ fontWeight: 'bold', fontSize: 20 }}>도전 포인트  </Text>
              <Text>{this.props.route.params.challPoint}</Text>
            </View>
            <View style={styles.lineContainer}>
              <Text style={{ fontWeight: 'bold', fontSize: 20 }}>차감 %  </Text>
              <Text>{this.props.route.params.minusPercent}</Text>
            </View>
            <View style={styles.lineContainer}>
              <Text style={{ fontWeight: 'bold', fontSize: 20 }}>분배 방식  </Text>
              <Text>{this.props.route.params.distribMethod}</Text>
            </View>
          </View>
          <View style={styles.friendsContainer}>
            <View style={styles.lineContainer}>
              <Text style={{ fontWeight: 'bold', fontSize: 20 }}>감시자  </Text>
              {this.props.route.params.spectors.map((friend) => (
                <Text key={friend}>
                  {friend}
                  {' '}
                </Text>
              ))}
            </View>
          </View>
          <TouchableOpacity
            style={styles.nextStepBtn}
            onPress={() => alert('플랜 생성!')}
          >
            <Text>플랜 생성하기</Text>
          </TouchableOpacity>
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
    marginLeft: 10,
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
    height: height / 15,
    flexDirection: 'row',
    marginLeft: 10,
  },
  ruleContainer: {
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
    height: height * 0.15,
  },
  nextStepBtn: {
    width: width / 2,
    height: 40,
    backgroundColor: '#00FF80',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 15,
    marginTop: 5,
    marginBottom: 10,
  },
});
