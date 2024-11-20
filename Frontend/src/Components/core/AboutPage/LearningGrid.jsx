import React from 'react';
import HighlightText from '../HomePage/HighlightText';
import CTAButton from "../../core/HomePage/Button";
import './AboutPage.css';

const LearningGridArray = [
    {
        order: -1,
        heading: "World-Class Learning for",
        highlightText: "Anyone, Anywhere",
        description:
            "Studynotion partners with more than 275+ leading universities and companies to bring flexible, affordable, job-relevant online learning to individuals and organizations worldwide.",
        BtnText: "Learn More",
        BtnLink: "/",
    },
    {
        order: 1,
        heading: "Curriculum Based on Industry Needs",
        description:
            "Save time and money! The Belajar curriculum is made to be easier to understand and in line with industry needs.",
    },
    {
        order: 2,
        heading: "Our Learning Methods",
        description:
            "Studynotion partners with more than 275+ leading universities and companies to bring",
    },
    {
        order: 3,
        heading: "Certification",
        description:
            "Studynotion partners with more than 275+ leading universities and companies to bring",
    },
    {
        order: 4,
        heading: `Rating "Auto-grading"`,
        description:
            "Studynotion partners with more than 275+ leading universities and companies to bring",
    },
    {
        order: 5,
        heading: "Ready to Work",
        description:
            "Studynotion partners with more than 275+ leading universities and companies to bring",
    },
];

const LearningGrid = () => {
    return (
        <div className="learning-grid-container">
            {LearningGridArray.map((card, index) => (
                <div
                    key={index}
                    className={`learning-card ${
                        index === 0 ? 'span-2' : ''
                    } ${
                        card.order % 2 === 1 ? 'bg-dark' : 'bg-darker'
                    } ${card.order === 3 ? 'start-2' : ''} ${
                        card.order < 0 ? 'transparent' : ''
                    }`}
                >
                    {card.order < 0 ? (
                        <div className="highlight-card">
                            <h1 className="highlight-heading">
                                {card.heading}
                                <HighlightText text={card.highlightText} />
                            </h1>
                            <p className="highlight-description">
                                {card.description}
                            </p>
                            <div className="cta-button">
                                <CTAButton active={true} linkto={card.BtnLink}>
                                    {card.BtnText}
                                </CTAButton>
                            </div>
                        </div>
                    ) : (
                        <div className="standard-card">
                            <h1 className="card-heading">{card.heading}</h1>
                            <p className="card-description">
                                {card.description}
                            </p>
                        </div>
                    )}
                </div>
            ))}
        </div>
    );
};

export default LearningGrid;
