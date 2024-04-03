import React, { useState } from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity } from 'react-native';

const BookItem = ({ book }) => {
  const [expanded, setExpanded] = useState(false);

  const toggleExpansion = () => {
    setExpanded(!expanded);
  };

  return (
    <TouchableOpacity onPress={toggleExpansion} activeOpacity={0.8}>
      <View style={styles.container}>
        <Image source={require('../assets/book.jpg')} style={styles.image} />
        <View style={styles.textContainer}>
          <Text style={styles.title}>{book.title}</Text>
          <Text style={styles.author}>{book.author.name}</Text>
          {expanded && (
            <View style={styles.descriptionContainer}>
              <Text style={styles.description}>{book.description}</Text>
              <Text style={styles.description}>Is Arabic: {book.isArabic.toString()}</Text>
              <Text style={styles.description}>Is Published: {book.isPublished.toString()}</Text>
            </View>
          )}
        </View>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    padding: 10,
    marginBottom: 10,
    backgroundColor: '#f9f9f9', // Change background color to light gray
    borderRadius: 10,
    shadowColor: '#000', // Add shadow color
    shadowOffset: { width: 0, height: 2 }, // Add shadow offset
    shadowOpacity: 0.2, // Add shadow opacity
    shadowRadius: 2, // Add shadow radius
    elevation: 2, // Add elevation for Android shadow
  },
  image: {
    width: 50,
    height: 70,
    marginRight: 10,
  },
  textContainer: {
    flex: 1,
  },
  title: {
    fontWeight: 'bold',
    fontSize: 18,
    marginBottom: 5,
    color: '#333', // Change text color to dark gray
  },
  author: {
    color: '#666', // Change author color to gray
    fontSize: 14,
  },
  descriptionContainer: {
    marginTop: 10,
  },
  description: {
    color: '#666', // Change description color to gray
  },
});

export default BookItem;
