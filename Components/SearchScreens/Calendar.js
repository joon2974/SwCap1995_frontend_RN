import React, { Component } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Image,
  ScrollView,
} from 'react-native';

export default class DetailPlan extends Component {
  render() {
    let pic = {
      // uri : search
      uri:
        'https://upload.wikimedia.org/wikipedia/commons/d/de/Bananavarieties.jpg',
    };

    return (
      <View style={styles.container}>
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
            <Text style={styles.recommendTitle}>지난 경과들에 대한 리스트</Text>
            <Text style={styles.recommendSubTitle}>
              아래엔 날짜에 맞는 인증자료들. 이걸 어떻게 표현할지는 좀더 논의.
            </Text>
          </View>

          <View style={styles.categoryUnitList}>
            <View>
              <Text>X월 X일</Text>
              <TouchableOpacity
                style={styles.category}
                onPress={() => this.props.navigation.navigate('DaileyAuthentication')
                }
              >
                <Image source={pic} style={styles.category} />
              </TouchableOpacity>
            </View>
            <View>
              <Text>X월 X일</Text>
              <TouchableOpacity
                style={styles.category}
                onPress={() => this.props.navigation.navigate('DaileyAuthentication')
                }
              >
                <Image source={pic} style={styles.category} />
              </TouchableOpacity>
            </View>
          </View>
          <View style={styles.categoryUnitList}>
            <View>
              <Text>X월 X일</Text>
              <TouchableOpacity
                style={styles.category}
                onPress={() => this.props.navigation.navigate('DaileyAuthentication')
                }
              >
                <Image source={pic} style={styles.category} />
              </TouchableOpacity>
            </View>
            <View>
              <Text>X월 X일</Text>
              <TouchableOpacity
                style={styles.category}
                onPress={() => this.props.navigation.navigate('DaileyAuthentication')
                }
              >
                <Image source={pic} style={styles.category} />
              </TouchableOpacity>
            </View>
          </View>
          <View style={styles.categoryUnitList}>
            <View>
              <Text>X월 X일</Text>
              <TouchableOpacity
                style={styles.category}
                onPress={() => this.props.navigation.navigate('DaileyAuthentication')
                }
              >
                <Image source={pic} style={styles.category} />
              </TouchableOpacity>
            </View>
            <View>
              <Text>X월 X일</Text>
              <TouchableOpacity
                style={styles.category}
                onPress={() => this.props.navigation.navigate('DaileyAuthentication')
                }
              >
                <Image source={pic} style={styles.category} />
              </TouchableOpacity>
            </View>
          </View>
          <View style={styles.categoryUnitList}>
            <View>
              <Text>X월 X일</Text>
              <TouchableOpacity
                style={styles.category}
                onPress={() => this.props.navigation.navigate('DaileyAuthentication')
                }
              >
                <Image source={pic} style={styles.category} />
              </TouchableOpacity>
            </View>
            <View>
              <Text>X월 X일</Text>
              <TouchableOpacity
                style={styles.category}
                onPress={() => this.props.navigation.navigate('DaileyAuthentication')
                }
              >
                <Image source={pic} style={styles.category} />
              </TouchableOpacity>
            </View>
          </View>
        </ScrollView>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },

  recommendTitle: {
    fontWeight: 'bold',
    paddingHorizontal: 10,
    paddingVertical: 20,
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
