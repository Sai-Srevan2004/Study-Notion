import React from 'react'
import Instructor from "../../assets/Images/Instructor.png"
import { FaArrowRight } from 'react-icons/fa'
import Button from './Button'

const InstructorSection = () => {
  return (
    <div className='instrctor-section'>
      <div className='instructor-child'>

        <div className='instructor-img'>
            <img
                src={Instructor}
                alt=""
                className=''
            />
        </div>

        <div className='left-details'>
            <div className='heading'>
                Become an
                Instructor
            </div>

            <p className='para'>
            Instructors from around the world teach millions of students on StudyNotion. We provide the tools and skills to teach what you love.
            </p>

            <div className='btn'>
                <Button active={true} linkto={"/signup"}>
                    <div className=''>
                        Start Learning Today
                        <FaArrowRight />
                    </div>
                </Button>
            </div>


        </div>

      </div>
    </div>
  )
}

export default InstructorSection
