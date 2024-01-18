import React, { useState } from 'react';
import { View, TextInput, Image, StyleSheet, TouchableOpacity,Text } from 'react-native';
import { signInWithEmailAndPassword, updateProfile } from "firebase/auth";
import { auth, db } from '../../firebase';
import logo from '../../assets/img/cooking.png'
import { doc, getDoc, setDoc } from 'firebase/firestore';

const LoginScreen = ({navigation}) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  async function createUserData(userID,username){
    let item = {
      username:username,
      avatar: "https://firebasestorage.googleapis.com/v0/b/cookingsimple-b21fa.appspot.com/o/img%2FPortrait_Placeholder.png?alt=media&token=7597ce9d-f083-453a-b6b6-96660246f270",
      myRecipe:[],
      likeRecipe:[],
      historyRecipe:[],
      follower:[],
      following:[]
    }
    await setDoc(doc(db,"Users",userID),item).then(
    ).catch((err) =>{
      console.log(err)
    })
  }

  const handleLogin = () => {
    signInWithEmailAndPassword(auth,email,password).then(async (userCredential) => {
      const user = userCredential.user;
      if(user != null){
        const docSnap = await getDoc(doc(db,"Users",user.uid))
        if(!docSnap.exists()){
          createUserData(user.uid,user.displayName)
          updateProfile(user,{displayName: user.displayName,photoURL:"https://firebasestorage.googleapis.com/v0/b/cookingsimple-b21fa.appspot.com/o/img%2FPortrait_Placeholder.png?alt=media&token=7597ce9d-f083-453a-b6b6-96660246f270"})
        }
        navigation.navigate("Main")
      }


    }).catch((error) => {
      const errorCode = error.code;
      const errorMessage = error.message;
      console.log(errorMessage)
    });
  
  };

  const handleForgetPassword = () => {
    navigation.navigate("ForgetPassword")
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

      <TextInput
        style={styles.input}
        placeholder="รหัสผ่าน"
        value={password}
        onChangeText={text => setPassword(text)}
        secureTextEntry
      />
      
      <TouchableOpacity title="Login" style={styles.registerButton} onPress={handleLogin} >
        <Text style={{color:"white"}}>เข้าสู่ระบบ</Text>
      </TouchableOpacity>

      <TouchableOpacity title="ForgetPass" style={styles.registerButton} onPress={handleForgetPassword} >
        <Text style={{color:"white"}}>ลืมรหัสผ่าน</Text>
      </TouchableOpacity>

      <View style={styles.loginView}>
        <Text>ยังไม่มีบัญชีหรอ? 
          <TouchableOpacity title="Regsiter" onPress = {()=>{navigation.navigate("Register")}}>
            <Text style={{color:"#F97B22"}}> สมัครที่นี่สิ!</Text>
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

export default LoginScreen;
