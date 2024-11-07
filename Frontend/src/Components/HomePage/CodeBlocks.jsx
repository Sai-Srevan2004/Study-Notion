import React from 'react';
import Button from './Button';
import { FaArrowRight } from 'react-icons/fa';
import { TypeAnimation } from 'react-type-animation';
import './HomePageComponent.css';

const CodeBlocks = ({
  heading, subheading, button1, button2, codeblock, codeColor,position
}) => {
  return (
    <div className={`code-blocks ${position?'':'position'}`}>
      
      {/* Section 1 */}
      <div className='code-blocks-first-div'>
        <h2>{heading}</h2>
        <p>{subheading}</p>

        <div className='buttons'>
          <Button active={button1.active} linkto={button1.linkto}>
            <div className='button-content'>
              {button1.btnText}
              <FaArrowRight />
            </div>
          </Button>

          <Button active={button2.active} linkto={button2.linkto}>
            {button2.btnText}
          </Button>
        </div>
      </div>

      {/* Section 2 */}

      <div className='code-blocks-second-div'>

        {/* Line Numbers */}
        <div className='code-numbers'>
          {[...Array(11).keys()].map((n) => (
            <p key={n}>{n + 1}</p>
          ))}
        </div>
        {/* Code Animation */}
        <div className='code-animation' style={{color: `${codeColor}`}}>

          <TypeAnimation
            sequence={[codeblock, 2000, ""]}
            repeat={Infinity}
            cursor={true}
            style={{
              whiteSpace: "pre-line",
              display: "block",
              lineHeight: "1.5"
            }}
            omitDeletionAnimation={true}
          />
        </div>
      </div>
    </div>
  );
}

export default CodeBlocks;
