import React, { Component } from 'react';
import {
  View,
  Picker,
  StyleSheet,
  Dimensions,
  TextInput,
  TouchableOpacity,
  Text,
  Platform,
} from 'react-native';

import axios from 'axios';

const { height, width } = Dimensions.get('window');
export default class ServiceScreen extends Component {
    state={
      title: '',
      category: '템플릿제의',
      contents: '',
    }


    setCategory=(category) => {
      this.setState({ category: category });
    }

    submit() {
      axios.post(
        'http://49.50.172.58:3000/customer_service/inquiry', {
          user_id: this.props.route.params.userId,
          title: this.state.title,
          message: this.state.contents,
          message_type: this.state.category,
        },
      ).then((response) => { alert('문의를 보냈습니다.'); console.log(response); }).catch((error) => (console.log(error)));
    }

    render() {
      const {
        title, category, contents, 
      } = this.state;
      return (
        <View style={styles.container}>
          <View style={styles.topcontainer}>
            <View style={styles.pickerContainer}>            
              <Picker
                selectedValue={category}
                style={{
                  height: 30, width: width - 100, 
                }}
                onValueChange={this.setCategory}
      >

                <Picker.Item label="템플릿제의" value="템플릿제의" />
                <Picker.Item label="인증" value="인증" />
                <Picker.Item label="감시" value="감시" />
                <Picker.Item label="포인트" value="포인트" />
              </Picker> 
            </View>
            <TextInput
              value={title}
              onChangeText={(title) => this.setState({ title })}
              style={styles.titleInputStyle}
              placeholder="문의 제목을 써주세요"
            />
            
          </View>
          <View style={{ margintop: 10 }}>
            <TextInput
              value={contents}
              onChangeText={(contents) => this.setState({ contents })}
              style={styles.contentsInputStyle}
              placeholder="문의 내용을 써주세요"
            />
          </View>
          <View style={{ marginTop: 10 }} />
          <TouchableOpacity
            activeOpacity={0.8}
            style={styles.button}
            onPress={() => this.submit()}>
            <Text style={styles.text}>제출</Text>
          </TouchableOpacity>
        </View>
      );
    }
}


const styles = StyleSheet.create({
  container: {
    width: width,
    height: height,
    flex: 1,
    backgroundColor: 'white',
    alignItems: 'center',
  },
  topcontainer: {
    marginTop: 50, 
    justifyContent: 'space-between',
    marginBottom: 20,
  },
  titleInputStyle: {
    width: width - 100,
    borderRadius: 5,
    backgroundColor: '#F2F2F2',
    height: 30,
  },
  pickerContainer: {
    marginBottom: 20,
  },
  contentsInputStyle: {
    width: width - 100,
    height: height / 2,
    borderRadius: 5,
    backgroundColor: '#F2F2F2',
  },    
  
  button: {
    borderRadius: 15,
    width: 60,
    height: 30,
    backgroundColor: '#FD8A69',
    justifyContent: 'center',
    alignItems: 'center',
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
  
});
