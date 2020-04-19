import React, {Component} from 'react';
import {View, Text, StyleSheet, Platform, Dimensions, TouchableOpacity, TextInput, Button} from 'react-native';
import {Ionicons} from '@expo/vector-icons';
import firebase from 'firebase';

const {height, width} = Dimensions.get('window');

export default class HomeTab extends Component{
    state = {
        ID: "",
        password: "",
    }

    signUpUser = (ID, password) => {
        try{
            if(this.state.ID < 1 || this.state.password.length < 6){
                alert('Please input your ID!');
            }
            firebase.auth().createUserWithEmailAndPassword(ID, password).catch((error) => {
                alert('비밀번호는 6자리 이상이어야 합니다!!');
            });
        }catch(error){
            console.log(error);
        }
    }

    render(){
        const {ID, password} = this.state;
        return (
            <View style={styles.container}>
                <View style={styles.topBar}>
                    <TouchableOpacity onPress={() => this.props.navigation.navigate('LoginScreen')}>
                        <Ionicons name='ios-arrow-back' size={30} style={styles.goBackBtn}/>
                    </TouchableOpacity>
                    <Text style={styles.menuText}>회원 가입</Text>
                </View>

                <View style={styles.signUpContainer}>
                    <View style={styles.inputContainer}>
                        <Ionicons name='ios-person' size={20} style={styles.inputIcon}/>
                        <TextInput 
                        value={ID}
                        onChangeText = {(ID) => this.setState({ID})}
                        style={styles.input}
                        placeholder='E - mail'
                        keyboardType='email-address'/>
                    </View>

                    <View style={styles.inputContainer}>
                        <Ionicons name='ios-key' size={20} style={styles.inputIcon}/>
                        <TextInput 
                        value={password}
                        onChangeText = {(password) => this.setState({password})}
                        style={styles.input}
                        placeholder='Password'
                        secureTextEntry={true}/>
                    </View>

                    <Button 
                        style={{marginTop: 10}}
                        title='회원 가입'
                        onPress={() => this.signUpUser(ID, password)}>
                    </Button>
                </View>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
    topBar: {
        height: height / 7,
        width: width,
        alignItems: 'center',
        justifyContent: 'flex-start',
        flexDirection: 'row',
        backgroundColor: '#F2F2F2',
        ...Platform.select({
            ios: {
              shadowColor: "rgb(50, 50, 50)",
              shadowOpacity: 0.5,
              shadowRadius: 5,
              shadowOffset: {
                height: -1,
                width: 0
              }
            },
            android: {
              elevation: 5
            }
          }),
    },
    signUpContainer: {
        height: height * 6 / 7,
        width: width,
        alignItems: 'center',
        justifyContent: 'center',
    },
    goBackBtn: {
        marginLeft: 10,
        marginTop: 20,
    },
    menuText: {
        marginLeft: 15,
        marginTop: 20,
        fontSize: 20,
    },
    inputContainer: {
        width: width - 60,
        height: 45,
        borderRadius: 25,
        backgroundColor: '#F2F2F2',
        marginBottom: 5,
    },
    input: {
        width: width - 55,
        height: 45,
        borderRadius: 25,
        fontSize: 16,
        paddingLeft: 45,
    },
    inputIcon: {
        position: 'absolute',
        top: 10,
        left: 15,
        color: 'grey'
    },
});