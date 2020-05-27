import React, { Component } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Dimensions,
  ScrollView,
} from 'react-native';
import axios from 'axios';
import HotPlanList from './TabList/HotPlanList';

const { width, height } = Dimensions.get('window');

export default class PlanList extends Component {
    state = {

      // eslint-disable-next-line react/no-unused-state
      search: '',

      // eslint-disable-next-line react/no-unused-state
      nowPlanTitle: '1',
      // eslint-disable-next-line react/no-unused-state
      nowPlanImage: '2',
      // eslint-disable-next-line react/no-unused-state
      nowPlanDescription: '3',
      // eslint-disable-next-line react/no-unused-state
      nowWatcherList: 'A, B, C, D',
      // eslint-disable-next-line react/no-unused-state
      nowCreatedAt: '',
      // eslint-disable-next-line react/no-unused-state
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
      axios.get('http://49.50.172.58:3000/graphql?query={categoryGet{id,name,description,image_url,createdAt,updatedAt}}').then((res) => {
        // eslint-disable-next-line react/no-unused-state
        this.setState({ nowPlanTitle: res.data.data.categoryGet[0].name });          
        // eslint-disable-next-line react/no-unused-state
        this.setState({ nowPlanImage: res.data.data.categoryGet[0].image_url });
        // eslint-disable-next-line react/no-unused-state
        this.setState({ nowPlanDescription: res.data.data.categoryGet[0].description });
        // eslint-disable-next-line react/no-unused-state
        this.setState({ nowCreatedAt: res.data.data.categoryGet[0].createdAt });
        // eslint-disable-next-line react/no-unused-state
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


            <View style={styles.titleInfoContainer}>
              <Text style={styles.titleStyle}>
                ~~~분야 플랜들
              </Text>
                        
              <View style={{ marginBottom: 10 }} />

            </View>  
                    
            <View style={styles.titleInfoContainer}>
                        
                        
              <View>
                {
                            this.state.watchers.map((data, index) => (
                              <View>
                                <HotPlanList 
                                  key={data}
                                  index={index}
                                  comment={this.state.watchersComment}
                                  explore={() => this.props.navigation.navigate('DetailPlan')}
                                />
                              </View>
                            ))
                                
                                
                        }
              </View>

              <View style={{ marginBottom: 10 }} />

            </View>
                    

            <View style={styles.titleInfoContainer}>
                        
                        
              <View>
                {
                            this.state.watchers.map((data, index) => (
                              <View>
                                <HotPlanList 
                                  key={data}
                                  index={index}
                                  comment={this.state.watchersComment}
                                     />
                              </View>
                            ))
                                
                                
                        }
              </View>

              <View style={{ marginBottom: 10 }} />

            </View>
                    

            <View style={styles.titleInfoContainer}>
                        
                        
              <View>
                {
                            this.state.watchers.map((data, index) => (
                              <View>
                                <HotPlanList 
                                  key={data}
                                  index={index}
                                  comment={this.state.watchersComment}
                                     />
                              </View>
                            ))
                                
                                
                        }
              </View>

              <View style={{ marginBottom: 10 }} />

            </View>
                    

            <View style={styles.titleInfoContainer}>
                        
                        
              <View>
                {
                            this.state.watchers.map((data, index) => (
                              <View>
                                <HotPlanList 
                                  key={data}
                                  index={index}
                                  comment={this.state.watchersComment}
                                     />
                              </View>
                            ))
                                
                                
                        }
              </View>

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
