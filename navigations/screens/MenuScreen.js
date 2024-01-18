import React, { useEffect, useMemo, useState } from 'react';
import { View, Text, TouchableOpacity, Image, StyleSheet, ScrollView } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { doc, getDoc, onSnapshot, setDoc } from 'firebase/firestore';
import { auth, db } from '../../firebase';
import MyButton from '../../components/MyButton';


const MenuScreen = ({navigation,route}) => {
  const {id} = route.params
  const [item, setItem] = useState(null)
  const [isFollow,setFollow] = useState(false)
  const [isLike,setLike] = useState(false)
  const [isDislike,setDislike] = useState(false)

  useEffect(() => {
    onSnapshot(doc(db,"Recipes",id),(doc) =>{
      if(doc == undefined || doc == null){
        return;
      }
      const data = ({id:doc.id,...doc.data()})
      setItem(data)
    })

    getUserData().then((data) =>{
      let likeData = Array.from(data.likeRecipe);
      let index = likeData.indexOf(id);
      if(index != -1){
        setLike(true)
      }

      let historyView = Array.from(data.historyRecipe)
      const hvID = historyView.map((data) => {return data.id})
      if(!hvID.includes(id)){
        const hvdata = { id:id,datetime: new Date(Date.now()).toLocaleString()}
        historyView.push(hvdata)
        setUser({historyRecipe:historyView})
      }
    })


  },[])

  async function setRecipe(titem){
    await setDoc(doc(db,"Recipes",item.id),titem,{merge:true})
  }

  async function setUser(titem){
    await setDoc(doc(db,"Users",auth.currentUser.uid),titem,{merge:true})
  }

  async function getUserData(){
    const docSnap = await getDoc(doc(db,"Users",auth.currentUser.uid))
    if(!docSnap.exists()){
      return;
    }
    const data = docSnap.data()
    return data;
  }


  const handleLike = useMemo(() =>{

    if(isLike){
      getUserData().then((data) =>{
        let likeData = Array.from(data.likeRecipe);
        let index = likeData.indexOf(id);
        if(index == -1){
          likeData.push(id)
          setUser({likeRecipe:likeData})
        }
      })
      return;
    }
    getUserData().then((data) =>{
      let likeData = Array.from(data.likeRecipe);
      let index = likeData.indexOf(id);
      if(index != -1){
        likeData.splice(index,1)
        setUser({likeRecipe:likeData})
      }
    })
    

  },[isLike])

  function toOtherProfile(){
    const userid = item.user.uid
    if(auth.currentUser.uid == userid){
      navigation.navigate("Account")
      return;
    }
    console.log(userid)
    navigation.navigate("otheraccount",{userid})
  }


  if(item == undefined || item == null){
    return(
    <View style={styles.container}>
      <Text>Loading</Text>
    </View>)
  }
  return (
    <ScrollView style={styles.container}>
      <View style={styles.imageContainer}>
        <Image style={styles.image} source={{ uri: item.imgUri }} />
      </View>
      <Text style={styles.textHeader}>{item.name}</Text>

      <View style={styles.header} />
      
      <View style={styles.buttonContainer}>
        <TouchableOpacity onPress={() =>{
          setLike(!isLike)
          handleLike
        }}>
          <MyButton 
            icon={<Ionicons name={isLike ? "heart" : "heart-outline"} size={30} color={"white"}/>}
            text={isLike ? "ชื่นชอบแล้ว" : "ยังไม่ชื่นชอบ"}
            color="#F09540"
          />
        </TouchableOpacity>
        
      </View>
     
      <TouchableOpacity style={styles.accountPlate} onPress={() => {toOtherProfile()}}>
        <View style={{flexDirection:"row",alignItems:"center"}}>
          <Image style={styles.profileImage}  source={{uri:item.user.avatar}}/>
          <View style={{flexDirection:"column", marginHorizontal:10}}>
            <Text style={{fontWeight:"bold", fontSize:16, color:"#FFFFFF"}}>{item.user.displayName}</Text>
          </View>
        </View>
      
        <TouchableOpacity style={styles.followButton} onPress={()=>{setFollow(!isFollow)}}>
         <Text style={{color:"white"}}>{isFollow ? "เลิกติดตาม":"ติดตาม"}</Text>
        </TouchableOpacity>
      </TouchableOpacity>

      <Text style={styles.textBox}>{item.description}</Text>
      <View style={styles.buttonContainer}>

      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container : {
    flex: 1,
    padding: 16,
    paddingTop:32,
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
  textBox: {
    marginBottom: 16,
    borderWidth: 3,
    borderColor: '#F09540',
    borderRadius: 8,
    paddingVertical: 8,
    paddingHorizontal: 12,
    fontSize: 16,
    alignItems:'center',
    justifyContent: 'center',
  },
  textHeader:{
    marginBottom: 16,
    borderWidth: 3,
    borderColor: '#F09540',
    borderRadius: 8,
    paddingVertical: 8,
    paddingHorizontal: 12,
    fontSize: 30,
    fontWeight:"bold",
    alignItems:'center',
    justifyContent: 'center',
    textAlign:"center"
  },
  button_style:{
    flexDirection: "row",
    backgroundColor:"#F09540",
    borderRadius:30,
    padding:10,
    paddingHorizontal:25,
    width: "50%"
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: "space-evenly",
  },
  followButton:{
    justifyContent:"flex-end",
    borderRadius:30,
    color:"white",
    backgroundColor:"#F09540",
    padding:15
    },
  header: {
    alignItems: 'center',
    borderBottomWidth: 1,
    borderBottomColor: '#F97B22',
    marginVertical : 10,
  },
  profileImage: {
    width: 60,
    height: 60,
    borderRadius: 60,
  },
  accountPlate:{
    flexDirection:'row',
    alignItems:'center',
    justifyContent:"space-between",
    margin: 10,
    backgroundColor:"#F09540",
    borderRadius:20,
    padding: 5
  }
});

export default MenuScreen;
