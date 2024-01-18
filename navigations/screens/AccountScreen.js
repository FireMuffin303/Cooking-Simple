import React, { useEffect, useState } from 'react';
import { View, Text, Image, TouchableOpacity, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons'; 
import { signOut } from 'firebase/auth';
import { auth } from '../../firebase';

const AccountPage = ({navigation}) => {
  const [user,setUser] = useState([])

  useEffect(() =>{
    const tempuser = auth.currentUser;
    if(tempuser != null){
      setUser(tempuser)
    } 
  },[])


  const handleLogout = () => {
    signOut(auth).then(() =>{
      navigation.navigate("Login")
    }).catch((err) =>{
      console.log(err)
    })
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Image style={styles.profileImage}  source={{uri:user.photoURL}}/>
        <Text style={{fontSize:28,fontWeight:"bold",marginTop:15}}>{user.displayName}</Text>
      </View>
      <View style={styles.content}>
      <TouchableOpacity style={styles.button} onPress={() =>{navigation.navigate("EditUser")}}>
          <Ionicons name="ios-bookmark" size={24} style={styles.icon} />
          <Text style={styles.buttonText}>แก้ไขโปรไฟล์</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.button} onPress={() =>{navigation.navigate("MyMenu")}}>
          <Ionicons name="ios-bookmark" size={24} style={styles.icon} />
          <Text style={styles.buttonText}>เมนูของฉัน</Text>
        </TouchableOpacity>
        
        <TouchableOpacity style={styles.button} onPress={() =>{navigation.navigate("Favorite")}}>
          <Ionicons name="ios-heart" size={24}  style={styles.icon} />
          <Text style={styles.buttonText}>ดูเมนูโปรด</Text>
         
        </TouchableOpacity>
        
        <TouchableOpacity style={styles.button} onPress={() => {navigation.navigate("History")}}>
          <Ionicons name="ios-time" size={24}  style={styles.icon} />
          <Text style={styles.buttonText}>ดูประวัติการเข้าชม</Text>
        </TouchableOpacity>
        
        <TouchableOpacity style={styles.logoutButton} onPress={handleLogout}>
          <Text style={styles.logoutButtonText}>ออกจากระบบ</Text>
        </TouchableOpacity>
      </View>
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
    borderBottomWidth: 1,
    borderBottomColor: '#F97B22',
  },
  profileImage: {
    width: 120,
    height: 120,
    borderRadius: 60,
  },
  content: {
    padding: 24,
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

export default AccountPage;