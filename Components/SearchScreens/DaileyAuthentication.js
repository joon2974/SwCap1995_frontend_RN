import React, { Component } from 'react';
import {
  View,
  Text,
  ImageBackground,
  StyleSheet,
  TouchableOpacity,
  Image,
  Dimensions,
  ScrollView,
  Platform,
} from 'react-native';
import axios from 'axios';
import Watcher from './TabList/Watcher';

const { width, height } = Dimensions.get('window');

export default class DaileyAuthentication extends Component {
  state = {
    nowCreatedAt: '',
    nowUpdatedAt: '',
    watchers: ['1', '2', '3', '4', '5'],
    watchersComment: ['hello', 'bye', 'thank', 'u', '...'],
  };

  componentDidMount() {
    this.setPlan();
  }

  setPlan = () => {
    axios
      .get(
        'http://49.50.172.58:3000/graphql?query={categoryGet{id,name,description,image_url,createdAt,updatedAt}}',
      )
      .then((res) => {
        this.setState({ nowPlanTitle: res.data.data.categoryGet[0].name });
        this.setState({ nowPlanImage: res.data.data.categoryGet[0].image_url });
        this.setState({
          nowPlanDescription: res.data.data.categoryGet[0].description,
        });
        this.setState({ nowCreatedAt: res.data.data.categoryGet[0].createdAt });
        this.setState({ nowUpdatedAt: res.data.data.categoryGet[0].updatedAt });
      })
      .catch((error) => {
        console.log(error);
        });
  };

  render() {
    return (
      <View style={styles.container}>
        <ImageBackground
          source={require('../../imgs/back8.png')}
          style={{ width: width }}
        >
          <ScrollView contentContainerStyle={{ alignItems: 'center' }}>
            <TouchableOpacity style={styles.titleImageContainer}>
              <Image
                style={styles.imageStyle}
                source={{ uri: this.state.nowPlanImage }}
              />
              <Text>위 사진은 인증사진으로</Text>
            </TouchableOpacity>

            <View style={styles.titleInfoContainer}>
              <Text style={styles.titleStyle}>일일 인증 타이틀</Text>

              <Text style={styles.dateInfo}>
                {'작성일 : ' + this.state.nowCreatedAt + '\n'}
                {'수정일 : ' + this.state.nowUpdatedAt}
              </Text>

              <Text style={styles.subTitleStyle}>
                {'그날 인증에 대한 내용\n'}
                {'그날 인증에 대한 내용\n'}
                {'그날 인증에 대한 내용\n'}
                {'그날 인증에 대한 내용'}
              </Text>

              <View style={{ marginBottom: 10 }} />
            </View>
            <View style={styles.titleInfoContainer}>
              <Text style={styles.titleStyle}>
                인증 방법에 대해... 위와 비교하기 위한 리마인드용
              </Text>
              <Text style={styles.subTitleStyle}>
                RULE 1 : ~~~~~~~~~
                {'\n'}
                RULE 2 : ~~~~~~~~~
                {'\n'}
                RULE 3 : ~~~~~~~~~
                {'\n'}
                RULE 4 : ~~~~~~~~~
                {'\n'}
              </Text>

              <View style={{ marginBottom: 10 }} />
            </View>

            <View style={styles.titleInfoContainer}>
              <Text style={styles.titleStyle}>
                이날 인증에 참여한 감시자들 리스트
              </Text>

              <View>
                {this.state.watchers.map((data, index) => (
                  <View>
                    <Watcher
                      // eslint-disable-next-line react/no-array-index-key
                      key={index}
                      index={index}
                      comment={this.state.watchersComment}
                    />
                  </View>
                ))}
                <TouchableOpacity style={styles.moreExplore}>
                  <Text>감시자들 더보기</Text>
                </TouchableOpacity>
              </View>

              <View style={{ marginBottom: 10 }} />
            </View>

            <View style={{ marginVertical: 20 }} />
          </ScrollView>
        </ImageBackground>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: width * 1,
    backgroundColor: 'white',
    justifyContent: 'center',
    alignItems: 'center',
  },
  titleImageContainer: {
    width: width * 0.9,
    height: height / 4,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#F2F2F2',
    borderRadius: 10,
    margin: 6,
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
  imageStyle: {
    width: width * 0.75,
    height: height * 0.2,
    borderRadius: 10,
  },
  titleInfoContainer: {
    backgroundColor: '#F2F2F2',
    width: width * 0.9,
    marginTop: 15,
    borderRadius: 10,
    margin: 6,
    padding: 10,
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
  titleStyle: {
    fontWeight: 'bold',
    fontSize: 20,
    marginVertical: 10,
  },
  subTitleStyle: {
    fontSize: 14,
    marginTop: 5,
  },
  moreExplore: {
    marginTop: 15,
    alignItems: 'center',
    justifyContent: 'center',
    width: width * 0.75,
    backgroundColor: 'white',
    borderRadius: 10,
    height: height * 0.04,
    marginLeft: 24,
  },
  dateInfo: {
    fontSize: 12,
    marginTop: 15,
    marginLeft: 10,
  },
});
