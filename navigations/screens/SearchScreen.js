import React from 'react';
import { View, Text, Image, TouchableOpacity, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons'; // Assuming you have the Ionicons library installed
import SearchMenu from '../../components/SearchMenu';
const FindMenu = () => {


  return (
    <View style={styles.container}>
     <SearchMenu></SearchMenu>
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

export default FindMenu;
