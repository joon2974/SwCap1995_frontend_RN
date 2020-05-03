import React, {Component} from 'react';
import {View, Text, StyleSheet, Button} from 'react-native';

export default class HomeMain extends Component{

    render(){
        return (
            <View style={styles.container}>
                <Text>Home Main</Text>
                <Button 
                    title='Go To Mypage'
                    onPress={() => this.props.navigation.navigate('MyMenuScreen')}/>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    }
});