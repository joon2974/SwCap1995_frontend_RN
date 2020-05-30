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
  Image,
  Dimensions,
  ScrollView,
} from 'react-native';
import Watcher from './TabList/Watcher';

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
      

      return (
          
        <View style={styles.container}>
          <ImageBackground source={require('./back8.png')} style={{ width: width }}>
       

            <ScrollView contentContainerStyle={{ alignItems: 'center' }}>

              <TouchableOpacity 
                style={styles.titleImageContainer}
                    >
                <Image 
                  style={styles.imageStyle}
                  source={{ uri: item.image_url }} 
                        />
              </TouchableOpacity>

              <View style={styles.titleInfoContainer}>
                <Text style={styles.titleStyle}>
                  {'제목 : ' + item.title}
                </Text>
                        
                <Text style={styles.subTitleStyle}>
                  {'부제 : ' + item.title}
                </Text>
                        
                <Text style={styles.dateInfo}>
                  {'작성일 : ' + item.createdAt + '\n'}
                  {'수정일 : ' + item.updatedAt}
                </Text>

                <View style={{ marginBottom: 10 }} />

              </View>
                    
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

              <View style={styles.titleInfoContainer}>
                <Text style={styles.titleStyle}>
                  지난 경과들...
                </Text>
                <Text style={styles.subTitleStyle}>
                  지난 인증 결과에 대해 궁금하시다면 아래의 달력을 클릭해 보세요
                  {'\n'}
                </Text>

                <TouchableOpacity style={styles.calendarStyle} onPress={() => this.props.navigation.navigate('Calendar')}>
                  <Image 
                    style={styles.calendarStyle}
                    source={{ uri: item.image_url }} 
                            />
                </TouchableOpacity>
                        
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
});
