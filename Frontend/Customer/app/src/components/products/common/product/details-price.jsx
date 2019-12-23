import React, { Component } from 'react';
import { Link } from 'react-router-dom'
import Slider from 'react-slick';
import Modal from 'react-responsive-modal';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Baseurl from '../../../../api/url';
class DetailsWithPrice extends Component {
    constructor(props) {
        const customerDetails = JSON.parse(localStorage.getItem('customerDetails'))
        super(props)
        this.state = {
            open: false,
            quantity: 1,
            stock: 'InStock',
            nav3: null,
            customerDetails: customerDetails,
            defaultImage: "https://www.mnn.com/static/img/not_available.png",
        }
    }

    // constructor(props) {
    //     const customerDetails = JSON.parse(localStorage.getItem('customerDetails'))
    //     super(props)
    //     this.state = {
    //         open: false,
    //         quantity: 1,
    //         stock: 'InStock',
    //         nav3: null,
    //         customerDetails: customerDetails,
    //         defaultImage: "https://www.mnn.com/static/img/not_available.png",
    //     }
    //     // console.log(this.state.customerDetails._id,"customerDetails")
    // }

    onOpenModal = () => {
        this.setState({ open: true });
    };

    onCloseModal = () => {
        this.setState({ open: false });
    };

    onCloseModal = () => {
        this.setState({ open: false });
    };

    minusQty = () => {
        if (this.state.quantity > 1) {
            this.setState({ stock: 'InStock' })
            this.setState({ quantity: this.state.quantity - 1 })
        }
    }

    plusQty = () => {
        this.setState({ quantity: this.state.quantity + 1 })
    }
    changeQty = (e) => {
        this.setState({ quantity: parseInt(e.target.value) })
    }

    buyNow = (product) => {
        // alert("buyNow");
        console.log("prodyct buy now",product)
        this.props.history.push(`${process.env.PUBLIC_URL}/checkout/${JSON.stringify(product)}`);
    }

    addToWishList = (productData) => {
        console.log(productData, "add to cart")
        if (this.state.customerDetails) {
            axios.put(`${Baseurl}/api/v1/customer/WishList/ADD`, {
                "productData": {
                    "productId": productData._id,
                    "productName": productData.productName,
                    "price": productData.price,
                    "category": productData.category,
                    "productImage": productData.productImage,
                    "VendorId": productData.vendorId._id,
                    "VendorName": productData.vendorId.fullName,
                },
                "userId": this.state.customerDetails._id
            })
                .then(response => {
                    toast.success("Product Added to WishList")
                    console.log(response, "data")
                })
                .catch(error => {
                    console.log(error);
                });
        } else {
            let guestCart = [];
            let payload = {
                "productData": {
                    "productId": productData._id,
                    "productName": productData.productName,
                    "price": productData.price,
                    "category": productData.category,
                    "productImage": productData.productImage,
                    "VendorId": productData.vendorId._id,
                    "VendorName": productData.vendorId.fullName,
                },
                "userId": this.state.customerDetails._id
            }
            guestCart.payload = payload;
            localStorage.setItem('GuestCart', JSON.stringify(guestCart))
        }
    }
    addToCart = (productData) => {
        console.log(productData, "add to cart")

        if (this.state.customerDetails) {
            axios.put(`${Baseurl}/api/v1/customer/Cart/ADD`, {
                "productData": {
                    "productId": productData._id,
                    "productName": productData.productName,
                    "price": productData.price,
                    "productCount": this.state.quantity,
                    "category": productData.category,
                    "productImage": productData.productImage,
                    "VendorId": productData.vendorId._id,
                    "VendorName": productData.vendorId.fullName,
                },
                "userId": this.state.customerDetails._id
            })
                .then(response => {
                    toast.success("Product Add to Cart")
                    console.log(response, "data")
                })
                .catch(error => {
                    console.log(error);
                });
        } else {
            let guestCart = [];
            let payload = {
                "productId": productData._id,
                "productName": productData.productName,
                "price": productData.price,
                "productCount": this.state.quantity,
                "category": productData.category,
                "productImage": productData.productImage,
                "VendorId": productData.vendorId._id,
                "VendorName": productData.vendorId.fullName,
                "userId": 'Guest'
            }


            let loadCart = (localStorage.getItem('GuestCart')) ? JSON.parse(localStorage.getItem('GuestCart')) : []

            var isCartUpdated = false;
            if (loadCart.length > 0) {
                loadCart.forEach(function (product) {
                    if (product.productId == payload.productId) {
                        product.productCount = product.productCount + payload.productCount;
                        isCartUpdated = true
                    }
                })
            }

            if (!isCartUpdated) {
                loadCart.push(payload);
            }

            localStorage.setItem('GuestCart', JSON.stringify(loadCart));
            toast.success("Product Add to Cart")
        }
    }

    render() {
        const { symbol, item } = this.props

        var colorsnav = {
            slidesToShow: 6,
            swipeToSlide: true,
            arrows: false,
            dots: false,
            focusOnSelect: true
        };

        return (

            <div className="col-lg-6 rtl-text">

                <ToastContainer />
                <div className="product-right">
                    <h2> {item.productName} </h2>
                    <h4>
                        <del>{symbol}{item.price}</del>
                        <span>{item.discount}% off</span></h4>
                    <h3>{symbol}{item.price} </h3>
                    {/* {item.variants?
                    <ul >
                        <Slider {...colorsnav} asNavFor={this.props.navOne} ref={slider => (this.slider1 = slider)} className="color-variant">
                            {item.variants.map((vari, i) => {
                                return <li className={vari.color} key={i} title={vari.color}></li>
                            })}
                        </Slider>
                    </ul>:''} */}
                    <div className="product-description border-product">
                        {item.attributes.size ?
                            <div>
                                <h6 className="product-title size-text">select size
                                    <span><a data-toggle="modal"
                                        data-target="#sizemodal" onClick={this.onOpenModal} >size chart</a></span></h6>
                                <div className="modal fade" id="sizemodal" tabIndex="-1"
                                    role="dialog" aria-labelledby="exampleModalLabel"
                                    aria-hidden="true">
                                    <div className="modal-dialog modal-dialog-centered"
                                        role="document">
                                        <div className="modal-content">
                                            <div className="modal-header">
                                                <h5 className="modal-title"
                                                    id="exampleModalLabel"></h5>
                                                <button type="button" className="close"
                                                    data-dismiss="modal" aria-label="Close">
                                                    <span aria-hidden="true">&times;</span>
                                                </button>
                                            </div>
                                            <div className="modal-body">
                                                <img src={`${process.env.PUBLIC_URL}/assets/images/size-chart.jpg`} alt="" className="img-fluid" />
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="size-box">
                                    <ul>
                                        {/* {item.size.map((size, i) => {
                                    return <li key={i}><a href="#">{size}</a></li>
                                })} */}
                                    </ul>
                                </div>
                            </div> : ''}
                        <span className="instock-cls">{this.state.stock}</span>
                        <h6 className="product-title">quantity</h6>
                        <div className="qty-box">
                            <div className="input-group">
                                <span className="input-group-prepend">
                                    <button type="button" className="btn quantity-left-minus" onClick={this.minusQty} data-type="minus" data-field="">
                                        <i className="fa fa-angle-left"></i>
                                    </button>
                                </span>
                                <input type="text" name="quantity" value={this.state.quantity} onChange={this.changeQty} className="form-control input-number" />
                                <span className="input-group-prepend">
                                    <button type="button" className="btn quantity-right-plus" onClick={this.plusQty} data-type="plus" data-field="">
                                        <i className="fa fa-angle-right"></i>
                                    </button>
                                </span>
                            </div>
                        </div>
                    </div>
                    <div className="product-buttons" >
                        <a className="btn btn-solid" onClick={() => this.addToCart(item)}>add to cart</a>
                        {/* <a className="btn btn-solid" onClick={() => this.buyNow(item)}>add to cart</a> */}
                    </div>
                    <div className="border-product">
                        <h6 className="product-title">Product Details</h6>
                        <p>{item.shortDetails}</p>
                    </div>
                    <div className="border-product">
                        <h6 className="product-title">share it</h6>
                        <div className="product-icon">
                            <ul className="product-social">
                                <li><a href="https://www.facebook.com/" target="_blank"><i className="fa fa-facebook"></i></a></li>
                                <li><a href="https://plus.google.com/discover" target="_blank"><i className="fa fa-google-plus"></i></a></li>
                                <li><a href="https://twitter.com/" target="_blank"><i className="fa fa-twitter"></i></a></li>
                                <li><a href="https://www.instagram.com/" target="_blank"><i className="fa fa-instagram"></i></a></li>
                            </ul>
                            {(this.state.customerDetails)?
                             <button className="wishlist-btn" onClick={() => this.addToWishList(item)}><i
                             className="fa fa-heart"></i><span
                                 className="title-font">Add To WishList</span>
                         </button> : null
                        }
                           
                        </div>
                    </div>
                    <div className="border-product">
                        <h6 className="product-title">Time Reminder</h6>
                        <div className="timer">
                            <p id="demo">
                                <span>25
                                    <span className="padding-l">:</span>
                                    <span className="timer-cal">Days</span>
                                </span>
                                <span>22
                                    <span className="padding-l">:</span>
                                    <span className="timer-cal">Hrs</span>
                                </span>
                                <span>13
                                    <span className="padding-l">:</span>
                                    <span className="timer-cal">Min</span>
                                </span>
                                <span>57
                                    <span className="timer-cal">Sec</span>
                                </span>
                            </p>
                        </div>
                    </div>
                </div>
                <Modal open={this.state.open} onClose={this.onCloseModal} center>
                    <div className="modal-dialog modal-dialog-centered" role="document">
                        <div className="modal-content">
                            <div className="modal-header">
                                <h5 className="modal-title" id="exampleModalLabel">Size chart</h5>
                            </div>
                            <div className="modal-body">
                                <img src={`${process.env.PUBLIC_URL}/assets/images/size-chart.jpg`} alt="" className="img-fluid" />
                            </div>
                        </div>
                    </div>
                </Modal>
            </div>
        )
    }
}


export default DetailsWithPrice;