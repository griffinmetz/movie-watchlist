import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, Image, StyleSheet, TouchableOpacity } from 'react-native';
import { Picker } from '@react-native-picker/picker';
import { getCurrentDate, getUpcomingMonths, getLastDayOfTheMonth } from './utils/date-utils';
import { fetchUpcomingMovies } from './utils/tmdb-api-calls';

const startDate = getCurrentDate();
const endDate = getLastDayOfTheMonth(startDate);
let curPage = 1;

const upcomingMonths = getUpcomingMonths();



const App = () => {
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(true);
  const [month, setMonth] = useState(upcomingMonths[0]);

  const pageSelectorPress = (page) => {
    console.log('Button Pressed! ' + page);
    
    if (page > 0) {
      curPage = page;
    }

    fetchUpcomingMovies(startDate, endDate, curPage).then(result => {
      setMovies(result);
    });
  };

  useEffect(() => {
    fetchUpcomingMovies(startDate, endDate, curPage).then(result => {
      setMovies(result);
    });
    setLoading(false);
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
            selectedValue={month}
            onValueChange={(itemValue, itemIndex) => {
              // TODO: Set the curStartDate and endDate
              setMonth(itemValue);
              fetchUpcomingMovies(itemValue, getLastDayOfTheMonth(itemValue), 1).then(result => {
                setMovies(result);
              });
            }
          }
          >
            {upcomingMonths.map((month, index) => (
              <Picker.Item key={index} label={month.label} value={month.value} />
            ))}
          </Picker>
        </View>
      </View>
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

      <TouchableOpacity style={styles.button} onPress={() => pageSelectorPress(curPage-1)}>
        <Text style={styles.buttonText}>Previous Page</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.button} onPress={() => pageSelectorPress(curPage+1)}>
        <Text style={styles.buttonText}>Next Page</Text>
      </TouchableOpacity>


    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    paddingTop: 75,
    paddingLeft: 25,
    paddingBottom: 50,
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