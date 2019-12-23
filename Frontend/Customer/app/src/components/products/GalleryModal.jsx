import React, { Component } from 'react';
import Modal from 'react-responsive-modal';
import ReactImageMagnify from 'react-image-magnify';
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import 'react-tabs/style/react-tabs.css';
import Baseurl from '../../api/url';

export default class GalleryModal extends Component {

  renderLeftSide = (productImage = '') => { 
    return (
      <ul style={{ display: 'flex', flexDirection: 'row'}}>
        {productImage instanceof Array ?
          (productImage.map((img) => (
            <li>
              <img 
                src={img.src} 
                alt={img.title} 
                style={{width: 38, height: 50}}
                onMouseOver={() => this.setState({hoverImage: img.src})}
                onMouseOut={() => this.setState({hoverImage: null})}
                onClick={() => this.setState({currentImage: img.src})}
              />
            </li>
          ))) : (productImage !== '') ?
          <li>
            <img 
              src={Baseurl+'/'+productImage} 
              alt={'product-image'} 
              style={{width: 38, height: 50}}
              onMouseOver={() => this.setState({hoverImage: Baseurl+'/'+productImage})}
              onMouseOut={() => this.setState({hoverImage: null})}
              onClick={() => this.setState({currentImage: Baseurl+'/'+productImage})}
            />
          </li> : null
        }
      </ul>
    );
  }

  render() {
    const { open, handleModal, currentImage, defaultIndex, imgData } = this.props;
    return (
      <Modal open={open}  onClose={() => handleModal(false)} center styles={{modal: {
        maxWidth: 1920,
        minWidth: '90vw',
        maxHeight: '90vh'
      }}}>
        <Tabs defaultIndex={defaultIndex}>
          <TabList>
            <Tab>RELATED VIDEOS</Tab>
            <Tab>IMAGES</Tab>
          </TabList>
      
          <TabPanel style={{ display: 'table', margin: 'auto' }}>
            <div className="col-12" style={{ display: 'flex', flexDirection: 'row' }}>
              <div className="col-9">
                <ReactImageMagnify {...{
                  smallImage: {
                    isFluidWidth: true,
                    src: currentImage,
                  },
                  largeImage: {
                    src: currentImage,
                    width: 700,
                    height: 700
                  },
                  style: { zIndex: 100 },
                  shouldUsePositiveSpaceLens: true,
                  imageStyle: {...{maxHeight: 750, objectFit: 'contain'}}
                  }}
                  {...{
                    isActivatedOnTouch: true
                  }}
                  {...{
                    enlargedImagePosition: 'over'
                  }}
                />
              </div>
              <div className="col-3"></div>
            </div>
          </TabPanel>
          <TabPanel style={{ display: 'table', margin: 'auto' }}>
            <div className="col-12" style={{ display: 'flex', flexDirection: 'row' }}>
              <div className="col-9">
                <ReactImageMagnify {...{
                  smallImage: {
                    isFluidWidth: true,
                    src: currentImage,
                  },
                  largeImage: {
                    src: currentImage,
                    width: 700,
                    height: 700
                  },
                  style: { zIndex: 100 },
                  shouldUsePositiveSpaceLens: true,
                  imageStyle: {...{maxHeight: 750, objectFit: 'contain'}}
                }}
                  {...{
                    isActivatedOnTouch: true
                  }}
                  {...{
                    enlargedImagePosition: 'over',
                  }}
                />
              </div>
              <div className="col-3">
                <p>Samsung Galaxy M30s (Blue, 4GB RAM, Super AMOLED Display, 64GB Storage, 6000mAH Battery)</p>
                {this.renderLeftSide(imgData)}
              </div>
            </div>
          </TabPanel>
        </Tabs>
      </Modal>
    )
  }
}