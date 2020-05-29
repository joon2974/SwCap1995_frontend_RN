import React, { Component } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Dimensions,
  ScrollView,
} from 'react-native';
import axios from 'axios';
import NormalPlanList from './TabList/NormalPlanList';

// eslint-disable-next-line no-unused-vars
const { width, height } = Dimensions.get('window');

export default class PlanList extends Component {
    state = {

      watchers: ['1', '2', '3', '4', '5'],
      watchersComment: ['hello', 'bye', 'thank', 'u', '...'],

      // eslint-disable-next-line react/no-unused-state
      para: this.props.route.params,

    }
    
  
    componentDidMount() {
      this.setPlan();
    }

    setPlan = () => {
      // eslint-disable-next-line no-unused-vars
      axios.get('http://49.50.172.58:3000/graphql?query={categoryGet{id,name,description,image_url,createdAt,updatedAt}}').then((res) => {

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
                      <NormalPlanList 
                                  // eslint-disable-next-line react/no-array-index-key
                        key={index}
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
                      <NormalPlanList 
                                  // eslint-disable-next-line react/no-array-index-key
                        key={index}
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
                      <NormalPlanList 
                                  // eslint-disable-next-line react/no-array-index-key
                        key={index}
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
                      <NormalPlanList 
                                  // eslint-disable-next-line react/no-array-index-key
                        key={index}
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
  
  
  titleInfoContainer: {
    backgroundColor: 'red',
    width: width * 1,
    marginTop: 15,
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

  titleStyle: {
    fontWeight: 'bold',
    fontSize: 20,
    marginVertical: 10,

  },

});
