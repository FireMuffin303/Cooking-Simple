import React, { useState } from 'react';
import { View, TextInput, Text, Button, TouchableOpacity, Image, StyleSheet, ScrollView } from 'react-native';
import * as ImagePicker from 'expo-image-picker'
import { auth, db, storage } from '../../firebase';
import { getDownloadURL, ref, uploadBytes } from 'firebase/storage';
import { addDoc, collection, doc, getDoc, setDoc } from 'firebase/firestore';

const UploadRecipePage = () => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [imageURI, setImageURI] = useState(null);

   const pickImage = async () => {
    // No permissions request is necessary for launching the image library
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });


    if (!result.canceled) {
      setImageURI(result.assets[0].uri);
    }
  };

  const handleSaveDraft = () => {
    handleRecipeUpload("draft")
  };

  const handlePublish = () => {
    handleRecipeUpload("publish")
  };

  async function handleRecipeUpload(status){
    if(imageURI == null && (title == null || title =="")){
      alert("กรุณากรอกข้อมูลรูปภาพและชื่อให้ครบถ้วน")
      return;
    }

    const response = await fetch(imageURI);
    const blob = await response.blob();

    const storageRef = ref(storage,"img/"+"IMG_"+Date.now()+"_"+auth.currentUser.displayName+".jpg")
    uploadBytes(storageRef,blob).then((snapshot) =>{
      getDownloadURL(snapshot.ref).then(async (downloadURL) =>{
        let recipe = createRecipe(title,description,downloadURL)
        recipe.status = status
        await addDoc(collection(db,"Recipes"),recipe).then(async(doc) =>{
          const userData = await getUserData();
          let userRecipe = Array.from(userData.myRecipe) 
          userRecipe.push(doc.id)
          setUserDoc({myRecipe:userRecipe})
          alert("บันทึกสำเร็จ!!")
          setTitle("")
          setDescription("")
          setImageURI(null)
        }
        ).catch((err) =>{
          console.log(err)
        })
      })
    })
  }

  async function getUserData(){
    const docSnap = await getDoc(doc(db,"Users",auth.currentUser.uid))
    if(!docSnap.exists()){
      return;
    }
    const data = docSnap.data()
    return data;
  }

  async function setUserDoc(titem){
    await setDoc(doc(db,"Users",auth.currentUser.uid),titem,{merge:true})
  }

  function createRecipe(title,description,imgUri){
    let recipe = {
      name: title,
      description: description,
      imgUri:imgUri,
      user:{
        uid : auth.currentUser.uid,
        displayName : auth.currentUser.displayName,
        avatar: auth.currentUser.photoURL
      },
      like: 0,
      dislike : 0,
      date: new Date(Date.now()).toLocaleString()
    }
    return recipe;
  }  

  return (
    <ScrollView style={styles.container}>
        
        <TouchableOpacity style={styles.imageContainer} onPress={pickImage}>
          {imageURI ? (
            <Image style={styles.image} source={{ uri: imageURI }} />
          ) : (
            <Text style={styles.uploadText}>Upload Image</Text>
          )}
        </TouchableOpacity>
        <View style={styles.header}/>
      
      <TextInput
        style={styles.input}
        placeholder="Title"
        value={title}
        onChangeText={text => setTitle(text)}
      />
      <TextInput
        style={styles.inputDescription}
        placeholder="Description"
        value={description}
        onChangeText={text => setDescription(text)}
        multiline={true}
      />
      <View style={styles.buttonContainer}>
        <TouchableOpacity title="SaveDraft" style={styles.button} onPress={handleSaveDraft}><Text style={{color: "#FFFFFF"}}>บันทึกส่วนตัว</Text></TouchableOpacity>
        <TouchableOpacity title="Publish" style={styles.button} onPress={handlePublish}><Text style={{color: "#FFFFFF"}}>เผยแผร่</Text></TouchableOpacity>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor:"#FEE8B0"
  },
  imageContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 8,
    borderWidth: 3,
    borderColor: '#F09540',
    borderRadius: 8,
    height: 200,
  },
  image: {
    width: '100%',
    height: '100%',
    borderRadius: 8,
  },
  uploadText: {
    fontSize: 16,
    color: '#888888',
  },
  input: {
    marginBottom: 16,
    borderWidth: 3,
    borderColor: '#F09540',
    borderRadius: 8,
    paddingVertical: 8,
    paddingHorizontal: 12,
    fontSize: 16,
  },
  inputDescription:{
    marginBottom: 16,
    borderWidth: 3,
    borderColor: '#F09540',
    borderRadius: 8,
    paddingVertical: 8,
    paddingBottom: 100,
    paddingHorizontal: 12,
    fontSize: 16,
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  button:{
    backgroundColor:"#F09540",
    padding: 8,
    borderRadius: 8
  },
  header: {
    alignItems: 'center',
    borderBottomWidth: 1,
    borderBottomColor: '#F97B22',
    marginVertical : 10,
  }
});

export default UploadRecipePage;
