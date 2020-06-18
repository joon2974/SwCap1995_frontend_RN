/* eslint-disable react/no-unused-state */
/* eslint-disable no-unused-vars */
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
  PieChart,
  ProgressChart,
  ContributionGraph,
  StackedBarChart,
} from 'react-native-chart-kit';
import VariableCard from './VariableCard';

const { width, height } = Dimensions.get('window');

export default class WatcherPage extends Component {
  state = {
    title: '',
    isPublic: false,
    onOff: 0,
    selectedTab: 0,
    tabState: 0,
    count: 0,
    testArray: [],
  }

  componentDidMount() {
    this.setTest();
  }
  

  setTest = () => {
    axios.get('http://49.50.172.58:3000/daily_authentications/' + this.props.route.params.planID).then((res) => {
      this.setState({ testArray: res.data.rows, count: res.data.count });
    }).catch((error) => {
      console.log(error);
      alert(error);
    });
  }
  

  render() {
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

    const data = [
      {
        name: 'Seoul',
        population: 21500000,
        color: 'rgba(131, 167, 234, 1)',
        legendFontColor: '#7F7F7F',
        legendFontSize: 15,
      },
      {
        name: 'Toronto',
        population: 2800000,
        color: '#F00',
        legendFontColor: '#7F7F7F',
        legendFontSize: 15,
      },
      {
        name: 'Beijing',
        population: 527612,
        color: 'red',
        legendFontColor: '#7F7F7F',
        legendFontSize: 15,
      },
      {
        name: 'New York',
        population: 8538000,
        color: '#ffffff',
        legendFontColor: '#7F7F7F',
        legendFontSize: 15,
      },
      {
        name: 'Moscow',
        population: 11920000,
        color: 'rgb(0, 0, 255)',
        legendFontColor: '#7F7F7F',
        legendFontSize: 15,
      },
    ];


    let auth = null;
    if (this.state.count === 0) {
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
              <Text style={this.state.selectedTab === 1 ? { color: 'white' } : { color: 'black' }}>기타</Text>
            </TouchableOpacity>
          </View>
      
          {this.state.tabState === 0 ? (

            <ScrollView style={{ marginBottom: 40 }}>
        
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
            <View>
            

              <View>
                <Text>Bezier Line Chart</Text>
                <LineChart
                  data={{
                    labels: ['January', 'February', 'March', 'April', 'May', 'June'],
                    datasets: [
                      {
                        data: [
                          Math.random() * 100,
                          Math.random() * 100,
                          Math.random() * 100,
                          Math.random() * 100,
                          Math.random() * 100,
                          Math.random() * 100,
                        ],
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


              <PieChart
                data={data}
                width={width}
                height={220}
                chartConfig={chartConfig}
                accessor="population"
                backgroundColor="transparent"
                paddingLeft="15"
                absolute
            />

            </View>
          ) }
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
