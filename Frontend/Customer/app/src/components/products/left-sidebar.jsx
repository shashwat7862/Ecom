import React, { Component } from 'react';
import { connect } from "react-redux";
import { Helmet } from 'react-helmet';
import _isEmpty from 'lodash/isEmpty';
import '../common/index.scss';

// import custom Components
import Service from "./common/service";
import BrandBlock from "./common/brand-block";
import NewProduct from "../common/new-product";
import Breadcrumb from "../common/breadcrumb";
import DetailsWithPrice from "./common/product/details-price";
import DetailsTopTabs from "./common/details-top-tabs";
// import { addToCart, addToCartUnsafe, addToWishlist } from '../../actions'
import ImageZoom from './common/product/image-zoom'
import SmallImages from './common/product/small-image'
import Baseurl from '../../api/url';
import GalleryModal from './GalleryModal';
const ImgData = [
  {
    title: 'img1',
    src: "https://mir-s3-cdn-cf.behance.net/project_modules/1400_opt_1/3302d289479263.5df64624e47db.jpg"
  },
  {
    title: 'img2',
    src: "https://mir-s3-cdn-cf.behance.net/project_modules/1400_opt_1/8791f289479263.5df64624e5594.jpg"
  },
  {
    title: 'img3',
    src: "https://mir-s3-cdn-cf.behance.net/project_modules/max_1200/918f0289479263.5df64624e4ecf.jpg"
  },
  {
    title: 'img4',
    src: "https://mir-s3-cdn-cf.behance.net/project_modules/1400_opt_1/01a16289479263.5df64624e5c7c.jpg"
  }
]
class LeftSideBar extends Component {
  constructor() {
    super();
    this.state = {
      open: false,
      nav1: null,
      nav2: null,
      defaultImage: "https://www.mnn.com/static/img/not_available.png",
      currentImage: "https://www.mnn.com/static/img/not_available.png",
      productDetails: {},
      hoverImage: null,
      galleryModal: false
    };
    this.handleModal = this.handleModal.bind(this);
  }

  componentDidMount() {
    this.setState({
      nav1: this.slider1,
      nav2: this.slider2
    });
    const enc = window.location.href;
    const dec = decodeURI(enc).split('/{');
    let productDetails = {};
    for (let val of dec) {
      if (val.length > 50) {
        productDetails = JSON.parse("{" + val);
      }
    }
    this.setState({ productDetails });
    this.chooseCurrentImage(productDetails.productImage);
    // this.chooseCurrentImage(ImgData);
  }

  chooseCurrentImage(item) {
    if (item) {
      if (item instanceof Array ) {
        console.log('in if')
        this.setState({ currentImage: item[0].src})
      } else if(item != "") {
        console.log('in else part')
        this.setState({ currentImage: Baseurl+'/'+item})
      }
    } else {
      // do nothing
    }
  }

  filterClick() {}

  backClick() {}

  renderLeftSide = (productImage = '') => { 
    return (
      <ul style={{ display: 'flex', flexDirection: 'column'}}>
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

  handleModal(status) {
    this.setState({ galleryModal: status })
  }

  checkImageType(url) {
    let extension = url.split('.').pop();
    console.log('extension &&&&&&&&&', extension)
    if (extension.match('(jpg|jpeg|png|gif)')) {
      return 'image'
    } else if(extension.match('(mp4|3gp|mp3|mov)')) {
      return 'video'
    } else {
      return ""
    }
  }

  render() {
    const { symbol, addToCart, addToCartUnsafe, addToWishlist } = this.props;
    const { currentImage, productDetails, hoverImage, galleryModal } = this.state;
    this.checkImageType(currentImage)
    return (
      <div>
        {/*SEO Support*/}
        <Helmet>
          {/* <title>Emart  | {productDetails.productName}</title> */}
          <title>{(!_isEmpty(productDetails) ? productDetails.productName : 'Emart')}</title>
          <meta name="description" content="Emart Ecommerse" />
        </Helmet>
        {/*SEO Support End */}

        <Breadcrumb parent={'Product'} title={!(_isEmpty(productDetails) ? productDetails.productName : 'Emart')} />

        {/*Section Start*/}
        {!(_isEmpty(productDetails)) ?
          <section className="section-b-space">
            <div className="collection-wrapper">
              <div className="container">
                <div className="row">
                  
                  <div className="col-sm-2 collection-filter" id="filter">
                    <div className="collection-mobile-back pl-5">
                      <span onClick={this.backClick} className="filter-back">
                        <i className="fa fa-angle-left" aria-hidden="true"></i> back
                      </span>
                    </div>
                    <BrandBlock />
                    <Service />
                    {/*side-bar single product slider start*/}
                    {/* <NewProduct/> */}
                    {/*side-bar single product slider end*/}
                  </div>
                  <div className="col-sm-1">{this.renderLeftSide(productDetails.productImage)}</div>
                  {/* <div className="col-sm-1">{this.renderLeftSide(ImgData)}</div> */}
                  <div className="col-lg-9 col-sm-12 col-xs-12">
                    <div className="">
                      <div className="row">
                        <div className="col-xl-12">
                          <div className="filter-main-btn mb-2">
                            <span onClick={this.filterClick} className="filter-btn" >
                              <i className="fa fa-filter" aria-hidden="true"></i> filter</span>
                          </div>
                        </div>
                      </div>
                      <div className="row">
                        <div className="col-lg-6 product-thumbnail">
                          {/* <ImageZoom image={(item.productImage != "")? Baseurl+'/'+item.productImage : this.state.defaultImage} /> */}
                          <div onClick={() => this.handleModal(true)}><ImageZoom image={(hoverImage) ? hoverImage: currentImage} /></div>
                        </div>
                        <DetailsWithPrice
                          symbol="₹"
                          item={productDetails}
                          navOne={this.state.nav1}
                          addToCartClicked={addToCart}
                          BuynowClicked={addToCartUnsafe}
                          addToWishlistClicked={addToWishlist}
                        />
                      </div>
                    </div>
                    <DetailsTopTabs item={productDetails} />
                    <GalleryModal open={galleryModal} handleModal={this.handleModal} currentImage={currentImage} defaultIndex={this.checkImageType(currentImage) === 'image' ? 1 : 0} imgData={ImgData} />
                  </div>
                </div>
              </div>
            </div>
          </section> : ''}
        {/*Section End*/}
      </div>
    )
  }
}

const mapStateToProps = (state, ownProps) => {
  let productId = ownProps.match.params.id;
  return {
    item: state.data.products.find(el => el.id == productId),
    symbol: state.data.symbol
  }
}

export default connect(mapStateToProps, null)(LeftSideBar);