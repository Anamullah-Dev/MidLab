// api/books.js

const fetchBooks = async () => {
  try {
    const response = await fetch('https://dev.iqrakitab.net/api/books');
    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error fetching books:', error);
    return [];
  }
};

export { fetchBooks };
