import React, { useEffect, useState } from 'react';
import { View, TextInput, Image, StyleSheet, TouchableOpacity,Text } from 'react-native';
import logo from '../../assets/img/cooking.png'
import { createUserWithEmailAndPassword, updateCurrentUser, updateProfile } from 'firebase/auth';
import { auth, db } from '../../firebase';
import * as ImagePicker from 'expo-image-picker'
import { Ionicons } from '@expo/vector-icons'; 
import { doc, setDoc } from 'firebase/firestore';


const EditUserScreen = ({navigation}) => {
  const [imageURI, setImageURI] = useState(null);
  const [username, setUsername] = useState('');

  const handleEdit = () => {
    if(imageURI == null || (username == null || username =="")){
      alert("กรุณาใส่ข้อมูลให้ครบถ้วน")
      return;
    }

    updateProfile(auth.currentUser,{
      displayName : username , photoURL:imageURI
    }).then(async()=>{
      alert("อัพเดทโปรไฟล์สำเร็จ");
      await setDoc(doc(db,"Users",auth.currentUser.uid),{
        username:username,
        avatar: imageURI
      },{merge:true})
      navigation.goBack();
    })
  };

  useEffect(() =>{
    if(auth.currentUser != null){
      setUsername(auth.currentUser.displayName)
      setImageURI(auth.currentUser.photoURL)
    }
  },[])

  const pickImage = async () => {
    // No permissions request is necessary for launching the image library
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    console.log(result);

    if (!result.canceled) {
      setImageURI(result.assets[0].uri);
    }
  };

  return (
    <View style={styles.container}>
      <View style={{alignItems:"center"}}>
        <TouchableOpacity style={styles.imageContainer} onPress={pickImage}>
          {imageURI ? (
            <Image style={styles.image} source={{ uri: imageURI }} />
          ) : (
            <Text style={styles.uploadText}>อัปโหลดรูปภาพ</Text>
          )}
        </TouchableOpacity>
      </View>
      
      <TextInput
        style={styles.input}
        placeholder="ชื่อผู้ใช้"
        value={username}
        onChangeText={text => setUsername(text)}
      />
      <TouchableOpacity style={styles.button} onPress={handleEdit}>
          <Text style={styles.buttonText}>เสร็จสิ้น</Text>
        </TouchableOpacity>
    
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    paddingVertical:32,
    backgroundColor: "#FEE8B0",
    justifyContent:"center"
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
  button: {
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
  },
  imageContainer: {
    width: 130,
    height: 130,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 8,
    borderWidth: 3,
    borderColor: '#F09540',
    borderRadius: 60,
  },
  image: {
    width: 120,
    height: 120,
    borderRadius: 60,
  },
  uploadText: {
    fontSize: 16,
    color: '#888888',
  },
});

export default EditUserScreen;
