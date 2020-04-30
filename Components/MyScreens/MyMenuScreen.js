import React, {Component} from 'react';
import {View, Text, StyleSheet, Button} from 'react-native';
import firebase from 'firebase';

export default class MyMenuScreen extends Component{

    render(){
        return (
            <View style={styles.container}>
                <Text>MY MENU SCREEN</Text>
                <Button 
                    title='Log Out'
                    onPress={() => firebase.auth().signOut()}/>
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