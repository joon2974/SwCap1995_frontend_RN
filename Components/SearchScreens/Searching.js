import React, { Component } from 'react';
import {
  View,
  ScrollView,
  StyleSheet,
  // eslint-disable-next-line no-unused-vars
  TouchableOpacity,
  Dimensions,
  Button,
} from 'react-native';
import { Input } from 'react-native-elements';
import axios from 'axios';
import SearchedList from './TabList/SearchedList';

const { height, width } = Dimensions.get('window');

export default class Searching extends Component {
  state = {
    // eslint-disable-next-line react/no-unused-state
    search: '',
    searchStatus: 0,
  };

  // eslint-disable-next-line react/sort-comp
  updateSearch = (changedSearch) => {
    // eslint-disable-next-line react/no-unused-state
    this.setState({ search: changedSearch });
  };

  async sendSearch() {
    await axios
      .get('http://49.50.172.58:3000/plans?limit=10')
      // eslint-disable-next-line no-unused-vars
      .then((res) => {
        console.log(res.data.plans[1].bet_money);
        //        alert(res);
      })
      .catch((error) => {
        console.log(error);
        //        alert(error);
      });

    this.setState({ searchStatus: 1 });
  }

 
  render() {
    return (
      <View style={styles.container}>
        <View style={styles.searchContainer}>
          
          <View style={styles.searchBar}>
            <Input
              placeholder="Type Here..."
              onChangeText={(changedSearch) => {
                this.updateSearch(changedSearch);
              }}
            />
            <Button
              title="검색"
              type="solid"
              onPress={() => {
                this.sendSearch();
              }}
            />
          </View>
        </View>

        <ScrollView style={styles.scrollContainer}>
          {this.state.searchStatus ? <SearchedList explore={() => this.props.navigation.navigate('DetailPlan')} /> : <View /> }
        </ScrollView>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'white',
    paddingVertical: 10,
  },
  searchContainer: {
    width: width * 0.95,
  },
  searchTitle: {
    marginLeft: 10,
    marginTop: 5,
  },
  searchBar: {
    width: width * 0.84,
    flexDirection: 'row',
    marginTop: 5,
    marginBottom: 15,
  },
  scrollContainer: {
    width: width * 1,
  },
  recommendTitle: {
    fontWeight: 'bold',
    marginHorizontal: 25,
    marginTop: 25,
    fontSize: 24,
  },
  recommendSubTitle: {
    marginHorizontal: 25,
    marginTop: 10,
    fontSize: 16,
  },
  moreExplore: {
    marginTop: 15,
    alignItems: 'center',
    justifyContent: 'center',
    width: width * 0.75,
    backgroundColor: '#F2F2F2',
    borderRadius: 10,
    height: height * 0.04,
  },
  allCateTitle: {
    fontWeight: 'bold',
    marginHorizontal: 25,
    marginTop: 65,
    fontSize: 24,
  },
  allCateSubTitle: {
    marginHorizontal: 25,
    marginTop: 10,
    fontSize: 16,
  },

  tabButtonContainer: {
    width: width,
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
    marginTop: 20,
  },

  planContainer: {
    width: width,
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginTop: 10,
  },

  categoryBtnStyle: {
    width: width * 0.17,
    height: 40,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 5,
    margin: 1,
  },

  selectedCategoryBtnStyle: {
    width: width * 0.17,
    height: 40,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#00FFFF',
    borderRadius: 5,
    margin: 1,
  },
});
