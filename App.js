import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, Image, StyleSheet } from 'react-native';
import { Picker } from '@react-native-picker/picker';
import axios from 'axios';
import { getCurrentDate, getUpcomingMonths, getLastDayOfTheMonth } from './utils/date-utils';

// TMDB API Key
const apiKey = 'eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI2ODg2OWZhNGIzMjY1ZjEwNzY5MWRhZTQ4MGYwYTU2MiIsIm5iZiI6MTcyMTA5NDA2OC42NzgwNDUsInN1YiI6IjY2OGIxMGE5NGVmNDEzMDkxNmJhMzQxOSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.H9vL1HU5ZDtOIyA9I8RYV__tOCsDVdz9GJxJBKN975w';

const startDate = getCurrentDate();
const endDate = getLastDayOfTheMonth();
const page = 1;

const upcomingMonths = getUpcomingMonths();

const endpointUrl = `https://api.themoviedb.org/3/discover/movie?include_adult=false&include_video=false&language=en-US&page=${page}&primary_release_year=2024&primary_release_date.gte=${startDate}&primary_release_date.lte=${endDate}&region=US&sort_by=popularity.desc`;


const App = () => {
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(true);
  const [month, setMonth] = useState(upcomingMonths[0]);

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
       
      
          <View style={{flexDirection: 'row', alignItems: 'center', height: 125}}>
            <View style={{flex:.5}}>
              <Text style={{fontSize: 24, fontWeight: 'bold'}}>Upcoming Movies</Text>
            </View>
            <View style={{flex:.5}}>
              <Picker
                onValueChange={(itemValue, itemIndex) => setMonth(itemValue)}
              >
                {upcomingMonths.map((month, index) => (
                <Picker.Item key={index} label={month.label} value={month.value} />
            ))}
          </Picker>
            </View>
          </View>
      


        



      {/* <View style={styles.titleRow}>
        <View style={{flex:.5}}> 
          <Text style={styles.title}>Upcoming Movies</Text>
        </View>
        <View style={{flex:.5}}>
          <Picker
            selectedValue={"Hi"}
            style={styles.picker}
            onValueChange={(itemValue, itemIndex) => setMonths(itemValue)}
          >
            {months.map((month, index) => (
              <Picker.Item key={index} label={month.label} value={month.value} />
            ))}
          </Picker>
        </View>
      </View> */}



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
    paddingTop: 75,
    paddingLeft: 25,
    width: '100%',
    backgroundColor: '#f5f5f5', // Optional: Add a background color to distinguish content
  },
  titleRow: {
    flexdirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 16,
    width: '90%', // Make sure the row takes most of the screen width
    height: 60,
    backgroundColor: '#ff93dd', // Optional: Add a background color to distinguish content
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    width: '50%',
    height: 60,
    padding: 0,
    backgroundColor: '#c30b4e',
    flex:.5
  },
  picker: {
    width: '50%',
    height: 50,
    backgroundColor: '#6495ed',
  },
  item: {
    flexDirection: 'row',
    marginBottom: 16,
    padding: 10,
    width: 375,
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