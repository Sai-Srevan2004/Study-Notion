import React from 'react'
import  {HomePageExplore} from "../../data/homepage-explore"
import { useState } from 'react';
import CourseCard from './CourseCard';


const tabsName = [
    "Free",
    "New to coding",
    "Most popular",
    "Skills paths",
    "Career paths",
];


const ExploreMore = () => {

    const [currentTab, setCurrentTab] = useState(tabsName[0]);
    const [courses, setCourses] = useState(HomePageExplore[0].courses);
    const [currentCard, setCurrentCard] = useState(HomePageExplore[0].courses[0].heading)

    const setMyCards = (value) => {
        setCurrentTab(value);
        const result = HomePageExplore.filter((course) => course.tag === value);
        setCourses(result[0].courses);
        setCurrentCard(result[0].courses[0].heading);
    }


  return (
    <div className='explore-more'>

      <div className='explore-heading'>
        Unlock the 
        Power of Code
      </div>

      <p className='explore-paraaa'>
        Learn to build anything you can imagine
      </p>  

      <div className='explore-nav-type'>
      {
        tabsName.map( (element, index) => {
            return (
                <div
                className={`${currentTab === element ? "apply-black": "not-apply-black" } general `}
                key={index}
                onClick={() => setMyCards(element)}
                >
                    {element}
                </div>
            )
        })
      }

      </div>

      <div className='explore-extra-div'></div>

      {/* course card ka group */}

      <div className='explore-cards'>
        {
            courses.map(  (element, index) => {
                return (
                    <CourseCard 
                    key={index}
                    cardData = {element}
                    currentCard = {currentCard}
                    setCurrentCard = {setCurrentCard}
                    />
                )
            } )
        }
      </div>


    </div>
  )
}

export default ExploreMore
