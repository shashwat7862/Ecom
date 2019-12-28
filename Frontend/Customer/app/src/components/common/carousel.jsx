import React, { Component } from 'react';
import Slider from 'react-slick';

// custom arrow
function NextArrow(props) {
  const { className, style, onClick } = props;
  return (
    <div
      className={className}
      // style={{ ...style, display: "block", background: "red" }}
      style={{ background: "black", zIndex:1, right: 0,borderRadius: '0 3px 3px 0', clip:'rect(-10px,55px,110px,0)', paddingRight: 5, height: 100, lineHeight: 100, width: 45, textAlign: 'center',boxShadow: '0 1px 3px #888', display: 'flex', justifyContent: 'center', flexDirection: 'column' }}
      onClick={onClick}
    />
  );
}

function PrevArrow(props) {
  const { className, style, onClick } = props;
  console.log(className, style)
  return (
    <div
      className={className}
      style={{ background: "black", zIndex:1, left: 0,borderRadius: '0 3px 3px 0', clip:'rect(-10px,55px,110px,0)', paddingRight: 5, height: 100, lineHeight: 100, width: 45, textAlign: 'center',boxShadow: '0 1px 3px #888', display: 'flex', justifyContent: 'center', flexDirection: 'column' }}
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