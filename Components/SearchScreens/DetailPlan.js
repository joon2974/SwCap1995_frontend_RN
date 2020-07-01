/* eslint-disable react/no-access-state-in-setstate */
/* eslint-disable no-restricted-syntax */
/* eslint-disable guard-for-in */
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
  BarChart,
} from 'react-native-chart-kit';
import axios from 'axios';
import Icon from 'react-native-vector-icons/FontAwesome';
import Watcher from './TabList/Watcher';
import { CardNine } from './Cards';

const { width, height } = Dimensions.get('window');

export default class DetailPlan extends Component {
    state = {
      item: [],
      authCreatedAt: [],
      authStatus: [1],
      date: '',
      currentAuthComment: '',
      test: 'https://kr.object.ncloudstorage.com/swcap1995/plans/noimg.png',
      keysPointAndCount: [],
      pointAndCount: [],
      joinStatus: [],
      authCount: 0,
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
      this.setState({ date: date3 });
    }

    async setGraph() {
      await axios.get('http://49.50.172.58:3000/daily_authentications/' + this.state.item.id).then((res) => {
        if (res.data.rows.length !== 0) {        
          this.setState({ 
            currentAuthComment: 
            res.data.rows[0].comment, 
            authCount: 
            res.data.count,
          });
        }
      }).catch((error) => {
        console.log(error);
        alert(error);
      });


      axios.get('http://49.50.172.58:3000/graphql?query={dailyAuthenticationGet(where: {plan_id: ' + this.state.item.id + '}) {createdAt}}').then((res) => {
        if (res.data.data.dailyAuthenticationGet.length !== 0) {
          this.setState({
            authCreatedAt: res.data.data.dailyAuthenticationGet.map((data) => {
              const date1 = data.createdAt.split('-');
              let date2 = '';
              date2 = date2.concat(date1[2][0] + date1[2][1]);
              return date2;
            }),
          });  
        }
      }).catch((error) => {
        console.log(error);
        alert(error);
      });

      axios.get('http://49.50.172.58:3000/graphql?query={dailyAuthenticationGet(where: {plan_id: ' + this.state.item.id + '}) {status}}').then((res) => {
        if (res.data.data.dailyAuthenticationGet.length !== 0) {
          this.setState({
            authStatus: res.data.data.dailyAuthenticationGet.map((data) => {
              if (data.status === 'done') return 1;
              else if (data.status === 'reject') return 0;
              else return 0.5;
            }), 
          });
        }
      }).catch((error) => {
        console.log(error);
        alert(error);
      });
     

      axios.get('http://49.50.172.58:3000/plans/watch_achievement/' + this.state.item.id).then((res) => {
        this.setState({
          pointAndCount: res.data, 
        }); 
        for (const key in this.state.pointAndCount) {
          this.setState({ 
            keysPointAndCount: 
            this.state.keysPointAndCount.concat(key),
          });
          if (this.state.authCount !== 0) {
            this.setState({
              joinStatus: 
              this.state.joinStatus.concat((res.data[key].count / this.state.authCount) * 100),  
            });
          }  
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
      
      let congratulation = null;
      if (item.status === 'end') {
        congratulation = (
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
        );
      } else {
        congratulation = (
          <View />
        );
      }
    
      const watcherData = {
        labels: this.state.keysPointAndCount,
        datasets: [
          {
            data: this.state.joinStatus,
          },
        ],
      };

      const chartConfig = {
        backgroundGradientFrom: '#139c73',
        backgroundGradientTo: 'black',
        backgroundGradientFromOpacity: 0,
        backgroundGradientToOpacity: 0.5,
        color: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
        strokeWidth: 2, // optional, default 3
        barPercentage: 1,
        useShadowColorFromDataset: false, // optional
      };

      let watchersComponent = null;
      if (Object.keys(this.state.pointAndCount).length !== 0) {
        watchersComponent = (
  
          <View>
            {
            this.state.keysPointAndCount.map((data, index) => (
              <View key={data}>
                <Watcher 
                  key={data}
                  index={index}
                  data={this.state.pointAndCount[data]}
                  id={data}
                />
              </View>
            ))                                
          }
          </View>
        );
      }

      return (
        <View style={styles.container}>
          <ImageBackground source={require('../../imgs/back8.png')} style={{ width: width }}>
            <ScrollView contentContainerStyle={{ alignItems: 'center', backgroundColor: '#d6a192' }}>
              
              <View style={{ marginVertical: 10 }} />

              <CardNine
                title={item.detailedCategory}
                subTitle={item.description}
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

                  {congratulation}
                  <View style={{ 
                    backgroundColor: '#139C73', 
                    marginVertical: 8, 
                    borderRadius: 16, 
                  }}>
                    <LineChart
                      data={{
                        labels: this.state.authCreatedAt,
                        datasets: [
                          {
                            data: this.state.authStatus,
                          },
                        ],
                      }}
                      width={width * 0.9} 
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
                        borderRadius: 16,
                      }}
                    />
                  </View>
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
                  {'Main Rule: ' + item.picture_rule_1}
                </Text>
                <Text style={styles.subTitleStyle}>
                  {'Sub Rule1: ' + item.picture_rule_2}
                </Text>
                <Text style={styles.subTitleStyle}>
                  {'Sub Rule2: ' + item.picture_rule_3}
                </Text>
                
                <View style={{ marginBottom: 10 }} />
              </View>

              <View style={styles.lineDivider} />

              <BarChart
                data={watcherData}
                width={width}
                height={height / 3.5}
                yAxisSuffix="%"
                chartConfig={chartConfig}
                verticalLabelRotation={30}
                fromZero={true}
           />

              <View style={styles.titleInfoContainer2}>
                <Text style={styles.titleStyle}>
                  감시자들
                </Text>
                        
                <View>
                  {watchersComponent}
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
  lineDivider: {
    backgroundColor: '#F2F2F2',
    width: width - 30,
    height: 1.5,
    marginLeft: 15,
    marginVertical: 20,
  },
});
