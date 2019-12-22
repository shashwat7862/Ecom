import React, { Component } from 'react';
import Slider from 'react-slick';

// custom arrow
function NextArrow(props) {
  const { className, style, onClick } = props;
  return (
    <div
      className={className}
      style={{ ...style, display: "block", background: "black"  }}
      onClick={onClick}
    />
  );
}

function PrevArrow(props) {
  const { className, style, onClick } = props;
  return (
    <div
      className={className}
      style={{ ...style, display: "block", background: "black" }}
      onClick={onClick}
    />
  );
}

export default class Carousel extends Component {
  render() {
    const defaultSettings = {
      dots: false,
      infinite: true,
      speed: 500,
      slidesToShow: 3,
      slidesToScroll: 1,
      initialSlide: 0,
      nextArrow: <NextArrow />,
      prevArrow: <PrevArrow />
    };
    const { data, settings } = this.props;
    const sliderProps = { ...defaultSettings, ...settings };
    return (
      <Slider {...sliderProps}>
        {data.map((item, index) => (
          <div key={index} style={{backgroundColor: '#ffffff'}}>
            <img src={item.src} style={{width: '80%', height: 150+'px'}} />
          </div>
        ))}
      </Slider>
    )
  }
}