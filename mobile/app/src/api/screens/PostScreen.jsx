// src/screens/PostScreen.js
import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, StyleSheet, Alert, StatusBar } from 'react-native';
import { getPost, getComments } from '../jsonPlaceholder';

const PostScreen = ({ route }) => {
  const { id } = route.params;
  const [post, setPost] = useState(null);
  const [comments, setComments] = useState([]);

  useEffect(() => {
    fetchPost();
    fetchComments();
  }, []);

  const fetchPost = async () => {
    try {
      const response = await getPost(id);
      setPost(response.data);
    } catch (error) {
      Alert.alert('Error', `Failed to fetch post: ${error.message}`);
    }
  };

  const fetchComments = async () => {
    try {
      const response = await getComments(id);
      setComments(response.data);
    } catch (error) {
      Alert.alert('Error', `Failed to fetch comments: ${error.message}`);
    }
  };

  if (!post) return null;

  return (
    <View style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor="#f0f0f0" />
      <Text style={styles.title}>{post.title}</Text>
      <Text style={styles.body}>{post.body}</Text>
      <Text style={styles.commentsTitle}>Comments:</Text>
      <FlatList
        data={comments}
        keyExtractor={(comment) => comment.id.toString()}
        renderItem={({ item }) => (
          <View style={styles.comment}>
            <Text style={styles.commentEmail}>{item.email}</Text>
            <Text style={styles.commentBody}>{item.body}</Text>
          </View>
        )}
        contentContainerStyle={styles.commentsList}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f0f0f0',
    paddingHorizontal: 20,
    paddingTop: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 10,
  },
  body: {
    fontSize: 16,
    color: '#666',
    marginBottom: 20,
    lineHeight: 24,
  },
  commentsTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 15,
  },
  comment: {
    marginBottom: 15,
    padding: 15,
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 8,
    backgroundColor: '#fff',
  },
  commentEmail: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#007BFF',
    marginBottom: 5,
  },
  commentBody: {
    fontSize: 14,
    color: '#555',
  },
  commentsList: {
    paddingBottom: 20,
  },
});

export default PostScreen;
