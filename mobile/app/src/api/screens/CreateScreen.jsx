import React, { useState } from 'react';
import { View, TextInput, Button, StyleSheet, Alert } from 'react-native';
import { createPost } from '../jsonPlaceholder';

const CreatePostScreen = ({ navigation, route }) => {
  const { handleNewPost } = route.params;
  const [title, setTitle] = useState('');
  const [body, setBody] = useState('');

  const handleCreatePost = async () => {
    if (title.trim() === '' || body.trim() === '') {
      Alert.alert('Error', 'Title and Body are required.');
      return;
    }
    
    try {
      const response = await createPost({ title, body });
      handleNewPost(response.data); // Call the callback to update HomeScreen
      navigation.navigate('Home');
    } catch (error) {
      Alert.alert('Error', `Failed to create post: ${error.message}`);
    }
  };

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.input}
        placeholder="Title"
        value={title}
        onChangeText={setTitle}
        placeholderTextColor="#999"
      />
      <TextInput
        style={styles.input}
        placeholder="Body"
        value={body}
        onChangeText={setBody}
        placeholderTextColor="#999"
        multiline
      />
      <Button title="Create Post" onPress={handleCreatePost} color="#6200ee" />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f0f0f0',
    padding: 20,
  },
  input: {
    height: 40,
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 8,
    marginBottom: 15,
    paddingHorizontal: 10,
    backgroundColor: '#fff',
  },
});

export default CreatePostScreen;
