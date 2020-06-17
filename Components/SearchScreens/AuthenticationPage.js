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
          ) : (<View />) }
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
