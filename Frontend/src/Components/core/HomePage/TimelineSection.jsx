import React from 'react'

import Logo1 from "../../../assets/TimeLineLogo/Logo1.svg"
import Logo2 from "../../../assets/TimeLineLogo/Logo2.svg"
import Logo3 from "../../../assets/TimeLineLogo/Logo3.svg"
import Logo4 from "../../../assets/TimeLineLogo/Logo4.svg"
import timelineImage from "../../../assets/Images/TimelineImage.png"

const timeline = [
    {
        Logo: Logo1,
        heading: "Leadership",
        Description:"Fully committed to the success company",
    },
    {
        Logo: Logo2,
        heading: "Responsibilty",
        Description:"Students will always be our top priority",
    },
    {
        Logo: Logo3,
        heading: "Flexibility",
        Description:"The ability to switch is an important skills",
    },
    {
        Logo: Logo4,
        heading: "Solve the problem",
        Description:"Code your way to a solution",
    },
];

const TimelineSection = () => {
  return (
    <div className='time-line-section'>
      <div className='time-line-child'>

        <div className='time-line-first'>
            {
                timeline.map( (element, index) => {
                    return (
                        <div className='time-line-map' key={index}>

                            <div className='time-line-logo'>
                                <img src={element.Logo} />
                            </div>

                            <div className='txt'>
                                <h2 className=''>{element.heading}</h2>
                                <p className=''>{element.Description}</p>
                            </div>

                        </div>
                    )
                } )
            }
        </div>
        <div className='time-line-second'>

            <img  src={timelineImage}
            alt="timelineImage"
            className=''
            />

            <div className='time-line-abs'>
                <div className='abs-div1'>
                    <p className='number'>10</p>
                    <p className='p'>Years of Experience</p>
                </div>

                <div className='abs-div2'>
                <p className='number'>250</p>
                    <p className='p'>TYpe of Courses</p>
                </div>

            </div>

        </div>

      </div>
    </div>
  )
}

export default TimelineSection
