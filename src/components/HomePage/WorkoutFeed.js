import React from 'react';
import FeedItem from './FeedItem';

const WorkoutFeed = ({ workouts }) => {
  return (
    <div className="workout-feed">
      <h2>Workout Sessions</h2>
      {workouts.length > 0 ? (
        workouts.map((workout) => <FeedItem key={workout.id} workout={workout} />)
      ) : (
        <p>No workout sessions completed yet</p>
      )}
    </div>
  );
};

export default WorkoutFeed;
