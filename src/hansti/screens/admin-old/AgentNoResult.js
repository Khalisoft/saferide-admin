import React from 'react';
import './AgentNoResult.css';

const AgentNoResult = () => {
  return (
    <div className='info-card-container'>
      <h2>Submitted Results</h2>
      <p>No results added yet</p>
      <button className='add-result-btn'>Add Result</button>
    </div>
  );
};

export default AgentNoResult;
