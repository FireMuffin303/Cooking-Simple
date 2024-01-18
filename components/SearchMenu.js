import React, { useState } from 'react';
import { View, TextInput, Button, Text, StyleSheet } from 'react-native';


const SearchMenu = ({ onSearch }) => {
  const [searchText, setSearchText] = useState('');

  const handleSearch = () => {
    // Call the onSearch function with the search text
    onSearch(searchText);
  };

  return (
    <View style={styles.container}>
      <View style={styles.inputContainer}>
        <TextInput
          placeholder="ค้นหา..."
          value={searchText}
          onChangeText={text => setSearchText(text)}
          style={styles.textInput}
        />
        <Button title="ค้นหาเมนู" onPress={handleSearch} style={styles.button} />
      </View>
      <Text style={styles.additionalText}> รายการเมนู </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#FEE8B0',
    padding: 16,
    borderRadius: 8,
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
  },
  textInput: {
    flex: 1,
    backgroundColor: '#FFFFFF',
    marginRight: 8,
    padding: 8,
    borderRadius: 4,
  },
  button: {
    backgroundColor: '#F97B22',
    paddingVertical: 12,
    borderRadius: 8,
    alignItems: 'center',
    width: 120,
  },
  additionalText: {
    marginTop: 8,
    fontSize: 16,
    color: '#333333',
    textAlign: 'center',
  },
});

export default SearchMenu;
