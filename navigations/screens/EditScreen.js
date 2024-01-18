import { doc, onSnapshot, setDoc } from 'firebase/firestore';
import React, { useEffect, useState } from 'react';
import { View, Text, ScrollView, StyleSheet, Image, TextInput, Button, TouchableOpacity } from 'react-native';
import { db } from '../../firebase';
import MyButton from '../../components/MyButton';
import { Ionicons } from '@expo/vector-icons';

const EditScreen = ({navigation,route}) => {
  const {id} = route.params
  const [item,setItem] = useState({})
  const [name, setName] = React.useState('');
  const [isPublish, setPublish] = useState(false)
  const [description, setDescription] = React.useState(``);

  useEffect(() =>{
    onSnapshot(doc(db,"Recipes",id),(doc) =>{
      if(doc == undefined || doc == null){
        return;
      }
      const data = ({id:doc.id,...doc.data()})
      setItem(data)
      setName(data.name)
      setDescription(data.description)
      if(data.status == "publish") setPublish(true)
    })
  },[])

  async function setEdit(){
    const isPublished = isPublish ? "publish" : "draft"
    await setDoc(doc(db,"Recipes",id),{
      name:name,
      description:description,
      status: isPublished
    },{merge:true}).then(() =>{
      alert("แก้ไขเสร็จสิ้น")
      navigation.goBack()
    });
    
  }

  if(item == null || item == {}) return(<View style={styles.container}><Text>Loading...</Text></View>)
  
  return (
    <ScrollView style={{ backgroundColor: "#FEE8B0" }}>
      <View style={styles.container}>
      <View style={styles.imageContainer}>
        <Image style={styles.image} source={{ uri: item.imgUri }} />
      </View>

        <TextInput
          style={styles.input}
          onChangeText={text => setName(text)}
          value={name}
        />

        <View style={styles.descriptionContainer}>
          <Text style={styles.descriptionText}>
            คำอธิบาย
          </Text>
        </View>

        <TextInput
          style={styles.textArea}
          onChangeText={text => setDescription(text)}
          value={description}
          multiline={true}
        />

        <TouchableOpacity onPress={() =>{setPublish(!isPublish)}}>
          <MyButton text={isPublish ? "ยกเลิกการเผยแผร่" : "เผยแพร่"} icon={<Ionicons name="book" color={"white"} size={30}/>} color="orange"/>
        </TouchableOpacity>
      </View>

      <View style={styles.separator}></View>

      <View style={styles.buttonContainer}>
        <View style={styles.buttonWrapper}>
          <Button
            style={styles.button}
            title="บันทึก"
            color='orange'
            onPress={() =>{setEdit()}}
          />
        </View>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    marginHorizontal: 20,
    marginVertical: 20,
    padding: 20
  },
  imageContainer: {
    borderWidth: 3,
    borderColor: 'orange',
    borderRadius: 10,
    padding: 10,
    marginBottom: 10,
  },
  image: {
    width: 250,
    height: 250,
  },
  input: {
    height: 40,
    marginVertical: 10,
    borderWidth: 3,
    borderColor: 'orange',
    padding: 10,
    borderTopWidth: 5,
    borderBottomWidth: 5,
    borderLeftWidth: 5,
    borderRightWidth: 5,
    borderRadius: 50,
    width: '80%',
  },
  descriptionContainer: {
    alignItems: 'flex-start',
    borderWidth: 3,
    borderColor: 'orange',
    borderRadius: 50,
    paddingHorizontal: 10,
    marginTop: 10,
    marginBottom: 10,
  },
  descriptionText: {
    fontSize: 20,
    color: '#000',
    marginVertical: 5,
    textAlign: 'center',
  },
  textArea: {
    height: 300,
    marginVertical: 10,
    marginLeft: 20,
    marginRight: 20,
    borderWidth: 1,
    padding: 0,
    borderTopWidth: 1,
    borderBottomWidth: 1,
    borderLeftWidth: 1,
    borderRightWidth: 1,
    paddingHorizontal: 10,
    paddingTop: 10,
    paddingBottom: 10,
  },
  separator: {
    borderBottomWidth: 2,
    borderBottomColor: 'red',
    width: '100%',
    marginVertical: 20,
  },
  buttonContainer: {
    alignSelf: 'center',
    width: 200,
  },
  buttonWrapper: {
    borderWidth: 3,
    borderColor: 'orange',
    borderRadius: 50,
    overflow: 'hidden',
  },
  button: {
    height: 50,
    borderWidth: 1,
    padding: 10,
    borderRadius: 50,
  },
});

export default EditScreen;
