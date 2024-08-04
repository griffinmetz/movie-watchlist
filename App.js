import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, Image, StyleSheet } from 'react-native';
import axios from 'axios';

// TMDB API Key
const apiKey = 'eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI2ODg2OWZhNGIzMjY1ZjEwNzY5MWRhZTQ4MGYwYTU2MiIsIm5iZiI6MTcyMTA5NDA2OC42NzgwNDUsInN1YiI6IjY2OGIxMGE5NGVmNDEzMDkxNmJhMzQxOSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.H9vL1HU5ZDtOIyA9I8RYV__tOCsDVdz9GJxJBKN975w';

// Method to get the current date and format it for use in TMDB API call
const getCurrentDate = () => {
  const date = new Date();
  const day = String(date.getDate()).padStart(2, '0');
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const year = date.getFullYear();

  return `${year}-${month}-${day}`
}

const getLastDayOfTheMonth = () => {
  const curDate = new Date();
  const curYear = curDate.getFullYear();
  const curMonth = curDate.getMonth();
  
   // Create a new date object for the first day of the next month
   const firstDayOfNextMonth = new Date(curYear, curMonth + 1, 1);

   // Subtract one day from that date
   const lastDayOfCurrentMonth = new Date(firstDayOfNextMonth - 1);

   const day = String(lastDayOfCurrentMonth.getDate()).padStart(2, '0');
   const month = String(lastDayOfCurrentMonth.getMonth() + 1).padStart(2, '0');
   const year = lastDayOfCurrentMonth.getFullYear();

   return `${year}-${month}-${day}`
}

const startDate = getCurrentDate();
const endDate = getLastDayOfTheMonth();
const page = 1;

const endpointUrl = `https://api.themoviedb.org/3/discover/movie?include_adult=false&include_video=false&language=en-US&page=${page}&primary_release_year=2024&primary_release_date.gte=${startDate}&primary_release_date.lte=${endDate}&region=US&sort_by=popularity.desc`;


const App = () => {
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios.get(endpointUrl, {
      headers: {
        Authorization: `Bearer ${apiKey}`,
        'Content-Type': 'application/json',
      },
    })
    .then(response => {
      setMovies(response.data.results);
      setLoading(false);
    })
    .catch(error => {
      console.error('Error:', error);
      setLoading(false);
    });
  }, []);

  if (loading) {
    return (
      <View style={styles.container}>
        <Text>Loading...</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Upcoming Movies</Text>
      <FlatList
        data={movies}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <View style={styles.item}>
            <Image
              source={{ uri: `https://image.tmdb.org/t/p/w500${item.poster_path}` }}
              style={styles.image}
            />
            <View style={styles.textContainer}>
              <Text style={styles.movieTitle}>{item.title}</Text>
              <Text style={styles.releaseDate}>Release Date: {item.release_date}</Text>
            </View>
          </View>
        )}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    padding: 50,
    width: 500,
    backgroundColor: '#f5f5f5', // Optional: Add a background color to distinguish content
  },
  title: {
    justifyContent: 'center',
    fontSize: 24,
    marginBottom: 16,
    fontWeight: 'bold',
  },
  item: {
    flexDirection: 'row',
    marginBottom: 16,
    padding: 10,
    width: 350,
    backgroundColor: '#fff', // Optional: Add a background color for item container
    borderRadius: 8,         // Optional: Add rounded corners
    shadowColor: '#000',     // Optional: Add shadow for iOS
    shadowOffset: { width: 0, height: 2 }, // Optional: Shadow offset for iOS
    shadowOpacity: 0.1,      // Optional: Shadow opacity for iOS
    shadowRadius: 8,         // Optional: Shadow radius for iOS
    elevation: 3,            // Optional: Elevation for Android
  },
  image: {
    width: 100,
    height: 150,
    marginRight: 16,
    borderRadius: 8,         // Optional: Add rounded corners to image
  },
  textContainer: {
    flex: 1,
    justifyContent: 'center',
  },
  movieTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  releaseDate: {
    fontSize: 14,
    color: 'grey',
  },
});

export default App;