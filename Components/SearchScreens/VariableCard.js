import React, { Component } from 'react';
import { View } from 'react-native';
import { CardSix, CardSeven } from './Cards';

export default class VariableCard extends Component {
  render() {
    let testVari = null;
    if (this.props.onOff === this.props.index) {
      testVari = (

        <CardSix
          title="Vinny’s Barber"
          subTitle="852 N Virgil Ave, Beverly Hills"
          profile={{
            uri:
            'https://lemag.nikonclub.fr/wp-content/uploads/2016/11/Photo-selection-pour-Nikon-France-Mattia-Bonavida-2016-6.jpg',
          }}
          image={{
            uri:
            'https://idinterdesign.ca/wp-content/uploads/2016/07/paysage-ID-02-750x468.jpg',
          }}
          icon1="check"
          iconColor1="#fff"
          iconBackground1="green"
          onClicked1={() => {
            alert('구현해이새기야');
            console.log('fewfewfewfew');
          }}
          switchShowing={this.props.changeShowing}
          icon2="remove"
          iconColor2="#fff"
          iconBackground2="purple"
          onClicked2={() => {
            alert('구현하라고이쉐기야');
          }}
      />
      );
    } else {
      testVari = (
          
        <CardSeven
          title="Vinny’s Barber"
          subTitle="852 N Virgil Ave, Beverly Hills"
          image={{
            uri:
                'https://idinterdesign.ca/wp-content/uploads/2016/07/paysage-ID-02-750x468.jpg',
          }}
          icon1="check"
          iconColor1="#fff"
          iconBackground1="green" 
          onClicked1={() => {
            alert('구현해이새기야');
          }}
          switchShowing={this.props.changeShowing}
          icon2="remove"
          iconColor2="#fff"
          iconBackground2="purple"
          onClicked2={() => {
            alert('구현하라고이쉐기야');
          }}
          />
      );
    } 

    return (
      <View>
        {testVari}
      </View>
    );
  }
}
