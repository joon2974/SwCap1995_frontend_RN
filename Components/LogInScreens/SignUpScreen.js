import React, {Component} from 'react';
import {View, Text, StyleSheet, Button} from 'react-native';

export default class HomeTab extends Component{

    render(){
        return (
            <View style={styles.container}>
                <Text>Sign up</Text>
                <Button 
                    title='뒤로 가기'
                    onPress={() => this.props.navigation.navigate('LoginScreen')}/>
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