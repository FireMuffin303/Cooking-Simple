import React, { useState } from 'react';
import { View, TextInput, Image, StyleSheet, TouchableOpacity,Text } from 'react-native';
import logo from '../../assets/img/cooking.png'
import { createUserWithEmailAndPassword, updateCurrentUser, updateProfile } from 'firebase/auth';
import { auth } from '../../firebase';

const RegisterScreen = ({navigation}) => {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const handleRegister = () => {
    if(password != confirmPassword){
      alert("กรุณาใส่รหัสผ่านและยืนยันรหัสผ่านให้ถูกต้อง")
      return;
    }
    createUserWithEmailAndPassword(auth,email,password)
    .then((userCredential) =>{
      if(userCredential.user != null){
        updateProfile(userCredential.user,{
          displayName : username
        })
        alert("สมัครสมาชิกสำเร็จ!")
        navigation.navigate("Login")
      }
    })
  };

  return (
    <View style={styles.container}>
      <Image style={{width:200,height:200,alignSelf:"center",margin:15,padding:10}} source={logo}/>
      <TextInput
        style={styles.input}
        placeholder="ชื่อผู้ใช้"
        value={username}
        onChangeText={text => setUsername(text)}
      />
      <TextInput
        style={styles.input}
        placeholder="อีเมล"
        value={email}
        onChangeText={text => setEmail(text)}
        keyboardType="email-address"
      />
      <TextInput
        style={styles.input}
        placeholder="รหัสผ่าน"
        value={password}
        onChangeText={text => setPassword(text)}
        secureTextEntry
      />
      <TextInput
        style={styles.input}
        placeholder="ยืนยันรหัสผ่าน"
        value={confirmPassword}
        onChangeText={text => setConfirmPassword(text)}
        secureTextEntry
      />
      <TouchableOpacity title="Register" style={styles.registerButton} onPress={handleRegister} >
        <Text style={{color:"white"}}>สมัครสมาชิก</Text>
      </TouchableOpacity>
      <View style={styles.loginView}>
        <Text>มีบัญชีแล้วหรอ? 
          <TouchableOpacity title="LoginBtn" onPress={()=>{navigation.navigate("Login")}}>
            <Text style={{color:"#F97B22"}}> ล๊อกอินที่นี่สิ!</Text>
          </TouchableOpacity>
        </Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: "#FEE8B0"
  },
  input: {
    marginBottom: 16,
    borderWidth: 2,
    borderColor: '#F97B22',
    borderRadius: 8,
    paddingVertical: 8,
    paddingHorizontal: 12,
    fontSize: 16,
  },
  registerButton: {
    backgroundColor: '#F97B22',
    paddingVertical: 12,
    borderRadius: 8,
    alignItems: 'center'
  },
  loginView: {
    color: '#F97B22',
    paddingVertical: 12,
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center'
  }
});

export default RegisterScreen;
