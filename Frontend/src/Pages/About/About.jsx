import React from 'react';
import HighlightText from '../../components/core/HomePage/HighlightText';
import Quote from '../../components/core/AboutPage/Quote';
import StatsComponent from '../../components/core/AboutPage/Stats';
import LearningGrid from '../../components/core/AboutPage/LearningGrid';
import ContactFormSection from '../../components/core/AboutPage/ContactFormSection';
import Footer from '../../Components/Common/Footer';
import './About.css';

const About = () => {
  return (
    <div className="about-container">
      {/* Section 1 */}
      <section className="about-section1">
        <header className="about-header">
          Driving Innovation in Online Education for a{' '}
          <HighlightText text="Brighter Future" />
          <p className="about-paragraph">
            Studynotion is at the forefront of driving innovation in online
            education. We're passionate about creating a brighter future by
            offering cutting-edge courses, leveraging emerging technologies,
            and nurturing a vibrant learning community.
          </p>
        </header>
        <div className="about-banner-images">
          <img src="/path/to/aboutus1.webp" alt="Banner 1" />
          <img src="/path/to/aboutus2.webp" alt="Banner 2" />
          <img src="/path/to/aboutus3.webp" alt="Banner 3" />
        </div>
      </section>

      {/* Section 2 */}
      <section className="about-section2">
        <Quote />
      </section>

      {/* Section 3 */}
      <section className="about-section3">
        <div className="founding-story">
          {/* Founding Story */}
          <div className="founding-story-left">
            <h1>Our Founding Story</h1>
            <p>
              Our e-learning platform was born out of a shared vision and
              passion for transforming education. It all began with a group of
              educators, technologists, and lifelong learners who recognized the
              need for accessible, flexible, and high-quality learning
              opportunities in a rapidly evolving digital world.
            </p>
            <p>
              As experienced educators ourselves, we witnessed firsthand the
              limitations and challenges of traditional education systems. We
              believed that education should not be confined to the walls of a
              classroom or restricted by geographical boundaries. We envisioned
              a platform that could bridge these gaps and empower individuals
              from all walks of life to unlock their full potential.
            </p>
          </div>
          <div className="founding-story-right">
            <img src="/path/to/FoundingStory.png" alt="Founding Story" />
          </div>
        </div>

        {/* Vision and Mission */}
        <div className="vision-mission">
          <div className="vision">
            <h1>Our Vision</h1>
            <p>
              With this vision in mind, we set out on a journey to create an
              e-learning platform that would revolutionize the way people
              learn. Our team of dedicated experts worked tirelessly to develop
              a robust and intuitive platform that combines cutting-edge
              technology with engaging content, fostering a dynamic and
              interactive learning experience.
            </p>
          </div>
          <div className="mission">
            <h1>Our Mission</h1>
            <p>
              Our mission goes beyond just delivering courses online. We wanted
              to create a vibrant community of learners, where individuals can
              connect, collaborate, and learn from one another. We believe that
              knowledge thrives in an environment of sharing and dialogue, and
              we foster this spirit of collaboration through forums, live
              sessions, and networking opportunities.
            </p>
          </div>
        </div>
      </section>

      {/* Section 4 */}
      <StatsComponent />

      {/* Section 5 */}
      <section className="about-section5">
        <LearningGrid />
        <ContactFormSection />
      </section>

      {/* Section 6 */}
      <section className="about-reviews">
        Reviews from other learners
        {/* <ReviewSlider /> */}
      </section>

      <Footer />
    </div>
  );
};

export default About;
