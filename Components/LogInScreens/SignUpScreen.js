import React, {Component} from 'react';
import {View, Text, StyleSheet, Platform, Dimensions, TouchableOpacity, TextInput, Button, TextInputBase} from 'react-native';
import {Ionicons} from '@expo/vector-icons';
import firebase from 'firebase';

const {height, width} = Dimensions.get('window');

export default class HomeTab extends Component{
    state = {
        ID: "",
        password: "",
        male: false,
        female: false,
        cat1: null,
        cat2: null,
        cat3: null,
        cat4: null,
        cat5: null,
        cat6: null,
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
        const {ID, password, male, female, cat1, cat2, cat3, cat4, cat5, cat6} = this.state;
        return (
            <View style={styles.container}>
                <View style={styles.topBar}>
                    <TouchableOpacity onPress={() => this.props.navigation.navigate('LoginScreen')}>
                        <Ionicons name='ios-arrow-back' size={30} style={styles.goBackBtn}/>
                    </TouchableOpacity>
                    <Text style={styles.menuText}>회원 가입</Text>
                </View>

                <View style={styles.signUpContainer}>
                    <View style={styles.lineContainer}>
                        <View style={styles.lineTextContainer}>
                            <Text>이메일</Text>
                        </View>
                        <View style={styles.inputContainer}>
                            <TextInput 
                            value={ID}
                            onChangeText = {(ID) => this.setState({ID})}
                            style={styles.input}
                            placeholder='abc@example.com'
                            keyboardType='email-address'/>
                        </View>
                    </View>

                    <View style={styles.lineContainer}>
                        <View style={styles.lineTextContainer}>
                            <Text>비밀번호</Text>
                        </View>
                        <View style={styles.inputContainer}>
                            <TextInput 
                            value={password}
                            onChangeText = {(password) => this.setState({password})}
                            style={styles.input}
                            placeholder='Password'
                            secureTextEntry={true}/>
                        </View>
                    </View>

                    <View style={styles.sexContainer}>
                        <View style={styles.lineTextContainer}>
                            <Text>성별</Text>
                        </View>
                        <TouchableOpacity 
                            style={male ? styles.sexChecked : styles.sexUnchecked}
                            onPress={() => this.setState({
                                male: true,
                                female: false
                            })}>
                            <Text>남자</Text>
                        </TouchableOpacity>
                            
                        <TouchableOpacity 
                            style={female ? styles.sexChecked : styles.sexUnchecked}
                            onPress={() => this.setState({
                                male: false,
                                female: true
                            })}>
                            <Text>여자</Text>
                        </TouchableOpacity>
                    </View>

                    <View style={styles.categoryContainer}>
                        <View style={styles.lineTextContainer}>
                            <Text>관심사</Text>
                        </View>
                        <View style={styles.categoriesContainer}>
                           <TouchableOpacity style={cat1 ? styles.categoryChecked : styles.categoryUnchecked}
                            onPress={() => cat1 ? this.setState({cat1: null}) : this.setState({cat1: '운동'})}>
                                <Text>운동</Text>
                           </TouchableOpacity>
                           <TouchableOpacity style={cat2 ? styles.categoryChecked : styles.categoryUnchecked}
                            onPress={() => cat2 ? this.setState({cat2: null}) : this.setState({cat2: '공부'})}>
                                <Text>공부</Text>
                           </TouchableOpacity>
                           <TouchableOpacity style={cat3 ? styles.categoryChecked : styles.categoryUnchecked}
                            onPress={() => cat3 ? this.setState({cat3: null}) : this.setState({cat3: '감정'})}>
                                <Text>감정</Text>
                           </TouchableOpacity>
                           <TouchableOpacity style={cat4 ? styles.categoryChecked : styles.categoryUnchecked}
                            onPress={() => cat4 ? this.setState({cat4: null}) : this.setState({cat4: '생활습관'})}>
                                <Text>생활습관</Text>
                           </TouchableOpacity>
                           <TouchableOpacity style={cat5 ? styles.categoryChecked : styles.categoryUnchecked}
                            onPress={() => cat5 ? this.setState({cat5: null}) : this.setState({cat5: '자기계발'})}>
                                <Text>자기계발</Text>
                           </TouchableOpacity>
                           <TouchableOpacity style={cat6 ? styles.categoryChecked : styles.categoryUnchecked}
                            onPress={() => cat6 ? this.setState({cat6: null}) : this.setState({cat6: '기타'})}>
                                <Text>기타</Text>
                           </TouchableOpacity>
                        </View>
                    </View>

                    <Button 
                        style={{marginTop: 10}}
                        title='회원 가입'
                        onPress={() => this.signUpUser(ID, password)}>
                    </Button>

                    <Button 
                        style={{marginTop: 20}}
                        title='입력 확인(개발용)'
                        onPress={() => alert(`이메일: ${ID}, 비번: ${password}, 성별: ${male ? '남자' : '여자'}, 관심카테고리: ${cat1}, ${cat2}, ${cat3}, ${cat4}, ${cat5}, ${cat6}`)}/>
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
        position: 'absolute',
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
    lineContainer: {
        width: width - 20,
        height: 45,
        marginBottom: 10,
        flexDirection: 'row',
    },
    lineTextContainer: {
        width: 55,
        height: 45,
        alignItems: 'flex-end',
        justifyContent: 'center',
        marginRight: 5,
    },
    sexContainer: {
        width: width - 20,
        height: 50,
        marginBottom: 10,
        flexDirection: 'row'
    },
    sexUnchecked: {
        width: 100,
        height: 45,
        backgroundColor: '#F2F2F2',
        marginLeft: 5,
        borderRadius: 10,
        alignItems: 'center',
        justifyContent: 'center',
    },
    sexChecked: {
        width: 100,
        height: 45,
        backgroundColor: '#BDBDBD',
        marginLeft: 5,
        borderRadius: 10,
        alignItems: 'center',
        justifyContent: 'center',
    },
    inputContainer: {
        width: width - 100,
        height: 45,
        borderRadius: 10,
        backgroundColor: '#F2F2F2',
        marginBottom: 5,
        marginLeft: 5,
    },
    input: {
        width: width - 55,
        height: 45,
        borderRadius: 10,
        fontSize: 16,
        paddingLeft: 20,
    },
    categoryContainer: {
        width: width - 20,
        height: height / 3,
        flexDirection: 'row',
    },
    categoriesContainer: {
        width: width - 100,
        height: height / 3,
        marginLeft: 5,
        flexDirection: 'row',
        flexWrap: 'wrap',
    },
    categoryUnchecked: {
        width: 80,
        height: 45,
        backgroundColor: '#F2F2F2',
        borderRadius: 10,
        alignItems: 'center',
        justifyContent: 'center',
        marginRight: 5,
        marginBottom: 5,
    },
    categoryChecked: {
        width: 80,
        height: 45,
        backgroundColor: '#BDBDBD',
        borderRadius: 10,
        alignItems: 'center',
        justifyContent: 'center',
        marginRight: 5,
        marginBottom: 5,
    },
});