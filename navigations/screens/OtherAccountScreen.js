import React, { useEffect, useState } from 'react';
import { View, Text, Image, TouchableOpacity, StyleSheet, ScrollView } from 'react-native';
import { Ionicons } from '@expo/vector-icons'; // Assuming you have the Ionicons library installed
import { collection, doc, getDoc, onSnapshot, query, where } from 'firebase/firestore';
import { db } from '../../firebase';
import { RecipeBanner } from '../../components/RecipeBanner';

const OtherAccountScreen = ({navigation,route}) => {
  const {userid} = route.params
  const [user,setUser] = useState({})
  const [projectData,setProjectData] = useState([])

  useEffect(() =>{
    console.log(userid)
    onSnapshot(doc(db,"Users",userid),(doc) =>{
      if(doc == null || doc == undefined) return;
      const data = ({id:doc.id,...doc.data()})
      setUser(data)
    })

    getRecipe()
  },[])

  async function getRecipe(){
    const q = query(collection(db,"Recipes"), where("user.uid",'==',userid))
    const unsubscribe = onSnapshot(q,(querySnapshot) =>{
      const docs =[];
      querySnapshot.docs.map((doc) =>{
        docs.push({id:doc.id,...doc.data()})
      })
      setProjectData(docs)
    })
  }

  if(user == null || user == {}) return(<View style={styles.container}><Text>Loading</Text></View>)

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Image style={styles.profileImage} source={{uri:user.avatar}}/>
        <Text style={styles.userNameText}>{user.username}</Text>
      </View>

      <ScrollView style={styles.content}>

      {projectData.map((item) =>{
          return  <RecipeBanner item={item} navigation={navigation}></RecipeBanner>
        })
      }

      </ScrollView>
    </View>

  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FEE8B0',
  },
  header: {
    alignItems: 'center',
    paddingVertical: 24,
    borderBottomWidth: 0,
    borderBottomColor: '#F97B22',
  },
  userNameText:{
    fontSize:28,
    fontWeight:"bold",
    marginTop:15
  },
  ImageInit: {
    width: 120,
    height: 120,
  },
  profileImage: {
    width: 120,
    height: 120,
    borderRadius: 60,
  },
  content: {
    padding: 24,
    backgroundColor: '#ffffff',
  },
  button: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 8,
    borderRadius: 12,
    marginBottom: 16,
    backgroundColor: '#F97B22'
  },
  icon: {
    marginRight: 8,
    color: '#FFFFFF'
  },
  buttonText: {
    fontSize: 16,
    color: '#FFFFFF',
  },
  logoutButton: {
    backgroundColor: '#FF0000',
    paddingVertical: 12,
    borderRadius: 8,
    alignItems: 'center',
  },
  logoutButtonText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#FFFFFF',
  },
});

export default OtherAccountScreen;
