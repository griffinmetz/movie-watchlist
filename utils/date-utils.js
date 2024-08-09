// Method to get the current date and format it for use in TMDB API call
export function getCurrentDate() {
    const date = new Date();
    const day = String(date.getDate()).padStart(2, '0');
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const year = date.getFullYear();
  
    return `${year}-${month}-${day}`
}

export function getUpcomingMonths() {
    const date = new Date();
    const curMonth = date.getMonth();

    const months = [];

    for (var i = 0; i <= 12; i++) {
        const nextDate = new Date(date.getFullYear(), curMonth + i, 1);
        const thisYear = nextDate.getFullYear();

        const month = nextDate.toLocaleString('en-US', { month: 'long' });

        months[i] = { label : month + ' ' + thisYear, value: month + ' ' + thisYear};
    }
    
    return months;
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