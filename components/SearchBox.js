import React from 'react';
import { View, TextInput, StyleSheet,TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons'; // Assuming you have the Ionicons library installed

const SearchInput = ({ placeholder, onChangeText }) => {
  return (
    <View style={styles.container} >
      
        <Ionicons name="ios-search" size={24} color="#000000" style={styles.icon} />
        <TextInput
          style={styles.input}
          placeholder={placeholder}
          placeholderTextColor="#888888"
          onChangeText={onChangeText}
        />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    margin: 10,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#9CA777',
    borderRadius: 4,
    paddingHorizontal: 16,
    shadowColor: '#000000',
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 4,
    elevation: 2,
  },
  icon: {
    marginRight: 8,
  },
  input: {
    flex: 1,
    fontSize: 16,
    color: '#000000',
  },
});

export default SearchInput;
