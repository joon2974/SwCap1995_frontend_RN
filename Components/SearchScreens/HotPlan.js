/* eslint-disable global-require */
/* eslint-disable no-unused-vars */
/* eslint-disable react/no-access-state-in-setstate */
/* eslint-disable no-underscore-dangle */
/* eslint-disable react/no-unused-state */
import React, { Component } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Dimensions,
  ImageBackground,
  TouchableOpacity,
  FlatList,
  ScrollView,
} from 'react-native';
import axios from 'axios';
import { CardFive } from './Cards';
import HotPlanList from './TabList/HotPlanList';


// eslint-disable-next-line no-unused-vars
const { width, height } = Dimensions.get('window');

export default class DetailPlan extends Component {
    state = {
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
      
      data: [],
      page: 1, // here

    }


    componentDidMount() {
      this.setPlan();
      this._getData();
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


    _getData = () => {
      const url = 'http://49.50.172.58:3000/plans?limit=10';
      fetch(url)
        .then((r) => r.json())
        .then((data) => {
          this.setState({ 
            data: this.state.data.concat(data.plans[0].category + data.plans[0].bet_money),
            page: this.state.page + 1,
          });
        });      
    }
  
    _handleLoadMore = () => {
      this._getData();
    }
  
  
    // <Text>{item}</Text>
       
    _renderItem = ({ item }) => (
      <TouchableOpacity style={{}} onPress={() => this.props.navigation.navigate('DetailPlan')}>
        <CardFive
          title="Vinny’s Barber"
          subTitle="852 N Virgil Ave, Beverly Hills"
          profile={{
            uri:
                  'https://www.gettyimages.com/gi-resources/images/frontdoor/creative/PanoramicImagesRM/FD_image.jpg',
          }}
          image={{
            uri:
                  'https://www.chambre237.com/wp-content/uploads/2017/09/Un-Photographe-professionnel-partage-ses-Secrets-pour-capturer-des-Photos-de-Paysage-parfaites-03.jpg',
          }}
          icon="star"
          nbStar={3}
          iconColor="#FFC57C"
            />
      </TouchableOpacity>
    );


    render() {
      return (
 
        <View style={styles.container}>
          <ImageBackground source={require('./back6.png')} style={{ width: width }}>
  
            <FlatList 
              style={{ marginTop: 30, width: width }}
              data={this.state.data}
              renderItem={this._renderItem}
              keyExtractor={(item, index) => item.id}
              onEndReached={this._handleLoadMore}
              onEndReachedThreshold={1}
            />
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
  
  titleInfoContainer: {
    backgroundColor: '#F2F2F2',
    width: width * 1,
    height: height * 0.06,

    marginTop: 5,
    marginBottom: 20,
    borderRadius: 10,
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

  planListStyle: {
    width: width,
    alignItems: 'center',
  },

  titleStyle: {
    fontWeight: 'bold',
    fontSize: 20,
  },
  
  
});


/*


  <ScrollView contentContainerStyle={{ walignItems: 'center' }}>

            <View style={styles.titleInfoContainer}>
              <Text style={styles.titleStyle}>
                %%대 인기 PLAN TOP 20
              </Text>
                        
              <View style={{ marginBottom: 10 }} />

            </View>
                    
            <View>
                       
              <View style={styles.planListStyle}>
                {
                  this.state.watchers.map((data, index) => (
                    <View>
                      <HotPlanList 
                                  // eslint-disable-next-line react/no-array-index-key
                        key={index}
                        index={index}
                        comment={this.state.watchersComment}
                    />
                    </View>
                  ))}       
              </View>

              <View style={{ marginBottom: 10 }} />

            </View>
                    
                    
            <View style={{ marginVertical: 20 }} />

          </ScrollView>
*/
