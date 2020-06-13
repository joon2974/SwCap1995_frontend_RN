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
  Platform,
  TouchableOpacityBase,
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

    testArray: [],
  }

  componentDidMount() {
    this.setTest();
  }
  

  setTest = () => {
    axios.get('http://49.50.172.58:3000/daily_authentications/' + this.props.route.params.planID).then((res) => {
      this.setState({ testArray: res.data.rows });
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
                    key={data}
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
