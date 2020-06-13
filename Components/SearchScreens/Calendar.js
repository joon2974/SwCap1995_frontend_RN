import React, { Component } from 'react';
import {
  View,
  StyleSheet,
  Dimensions,
  ImageBackground,
  FlatList,
} from 'react-native';
import DayList from './TabList/DayList';

const { width } = Dimensions.get('window');

export default class Calendar extends Component {
    state = {
      // selectedAllCate: '',      
      data: [],
    }

    async componentDidMount() {
      this.setParams();
      this.getData();
      // this.getDataTest();
    }

    setParams = () => {
      // this.setState({ selectedAllCate: this.props.route.params.selectedAllCate });
    }

    async getData() {
      const { data } = this.state;
      const url = 'http://49.50.172.58:3000/detailedCategories';
      await fetch(url)
        .then((r) => r.json())
        .then((res) => {
          this.setState({ 
            data: data.concat(res.data.detailedCategoryGet),
          });
        });
    }

    handleLoadMore = () => {
      this.getData();
    }
  
    renderItem = ({ item }) => (
      <DayList 
        item={item}
        explore={() => this.props.navigation.navigate('일일 인증')} />    
    );

    render() {
      return (
 
        <View style={styles.container}>
          <ImageBackground source={require('./backReverse8.png')} style={{ width: width }}>
  
            <FlatList 
              style={{ marginTop: 30, width: width }}
              data={this.state.data}
              renderItem={this.renderItem}
              keyExtractor={(item) => item.id.toString()}

              numColumns={2}
              contentContainerStyle={{
                alignItems: 'center',
                justifyContent: 'center',
              }}     
              
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
});
