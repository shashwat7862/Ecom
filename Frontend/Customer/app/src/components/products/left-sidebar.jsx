import React, { Component } from 'react';
import { connect } from "react-redux";
import { Helmet } from 'react-helmet';
import _isEmpty from 'lodash/isEmpty';
import '../common/index.scss';
import { Link } from 'react-router-dom';

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
const ImgData = [
  
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
      compareCheck:false,
      compareListCount:0
    };
  }



  componentDidMount() {
    this.setState({
      nav1: this.slider1,
      nav2: this.slider2
    });
    const enc = window.location.href;
    // const enc = "http://weshopcustomer.s3-website.ap-south-1.amazonaws.com/left-sidebar/product/%7B%22_id%22:%225df7d14a16dc81d866a180af%22,%22deletedAt%22:null,%22deleted%22:false,%22createdAt%22:%222019-12-16T18:47:38.879Z%22,%22updatedAt%22:%222019-12-16T18:47:38.879Z%22,%22productDescription%22:%22360&deg;%20Degree%20Vision%20Means%20Full%20Home%20Protection/n/nThe%20dual%20motor-head%20design%20enables%20the%20camera%20to%20rotate%20and%20capture%20a%20full%20360&deg;%20horizontal%20view%20and%2096&deg;%20vertical%20view.%20The%20camera&rsquo;s%20shockproof%20design%20and%20quiet%20motor%20allow%20the%20rotation%20to%20remain%20smooth%20and%20silent./n%22,%22title%22:%22Mi%20MJSXJ02CM%20360%C2%B0%201080P%20WiFi%20Home%20Security%20Camera%20(White)%22,%22vendorId%22:%7B%22_id%22:%225df614414ef84b4c2926139e%22,%22deletedAt%22:null,%22deleted%22:false,%22createdAt%22:%222019-12-15T11:08:49.647Z%22,%22updatedAt%22:%222019-12-15T11:08:49.647Z%22,%22email%22:%22shashwat.company@gmail.com%22,%22mobile%22:8920832260,%22isApproved%22:false,%22role%22:%22ROLE_VENDOR%22,%22loginFrom%22:%22email%22,%22Pan_number%22:%22%22,%22GST_number%22:%22%22,%22account_no%22:null,%22pincode%22:null,%22DOB%22:%22%22,%22Gender%22:%22%22,%22fullName%22:%22shashwat%22,%22__v%22:0,%22isAccountActive%22:true,%22isAccountLocked%22:false,%22IFSC%22:%22%22,%22address%22:%22%22,%22business_category%22:%22%22,%22business_name%22:%22%22,%22salt%22:%226ec494d4-19f2-4204-bcc2-b4d1a54ce119%22,%22password%22:%22e8b798665198898ab223215dc9d8687b1d7f0eea%22,%22city%22:%22%22,%22country%22:%22%22,%22state%22:%22%22,%22VendorImage%22:%22%22%7D,%22isDeleted%22:false,%22isApproved%22:true,%22isAvailable%22:true,%22price%22:2699,%22attributes%22:%7B%22Material_type%22:%22Plastic%22,%22size%22:%22360*%22,%22color%22:%22white%22%7D,%22brandName%22:%22MI%22,%22modelNo%22:%22MJSXJ02CL%22,%22productImage%22:%221576521986868.jpg%22,%22productName%22:%22Camera%22,%22subCategory%22:%22electronics%22,%22category%22:%22electronics%22%7D"
    const dec = decodeURI(enc).split('/{');
    let productDetails = {};
    for (let val of dec) {
      if (val.length > 100) {
        productDetails = JSON.parse("{" + val);
      }
    }
    this.setState({ productDetails });
    this.chooseCurrentImage(productDetails.productImage);

    

    var compareList = JSON.parse(localStorage.getItem("comapareList")) || [];
    
    for(let i=0; i<compareList.length;i++){
     if(compareList[i]._id == productDetails._id){
       this.setState({compareCheck:true});
       break;
     }
    }

    this.setState({compareListCount:compareList.length});

    this.chooseCurrentImage(ImgData);
  }

  chooseCurrentImage(item) {
    if (item) {
      if (item instanceof Array ) {
        console.log('in if')
        //this.setState({ currentImage: item[0].src})
      } else if(item != "") {
        console.log('in else part')
        this.setState({ currentImage: Baseurl+'/'+item})
      }
    } else {
      // do nothing
    }
  }

  handleCompareCheck=(e)=>{
     const isCheck = e.target.checked;
     var compareList = JSON.parse(localStorage.getItem("comapareList")) || [];
     if(isCheck){
        if(compareList.length <= 4){
          compareList.push(this.state.productDetails); 
          localStorage.setItem("comapareList",JSON.stringify(compareList));
          this.setState({compareListCount:compareList.length});
        }
     }else{
      if(compareList.length > 0){
        compareList = compareList.filter(item => item._id != this.state.productDetails._id); 
        localStorage.setItem("comapareList",JSON.stringify(compareList));
        this.setState({compareListCount:compareList.length});
      }
     }
  }

  clearCompare=()=>{
    localStorage.setItem("compareList",JSON.stringify([]))
  }

  filterClick() {}

  backClick() {}

  renderLeftSide = (productImage = '') => { 
    return (
      <ul style={{ display: 'flex', flexDirection: 'column'}}>
        {productImage instanceof Array ?
          (ImgData.map((img) => (
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
    const { symbol, addToCart, addToCartUnsafe, addToWishlist } = this.props;
    const { currentImage, productDetails, hoverImage } = this.state;

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
          <section className="section-b-space product-detail-page">

          <div className="add-to-comapre">
            <div> <input defaultChecked={this.state.compareCheck} onChange={this.handleCompareCheck} type="checkbox"/> Add to Compare</div>
            <div> <a className="clearCompare" onClick={this.clearCompare}> &#10005; Clear Compare</a> </div>
          </div>

          {this.state.compareListCount == 1 && 
            <div className="compare-cart">
            <a className="btn btn-solid compare-cart-btn">Compare {this.state.compareListCount}</a>
            </div>
          }

          
         {this.state.compareListCount > 1 &&
            <div className="compare-cart">
             <Link className="btn btn-solid compare-cart-btn" to={`${process.env.PUBLIC_URL}/compare`}>Compare {this.state.compareListCount}</Link>
             </div>
        }

      
          }


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
                          <ImageZoom image={(hoverImage) ? hoverImage: currentImage} />
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