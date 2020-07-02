import React, { Component } from 'react';
/* 아임포트 모듈을 불러옵니다. */
// import IMP from 'iamport-react-native';

/* 로딩 컴포넌트를 불러옵니다. */
import axios from 'axios';
import Loading from './Loading';

export default class PaymentScreen extends Component {
  /* [필수입력] 결제에 필요한 데이터를 생성합니다. */
  state={
    userId: this.props.route.params.userId,
    payment: this.props.route.params.payment,
  }

  getPaymentData = () => ({
    pg: 'html5_inicis',
    pay_method: 'card',
    name: 'planA',
    merchant_uid: `mid_${new Date().getTime()}`,
    amount: this.state.payment,
    buyer_name: '홍길동',
    buyer_tel: '01012345678',
    buyer_email: 'example@naver.com',
    buyer_addr: '서울시 강남구 신사동 661-16',
    buyer_postcode: '06018',
    app_scheme: 'example',
    // [Deprecated v1.0.3]: m_redirect_url
  })

  callback = () => {
    axios.post(
      'http://49.50.172.58:3000/points/add', {
        user_id: this.state.userId,
        class: 'challenge',
        amount: this.state.payment,
      },
    ).then(() => {
      this.props.route.params.onRefresh();
      this.props.navigation.popToTop();
    });
  }

  render() {
    return (
      <IMP.Payment
        userCode="imp13539284" // 가맹점 식별코드
        loading={<Loading />} // 웹뷰 로딩 컴포넌트
        data={this.getPaymentData()} // 결제 데이터
        callback={this.callback} // 결제 종료 후 콜백
      />

    );
  }
}
