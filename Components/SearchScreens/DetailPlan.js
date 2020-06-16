import React, { Component } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ImageBackground,
  Dimensions,
  ScrollView,
  Platform,
} from 'react-native';
import {
  LineChart,
  ProgressChart,
} from 'react-native-chart-kit';
import axios from 'axios';
import Watcher from './TabList/Watcher';
import { CardNine } from './Cards';

const { width, height } = Dimensions.get('window');

export default class DetailPlan extends Component {
    state = {
      item: [],
      watchers: ['1', '2', '3', '4', '5'],
      watchersComment: ['hello', 'bye', 'thank', 'u', '...'],
      authCreatedAt: [],
      authStatus: [1],
    }

    async componentDidMount() {
      await this.setPlan();
      await this.setGraph();
    }

    setGraph=() => {
      axios.get('http://49.50.172.58:3000/graphql?query={dailyAuthenticationGet(where: {plan_id: 168}) {createdAt}}').then((res) => {
        this.setState({
          authCreatedAt: res.data.data.dailyAuthenticationGet.map((data) => (data.createdAt)), 
        });  
      }).catch((error) => {
        console.log(error);
        alert(error);
      });

      axios.get('http://49.50.172.58:3000/graphql?query={dailyAuthenticationGet(where: {plan_id: 168}) {status}}').then((res) => {
        this.setState({
          authStatus: res.data.data.dailyAuthenticationGet.map((data) => {
            if (data.status === 'done') return 1;
            else if (data.status === 'invalid') return 0.5;
            else return 0;
          }), 
        });
        
        
        // console.log('this is authstatus', this.state.authStatus);
      }).catch((error) => {
        console.log(error);
        alert(error);
      });
    }

    setPlan = () => {
      this.setState({ item: this.props.route.params.item });
    }

    render() {
      const { item } = this.state;
      
    
      const data = {
        labels: ['Swim', 'Bike', 'Run'], // optional
        data: [0.4, 0.6, 0.8],
      };
      
      const chartConfig = {
        backgroundGradientFrom: '#1E2923',
        backgroundGradientFromOpacity: 0,
        backgroundGradientTo: '#08130D',
        backgroundGradientToOpacity: 0.5,
        color: (opacity = 1) => `rgba(26, 255, 146, ${opacity})`,
        strokeWidth: 2, // optional, default 3
        barPercentage: 0.5,
        useShadowColorFromDataset: false, // optional
      };


      return (
        <View style={styles.container}>
          <ImageBackground source={require('./back8.png')} style={{ width: width }}>
            <ScrollView contentContainerStyle={{ alignItems: 'center', marginTop: 10 }}>
              <CardNine
                title={item.category}
                subTitle={item.detailedCategory}
                description={item.custom_picture_rule_3}
                image={{ uri: item.image_url }}
                explore={() => this.props.navigation.navigate('줌', { item: item.image_url })}
            />
              {/* <TouchableOpacity 
                style={styles.titleImageContainer}
                onPress={() => this.props.navigation.navigate('줌', { image_url: item.image_url })}
                
                    >
                <Image 
                  style={styles.imageStyle}
                  source={{ uri: item.image_url }} 
                        />
              </TouchableOpacity> */} 

              <View style={styles.titleInfoContainer}>
                <Text style={styles.titleStyle}>
                  {'제목 : ' + item.title}
                </Text>
                        
                <Text style={styles.subTitleStyle}>
                  {'부제 : ' + item.custom_picture_rule_3}
                </Text>
                        
                <Text style={styles.dateInfo}>
                  {'작성일 : ' + item.createdAt + '\n'}
                  {'수정일 : ' + item.updatedAt}
                </Text>
                <View style={{ marginBottom: 10 }} />
              </View>
          
              <View style={{ alignItems: 'center', marginVertical: 30 }}>
                <View style={styles.lineDivider} />    
                
                <View>
                  <LineChart
                    data={{
                      labels: this.state.authCreatedAt,
                      datasets: [
                        {
                          data: this.state.authStatus,
                        },
                      ],
                    }}
                    width={Dimensions.get('window').width} // from react-native
                    height={220}
                    yAxisLabel="$"
                    yAxisSuffix="k"
                    yAxisInterval={1} // optional, defaults to 1
                    chartConfig={{
                      backgroundColor: '#e26a00',
                      backgroundGradientFrom: '#fb8c00',
                      backgroundGradientTo: '#ffa726',
                      decimalPlaces: 2, // optional, defaults to 2dp
                      color: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
                      labelColor: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
                      style: {
                        borderRadius: 16,
                      },
                      propsForDots: {
                        r: '6',
                        strokeWidth: '2',
                        stroke: '#ffa726',
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

                <View style={styles.lineDivider} />

      
              </View>

              <View style={styles.titleInfoContainer}>
                <Text style={styles.titleStyle}>
                  인증 방법에 대해...
                </Text>
                <Text style={styles.subTitleStyle}>
                  {'Rule1: ' + item.picture_rule_1 + '\n'}
                  {'Rule2: ' + item.picture_rule_2 + '\n'}
                  {'Rule3: ' + item.picture_rule_3}
                </Text>
                <View style={{ marginBottom: 10 }} />
              </View>

              <View style={styles.lineDivider} />

              <ProgressChart
                data={data}
                width={width}
                height={220}
                strokeWidth={16}
                radius={32}
                chartConfig={chartConfig}
                hideLegend={false}
                />


              <View style={styles.titleInfoContainer}>
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
                  <TouchableOpacity
                    style={styles.moreExplore}
                            >
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
    backgroundColor: 'white',
    width: width * 0.9,
    marginTop: 15,
    borderRadius: 10,
    margin: 6,
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
