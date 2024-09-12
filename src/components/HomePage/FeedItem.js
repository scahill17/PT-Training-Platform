import React from 'react';

const FeedItem = ({ workout }) => {
  return (
    <div className="feed-item">
      <h3>{workout.clientName}</h3>
      <p>Readiness Score: {workout.readinessScore}</p>
      <p>Duration: {workout.duration} minutes</p>
      <p>Intensity: {workout.intensity}</p>
      <p>Total Weight Lifted: {workout.totalWeight} kg</p>
    </div>
  );
};

export default FeedItem;
