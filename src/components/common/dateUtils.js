/**
 * Get the number of days in a given month for a specific date.
 * 
 * @param {Date} date - A JavaScript Date object representing any day in the target month.
 * @returns {number} - The number of days in the month.
 */
export const getDaysInMonth = (date) => {
  const year = date.getFullYear(); 
  const month = date.getMonth();  
  
  // Create a date object for the first day of the next month and subtract one day to get the last day of the current month.
  return new Date(year, month + 1, 0).getDate();
};
