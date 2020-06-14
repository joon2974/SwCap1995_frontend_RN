import React, { Component } from 'react';
import {
  View,
  ScrollView,
  StyleSheet,
  Dimensions,
  Platform,
} from 'react-native';
import axios from 'axios';
import ServiceCard from './MyComponents/ServiceCard';

const { width, height } = Dimensions.get('window');

export default class AllServiceScreen extends Component {
  state = {
    userid: this.props.route.params.userId,
    serviceArray: [],
  };
  
  componentDidMount() {
    console.log(this.state.userid);
    this.loadAllService();
  }
 

  loadAllService = async () => {
    const response = await axios.get(
      'http://49.50.172.58:3000/customer_service/' + this.state.userid,
    );
    
    var serviceArray = [];
    const responseJson = await response.data.rows;
    const count = await response.data.count;
    try {
      if (count !== 0) {
        for (var i = 0; i < count; i++) {
          const obj = {
            title: responseJson[i].title, 
            message: responseJson[i].message,
            answer: responseJson[i].answer, 
            message_type: responseJson[i].message_type,
          }; 
          serviceArray.push(obj);
        }
        this.setState({
          serviceArray: serviceArray,
        });
      }
    } catch (error) {
      console.error(error);
    }
    
    console.log('서비스', this.state.serviceArray);
  };

  render() {
    const serviceArray = this.state.serviceArray;
    const service = serviceArray.map((data) => (
      <ServiceCard
        key={data.title} 
        title={data.title}
        message={data.message}
        answer={data.answer}
        />
    ));
    return (
      <ScrollView
        style={styles.Container}
      
>
        <View style={{
          alignItems: 'center', backgroundColor: 'white', height: height, 
        }}>
          {service}
        </View>
      </ScrollView>
    );
  }
}

const styles = StyleSheet.create({
    
  noticeContainer: {
    marginTop: 30,
    width: width * 0.9,
    height: height / 8,
    alignItems: 'center',
    borderRadius: 15,
    backgroundColor: 'white',
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
  Container: {
  },
});
