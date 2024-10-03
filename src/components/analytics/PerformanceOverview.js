import React, { useEffect, useState } from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { fetchWorkoutTrends } from '../../api/api';
import './PerformanceOverview.css';

/**
 * PerformanceOverview Component
 * Displays the performance overview for an athlete.
 * Fetches workout trends and allows users to select a date to view weekly or monthly performance data.
 *
 * @param {number} athleteId - The ID of the athlete for which to fetch performance data.
 */
const PerformanceOverview = ({ athleteId }) => {
  const [workoutTrends, setWorkoutTrends] = useState([]);
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const loadWorkoutTrends = async () => {
      try {
        const trendsData = await fetchWorkoutTrends(athleteId);
        setWorkoutTrends(trendsData);
        setLoading(false);
      } catch (err) {
        setError('Error fetching workout trends');
        setLoading(false);
      }
    };

    loadWorkoutTrends();
  }, [athleteId]);

  /**
   * Filter the workout trends to return the most recent trend within 7 days of the selected date.
   *
   * @returns {object|null} The filtered workout trend or null if no trend matches the criteria.
   */
  const getFilteredTrend = () => {
    if (!selectedDate || workoutTrends.length === 0) return null;

    const selectedDateObj = new Date(selectedDate);
    const oneWeekBefore = new Date(selectedDateObj);
    oneWeekBefore.setDate(selectedDateObj.getDate() - 7);

    // Filter workout trends within the 7-day window of the selected date
    const filteredTrends = workoutTrends.filter((trend) => {
      const trendDate = new Date(trend.trend_period);
      return trendDate >= oneWeekBefore && trendDate <= selectedDateObj;
    });

    // Sort by most recent date and return the first trend
    if (filteredTrends.length > 0) {
      filteredTrends.sort((a, b) => new Date(b.trend_period) - new Date(a.trend_period));
      return filteredTrends[0];
    }

    return null;
  };

  const filteredTrend = getFilteredTrend();

  // Loading and error handling
  if (loading) {
    return <p>Loading workout trends...</p>;
  }

  if (error) {
    return <p>{error}</p>;
  }

  return (
    <div className="performance-overview">
      <h2><strong>Performance Overview</strong></h2>

      {/* Date picker for selecting a date */}
      <div className="date-picker-container">
        <label htmlFor="date-picker">Select Date: </label>
        <DatePicker
          selected={selectedDate}
          onChange={(date) => setSelectedDate(date)}
          dateFormat="yyyy-MM-dd"
        />
      </div>

      {/* Display the filtered trend data */}
      {filteredTrend ? (
        <div className="trend-section">
          <h2>{filteredTrend.trend_type === 'weekly' ? 'Weekly Performance' : 'Monthly Performance'}</h2>
          <div className="trend-data">
            <p><strong>Total Weight Lifted:</strong> {filteredTrend.total_weight} kg</p>
            <p><strong>Average Weight Per Session:</strong> {filteredTrend.average_weight} kg</p>
            <p><strong>Average Reps Per Session:</strong> {filteredTrend.average_reps}</p>
            <p><strong>Total Workouts:</strong> {filteredTrend.total_workouts}</p>
          </div>
        </div>
      ) : (
        <p className="no-data">No workout trends available.</p>
      )}
    </div>
  );
};

export default PerformanceOverview;
