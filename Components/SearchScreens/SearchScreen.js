import React, { Component } from 'react';
import {
  View,
  Text,
  ScrollView,
  StyleSheet,
  Image,
  TouchableOpacity,
} from 'react-native';
import { Input, Button } from 'react-native-elements';
import axios from 'axios';

// const { width } = Dimensions.get('window');

export default class Searchscreen extends Component {
  state = {
    search: '',
    temp: 'abc',
  };

  updateSearch = (search) => {
    this.setState({ search });
  };

  sendSearch = (temp) => {
    axios
      .get('http://49.50.172.58:3000/categories/search?query=' + temp)
      .then((res) => {
        console.log(res);
        alert(res.data);
      })
      .catch((error) => {
        console.log(error);
        alert(error);
      });
  };

  render() {
    const { search } = this.state;

    let pic = {
      // uri : search
      uri:
        'https://upload.wikimedia.org/wikipedia/commons/d/de/Bananavarieties.jpg',
    };

    return (
      <View style={styles.container}>
        <View>
          <Text style={styles.searchTitle}>
            관심 있는 키워드를 아래에 입력해 보세요
          </Text>
        </View>

        <View style={styles.searchBar}>
          <Input placeholder="Type Here..." onChangeText={this.updateSearch} />
          <Button title="검색" type="solid" onPress={this.sendSearch} />
        </View>

        <ScrollView
          ref={(scrollView) => {
            this.scrollView = scrollView;
          }}
          // decelerationRate={0}
          // snapToInterval={width - 60}
          // snapToAlignment={"center"}
          // pagingEnabled={true}
          contentInset={{
            top: 0,
            left: 30,
            bottom: 0,
            right: 30,
          }}
        >
          <View>
            <Text style={styles.recommendTitle}>주간 인기 분야</Text>
            <Text style={styles.recommendSubTitle}>
              이 주의 가장 인기있는 플랜들을 확인해 보세요!!
            </Text>
          </View>

          <View style={styles.categoryUnitList}>
            <TouchableOpacity
              style={styles.category}
              onPress={() => this.props.navigation.navigate('PlanSearched')}
            >
              <Image source={pic} style={styles.category} />
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.category}
              onPress={() => this.props.navigation.navigate('PlanSearched')}
            >
              <Image source={pic} style={styles.category} />
            </TouchableOpacity>
          </View>
          <View style={styles.categoryUnitList}>
            <TouchableOpacity
              style={styles.category}
              onPress={() => this.props.navigation.navigate('PlanSearched')}
            >
              <Image source={pic} style={styles.category} />
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.category}
              onPress={() => this.props.navigation.navigate('PlanSearched')}
            >
              <Image source={pic} style={styles.category} />
            </TouchableOpacity>
          </View>

          <View>
            <Text style={styles.recommendTitle}>전체 카테고리</Text>
            <Text style={styles.recommendSubTitle}>
              관심 있는 분야를 선택해 보세요!!
            </Text>
          </View>

          <View style={styles.categoryUnitList}>
            <TouchableOpacity
              style={styles.category}
              onPress={() => this.props.navigation.navigate('PlanSearched')}
            >
              <Image source={pic} style={styles.category} />
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.category}
              onPress={() => this.props.navigation.navigate('PlanSearched')}
            >
              <Image source={pic} style={styles.category} />
            </TouchableOpacity>
          </View>
          <View style={styles.categoryUnitList}>
            <TouchableOpacity
              style={styles.category}
              onPress={() => this.props.navigation.navigate('PlanSearched')}
            >
              <Image source={pic} style={styles.category} />
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.category}
              onPress={() => this.props.navigation.navigate('PlanSearched')}
            >
              <Image source={pic} style={styles.category} />
            </TouchableOpacity>
          </View>
        </ScrollView>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
    paddingVertical: 10,
  },
  searchBar: {
    width: 350,
    flexDirection: 'row',
  },
  searchTitle: {
    marginHorizontal: 10,
  },
  recommendTitle: {
    fontWeight: 'bold',
    paddingHorizontal: 10,
    paddingVertical: 10,
    fontSize: 24,
  },
  recommendSubTitle: {
    paddingHorizontal: 10,
    paddingVertical: 10,
    fontSize: 16,
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
});
