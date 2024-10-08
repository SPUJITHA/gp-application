
import React from 'react';

const HealthTips = ({ tips }) => {
  return (
    <div className="health-tips-container">
      <h3>Health Tips</h3>
      {tips ? <p>{tips}</p> : <p>Select a symptom to see helpful health tips.</p>}
    </div>
  );
};

export default HealthTips;
