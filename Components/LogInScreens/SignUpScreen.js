import React, {Component} from 'react';
import {View, Text, StyleSheet, Platform, Dimensions, TouchableOpacity, TextInput, ScrollView, Picker} from 'react-native';
import {Ionicons} from '@expo/vector-icons';
import firebase from 'firebase';
import axios from 'axios';

const {height, width} = Dimensions.get('window');

export default class SignUpScreen extends Component{
    state = {
        ID: "",
        password: "",
        password2: "",
        male: false,
        female: false,
        cat1: null,
        cat2: null,
        cat3: null,
        cat4: null,
        cat5: null,
        cat6: null,
        albeID: false,
        emailInfo: "",
        age: null,
    }

    signUp = (ID, password, male, female, cat1, cat2 ,cat3 ,cat4 ,cat5 ,cat6, ableID, age) => {
        try{
            if(ID < 1 || password.length < 6){
                alert('ID는 e-mail형태, 비밀번호는 6자리 이상이어야 합니다!');
            }else if(!(password === password2)){
                alert('비밀번호를 확인해 주세요!');
            }else if(!(ableID)){
                alert('Email을 확인해 주세요!');
            }else if(!((male) && (female))){
                alert('성별을 선택해 주세요!');
            }else if(!age){
                alert('나이를 선택해 주세요!');
            }else{
                const categories = this.catList(cat1, cat2, cat3, cat4 ,cat5, cat6);
                const sex = male ? 'male' : 'female';
                console.log('아이디',ID);
                console.log('패스워드',password);
                console.log('성별', sex);
                console.log('나이', age);
                console.log('카테고리', categories);

                axios.post(`http://49.50.172.58:3000/users`, {
                    headers: {
                        'Content-type': 'application/x-www-form-urlencoded',
                    },
                    email: ID,
                    password: password,
                    sex: sex,
                    age: age,
                    categories: categories
                }).then(res => {
                    console.log(res);
                    firebase.auth().createUserWithEmailAndPassword(ID, password).catch((error) => {
                        alert('ID는 e-mail형태, 비밀번호는 6자리 이상이어야 합니다');
                    });
                }).catch(error => {
                    console.log(error);
                    alert(error);
                });

            }
        }catch(error){
            console.log(error);
        }
    }

    signUpUser = (ID, password) => {
        try{
            if(this.state.ID < 1 || this.state.password.length < 6){
                alert('ID는 e-mail형태, 비밀번호는 6자리 이상이어야 합니다!');
            }else if(!(this.state.password === this.state.password2)){
                alert('비밀번호를 확인해 주세요!');
            }else if(!(this.state.ableID)){
                alert('Email을 확인해 주세요!');
            }else if(!((this.state.male) && (this.state.female))){
                alert('성별을 선택해 주세요!');
            }else if(!this.state.age){
                alert('나이를 선택해 주세요!');
            }else{
                firebase.auth().createUserWithEmailAndPassword(ID, password).catch((error) => {
                    alert('ID는 e-mail형태, 비밀번호는 6자리 이상이어야 합니다');
                });
            }
        }catch(error){
            console.log(error);
        }
    }

    sendUserCredential = (ID, password, age, male, cat1, cat2, cat3, cat4 ,cat5, cat6) => {
        const categories = this.catList(cat1, cat2, cat3, cat4 ,cat5, cat6);
        const sex = male ? 'male' : 'female';
        console.log('아이디',ID);
        console.log('패스워드',password);
        console.log('성별', sex);
        console.log('나이', age);
        console.log('카테고리', categories);

        axios.post(`http://49.50.172.58:3000/users`, {
            headers: {
                'Content-type': 'application/x-www-form-urlencoded',
            },
            email: ID,
            password: password,
            sex: sex,
            age: age,
            categories: categories
        }).then(res => {
            console.log(res);
            alert(res);
        }).catch(error => {
            console.log(error);
            alert(error);
        });
    }

    catList = (cat1, cat2, cat3, cat4 ,cat5, cat6) => {
        let categories = new Array;

        categories.push({name: '운동', value: cat1});
        categories.push({name: '공부', value: cat2});
        categories.push({name: '감정', value: cat3});
        categories.push({name: '생활습관', value: cat4});
        categories.push({name: '자기계발', value: cat5});
        categories.push({name: '기타', value: cat6});

        categories = categories.filter(v => v.value !== null);
        categories = categories.map(v => v.name);

        return categories;
    }

    // 중복확인 API
    checkEmail = (ID) => {
        axios.post(`http://49.50.172.58:3000/users/emailcheck`, {
            headers: {
                'Content-type': 'application/x-www-form-urlencoded',
            },
            email: ID,
        }).then(res => {
            this.state.ableID = true;
            console.log(res);
        }).catch(error => {
            this.state.ableID = false;
            console.log(error);
        })
    }

    render(){
        const {ID, password, password2, male, female, cat1, cat2, cat3, cat4, cat5, cat6, ableID, age, emailInfo} = this.state;
        return (
            <View style={styles.container}>
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
                        <TouchableOpacity style={styles.checkBtn} onPress={() => {
                            ableID ? this.setState({emailInfo: "사용 가능한 Id입니다."}) : this.setState({emailInfo: "중복된 Id입니다."});
                        }}>
                            <Text style={{color: 'white'}}>중복 확인</Text>
                        </TouchableOpacity>
                        <View style={styles.idCheckResult}>
                            <Text>{emailInfo}</Text>
                        </View>
                    </View>

                    <View style={styles.lineContainer}>
                        <View style={styles.lineTextContainer}>
                            <Text>비밀번호</Text>
                        </View>
                        <View style={styles.passwordInputContainer}>
                            <TextInput 
                            value={password}
                            onChangeText = {(password) => this.setState({password})}
                            style={styles.input}
                            placeholder='Password'
                            secureTextEntry={true}/>
                        </View>
                    </View>

                    <View style={styles.lineContainer}>
                        <View style={styles.lineTextContainer}>
                            <Text>비번 확인</Text>
                        </View>
                        <View style={styles.passwordInputContainer}>
                            <TextInput 
                            value={password2}
                            onChangeText = {(password2) => this.setState({password2})}
                            style={styles.input}
                            placeholder='Password validation'
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

                    <View style={styles.ageContainer}>
                        <View style={styles.lineTextContainer}>
                            <Text>나이</Text>
                        </View>
                        <View style={styles.pickerContainer}>
                            <Picker
                                selectedValue={age}
                                style={{width: 200, height: 45, marginLeft: 5}}
                                itemStyle={{height: 45}}
                                onValueChange={(itemValue, itemIndex) => this.setState({age: itemValue})}
                                >
                                <Picker.Item label="13" value="13" />
                                <Picker.Item label="14" value="14" />
                                <Picker.Item label="15" value="15" />    
                                <Picker.Item label="16" value="16" />
                                <Picker.Item label="17" value="17" />
                                <Picker.Item label="18" value="18" />
                                <Picker.Item label="19" value="19" />
                                <Picker.Item label="20" value="20" />
                                <Picker.Item label="21" value="21" />
                                <Picker.Item label="22" value="22" />
                                <Picker.Item label="23" value="23" />
                                <Picker.Item label="24" value="24" />
                                <Picker.Item label="25" value="25" />
                                <Picker.Item label="26" value="26" />
                                <Picker.Item label="27" value="27" />
                                <Picker.Item label="28" value="28" />
                                <Picker.Item label="29" value="29" />
                                <Picker.Item label="30" value="30" />
                                <Picker.Item label="31" value="31" />
                                <Picker.Item label="32" value="32" />
                                <Picker.Item label="33" value="33" />
                                <Picker.Item label="34" value="34" />
                                <Picker.Item label="35" value="35" />
                                <Picker.Item label="36" value="36" />
                                <Picker.Item label="37" value="37" />
                                <Picker.Item label="38" value="38" />
                                <Picker.Item label="39" value="39" />
                                <Picker.Item label="40" value="40" />
                            </Picker>
                        </View>
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

                    <TouchableOpacity style={styles.signUpBtn} onPress={() => this.signUpUser(ID, password)}>
                        <Text>회원 가입</Text>
                    </TouchableOpacity>

                    <TouchableOpacity 
                        style={styles.signUpBtn} 
                        onPress={() => this.sendUserCredential(ID, password, age, male, cat1, cat2, cat3, cat4 ,cat5, cat6)}>
                        <Text>입력 확인(개발용)</Text>
                    </TouchableOpacity>

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
        backgroundColor: 'white',
    },
    signUpContainer: {
        height: height * 6 / 7,
        width: width,
        alignItems: 'center',
        justifyContent: 'center',
        marginTop: 20,
    },
    goBackBtn: {
        marginLeft: 10,
        marginTop: 20,
    },
    lineContainer: {
        width: width - 20,
        height: 45,
        marginBottom: 10,
        flexDirection: 'row',
    },
    idCheckResult: {
        width: 200,
        height: 40,
        marginLeft: 10,
        justifyContent: 'center',
    },
    lineTextContainer: {
        width: 55,
        height: 45,
        alignItems: 'flex-end',
        justifyContent: 'center',
        marginRight: 5,
    },
    ageContainer: {
        width: width - 20,
        height: 50,
        marginBottom: 10,
        flexDirection: 'row',
    },
    pickerContainer: {
        width: width - 20,
        height: 50,
        marginBottom: 10,
        flexDirection: 'row',
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
    passwordInputContainer: {
        width: width - 100,
        height: 45,
        borderRadius: 10,
        backgroundColor: '#F2F2F2',
        marginBottom: 5,
        marginLeft: 5,
    },
    checkBtn: {
        width: 60,
        height: 35,
        alignItems: 'center',
        justifyContent: 'center',
        marginLeft: 65,
        backgroundColor: '#00FF80',
        borderRadius: 10,
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
        height: height / 5,
        flexDirection: 'row',
    },
    categoriesContainer: {
        width: width - 100,
        height: height / 5,
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
    signUpBtn: {
        width: 200,
        height: 40,
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 15,
        backgroundColor: '#00FF80',
        marginTop: 5,
    },
});