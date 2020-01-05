import React from 'react';
import { Slide } from 'react-slideshow-image';

const slideImages = [
  '/assets/images/slider/slide1.jpg',
  '/assets/images/slider/slide2.jpg',
  '/assets/images/slider/slide3.jpg',
  '/assets/images/slider/slide4.jpg',
  '/assets/images/slider/slide5.jpg',
  '/assets/images/slider/slide6.jpg',
];

const properties = {
  duration: 2000,
  transitionDuration: 500,
  infinite: true,
  indicators: true,
  arrows: true,
  onChange: (oldIndex, newIndex) => {
    console.log(`slide transition from ${oldIndex} to ${newIndex}`);
  }
}

const Slideshow = () => {
    return (
      <div className="slide-container" style={{marginTop:-34+'px'}}>
        <Slide {...properties}>
          <div className="each-slide">
            <div style={{'backgroundImage': `url(${slideImages[0]})`}}>
              
            </div>
          </div>
          <div className="each-slide">
            <div style={{'backgroundImage': `url(${slideImages[1]})`}}>
             
            </div>
          </div>
          <div className="each-slide">
            <div style={{'backgroundImage': `url(${slideImages[2]})`}}>
              
            </div>
            </div>
            <div className="each-slide">
            <div style={{'backgroundImage': `url(${slideImages[3]})`}}>
              
            </div>
            </div>
            <div className="each-slide">
            <div style={{'backgroundImage': `url(${slideImages[4]})`}}>
              
              </div>
              </div>
              <div className="each-slide">
              <div style={{'backgroundImage': `url(${slideImages[5]})`}}>
              
              </div>
          </div>
        </Slide>
      </div>
    )
}
export default Slideshow;