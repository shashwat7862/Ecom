import React, { Component } from 'react';
import ReactImageMagnify from 'react-image-magnify';
export default class ImageZoom extends Component {
  render() {
    const { image } = this.props;
    return (
      // <img src={`${image}`}  className="img-fluid image_zoom_cls-0" />
      <ReactImageMagnify {...{
        smallImage: {
          isFluidWidth: true,
          src: image
        },
        largeImage: {
          src: image,
          width: 1200,
          height: 1800
        },
        style: { zIndex: 100 },
        shouldUsePositiveSpaceLens: true,
        enlargedImageContainerDimensions: {
          width: '150%',
          height: '150%'
        }
      }}
        {...{
          isActivatedOnTouch: true
        }}
        {...{
          enlargedImagePosition: 'beside'
        }}
      />
    );
  }
}