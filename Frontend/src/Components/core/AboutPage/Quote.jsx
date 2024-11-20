import React from 'react';
import HighlightText from '../HomePage/HighlightText'
import './AboutPage.css';

const Quote = () => {
  return (
    <div className="quote-container">
      We are passionate about revolutionizing the way we learn. Our innovative platform{' '}
      <HighlightText text="combines technology" />
      <span className="quote-highlight"> expertise</span>, and community to create an{' '}
      <span className="quote-highlight"> unparalleled educational experience.</span>
    </div>
  );
};

export default Quote;
