import React, { Component } from 'react';
import Slider from 'react-slick';

// custom arrow
function NextArrow(props) {
  const { className, style, onClick } = props;
  return (
    <div
      className={className}
      style={{ ...style, display: "block", background: "black" }}
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
      slidesToShow: 10,
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
          <div key={index} style={{ backgroundColor: '#ffffff' }}>
            <img src={item.src} style={{ width: '80%', height: 150 + 'px' }} />
            <span style={{ fontWeight: 'bolder', marginLeft: 20 + 'px' }}>{item.name} : {item.price}</span>
          </div>
        ))}
      </Slider>
    )
  }
}