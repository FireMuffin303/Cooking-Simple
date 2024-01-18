import React, { useEffect, useState } from 'react';
import { StyleSheet, View, FlatList, TouchableOpacity, Image, Text, ScrollView } from 'react-native';
import { RecipeBanner } from '../../components/RecipeBanner';
import { collection, doc, documentId, getDoc, getDocs, query, where } from 'firebase/firestore';
import { auth, db } from '../../firebase';

const HistoryMenuScreen = ({navigation}) => {
  const [projectData,setProjectData] = useState([])
 
    async function getRecipe(){
        const userData = await getUserData()
        const historyRecipe = Array.from(userData.historyRecipe).map((data) => {return data.id})

        const q = query(collection(db,"Recipes"), where(documentId(),"in",historyRecipe))
        const querySnapshot = await getDocs(q)
        
        const docs = querySnapshot.docs.map((doc) =>{
          return {id:doc.id,...doc.data()}
        })
        setProjectData(docs)
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
      <Text style={styles.menuHeader}>ประวัติการรับชม</Text>
      <ScrollView >
          {projectData.map((item) =>{
            return <RecipeBanner item={item} navigation={navigation}></RecipeBanner>
          })}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FEE8B0',
    paddingTop: 32
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

export default HistoryMenuScreen;
