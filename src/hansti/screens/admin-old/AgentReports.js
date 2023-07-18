import React from 'react';
import InfoCard from '../../../components/Cards/InfoCard';
import './AgentReports.css';

const AgentReports = () => {
  const locations = ['Ingawa', 'Daura', 'Zango', 'Baure', 'Dutsi'];

  return (
    <div>
      <h2>Submitted Report</h2>
      <div className='info-card-container'>
        {locations.map((location) => (
          <InfoCard key={location} title={location}>
            <div className="card-footer">
              <span className="post-time">5 hours ago</span>
            </div>
          </InfoCard>
        ))}
      </div>
      <button className='add-result-button'>Add Reports</button>
    </div>
  );
};

export default AgentReports;
