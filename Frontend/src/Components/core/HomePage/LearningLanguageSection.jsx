import React from 'react'
import know_your_progress  from "../../../assets/Images/Know_your_progress.png"
import compare_with_others from "../../../assets/Images/Compare_with_others.png"
import plan_your_lesson from "../../../assets/Images/Plan_your_lessons.png"
import Button from './Button'
const LearningLanguageSection = () => {
  return (
    <div className='learning-language-section'>
      <div className='learning-language-child'>

            <div className='heading'>
                Your Swiss Knife for
                learning any language
            </div>

            <div className='para'>
            Using spin making learning multiple languages easy. with 20+ languages realistic voice-over, progress tracking, custom schedule and more.
            </div>

            <div className='cross-imgs'>
                <img 
                    src = {know_your_progress}
                    alt = "KNowYourProgressImage"
                    className='cross-img1'
                />
                <img 
                    src = {compare_with_others}
                    alt = "KNowYourProgressImage"
                    className='cross-img2'
                />
                <img 
                    src = {plan_your_lesson}
                    alt = "KNowYourProgressImage"
                    className='cross-img3'

                />
            </div>

            <div className=''>
                <Button active={true} linkto={"/signup"}>
                    <div>
                        Learn more
                    </div>
                </Button>
            </div>

      </div>
    </div>
  )
}

export default LearningLanguageSection
