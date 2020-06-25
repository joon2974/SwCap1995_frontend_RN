/* eslint-disable react/no-access-state-in-setstate */
/* eslint-disable no-restricted-syntax */
/* eslint-disable guard-for-in */
import React, { Component } from 'react';
import {
  View,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  Dimensions,
  Text,
} from 'react-native';
import axios from 'axios';
import {
  LineChart,
  BarChart,
} from 'react-native-chart-kit';
import VariableCard from './VariableCard';

const { width, height } = Dimensions.get('window');

export default class WatcherPage extends Component {
  state = {
    onOff: 0,
    selectedTab: 0,
    tabState: 0,
    testArray: [],
    keysPointAndCount: [],
    pointAndCount: [],
    joinStatus: [],
    authCount: 0,
    authCreatedAt: [1, 2, 3],
    authStatus: [3, 2, 1],
    successCount: 0,
    invalidCount: 0,
    rejectCount: 0,
    flag: 0,
  }

  componentDidMount() {
    this.setTest();
  }
  

  async setTest() {
    await axios.get('http://49.50.172.58:3000/daily_authentications/' + this.props.route.params.planID).then((res) => {
      this.setState({ testArray: res.data.rows });
      if (res.data.rows.length !== 0) {        
        this.setState({ 
          authCount: 
          res.data.count,
        });
      }
      this.countResult(res.data);
    }).catch((error) => {
      console.log(error);
      alert(error);
    });

    axios.get('http://49.50.172.58:3000/plans/watch_achievement/' + this.props.route.params.planID).then((res) => {
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


    axios.get('http://49.50.172.58:3000/graphql?query={dailyAuthenticationGet(where: {plan_id: ' + this.props.route.params.planID + '}) {createdAt}}').then((res) => {
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

    axios.get('http://49.50.172.58:3000/graphql?query={dailyAuthenticationGet(where: {plan_id: ' + this.props.route.params.planID + '}) {status}}').then((res) => {
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
  }


  async countResult(data) {
    let success = 0; 
    let invalid = 0; 
    let reject = 0;

    await data.rows.map((data) => {
      if (data.status === 'reject') {
        reject += 1;
      } else if (data.status === 'done') {
        success += 1;
      } else {
        invalid += 1;
      }
      return 1;
    });
    this.setState({
      successCount: success, 
      invalidCount: invalid,
      rejectCount: reject, 
    });
    
    if ((success / data.count) >= 0.5) {
      this.setState({ flag: 1 });
    }
  }


  render() {
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

    // if (this.state.authCount !== 0) {
    // invalidComponent = (
    //   <View>
    //     <Text>
    //       { (this.state.invalidCount / this.state.authCount) * 100}
    //       {'%\n'}
    //     </Text>
    //   </View>  
    // );
    // }
    // if (this.state.authCount !== 0) {
   
    // rejectComponent = (
    //   <View>
    //     <Text>
    //       { (this.state.rejectCount / this.state.authCount) * 100}
    //       {'%\n'}
    //     </Text>
    //   </View>   
    // );
    // } 


    let auth = null;
    if (this.state.authCount === 0) {
      auth = (
        <View style={{
          width: width / 2,
          backgroundColor: 'white',
          borderWidth: 5, 
          borderRadius: 10,
          padding: 10,
          margin: height / 3,
          borderColor: '#FD8a69',
          justifyContent: 'center',
          alignItems: 'center', 
          alignSelf: 'center',
        }}>
          <Text>
            인증 기록이 없습니다.
          </Text>
        </View>
      );
    } else {
      auth = (
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
              <Text style={this.state.selectedTab === 1 ? { color: 'white' } : { color: 'black' }}>결과 자료</Text>
            </TouchableOpacity>
          </View>
      
          {this.state.tabState === 0 ? (

            <ScrollView style={{ marginBottom: 80 }}>
        
              <View style={styles.container}>
                {
              this.state.testArray.map((data, index) => (
                <VariableCard 
                  key={data.id}
                  data={data}
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
          ) : (
            <ScrollView style={{ marginBottom: 80 }}>
        
              <View style={styles.container}>
                
                <View style={{ marginTop: 20 }}>

                  <View style={{
                    height: height / 20, 
                    width: width / 3,
                    marginLeft: 10,
                    marginBottom: 10,
                    borderWidth: 5,
                    borderRadius: 10,
                    borderColor: '#139c73',
                    justifyContent: 'center',
                    alignItems: 'center', 
                  }}>
                    <Text>
                      전체 인증 경과도
                    </Text>
                  </View>
                
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
                      borderRadius: 16,
                    }}
                    />

                  <View style={{
                    flexDirection: 'row', 
                    width: width / 1.05, 
                  }}>
                    <View style={{
                      marginTop: 15,
                      marginLeft: 15,
                      padding: 20,
                      width: width / 2.4, 
                    }}>

                      <Text style={{ fontWeight: 'bold' }}>
                        {'성공 확률: '}
                        {(this.state.successCount / this.state.authCount) * 100}
                        {'%\n'}
                      </Text>
                      <Text style={{ fontWeight: 'bold' }}>
                        {'실패 확률: '}
                        {(this.state.rejectCount / this.state.authCount) * 100}
                        {'%\n'}
                      </Text>
                      <Text style={{ fontWeight: 'bold' }}>
                        {'보류 확률: '}
                        {(this.state.invalidCount / this.state.authCount) * 100}
                        {'%\n'}
                      </Text>
                
                    </View>

                    <View style={{
                      justifyContent: 'center', 
                      alignItems: 'center',
                      width: width / 2.4,
                      marginRight: 15, 
                      marginTop: 15,
                      
                    }}>
                      {
                        this.state.flag 
                          ? (
                            <View style={{
                              width: width / 2.5,
                              height: height / 10,
                              borderRadius: 20, 
                              borderWidth: 5, 
                              borderColor: 'green',
                              justifyContent: 'center',
                              alignItems: 'center',
                            }}>
                              <Text style={{ fontWeight: 'bold' }}>참 잘했어요!!!</Text>
                            </View>
                          ) : (
                            <View style={{
                              width: width / 2.5,
                              height: height / 10,
                              borderRadius: 20, 
                              borderWidth: 5, 
                              borderColor: '#fd8a69',
                              justifyContent: 'center',
                              alignItems: 'center',
                            }}>
                              <Text style={{ fontWeight: 'bold' }}>인생이 쉽지 않지??ㅋ</Text>
                            </View>
                          )}
                    
                    </View>
                  </View>
 
                </View>

                <View style={{ marginVertical: 15 }} />

                <View> 
                  <View style={{
                    height: height / 20, 
                    width: width / 2.3,
                    marginLeft: 10,
                    marginBottom: 10,
                    borderWidth: 5,
                    borderRadius: 10,
                    borderColor: 'black',
                    justifyContent: 'center',
                    alignItems: 'center', 
                  }}>
                    <Text>
                      감시자들 참여 빈도율
                    </Text>
                  </View>

                  <BarChart
                    data={watcherData}
                    width={width}
                    height={height / 3.5}
                    yAxisSuffix="%"
                    chartConfig={chartConfig}
                    verticalLabelRotation={30}
                    fromZero={true}
                />
                </View>
                <View style={styles.lineDivider} />

              </View>

            </ScrollView>
          )
          }
        </View>
      );
    }

    return (
      <View>
        {auth}
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
