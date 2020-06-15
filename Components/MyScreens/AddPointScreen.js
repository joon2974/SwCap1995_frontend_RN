// import React, { Component } from 'react';
// import {
//   View, Text, StyleSheet, Picker, TouchableOpacity, AsyncStorage,
// } from 'react-native';

// import axios from 'axios';

// export default class AddPointScreen extends Component {
//   constructor(props) {
//     super(props);
//     this.state = {
//       userId: '',
//       selectedValue: '5000',
//     };
//   }

//   componentDidMount() {
//     this.loadUserID();
//   }

//   loadUserID = async () => {
//     console.log(this.state.userId);
//     await AsyncStorage.getItem('UserID').then((id) => {
//       this.state.userId = id;

//       console.log('완료', this.state.userId);
//     });
//   };

//   requestAddPoint(selectedValue) {
//     console.log('보낼때 유저아이디', this.state.userId);
//     axios.post(
//       'http://49.50.172.58:3000/points/add', {
//         user_id: this.state.userId,
//         class: 'challenge',
//         amount: selectedValue,
//       },
//     ).then(() => {
//       console.log(this.props);
//       alert(selectedValue + '원 충전신청이 되었습니다');
//       this.props.route.params.onRefresh();
//       this.props.navigation.popToTop();
//     });
//   }

//   render() {
//     return (
//       <View style={styles.container}>
//         <Text style={styles.textContainer}>포인트 충전페이지</Text>

//         <View style={styles.addPointContainer}>
//           <Text>충전금액</Text>
//           <Picker
//             selectedValue={this.state.selectedValue}
//             style={{ height: 50, width: 150 }}
//             onValueChange={(selectedValue) => this.setState({ selectedValue: selectedValue })
//             }
//           >
//             <Picker.Item label="5000" value="5000" />
//             <Picker.Item label="10000" value="10000" />
//             <Picker.Item label="15000" value="15000" />
//             <Picker.Item label="20000" value="20000" />
//           </Picker>
//         </View>
//         <TouchableOpacity
//           activeOpacity={0.8}
//           style={styles.button}
//           onPress={() => this.requestAddPoint(this.state.selectedValue)}>
//           <Text style={styles.text}>충전</Text>
//         </TouchableOpacity>
//       </View>
//     );
//   }
// }
// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: 'white',
//     alignItems: 'center',
//     justifyContent: 'center',
//   },
//   textContainer: {
//     color: 'black',
//   },
// });
import React from 'react';
/* 아임포트 모듈을 불러옵니다. */
import IMP from 'iamport-react-native';

/* 로딩 컴포넌트를 불러옵니다. */
import Loading from './Loading';

export default class AddPointScreen extends React.Component {
  /* [필수입력] 결제에 필요한 데이터를 생성합니다. */
  getPaymentData() {
    return {
      pg: 'html5_inicis',
      pay_method: 'card',
      name: '아임포트 결제데이터 분석',
      merchant_uid: `mid_${new Date().getTime()}`,
      amount: '100',
      buyer_name: '홍길동',
      buyer_tel: '01012345678',
      buyer_email: 'example@naver.com',
      buyer_addr: '서울시 강남구 신사동 661-16',
      buyer_postcode: '06018',
      app_scheme: 'example',
      // [Deprecated v1.0.3]: m_redirect_url
    };
  }

  callback(response) {
    //navigation 을 이용해 결과 렌더링 Component로 이동
  }

  render() {
    return (
      <IMP.Payment
        userCode={'imp13539284'} // 가맹점 식별코드
        loading={<Loading />} // 웹뷰 로딩 컴포넌트
        data={this.getPaymentData()} // 결제 데이터
        callback={this.callback} // 결제 종료 후 콜백
      />
    );
  }
}
