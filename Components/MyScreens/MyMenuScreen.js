import React, {Component} from 'react';
import {View, Text, StyleSheet} from 'react-native';

export default class MyMenuScreen extends Component{

    render(){
        return (
            <View style={styles.container}>
                <Text>MY MENU SCREEN</Text>
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