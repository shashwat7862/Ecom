import React, { Component } from 'react';
import { Helmet } from 'react-helmet'
import Slider from 'react-slick';
import '../common/index.scss';
import { connect } from "react-redux";

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
import Baseurl from '../../api/url'


class LeftSideBar extends Component {


    constructor() {
        
        super();
        this.state = {
            open: false,
            nav1: null,
            nav2: null,
            defaultImage: "https://www.mnn.com/static/img/not_available.png",
        };
    }



    componentDidMount() {
        this.setState({
            nav1: this.slider1,
            nav2: this.slider2
        });
    }

    filterClick() {
    }
    backClick() {
    }

    

    render() {

        let enc = window.location.href
        var dec = decodeURI(enc).split('/{')

        let product;
        let item;
        for (let val of dec) {
            if (val.length > 50) {
                product = val
            }
        }
        item = JSON.parse("{" + product);




        const { symbol, addToCart, addToCartUnsafe, addToWishlist } = this.props
        // console.log(item,"item")
        var products = {
            slidesToShow: 1,
            slidesToScroll: 1,
            dots: false,
            arrows: true,
            fade: true
        };
        var productsnav = {
            slidesToShow: 3,
            swipeToSlide: true,
            arrows: false,
            dots: false,
            focusOnSelect: true
        };

        return (
            <div>
                {/*SEO Support*/}
                <Helmet>
                    <title>Emart  | {item.productName}</title>
                    <meta name="description" content="Emart Ecommerse" />
                </Helmet>
                {/*SEO Support End */}
                
                <Breadcrumb parent={'Product'} title={item.productName} />

                {/*Section Start*/}
                {(item) ?
                    <section className="section-b-space">
                        <div className="collection-wrapper">
                            <div className="container">
                                <div className="row">

                                    <div className="col-sm-3 collection-filter" id="filter">
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
                                                    <Slider {...products} asNavFor={this.state.nav2} ref={slider => (this.slider1 = slider)} className="product-slick">
                                                        {
                                                            <div >
                                                                <ImageZoom image={(item.productImage != "")? Baseurl+'/'+item.productImage : this.state.defaultImage} />
                                                            </div>

                                                            // item.pictures.map((vari, index) =>
                                                            //     <div key={index}>
                                                            //         <ImageZoom image={(item.productImage) ? item.productImage : this.state.defaultImage} />
                                                            //     </div>
                                                            // )
                                                        }
                                                    </Slider>
                                                    {/* <SmallImages item={item} settings={productsnav} navOne={this.state.nav1} /> */}
                                                </div>
                                                <DetailsWithPrice symbol="₹" item={item} navOne={this.state.nav1} addToCartClicked={addToCart} BuynowClicked={addToCartUnsafe} addToWishlistClicked={addToWishlist} />
                                            </div>
                                        </div>
                                        <DetailsTopTabs item={item} />
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