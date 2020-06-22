/* eslint-disable react/no-access-state-in-setstate */
/* eslint-disable no-restricted-syntax */
/* eslint-disable guard-for-in */
/* eslint-disable max-len */
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
import VariableCard from './VariableCard';
import WatcherInfo from './WatcherInfo';

const { width, height } = Dimensions.get('window');

export default class WatcherPage extends Component {
  state = {
    title: '',
    isPublic: false,
    data: [1, 2, 3, 4, 5, 6],
    onOff: 0,
    selectedTab: 0,
    tabState: 0,
    testArray: [],
    testArray2: [],
    dateConverted: '',
    pointAndCount: null,
    keysPointAndCount: [],
  }

  async componentDidMount() {
    await this.setTest();
    this.setState({ tabState: this.props.route.params.selectedTab, selectedTab: this.props.route.params.selectedTab });
  }

  setTest = () => {
    axios.get('http://49.50.172.58:3000/daily_authentications/' + this.props.route.params.planID).then((res) => {
      this.setState({ testArray: res.data.rows });
    }).catch((error) => {
      console.log(error);
      alert(error);
    });
    axios.get('http://49.50.172.58:3000/plans/' + this.props.route.params.planID).then((res) => {
      this.setState({ testArray2: res.data });

      const dateParsing1 = res.data.plan_start_day.split('-');
      let dateParsing2 = '';
      dateParsing2 = dateParsing2.concat(dateParsing1[0] + '년 ' + dateParsing1[1] + '월 ' + dateParsing1[2][0] + dateParsing1[2][1] + '일');
      this.setState({ dateConverted: dateParsing2 });
    }).catch((error) => {
      console.log(error);
      alert(error);
    });
  }  


  render() {
    return (

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
            <Text style={this.state.selectedTab === 0 ? { color: 'white' } : { color: 'black' }}>감시</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={
          this.state.selectedTab === 1
            ? styles.selectedCategoryBtnStyle
            : styles.categoryBtnStyle
        }
            onPress={() => this.setState({ selectedTab: 1, tabState: 1 })}
      >
            <Text style={this.state.selectedTab === 1 ? { color: 'white' } : { color: 'black' }}>정보</Text>
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
                    data2={this.state.testArray2}
                    index={index} 
                    onOff={this.state.onOff}
                    changeShowing={() => {
                      this.setState({ onOff: index });
                    }}
                    planData={this.state.testArray2}
                    userID={this.props.route.params.userID}
                />
                ))
              }
              <View style={styles.lineDivider} />

            </View>

          </ScrollView>
        ) : (
          <WatcherInfo 
            userID={this.props.route.params.userID}
            planData={this.state.testArray2} 
            date={this.state.dateConverted}
            exploreMoreInfo={() => this.props.navigation.navigate('플랜 상세 정보', { item: this.state.testArray2 })}
        />
        ) }
       
    
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
