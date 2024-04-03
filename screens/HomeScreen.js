import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, Button, ScrollView, Switch, StyleSheet, SafeAreaView, Platform } from 'react-native';
import BookItem from '../components/BookItem';
import useFetchBooks from '../hooks/useFetchBooks';

const HomeScreen = () => {
  const { loading, error, fetchData, books } = useFetchBooks();
  const [searchQuery, setSearchQuery] = useState('');
  const [isRTL, setIsRTL] = useState(false);

  useEffect(() => {
    fetchData();
  }, []);

  const handleSearch = () => {
    // No need to set the books state here, it's managed by useFetchBooks hook
    // Filter books based on search query
    return books.filter(book => book.title.toLowerCase().includes(searchQuery.toLowerCase()));
  };

  const toggleRTL = () => {
    setIsRTL(!isRTL);
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={{alignItems: 'center', marginBottom: 10, marginTop: 10}}>
        <Text style={styles.title}>Read Books</Text>
      </View>
      
      <View style={styles.searchContainer}>
        {isRTL ? (
          <>
            <Button title="Search" onPress={handleSearch} color="#FFA500" />
            <TextInput
              style={styles.input}
              placeholder="تلاش کریں"
              value={searchQuery}
              onChangeText={text => setSearchQuery(text)}
            />
          </>
        ) : (
          <>
            <TextInput
              style={styles.input}
              placeholder="Search by book name"
              value={searchQuery}
              onChangeText={text => setSearchQuery(text)}
            />
            <Button title="Search" onPress={handleSearch} color="#FFA500" style={styles.button} />

          </>
        )}
      </View>
      
      <ScrollView style={styles.scrollView}>
        {loading ? (
          <Text>Loading...</Text>
        ) : error ? (
          <Text>Error: {error}</Text>
        ) : (
          handleSearch().map(book => <BookItem key={book._id} book={book} />)
        )}
      </ScrollView>
      
      <View style={styles.toggleButtonContainer}>
        <View style={styles.toggleContainer}>
          <Text>{isRTL ? 'Urdu' : 'English'}</Text>
          <Switch value={isRTL} onValueChange={toggleRTL} />
        </View>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: Platform.OS === 'android' ? StatusBar.currentHeight : 0,
    paddingHorizontal: 10,
    backgroundColor: '#fffdfb',
  },
  title: {
    fontSize: 34,
    fontWeight: 'bold',
    marginBottom: 10,
    fontFamily: 'Arial',
    color: '#FFA500', // Change color to light orange
  },
  searchContainer: {
    flexDirection: 'row',
    marginBottom: 10,
    padding: 10,
    justifyContent: 'space-between',
  },
  input: {
    flex: 1,
    borderWidth: 1,
    borderColor: 'gray',
    padding: 10,
    marginRight: 10,
    borderRadius: 10,
    backgroundColor: '#fff', // Change background color of input to white
  },
  scrollView: {
    flex: 1,
  },
  toggleButtonContainer: {
    position: 'absolute',
    top: 35,
    right: 15,
  },
  toggleContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 10,
  },
   button: {
    fontWeight: 'bold', // Make the text bold
  }
});

export default HomeScreen;
