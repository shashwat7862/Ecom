import React, {Component} from 'react';
import { connect } from 'react-redux'
import {Link} from 'react-router-dom'
import Slider from 'react-slick';

import Breadcrumb from '../common/breadcrumb';
import {removeFromCompare, addToCart} from '../../actions';
import Baseurl from '../../api/url';

class Compare extends Component {

    changeQty = (e) => {
        this.setState({ quantity: parseInt(e.target.value) })
    }

    render (){
        var settings = {
            infinite: false,
            speed: 300,
            slidesToShow: 4,
            slidesToScroll: 1,
            // autoplay: true,
            // autoplaySpeed: 3000,
            responsive: [
                {
                    breakpoint: 1200,
                    settings: {
                        slidesToShow: 3,
                        slidesToScroll: 3
                    }
                },
                {
                    breakpoint: 991,
                    settings: {
                        slidesToShow: 2,
                        slidesToScroll: 2
                    }
                },
                {
                    breakpoint: 586,
                    settings: {
                        slidesToShow: 1,
                        slidesToScroll: 1
                    }
                }
            ]
        }

        const {Items, symbol, addToCart, removeFromCompare} = this.props;
        var compareList = JSON.parse(localStorage.getItem("comapareList")) || [];
        console.log("comparelist", compareList);

    

        return (
            <div>
                <Breadcrumb title={'Compare'} />
                {compareList.length>0 &&
                <section className="compare-section section-b-space">
                    <div className="container">
                        <div className="row">
                            <div className="col-12">
                                <Slider {...settings} className="slide-4">
                                    {compareList.map((item,index) =>
                                        <div key={index}>
                                            <div className="compare-part">
                                                <button type="button" className="close-btn">
                                                    <span aria-hidden="true">×</span>
                                                </button>
                                                <div className="img-secton">
                                                    <Link to={`${process.env.PUBLIC_URL}/left-sidebar/product/${item.id}`}>
                                                    <img height="280px" src={Baseurl+'/'+item.productImage}/> 
                                                    <h5>{item.productName}</h5></Link>
                                                    <h5>{symbol}{(item.price)}
                                                        {/* <del><span className="money">{symbol}{item.price}</span></del> */}
                                                    </h5>
                                                </div>
                                                
                                                <div className="detail-part">
                                                    <div className="title-detail">
                                                        <h5>Brand Name</h5>
                                                    </div>
                                                    <div className="inner-detail">
                                                        <p>{item.brandName}</p>
                                                    </div>
                                                </div>
                                                <div className="detail-part">
                                                    <div className="title-detail">
                                                        <h5>Model No.</h5>
                                                    </div>
                                                    <div className="inner-detail">
                                                        <p>{item.modelNo}</p>
                                                    </div>
                                                </div>
                                                <div className="detail-part">
                                                    <div className="title-detail">
                                                        <h5>Category</h5>
                                                    </div>
                                                    <div className="inner-detail">
                                                        <p>{item.category}</p>
                                                    </div>
                                                </div>
                                                <div className="detail-part">
                                                    <div className="title-detail">
                                                        <h5>Attributes</h5>
                                                    </div>
                                                    <div className="inner-detail">
                                                        <p>Color - {item.attributes.color} </p>
                                                        <p>Size - {item.attributes.size} </p>
                                                        <p>Material - {item.attributes.Material_type} </p>
                                                    </div>
                                                </div>

                                                <div className="detail-part">
                                                    <div className="title-detail">
                                                        <h5>discription</h5>
                                                    </div>
                                                    <div className="inner-detail">
                                                        <p>{item.productDescription}</p>
                                                    </div>
                                                </div>
                                                <div className="btn-part">
                                                    <a href="javascript:void(0)" className="btn btn-solid" onClick={() => addToCart(item, 1)}>add to cart</a>
                                                </div>
                                            </div>
                                        </div>
                                    )}
                                </Slider>
                            </div>
                        </div>
                    </div>
                </section>
    }    
            
            {compareList.length === 0 &&
                 <section className="cart-section section-b-space">
                    <div className="container">
                        <div className="row">
                             <div className="col-sm-12">
                                 <div >
                                     <div className="col-sm-12 empty-cart-cls text-center">
                                         <img src={`${process.env.PUBLIC_URL}/assets/images/empty-compare.png`} className="img-fluid mb-4" alt="" />
                                         <h3>
                                             <strong>Compare List is Empty</strong>
                                         </h3>
                                         <h4>Explore more shortlist some items.</h4>
                                     </div>
                                 </div>
                             </div>
                         </div>
                     </div>
                 </section>
                 }
                
            </div>
        )
    }
}
const mapStateToProps = (state) => ({
    Items: state.compare.items,
    symbol: state.data.symbol,
})

export default connect(
    mapStateToProps,
    {removeFromCompare, addToCart}
)(Compare)