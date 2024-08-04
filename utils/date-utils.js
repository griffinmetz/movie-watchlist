// Method to get the current date and format it for use in TMDB API call
export function getCurrentDate() {
    const date = new Date();
    const day = String(date.getDate()).padStart(2, '0');
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const year = date.getFullYear();
  
    return `${year}-${month}-${day}`
}

// Method to get the date of the last day of the month and format it for use in TMDB API call
export function getLastDayOfTheMonth() {
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