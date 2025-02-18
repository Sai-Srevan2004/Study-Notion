import React from 'react'
import Button from '../components/core/core/HomePage/Button'
import Banner from "../assets/Images/banner.mp4"
import CodeBlocks from '../components/core/core/HomePage/CodeBlocks'
import TimelineSection from '../components/core/core/HomePage/TimelineSection'
import LearningLanguageSection from '../components/core/core/HomePage/LearningLanguageSection'
import InstructorSection from '../components/core/core/HomePage/InstructorSection'
import Footer from '../components/core/Common/Footer'
import ExploreMore from '../components/core/core/HomePage/ExploreMore'


const Home = () => {
  return (
    <div>
      {/**div1 */}
      <div className='w-10/12 mx-auto'>
        {/* Section1 */}
        <div className='flex flex-col justify-center items-center gap-8 text-white mt-9'>
          <div className='bg-blue-700 border-solid border-black rounded-[30px] px-3 py-1'>
            <p>Become an Instructor</p>
          </div>
          <h1 className='text-4xl'>Empower Your Future with Coding Skills</h1>
          <p className='max-w-maxContent w-[70%] text-center'>With our online coding courses, you can learn at your own pace, from anywhere in the world, and get access to a wealth of resources, including hands-on projects, quizzes, and personalized feedback from instructors.</p>
          <div className='flex items-center justify-center gap-9'>
            <Button value={"Learn more"} active={true} linkto={'/signup'}></Button>
            <Button value={"Book a Demo"} active={false} linkto={'/signup'}></Button>

          </div>
        </div>

        {/* Section2 */}
        <div className="mx-3 my-7 shadow-[10px_-5px_50px_-5px] shadow-blue-200">
          <video
            className="shadow-[20px_20px_rgba(255,255,255)]"
            muted
            loop
            autoPlay
          >
            <source src={Banner} type="video/mp4" />
          </video>
        </div>
        {/* Section3 */}
        <div>
          <CodeBlocks
            position={"lg:flex-row"}
            heading={
              <div className="text-4xl font-semibold">
                Unlock your
                coding potential with our online
                courses.
              </div>
            }
            subheading={
              "Our courses are designed and taught by industry experts who have years of experience in coding and are passionate about sharing their knowledge with you."
            }
            ctabtn1={{
              btnText: "Try it Yourself",
              link: "/signup",
              active: true,
            }}
            ctabtn2={{
              btnText: "Learn More",
              link: "/signup",
              active: false,
            }}
            codeColor={"text-yellow-25"}
            codeblock={`<!DOCTYPE html>\n <html lang="en">\n<head>\n<title>This is myPage</title>\n</head>\n<body>\n<h1><a href="/">Header</a></h1>\n<nav> <a href="/one">One</a> <a href="/two">Two</a> <a href="/three">Three</a>\n</nav>\n</body>`}
            backgroundGradient={<div className="codeblock1 absolute"></div>}
          />
        </div>

        <div>
          <CodeBlocks
            position={"lg:flex-row-reverse"}
            heading={
              <div className="w-[100%] text-4xl font-semibold lg:w-[50%]">
                Start coding in secs
              </div>
            }
            subheading={
              "Go ahead, give it a try. Our hands-on learning environment means you'll be writing real code from your very first lesson."
            }
            ctabtn1={{
              btnText: "Continue Lesson",
              link: "/signup",
              active: true,
            }}
            ctabtn2={{
              btnText: "Learn More",
              link: "/signup",
              active: false,
            }}
            codeColor={"text-white"}
            codeblock={`import React from "react";\n import CTAButton from "./Button";\nimport TypeAnimation from "react-type";\nimport { FaArrowRight } from "react-icons/fa";\n\nconst Home = () => {\nreturn (\n<div>Home</div>\n)\n}\nexport default Home;`}
          />
        </div>
        <ExploreMore />
      </div>
      {/**div2 */}

      <div className="bg-pure-greys-5 text-richblack-700">
        <div className="homepage_bg h-[320px]">
          {/* Explore Full Catagory Section */}
          <div className="mx-auto flex w-11/12 max-w-maxContent flex-col items-center justify-between gap-8">
            <div className="lg:h-[150px]"></div>
            <div className="flex flex-row gap-7 text-white lg:mt-8">
              <Button active={true} linkto={"/signup"} value={"Explore full catelog"}>

              </Button>
              <Button active={false} linkto={"/login"} value={"Learn more"}>
              </Button>
            </div>
          </div>
        </div>

        <div className="mx-auto flex w-11/12 max-w-maxContent flex-col gap-8">
          {/* Job that is in Demand - Section 1 */}
          <div className="mb-10  flex justify-between gap-7 lg:mt-20 lg:flex-row lg:gap-0">
            <div className="text-4xl font-semibold lg:w-[45%] ">
              Get the skills you need for a{" "}
              job that is in demand.
            </div>
            <div className="flex flex-col items-start gap-10 lg:w-[40%]">
              <div className="text-[16px]">
                The modern StudyNotion is the dictates its own terms. Today, to
                be a competitive specialist requires more than professional
                skills.
              </div>
              <Button active={true} linkto={"/signup"} value={"Learn more"}>
              </Button>
            </div>
          </div>

          {/* Timeline Section - Section 2 */}
          <TimelineSection />

          {/* Learning Language Section - Section 3 */}
          <LearningLanguageSection />
        </div>
      </div>
      <div className="relative mx-auto my-20 flex w-11/12 max-w-maxContent flex-col items-center justify-between gap-8 bg-richblack-900 text-white">
          {/* Become a instructor section */}
          <InstructorSection />

          {/* Reviws from Other Learner */}
          <h1 className="text-center text-4xl font-semibold mt-8">
            Reviews from other learners
          </h1>
          {/* <ReviewSlider /> */}
        </div>
        <Footer />
    </div>

  )
}

export default Home
