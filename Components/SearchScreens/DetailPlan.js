import React, { Component } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Image,
  Dimensions,
  ScrollView,
} from 'react-native';
import axios from 'axios';
import Watcher from './TabList/Watcher';

const { width, height } = Dimensions.get('window');

export default class DetailPlan extends Component {
    state = {
      nowPlanTitle: '1',
      nowPlanImage: '2',
      nowPlanDescription: '3',
      // eslint-disable-next-line react/no-unused-state
      nowWatcherList: 'A, B, C, D',
      nowCreatedAt: '',
      nowUpdatedAt: '',
    
      watchers: ['1', '2', '3', '4', '5'],
      watchersComment: ['hello', 'bye', 'thank', 'u', '...'],
    

      // eslint-disable-next-line react/no-unused-state
      para: this.props.route.params,
    
    }

    componentDidMount() {
      this.setPlan();
    }

    setPlan = () => {
      //       console.log(this.state.para);  파라미터 넘기는거 확인
        
      axios.get('http://49.50.172.58:3000/graphql?query={categoryGet{id,name,description,image_url,createdAt,updatedAt}}').then((res) => {
        this.setState({ nowPlanTitle: res.data.data.categoryGet[0].name });          
        this.setState({ nowPlanImage: res.data.data.categoryGet[0].image_url });
        this.setState({ nowPlanDescription: res.data.data.categoryGet[0].description });
        this.setState({ nowCreatedAt: res.data.data.categoryGet[0].createdAt });
        this.setState({ nowUpdatedAt: res.data.data.categoryGet[0].updatedAt });
        // alert(res);
      }).catch((error) => {
        console.log(error);
        // alert(error);
      });
    }

    render() {
      return (
          
        <View style={styles.container}>
               
          <ScrollView contentContainerStyle={{ alignItems: 'center' }}>

            <TouchableOpacity 
              style={styles.titleImageContainer}
                    >
              <Image 
                style={styles.imageStyle}
                source={{ uri: this.state.nowPlanImage }} 
                        />
            </TouchableOpacity>

            <View style={styles.titleInfoContainer}>
              <Text style={styles.titleStyle}>
                {'제목 : ' + this.state.nowPlanTitle}
              </Text>
                        
              <Text style={styles.subTitleStyle}>
                {'부제 : ' + this.state.nowPlanDescription}
              </Text>
                        
              <Text style={styles.dateInfo}>
                {'작성일 : ' + this.state.nowCreatedAt + '\n'}
                {'수정일 : ' + this.state.nowUpdatedAt}
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
                                  // eslint-disable-next-line react/no-array-index-key
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
                RULE 1 : ~~~~~~~~~
                {'\n'}
                RULE 2 : ~~~~~~~~~
                {'\n'}
                RULE 3 : ~~~~~~~~~
                {'\n'}
                RULE 4 : ~~~~~~~~~
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
                  source={{ uri: this.state.nowPlanImage }} 
                            />
              </TouchableOpacity>
                        
              <View style={{ marginBottom: 10 }} />

            </View>
                   

            <View style={{ marginVertical: 20 }} />

          </ScrollView>

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
    paddingTop: 20,
  },

  titleImageContainer: {
    width: width * 0.9,
    height: height / 4,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#F2F2F2',
    borderRadius: 10,
    margin: 6,

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

  categoryUnitList: {
    flexDirection: 'row',
    padding: 5,
  },
  category: {
    margin: 5,
    width: 180,
    height: 150,
  },
  calendar: {
    width: 360,
    height: 200,
  },
});
