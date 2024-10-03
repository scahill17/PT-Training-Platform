import React, { useEffect, useState } from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { fetchWorkoutTrends } from '../../api/api';
import './PerformanceOverview.css';

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

  const getFilteredTrend = () => {
    if (!selectedDate || workoutTrends.length === 0) return null;

    const selectedDateObj = new Date(selectedDate);
    const oneWeekBefore = new Date(selectedDateObj);
    oneWeekBefore.setDate(selectedDateObj.getDate() - 7);

    // Find the most recent trend within 7 days before the selected date
    const filteredTrends = workoutTrends.filter((trend) => {
      const trendDate = new Date(trend.trend_period);
      return trendDate >= oneWeekBefore && trendDate <= selectedDateObj;
    });

    if (filteredTrends.length > 0) {
      // Sort trends by date in descending order to get the most recent one
      filteredTrends.sort((a, b) => new Date(b.trend_period) - new Date(a.trend_period));
      return filteredTrends[0];
    }

    return null;
  };

  const filteredTrend = getFilteredTrend();

  if (loading) {
    return <p>Loading workout trends...</p>;
  }

  if (error) {
    return <p>{error}</p>;
  }

  return (
    <div className="performance-overview">
      <h2><strong>Performance Overview</strong></h2>

      {/* Calendar component to pick a date */}
      <div className="date-picker-container">
        <label htmlFor="date-picker">Select Date: </label>
        <DatePicker
          selected={selectedDate}
          onChange={(date) => setSelectedDate(date)}
          dateFormat="yyyy-MM-dd"
        />
      </div>

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
