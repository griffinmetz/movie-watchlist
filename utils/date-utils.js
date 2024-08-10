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

    months[0] = { label : date.toLocaleString('en-US', { month: 'long' }) + " " + date.getFullYear(), value: getCurrentDate()};

    for (var i = 1; i <= 12; i++) {
        const nextDate = new Date(date.getFullYear(), curMonth + i, 1);
        const thisYear = nextDate.getFullYear();

        const monthString = nextDate.toLocaleString('en-US', { month: 'long' });

        const day = String(nextDate.getDate()).padStart(2, '0');
        const month = String(nextDate.getMonth() + 1).padStart(2, '0');
        const year = nextDate.getFullYear();

        months[i] = { label : monthString + ' ' + thisYear, value: `${year}-${month}-${day}`};
    }
    
    return months;
}

// Method to get the date of the last day of the month and format it for use in TMDB API call
export function getLastDayOfTheMonth(startDate) {
    const dateArray = startDate.split("-");

    const curYear = Number(dateArray[0]);
    const curMonth = Number(dateArray[1]);
    
     // Create a new date object for the first day of the next month 
     // (Date months are 0-indexed, so we don't need to add 1 to get the next month)
     const firstDayOfNextMonth = new Date(curYear, curMonth, 1);

     
     // Subtract one day from that date
     const lastDayOfCurrentMonth = new Date(firstDayOfNextMonth - 1);
  
     const day = String(lastDayOfCurrentMonth.getDate()).padStart(2, '0');
     const month = String(lastDayOfCurrentMonth.getMonth() + 1).padStart(2, '0');
     const year = lastDayOfCurrentMonth.getFullYear();

     return `${year}-${month}-${day}`;
}