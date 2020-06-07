import React, { Component } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  Dimensions,
  TextInput,
  TouchableOpacity,
  Platform,
} from 'react-native';
import axios from 'axios';
import PointPicker from './PlanComponents/PointPicker';
import FriendListEach from './PlanComponents/FriendListEach';
import SelectedFriendListEach from './PlanComponents/SelectedFriendListEach';

const { width, height } = Dimensions.get('window');

export default class MakePlanStep2 extends Component {
  state = {
    point: 0,
    challPoint: 0,
    friends: ['5882', '닉네임', '닉네임2'],
    selectedFriends: [],
    userBetPoint: '',
    selectedPercent: '5%',
    selectedDist: '공평하게 n분의 1',
    percentList: ['5', '10', '20'],
    distribList: ['공평하게 n분의 1', '선착순', '추첨'],
  };

  componentDidMount() {
    this.getFriends();
    this.getUserPoint();
  }

  addSpector = (friend, friendList, selectedFriendList) => {
    const idx = friendList.indexOf(friend);

    friendList.splice(idx, 1);
    selectedFriendList.push(friend);
    this.setState({ friends: friendList, selectedFriends: selectedFriendList });
  }

  restoreFriend = (friend, friendList, selectedFriendList) => {
    const idx = selectedFriendList.indexOf(friend);

    selectedFriendList.splice(idx, 1);
    friendList.push(friend);
    this.setState({ friends: friendList, selectedFriends: selectedFriendList });
  }

  getFriends = async () => {
    const userID = this.props.route.params.userID;
    const response = await axios.get(
      'http://49.50.172.58:3000/friends/' + userID,
    );
    const responseJson = await response.data.rows;
    const count = await response.data.count;
    const friendarray = [];
    try {
      if (count !== 0) {
        for (var i = 0; i < count; i++) {
          friendarray.push(responseJson[i].nickname);
          this.setState({
            friends: friendarray,
          });
        }
      }
    } catch (error) {
      console.error(error);
    }
  }

  getUserPoint = async () => {
    const userID = this.props.route.params.userID;
    const response = await axios.get(
      'http://49.50.172.58:3000/users/me/' + userID,
    );
    this.setState({
      point: response.data.point.general_total,
      challPoint: response.data.point.challenge_total,
    });
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
      selectedFriends,
    } = this.state;
    return (
      <ScrollView style={styles.scrollContainer}>
        <View style={styles.container}>
          <View style={styles.pointContainer}>
            <View style={styles.currentPoint}>
              <View style={styles.componentTitleContainer}>
                <Text style={{ fontWeight: 'bold', fontSize: 20 }}>인증 조건 선택</Text>
              </View>
              <View style={styles.pointsStyle}>
                <View style={styles.currentPointEach}>
                  <Text style={{ fontSize: 15 }}>
                    잔여 포인트: 
                    {' '}
                    {point}
                  </Text>
                </View>
                <View style={styles.currentPointEach}>
                  <Text style={{ fontSize: 15 }}>
                    도전 포인트: 
                    {' '}
                    {challPoint}
                  </Text>
                </View>
              </View>
            </View>

            <View style={styles.lineDivider} />

            <View style={styles.componentTitleContainer}>
              <Text style={{ fontWeight: 'bold', fontSize: 20 }}>도전 포인트 선택</Text>
            </View>

            <View style={styles.challengePoint}>
              <View style={styles.infoTitlesStyles}>
                <Text>도전 금액</Text>
              </View>
              <TextInput
                value={userBetPoint}
                onChangeText={(Point) => this.setState({ userBetPoint: Point })}
                style={styles.betInput}
                placeholder="도전에 걸 금액"
              />
              <Text style={{ fontSize: 10 }}>(5000 ~ 50,000)</Text>
            </View>
            <View style={styles.distribPoint}>
              <View style={styles.distribPointEach}>
                <View style={styles.infoTitlesStyles}>
                  <Text>실패시 차감 % </Text>
                </View>
                <PointPicker
                  point={selectedPercent}
                  onValueChange={(itemValue) => this.setState({ selectedPercent: itemValue })}
                  points={percentList}
                  pickerWidth={width / 2}
                />
              </View>
              <View style={styles.distribPointEach}>
                <View style={styles.infoTitlesStyles}>
                  <Text>실패 포인트 분배 방식</Text>
                </View>
                <PointPicker
                  point={selectedDist}
                  onValueChange={(itemValue) => this.setState({ selectedDist: itemValue })}
                  points={distribList}
                  pickerWidth={width / 2}
                />
              </View>
            </View>
          </View>

          <View style={styles.lineDivider} />

          <View style={styles.friendContainer}>
            <View style={styles.componentTitleContainer}>
              <Text style={{ fontWeight: 'bold', fontSize: 20 }}>감시자 선택</Text>
            </View>
            <View style={styles.friendSelectConainerStyle}>
              <View style={styles.friendContainerEach}>
                <Text>친구 목록</Text>
                <ScrollView style={styles.friendScrollViewContainer}>
                  <View style={styles.friendSelectContainer}>
                    {friends.map((friend) => (
                      <FriendListEach 
                        key={friend}
                        name={friend}
                        friendSelectFunc={() => this.addSpector(friend, friends, selectedFriends)}
                      />
                    ))}
                  </View>
                </ScrollView>
              </View>
              <View style={styles.friendContainerEach}>
                <Text>감시자 목록(최소 3명)</Text>
                <ScrollView style={styles.friendScrollViewContainer}>
                  <View style={styles.friendSelectContainer}>
                    {selectedFriends.map((friend) => (
                      <SelectedFriendListEach 
                        key={friend}
                        name={friend}
                        // eslint-disable-next-line max-len
                        friendSelectFunc={() => this.restoreFriend(friend, friends, selectedFriends)}
                      />
                    ))}
                  </View>
                </ScrollView>
              </View>
            </View>
          </View>
          <TouchableOpacity
            style={styles.nextStepBtn}
            onPress={() => this.props.navigation.navigate('플랜 만들기: 3단계',
              {
                category: this.props.route.params.category,
                planName: this.props.route.params.planName,
                startDate: this.props.route.params.startDate,
                endDate: this.props.route.params.endDate,
                certifyTime: this.props.route.params.certifyTime,
                picture_rule_1: this.props.route.params.picture_rule_1,
                picture_rule_2: this.props.route.params.picture_rule_2,
                picture_rule_3: this.props.route.params.picture_rule_3,
                custom_picture_rule_1: this.props.route.params.custom_picture_rule_1,
                custom_picture_rule_2: this.props.route.params.custom_picture_rule_2,
                custom_picture_rule_3: this.props.route.params.custom_picture_rule_3,
                challPoint: this.state.userBetPoint,
                minusPercent: this.state.selectedPercent,
                distribMethod: this.state.selectedDist,
                spectors: this.state.selectedFriends,
                certifyImgUri: this.props.route.params.certifyImgUri,
                categoryUri: this.props.route.params.categoryUri,
                userID: this.props.route.params.userID,
                percent: this.state.selectedPercent,
                is_custom: this.props.route.params.is_custom,
              })}
            >
            <Text style={{ fontWeight: 'bold', color: 'white' }}>플랜 결과 확인</Text>
          </TouchableOpacity>
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
  pointContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    width: width,
    height: height * 0.4,
    marginTop: 5,
    marginBottom: 10,
  },
  currentPoint: {
    justifyContent: 'flex-start',
    alignItems: 'flex-start',
    width: width,
    height: height * 0.08,
    marginTop: 10,
    marginBottom: 15,
  },
  pointsStyle: {
    justifyContent: 'center',
    alignItems: 'flex-start',
    width: width,
    height: height * 0.07,
    flexDirection: 'row',
  },
  currentPointEach: {
    justifyContent: 'center',
    alignItems: 'flex-start',
    width: width * 0.45,
    height: height * 0.1,
    marginLeft: 10,
  },
  challengePoint: {
    justifyContent: 'flex-start',
    alignItems: 'center',
    width: width,
    height: height * 0.05,
    flexDirection: 'row',
  },
  betInput: {
    width: width * 0.35,
    height: height * 0.05,
    borderRadius: 10,
    marginRight: 5,
    marginLeft: 12,
    paddingLeft: 5,
    borderBottomWidth: 0.5,
  },
  distribPoint: {
    justifyContent: 'center',
    alignItems: 'center',
    width: width,
    height: height * 0.17,
  },
  distribPointEach: {
    justifyContent: 'flex-start',
    alignItems: 'center',
    width: width,
    height: height * 0.08,
    flexDirection: 'row',
  },
  friendContainer: {
    justifyContent: 'flex-start',
    alignItems: 'center',
    width: width,
    height: height * 0.5,
    marginTop: 5,
  },
  friendSelectConainerStyle: {
    justifyContent: 'center',
    alignItems: 'center',
    width: width,
    height: height * 0.5,
    flexDirection: 'row',
    marginTop: 5,
  },
  friendContainerEach: {
    justifyContent: 'center',
    alignItems: 'center',
    width: width / 2,
    height: height / 2,
  },
  friendScrollViewContainer: {
    width: width * 0.4,
    height: height * 0.4,
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
  friendSelectContainer: {
    justifyContent: 'flex-start',
    alignItems: 'center',
    width: width * 0.4,
    height: height * 0.4,
    marginTop: 5,
    backgroundColor: '#F2F2F2',
    borderRadius: 10,
  },
  nextStepBtn: {
    width: width / 2,
    height: 40,
    backgroundColor: '#FD8A69',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 15,
    marginTop: 10,
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
  infoTitlesStyles: {
    width: width / 3.5,
    marginLeft: 20,
  },
});
