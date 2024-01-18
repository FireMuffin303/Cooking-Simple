import React, { useState, useEffect } from 'react';
import { StyleSheet, View, FlatList, TouchableOpacity, Image, Text, ScrollView } from 'react-native';
import { RecipeBanner } from '../../components/RecipeBanner';
import { auth, db } from '../../firebase';
import { collection, doc, documentId, getDoc, getDocs, onSnapshot, query, where } from 'firebase/firestore';
import MyRecipeBanner from '../../components/MyRecipeBanner';

const MyMenuScreen = ({navigation}) => {
  const [projectData,setProjectData] = useState([])
 
    async function getRecipe(){
        const userData = await getUserData()
        const q = query(collection(db,"Recipes"), where(documentId(),"in",userData.myRecipe))
        const unsubscribe = onSnapshot(q,(querySnapshot) =>{
          const docs =[];
          querySnapshot.docs.map((doc) =>{
            docs.push({id:doc.id,...doc.data()})
          })
          setProjectData(docs)
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

    useEffect(() =>{
      getRecipe()

    },[])

  return (
    <View style={styles.container}>
      <Text style={styles.menuHeader}>เมนูของฉัน</Text>
      <ScrollView>
        
          {projectData.map((item) =>{
            return <MyRecipeBanner item={item} navigation={navigation}></MyRecipeBanner>
          })}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FEE8B0',
    paddingTop:32
  },
  menuHeader: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 8,
    paddingHorizontal: 16,
  },
  menuItem: {
    backgroundColor: '#e0e0e0',
    padding: 16,
    borderRadius: 8,
    marginBottom: 8,
    flexDirection: 'row',
    alignItems: 'center',
  },
  menuItemImage: {
    width: 40,
    height: 40,
    marginRight: 8,
    borderRadius: 20,
  },
  menuItemText: {
    fontSize: 16,
  },
  menuList: {
    paddingHorizontal: 16,
  },
});

export default MyMenuScreen;
