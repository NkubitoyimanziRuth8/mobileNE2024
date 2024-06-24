import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, TouchableOpacity, StyleSheet, Button, Alert, StatusBar } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { getPosts, deletePost } from '../jsonPlaceholder';

const HomeScreen = () => {
  const [posts, setPosts] = useState([]);
  const navigation = useNavigation();

  useEffect(() => {
    fetchPosts();
  }, []);

  const fetchPosts = async () => {
    try {
      const response = await getPosts();
      setPosts(response.data);
    } catch (error) {
      Alert.alert('Error', `Failed to fetch posts: ${error.message}`);
    }
  };

  const handleDelete = async (id) => {
    try {
      const response = await deletePost(id);
      if (response.status === 200) {
        fetchPosts(); // Refresh the posts list after deletion
      } else {
        Alert.alert('Error', 'Failed to delete the post.');
      }
    } catch (error) {
      Alert.alert('Error', `Failed to delete the post: ${error.message}`);
    }
  };

  const handleNewPost = (newPost) => {
    setPosts([newPost, ...posts]);
  };

  return (
    <View style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor="#6200ee" />
      <FlatList
        data={posts}
        keyExtractor={(post) => post.id.toString()}
        renderItem={({ item }) => (
          <View style={styles.post}>
            <TouchableOpacity onPress={() => navigation.navigate('Post', { id: item.id })}>
              <Text style={styles.title}>{item.title}</Text>
              <Text style={styles.body}>{item.body}</Text>
            </TouchableOpacity>
            <View style={styles.buttonContainer}>
              <Button
                title="Delete"
                onPress={() => handleDelete(item.id)}
                color="#ff4d4d"
              />
              <Button
                title="View"
                onPress={() => navigation.navigate('Post', { id: item.id })}
                color="#4da6ff"
              />
            </View>
          </View>
        )}
        contentContainerStyle={styles.listContent}
      />
      <TouchableOpacity
        style={styles.fab}
        onPress={() => navigation.navigate('CreatePost', { handleNewPost })}
      >
        <Text style={styles.fabText}>+</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f0f0f0',
    paddingHorizontal: 10,
    paddingTop: 10,
  },
  post: {
    marginBottom: 10,
    padding: 15,
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 8,
    backgroundColor: '#ffffff',
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 5,
  },
  body: {
    fontSize: 16,
    color: '#666',
    marginBottom: 10,
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  listContent: {
    paddingBottom: 100, // space for the FAB
  },
  fab: {
    position: 'absolute',
    right: 20,
    bottom: 20,
    width: 56,
    height: 56,
    borderRadius: 28,
    backgroundColor: '#6200ee',
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 5,
  },
  fabText: {
    color: '#ffffff',
    fontSize: 24,
    fontWeight: 'bold',
  },
});

export default HomeScreen;
