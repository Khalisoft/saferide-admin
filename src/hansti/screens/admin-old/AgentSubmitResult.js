import React from 'react';
import InfoCard from '../../../components/Cards/InfoCard';
import './AgentSubmitResult.css';

const AgentSubmitResult = () => {
  const locations = ['Ingawa', 'Daura', 'Zango', 'Baure', 'Dutsi'];

  return (
    <div>
      <h2>Submitted Results</h2>
      <div className='info-card-container'>
        {locations.map((location) => (
          <InfoCard key={location} title={location} />
        ))}
      </div>
      <button className='add-result-button'>Add Result</button>
    </div>
  );
};

export default AgentSubmitResult;
