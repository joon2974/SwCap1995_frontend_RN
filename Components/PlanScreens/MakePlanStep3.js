import React, { Component } from 'react';
import {
  Text,
  View,
  StyleSheet,
  ScrollView,
  Dimensions,
  TouchableOpacity,
  Platform,
  TextInput,
  Image,
} from 'react-native';
import axios from 'axios';
import ImageModal from 'react-native-image-modal';
import SpectorIcon from './PlanComponents/SpectorIcon';

const { width, height } = Dimensions.get('window');

export default class MakePlanStep3 extends Component {
  state = {
    title: '',
    isPublic: false,
  }

  sendPlanInfo = () => {
    const today = new Date();
    today.setDate(Number(this.props.route.params.startDate));

    const formData = new FormData();
    formData.append('photo', { uri: this.props.route.params.certifyImgUri, name: 'photo.jpg', type: 'image/jpeg' });
    formData.append('user_id', Number(this.props.route.params.userID));
    formData.append('title', this.state.title);
    formData.append('category', this.props.route.params.category);
    formData.append('detailedCategory', this.props.route.params.planName);
    formData.append('picture_rule_1', this.props.route.params.picture_rule_1);
    formData.append('picture_rule_2', this.props.route.params.picture_rule_2);
    formData.append('picture_rule_3', this.props.route.params.picture_rule_3);
    formData.append('custom_picture_rule_1', this.props.route.params.custom_picture_rule_1);
    formData.append('custom_picture_rule_2', this.props.route.params.custom_picture_rule_2);
    formData.append('custom_picture_rule_3', this.props.route.params.custom_picture_rule_3);
    formData.append('plan_period', Number(this.props.route.params.endDate));
    formData.append('picture_time', Number(this.props.route.params.certifyTime));
    formData.append('plan_start_day', today.toString());
    formData.append('bet_money', Number(this.props.route.params.challPoint));
    formData.append('is_public', this.state.isPublic);
    formData.append('percent', Number(this.props.route.params.percent));
    formData.append('spectors', this.props.route.params.spectors.join());
    formData.append('distrib_method', this.props.route.params.distribMethod);
    formData.append('is_custom', this.props.route.params.is_custom);
    formData.append('authentication_way', this.props.route.params.authentication_way);

    axios
      .post('http://49.50.172.58:3000/plans', formData, {
        headers: {
          'content-type': 'multipart/form-data',
        },
      })
      .then((res) => {
        console.log(res.status);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  render() {
    const { title, isPublic } = this.state;

    return (
      <ScrollView style={styles.scrollViewStyle}>
        <View style={styles.container}>
          <View style={styles.categoryContainer}>
            <View style={styles.categoryImgContainer}>
              <Image
                source={{ uri: this.props.route.params.categoryUri }} 
                style={styles.imageStyle}
              />
            </View>
            <View style={styles.categoryInfoContainer}>
              <Text style={{ fontWeight: 'bold', fontSize: 25 }}>{this.props.route.params.category}</Text>
              <Text>{this.props.route.params.planName}</Text>
            </View>
          </View>

          <View style={styles.lineDivider} />

          <View style={styles.timeContainer}>
            <View style={styles.componentTitleContainer}>
              <Text style={{ fontWeight: 'bold', fontSize: 20 }}>날짜 / 시간</Text>
            </View>
            <View style={styles.lineContainer}>
              <Text style={{ fontWeight: '800', fontSize: 15 }}>시작 날짜:  </Text>
              <Text>
                {this.props.route.params.startDate}
                {' '}
                일
              </Text>
            </View>
            <View style={styles.lineContainer}>
              <Text style={{ fontWeight: '800', fontSize: 15 }}>플랜 기간:  </Text>
              <Text>
                {this.props.route.params.endDate}
                {' '}
                주
              </Text>
            </View>
            <View style={styles.lineContainer}>
              <Text style={{ fontWeight: '800', fontSize: 15 }}>인증 시간:  </Text>
              <Text>
                {this.props.route.params.certifyTime}
                {' '}
                시(앞 뒤로 30분의 여유시간이 주어집니다)
              </Text>
            </View>
          </View>

          <View style={styles.lineDivider} />

          <View style={styles.ruleContainer}>
            <View style={styles.componentTitleContainer}>
              <Text style={{ fontWeight: 'bold', fontSize: 20 }}>인증 Rule</Text>
            </View>
            <View style={styles.rulesContainerStyle}>
              <View style={styles.categoryImgContainer}>
                <ImageModal 
                  source={{ uri: this.props.route.params.certifyImgUri }} 
                  style={styles.imageStyle}
                />
              </View>
              <View style={styles.categoryInfoContainer}>
                <Text>
                  {(this.props.route.params.picture_rule_1 === null) 
                    ? this.props.route.params.custom_picture_rule_1
                    : this.props.route.params.picture_rule_1
                  }
                </Text>
                <Text>
                  {(this.props.route.params.picture_rule_2 === null) 
                    ? this.props.route.params.custom_picture_rule_2
                    : this.props.route.params.picture_rule_2
                  }
                </Text>
                <Text>
                  {(this.props.route.params.picture_rule_3 === null) 
                    ? this.props.route.params.custom_picture_rule_3
                    : this.props.route.params.picture_rule_3
                  }
                </Text>
              </View>
            </View>
          </View>

          <View style={styles.lineDivider} />

          <View style={styles.pointContainer}>
            <View style={styles.componentTitleContainer}>
              <Text style={{ fontWeight: 'bold', fontSize: 20 }}>포인트</Text>
            </View>
            <View style={styles.lineContainer}>
              <Text style={{ fontWeight: '800', fontSize: 17 }}>도전 포인트:  </Text>
              <Text>{this.props.route.params.challPoint}</Text>
            </View>
            <View style={styles.lineContainer}>
              <Text style={{ fontWeight: '800', fontSize: 17 }}>차감 %:  </Text>
              <Text>{this.props.route.params.minusPercent}</Text>
            </View>
            <View style={styles.lineContainer}>
              <Text style={{ fontWeight: '800', fontSize: 17 }}>분배 방식:  </Text>
              <Text>{this.props.route.params.distribMethod}</Text>
            </View>
          </View>

          <View style={styles.lineDivider} />

          <View style={styles.friendsContainer}>
            <View style={styles.friendtitle}>
              <Text style={{ fontWeight: 'bold', fontSize: 20 }}>감시자  </Text>
            </View>
            <View style={styles.friends}>
              {this.props.route.params.spectors.map((friend) => (
                <SpectorIcon 
                  key={friend}
                  nickName={friend}
                />
              ))}
            </View>
          </View>

          <View style={styles.lineDivider} />

          <View style={styles.additionalInfoContainer}>
            <View style={styles.titleContainer}>
              <View style={styles.titleStyle}>
                <Text>나만의 플랜 제목 설정: </Text>
              </View>
              <TextInput
                value={title}
                onChangeText={(title) => this.setState({ title })}
                style={styles.input}
                placeholder="ex) 또 한번 술마시면 내가 개다"
                keyboardType="email-address"
              />
            </View>
            <View style={styles.isPublicSelectContainer}>
              <View style={styles.titleStyle}>
                <Text>플랜 공개 설정: </Text>
                <Text>(선택 시 공개됩니다)</Text>
              </View>
              <View style={styles.isPublicStyle}>
                <TouchableOpacity
                  style={isPublic ? styles.selectedBtnStyle : styles.unselectedBtmStyle}
                  onPress={() => {
                    if (isPublic === false) this.setState({ isPublic: true });
                    else this.setState({ isPublic: false });
                  }}
                >
                  <Text style={isPublic ? { color: 'white' } : { color: 'black' }}>플랜공개하기</Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>

          <TouchableOpacity
            disabled={title.length === 0 ? true : false}
            style={styles.nextStepBtn}
            onPress={() => {
              this.sendPlanInfo();
              this.props.navigation.popToTop();
            }}
          >
            <Text style={{ color: 'white' }}>플랜 생성하기</Text>
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
