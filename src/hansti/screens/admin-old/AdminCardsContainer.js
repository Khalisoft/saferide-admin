import React from 'react'
import InfoCard from '../../../components/Cards/InfoCard'
import './AdminCardsContainer.css'



const AdminCardsContainer = () => {
  return (
    <div className="cards-cont">
        <InfoCard title="" value="" className="cards">
            <h1>Add Result</h1>
        </InfoCard>

        <InfoCard title="" value="">
            <h1>Add Report</h1>
        </InfoCard>
    </div>
  )
}

export default AdminCardsContainer