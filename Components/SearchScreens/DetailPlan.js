/* eslint-disable no-unused-vars */
/* eslint-disable global-require */
/* eslint-disable no-undef */
/* eslint-disable react/no-array-index-key */
import React, { Component } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ImageBackground,
  Dimensions,
  ScrollView,
} from 'react-native';
import PureChart from 'react-native-pure-chart';
import Watcher from './TabList/Watcher';
import { CardNine } from './Cards';

const { width, height } = Dimensions.get('window');

export default class DetailPlan extends Component {
    state = {
      item: [],
      watchers: ['1', '2', '3', '4', '5'],
      watchersComment: ['hello', 'bye', 'thank', 'u', '...'],
    }

    componentDidMount() {
      this.setPlan();
    }

    setPlan = () => {
      this.setState({ item: this.props.route.params.item });
    }

    render() {
      const { item } = this.state;
     
      const sampleData = [
        { x: '2018-01-01', y: 30 },
        { x: '2018-01-02', y: 200 },
        { x: '2018-01-03', y: 170 },
        { x: '2018-01-04', y: 250 },
        { x: '2018-01-05', y: 10 },
      ];

      const sampleData2 = [
        {
          value: 50,
          label: 'Marketing',
          color: 'red',
        }, {
          value: 40,
          label: 'Sales',
          color: 'blue',
        }, {
          value: 25,
          label: 'Support',
          color: 'green',
        },
     
      ];
      
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
               
                <PureChart data={sampleData} type="line" />
                
                <TouchableOpacity 
                  style={styles.moreExploreBar}
                  onPress={() => { this.props.navigation.navigate('인증'); }}
                >
                  <Text>인증 더 보기</Text>
                </TouchableOpacity>

                <View style={styles.lineDivider} />

                <PureChart data={sampleData2} type="pie" />
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

              <View style={styles.titleInfoContainer}>
                <Text style={styles.titleStyle}>
                  감시자들
                </Text>
                        
                <View>
                  {
                  this.state.watchers.map((data, index) => (
                    <View>
                      <Watcher 
                        key={index}
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
    backgroundColor: '#F2F2F2',
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
