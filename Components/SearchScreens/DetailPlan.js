/* eslint-disable no-unused-vars */
/* eslint-disable react/no-unused-state */
import React, { Component } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  ImageBackground,
  Dimensions,
  ScrollView,
  Platform,
} from 'react-native';
import {
  LineChart,
  ContributionGraph,
  ProgressChart,
} from 'react-native-chart-kit';
import axios from 'axios';
import Icon from 'react-native-vector-icons/FontAwesome';
import Watcher from './TabList/Watcher';
import { CardNine } from './Cards';

const { width, height } = Dimensions.get('window');

export default class DetailPlan extends Component {
    state = {
      item: [],
      watchers: [1, 2, 3],
      watchersComment: ['빵준이', '한수찬', '김첨지'],
      authCreatedAt: [],
      authStatus: [1],
      date: '',
      contriGraphDate: '',
      currentAuthComment: '',
      test: 'https://kr.object.ncloudstorage.com/swcap1995/plans/noimg.png',
    }

    async componentDidMount() {
      await this.setPlan();
      this.setGraph();
      this.setDate();
    }

    setDate = () => {
      const date1 = this.state.item.createdAt.split('-');
      const date2 = this.state.item.updatedAt.split('-');
      let date3 = '';
      date3 = date3.concat('작성일: ' + date1[0] + '년 ' + date1[1] + '월 ' + date1[2][0] + date1[2][1] + '일\n수정일: ' + date2[0] + '년 ' + date2[1] + '월 ' + date2[2][0] + date2[2][1] + '일');
      let date4 = '';
      date4 = date4.concat(date1[0] + '-' + date1[1] + '-' + date1[2][0] + date1[2][1]);
      this.setState({ date: date3, contriGraphDate: date4 });
    }

    setGraph=() => {
      axios.get('http://49.50.172.58:3000/graphql?query={dailyAuthenticationGet(where: {plan_id: ' + this.state.item.id + '}) {createdAt}}').then((res) => {
        this.setState({
          authCreatedAt: res.data.data.dailyAuthenticationGet.map((data) => {
            const date1 = data.createdAt.split('-');
            let date2 = '';
            date2 = date2.concat(date1[2][0] + date1[2][1]);
            return date2;
          }),
        });  
      }).catch((error) => {
        console.log(error);
        alert(error);
      });

      axios.get('http://49.50.172.58:3000/graphql?query={dailyAuthenticationGet(where: {plan_id: ' + this.state.item.id + '}) {status}}').then((res) => {
        this.setState({
          authStatus: res.data.data.dailyAuthenticationGet.map((data) => {
            if (data.status === 'done') return 1;
            else if (data.status === 'reject') return 0;
            else return 0.5;
          }), 
        });
      }).catch((error) => {
        console.log(error);
        alert(error);
      });

      axios.get('http://49.50.172.58:3000/daily_authentications/' + this.state.item.id).then((res) => {
        if (res.data.rows.length !== 0) {        
          this.setState({ currentAuthComment: res.data.rows[0].comment });
        }
      }).catch((error) => {
        console.log(error);
        alert(error);
      });
    }

    setPlan = () => {
      this.setState({ item: this.props.route.params.item });
    }

    setTitleImage = () => ({ uri: this.state.test })

    render() {
      const { item } = this.state;
      
    
      const watcherData = {
        labels: ['빵준이', '한수찬', '김첨지'], // optional
        data: [0.95, 0.30, 0.66],
      };

      // const commitsData = [
      //   { date: '2017-01-02', count: 0 },
      //   { date: '2017-01-03', count: 30 },
      //   { date: '2017-01-04', count: 30 },
      //   { date: '2017-01-05', count: 100 },
      //   { date: '2017-01-06', count: 100 },
      //   { date: '2017-01-30', count: 0 },
      //   { date: '2017-01-31', count: 0 },
      //   { date: '2017-03-01', count: 30 },
      //   { date: '2017-04-02', count: 100 },
      //   { date: '2017-03-05', count: 0 },
      //   { date: '2017-02-30', count: 0 },
      // ];


      const chartConfig = {
        backgroundGradientFrom: '#139c73',
        backgroundGradientTo: 'white',
        backgroundGradientFromOpacity: 0,
        backgroundGradientToOpacity: 0.5,
        color: (opacity = 1) => `rgba(19, 156, 115, ${opacity})`,
        strokeWidth: 2, // optional, default 3
        barPercentage: 0.5,
        useShadowColorFromDataset: false, // optional
      };

      return (
        <View style={styles.container}>
          <ImageBackground source={require('./back8.png')} style={{ width: width }}>
            <ScrollView contentContainerStyle={{ alignItems: 'center', backgroundColor: '#d6a192' }}>
              
              <View style={{ marginVertical: 10 }} />

              <CardNine
                title={item.detailedCategory}
                subTitle={item.custom_picture_rule_3}
                description={this.state.date}
                image={{ uri: item.image_url }}
               // image={this.setTitleImage()}
            />
               
 
              <View style={styles.titleInfoContainer}>
                <Text style={styles.titleStyle}>
                  최근 인증에서 남긴말...
                </Text>
                        
                <Text style={styles.subTitleStyle}>
                  {this.state.currentAuthComment}
                </Text>
                        
                <View style={{ marginBottom: 10 }} />
              </View>

              <View style={styles.lineDivider} />    
                        
              <View style={{ alignItems: 'center', marginVertical: 10 }}>
 
                
                <View style={{ alignItems: 'center' }}>

                  {/* <ContributionGraph
                    values={commitsData}
                    endDate={new Date('2017-04-09')}
                    numDays={105}
                    width={width}
                    height={220}
                    chartConfig={chartConfig}
                /> */}

                  <TouchableOpacity style={{
                    flexDirection: 'row', 
                    height: height / 13,
                    width: width / 1.1,
                    alignItems: 'center',
                    backgroundColor: '#EAD0BE',
                    justifyContent: 'space-between',
                    borderRadius: 10,
                    borderWidth: 2,
                    borderColor: 'yellow',
                    marginBottom: 10,
                  }}>
                    <Icon size={30} color="yellow" name="star" style={{ marginHorizontal: 10 }} />
                    <Text style={{ fontSize: 16 }}>
                      플랜이 완료되었습니다! 축하합니다!!!
                    </Text>
                    <Icon size={30} color="yellow" name="star" style={{ marginHorizontal: 10 }} />
                  </TouchableOpacity>


                  <LineChart
                    data={{
                      labels: this.state.authCreatedAt,
                      datasets: [
                        {
                          data: this.state.authStatus,
                        },
                      ],
                    }}
                    width={width * 0.9} // from react-native
                    height={height / 4}
                    yAxisLabel=""
                    yAxisSuffix=""
                    formatYLabel={(data) => {
                      if (data === '1.00') return '성공';
                      else if (data === '0.50') return '보류';
                      else return '실패';
                    }}
                    segments={2}
                    fromZero={true}
                    chartConfig={{
                      backgroundGradientFrom: '#139C73',
                      backgroundGradientTo: 'black',
                      decimalPlaces: 2, // optional, defaults to 2dp
                      color: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
                      labelColor: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
                      style: {                        
                      },
                      propsForDots: { 
                        r: '6',
                        strokeWidth: '2',
                        stroke: '#fd8a69',
                      },
                    }}
                    bezier
                    style={{
                      marginVertical: 8,
                      borderRadius: 16,
                    }}
                  />
                </View>

                <TouchableOpacity 
                  style={styles.moreExploreBar}
                  onPress={() => { this.props.navigation.navigate('인증', { planID: this.state.item.id }); }}
                >
                  <Text>인증 더 보기</Text>
                </TouchableOpacity>
              </View>
              
              <View style={{ marginVertical: 10 }} />
              
              <View style={styles.titleInfoContainer}>
                <Text style={styles.titleStyle}>
                  인증 방법에 대해...
                </Text>
                <Text style={styles.subTitleStyle}>
                  {'Rule1: ' + item.picture_rule_1}
                </Text>
                <Text style={styles.subTitleStyle}>
                
                  {'Rule2: ' + item.picture_rule_2}
                </Text>
                <Text style={styles.subTitleStyle}>
                  {'Rule3: ' + item.picture_rule_3}
                </Text>
                
                <View style={{ marginBottom: 10 }} />
              </View>

              <View style={styles.lineDivider} />

              
              <ProgressChart
                data={watcherData}
                width={width * 0.9}
                height={height / 4}
                strokeWidth={16}
                radius={32}
                chartConfig={chartConfig}
                hideLegend={false}
        />

              <View style={styles.titleInfoContainer2}>
                <Text style={styles.titleStyle}>
                  감시자들
                </Text>
                        
                <View>
                  {
                  this.state.watchers.map((data, index) => (
                    <View key={data}>
                      <Watcher 
                        key={data}
                        index={index}
                        comment={this.state.watchersComment}
                      />
                    </View>
                  ))                                
                }
                  {/* <TouchableOpacity
                    style={styles.moreExploreBar2}
                            >
                    <Text>감시자들 더보기</Text>
                  </TouchableOpacity> */}
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
    marginTop: 20,
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
  moreExploreBar: {
    width: width * 0.8,
    height: height / 15,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#F2F2F2',
    borderWidth: 2,
    borderColor: '#fd8a69',
    borderRadius: 10,
    margin: 6,
    marginTop: 20,
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
  moreExploreBar2: {
    width: width * 0.8,
    height: height / 15,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#F2F2F2',
    borderRadius: 10,
    margin: 6,
    marginTop: 20,
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
  calendarStyle: {
    width: width * 0.75,
    height: height * 0.2,
    borderRadius: 10,
    marginLeft: 10,
  },
  titleInfoContainer: {
    borderWidth: 4,
    borderColor: '#FD8A69',
    backgroundColor: 'white',
    width: width * 0.9,
    marginTop: 15,
    borderRadius: 10,
    marginBottom: 20,
    padding: 10,
    // eslint-disable-next-line no-undef
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
  titleInfoContainer2: {
    borderWidth: 4,
    borderColor: '#139c73',
    backgroundColor: 'white',
    width: width * 0.9,
    marginTop: 15,
    borderRadius: 10,
    marginBottom: 20,
    padding: 10,
    // eslint-disable-next-line no-undef
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
    marginLeft: 14,
    marginVertical: 3,
  },
  dateInfo: {
    color: '#adb3bf',
    fontSize: 12,
    marginTop: 15,
    marginLeft: 10,
  },
  calendar: {
    width: 360,
    height: 200,
  },
  lineDivider: {
    backgroundColor: '#F2F2F2',
    width: width - 30,
    height: 1.5,
    marginLeft: 15,
    marginVertical: 20,
  },
});
