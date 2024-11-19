import React from 'react'
import './HomePageComponent.css'

const CourseCard = ({ cardData, setCurrentCard, currentCard }) => {
    console.log(currentCard)
    return (
        <div onClick={() => setCurrentCard(cardData.heading)} className={`explore-card ${currentCard === cardData.heading ? 'card-white' : 'card-black'}`}  >
            <div className="card-header">
                <div className="card-heading">
                    {cardData.heading}
                </div>
                <div className="card-desc">
                    {cardData.description}
                </div>
            </div>
            <div className="card-footer">
                <div className="level">{cardData.level}</div>
                <div className="lesson">
                    {cardData.lessionNumber}
                </div>
            </div>
        </div>
    )
}

export default CourseCard
