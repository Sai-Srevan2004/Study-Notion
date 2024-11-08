import React from 'react'
import './Home.css'
import Button from '../../Components/HomePage/Button'
import Banner from '../../assets/Images/banner.mp4'
import CodeBlocks from '../../Components/HomePage/CodeBlocks'
import { FaArrowRight } from 'react-icons/fa';
import TimelineSection from '../../Components/HomePage/TimeLineSection'
import LearningLanguageSection from '../../Components/HomePage/LearningLanguageSection'
import InstructorSection from '../../Components/HomePage/InstructorSection'
import ExploreMore from '../../Components/HomePage/Exploremore'
import Footer from '../../Components/Common/Footer'


const Home = () => {
    return (
        <div>
            <div className="section1">
                <div className="first">
                    <button className='top-btn'>Become an Instructor <FaArrowRight /></button>
                    <h1>Empower your future with coding skills</h1>
                    <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Vero quod distinctio obcaecati autem earum rem officia iure molestiae fuga at. Lorem ipsum dolor sit amet consectetur, adipisicing elit. Voluptas, molestias.</p>
                    <div className="section1-buttons">
                        <Button linkto={'/signup'} active={true}>
                            Learn More
                        </Button>
                        <Button linkto={'/login'} active={false}>
                            Book a Demo
                        </Button>
                    </div>
                </div>
                {/*video div */}
                <div className='video'>
                    <video
                        muted
                        loop
                        autoPlay
                    >
                        <source src={Banner} type="video/mp4" />
                    </video>
                </div>
                {/** */}
                <div className='first-code-block'>
                    <div className="code-block2"></div>
                    <CodeBlocks
                        position={true}
                        heading={
                            <div className='heading'>
                                Unlock Your
                                coding potential
                                with our online courses
                            </div>
                        }
                        subheading={
                            "Our courses are designed and taught by industry experts who have years of experience in coding and are passionate about sharing their knowledge with you."
                        }
                        button1={
                            {
                                btnText: "try it yourself",
                                linkto: "/signup",
                                active: true,
                            }
                        }
                        button2={
                            {
                                btnText: "learn more",
                                linkto: "/login",
                                active: false,
                            }
                        }

                        codeblock={`<<!DOCTYPE html>\n<html>\nhead><title>Example</title><linkrel="stylesheet"href="styles.css">\n/head>\n`}
                        codeColor={"yellow"}
                    />
                </div>

                <div className='second-code-block'>
                    <div className="code-block1"></div>

                    <CodeBlocks
                        position={false}
                        heading={
                            <div className='heading'>
                                Start coding in seconds
                            </div>
                        }
                        subheading={
                            "Go ahead, give it a try. Our hands-on learning environment means you'll be writing real code from your very first lesson."
                        }

                        button1={
                            {
                                btnText: "Continue Lesson",
                                linkto: "/signup",
                                active: true,
                            }
                        }
                        button2={
                            {
                                btnText: "learn more",
                                linkto: "/login",
                                active: false,
                            }
                        }

                        codeblock={`<<!DOCTYPE html>\n<html>\nhead><title>Example</title><linkrel="stylesheet"href="styles.css">\n/head>\n`}
                        codeColor={"#1fa2ff"}
                    />
                </div>
                <ExploreMore></ExploreMore>
            </div>
            <div className="section2">
                <div className="ninty-five">
                    <div className="first">
                        <div className="divi" style={{ height: '170px' }}></div>
                        <div className="buttons">
                            <Button active={true} linkto={'/signup'}>
                                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '10px' }}>
                                    Explore Full Catelog
                                    <FaArrowRight />
                                </div>
                            </Button>
                            <Button active={false} linkto={'/signup'}>
                                <div >
                                    Learn more

                                </div>
                            </Button>
                        </div>
                    </div>

                    <div className='second'>
                        <h1 >
                            Get the Skills you need for a
                            Job that is in demand
                        </h1>

                        <div className='buttons-container'>
                            <div className='para'>
                                The modern StudyNotion is the dictates its own terms. Today, to be a competitive specialist requires more than professional skills.
                            </div>
                            <Button active={true} linkto={"/signup"}>
                                <div>
                                    Learn more
                                </div>
                            </Button>
                        </div>

                    </div>
                    <TimelineSection />
                    <LearningLanguageSection />
                </div>

            </div>
            <div className="section3">
                <InstructorSection />
            </div>
            <Footer></Footer>
        </div>
    )
}

export default Home
