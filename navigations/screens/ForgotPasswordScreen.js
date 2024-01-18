import React, { useState } from 'react';
import { View, TextInput, Image, StyleSheet, TouchableOpacity,Text } from 'react-native';
import { sendPasswordResetEmail, signInWithEmailAndPassword } from "firebase/auth";
import { auth } from '../../firebase';
import logo from '../../assets/img/cooking.png'

const ForgotPasswordScreen = ({navigation}) => {
  const [email, setEmail] = useState('');


  const handleForgetPassword = () => {
    sendPasswordResetEmail(auth,email).then(() =>{
      alert("ส่งอีเมลล์การเปลี่ยนรหัสผ่านไปแล้วที่\n",email,"!")
    })
  };

  return (
    <View style={styles.container}>
      <Image style={{width:200,height:200,alignSelf:"center",margin:15,padding:10}} source={logo}/>
      <TextInput
        style={styles.input}
        placeholder="อีเมล"
        value={email}
        onChangeText={text => setEmail(text)}
      />

 
      <TouchableOpacity title="ForgetPass" style={styles.registerButton} onPress={handleForgetPassword} >
        <Text style={{color:"white"}}>ส่งอีเมลล์เปลี่ยนรหัสผ่าน</Text>
      </TouchableOpacity>

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
    marginVertical: 5,
    alignItems: 'center'
  },
  loginView: {
    color: '#F97B22',
    paddingVertical: 12,
    borderRadius: 8,
    alignItems: 'center',
    textShadowRadius: 3,
    textShadowColor: "#888888",
  }
});

export default ForgotPasswordScreen;
