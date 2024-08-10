import axios from 'axios';
import { getCurrentDate, getUpcomingMonths, getLastDayOfTheMonth } from './date-utils';

// TMDB API Key
const apiKey = 'eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI2ODg2OWZhNGIzMjY1ZjEwNzY5MWRhZTQ4MGYwYTU2MiIsIm5iZiI6MTcyMTA5NDA2OC42NzgwNDUsInN1YiI6IjY2OGIxMGE5NGVmNDEzMDkxNmJhMzQxOSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.H9vL1HU5ZDtOIyA9I8RYV__tOCsDVdz9GJxJBKN975w';

export function fetchUpcomingMovies(startDate, endDate, page) {
    const upcomingMoviesEndpointUrl = `https://api.themoviedb.org/3/discover/movie?include_adult=false&include_video=false&language=en-US&page=${page}&primary_release_date.gte=${startDate}&primary_release_date.lte=${endDate}&region=US&sort_by=popularity.desc`;
    
    return axios.get(upcomingMoviesEndpointUrl, {
        headers: {
          Authorization: `Bearer ${apiKey}`,
          'Content-Type': 'application/json',
        },
      })
      .then(response => {
        return response.data.results;
      })
      .catch(error => {
        console.error('Error:', error);
      });

}