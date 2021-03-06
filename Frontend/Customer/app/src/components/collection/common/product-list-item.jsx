import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import Modal from 'react-responsive-modal';
import Baseurl from '../../../api/url';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

class ProductListItem extends Component {

    constructor(props) {
        super(props);
        const customerDetails = JSON.parse(localStorage.getItem('customerDetails'))

        this.state = {
            open: false,
            stock: 'InStock',
            quantity: 1,
            image: '',
            customerDetails: customerDetails,
            defaultImage: "https://www.mnn.com/static/img/not_available.png",
        }
    }

    onOpenModal = () => {
        this.setState({ open: true });
    };

    onCloseModal = () => {
        this.setState({ open: false });
    };

    onClickHandle(img) {
        this.setState({ image: img });
    }

    addToWishList(productData){
        console.log(productData,"add to cart")
        axios.put(`${Baseurl}/api/v1/customer/WishList/ADD`, {
            "productData": {
                "productId": productData._id,
                "productName": productData.productName,
                "price": productData.price,
                "category": productData.category,
                "productImage":productData.productImage,
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
    }
    addToCart(productData) {
        console.log(productData,"add to cart")
        axios.put(`${Baseurl}/api/v1/customer/Cart/ADD`, {
            "productData": {
                "productId": productData._id,
                "productName": productData.productName,
                "price": productData.price,
                "productCount": this.state.quantity,
                "category": productData.category,
                "productImage":productData.productImage,
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
    }

    

    minusQty = () => {
        if (this.state.quantity > 1) {
            this.setState({ stock: 'InStock' })
            this.setState({ quantity: this.state.quantity - 1 })
        }
    }

    plusQty = () => {
        if (this.props.product.stock >= this.state.quantity) {
            this.setState({ quantity: this.state.quantity + 1 })
        } else {
            this.setState({ stock: 'Out of Stock !' })
        }
    }
    changeQty = (e) => {
        this.setState({ quantity: parseInt(e.target.value) })
    }


    render() {
        const { product,onAddToCartClicked } = this.props;
        console.log("------------child", product);


        const { open } = this.state;

        let RatingStars = []
        for (var i = 0; i < product.rating; i++) {
            RatingStars.push(<i className="fa fa-star" key={i}></i>)
        }

        return (

            <div className="product-box">
                <ToastContainer />
                <div className="img-wrapper">
                    <div className="front">
                        <Link to={`${process.env.PUBLIC_URL}/left-sidebar/product/${JSON.stringify(product)}`} ><img
                            src={(product.productImage != "") ? Baseurl + '/' + product.productImage : this.state.defaultImage}
                            style={{ height: 190 + 'px', width: 180 + 'px' }}
                            className="img-fluid"
                            alt="" /></Link>
                    </div>
                    <div className="cart-info cart-wrap">
                        <button title="Add to cart" onClick={() => this.addToCart(product)}>
                            <i className="fa fa-shopping-cart" aria-hidden="true"></i>
                        </button>
                        <a href="javascript:void(0)" title="Add to Wishlist" onClick={() => this.addToWishList(product)}>
                            <i className="fa fa-heart" aria-hidden="true"></i>
                        </a>
                        <a href="javascript:void(0)" data-toggle="modal"
                            data-target="#quick-view"
                            title="Quick View"
                            onClick={this.onOpenModal}><i className="fa fa-search" aria-hidden="true"></i></a>
                        {/* <Link to={`${process.env.PUBLIC_URL}/compare`} title="Compare" onClick={onAddToCompareClicked}>
                            <i className="fa fa-refresh" aria-hidden="true"></i></Link> */}
                    </div>

                    {product.variants ?
                        <ul className="product-thumb-list">
                            {product.variants.map((vari, i) =>
                                <li className={`grid_thumb_img ${(vari.images === this.state.image) ? 'active' : ''}`} key={i}>
                                    <a href="javascript:void(0)" title="Add to Wishlist">
                                        <img src={`${vari.images}`} onClick={() => this.onClickHandle(vari.images)} />
                                    </a>
                                </li>)
                            }
                        </ul> : ''}

                </div>
                <div className="product-detail">
                    <div>
                        <div className="rating">
                            {RatingStars}
                        </div>
                        <Link to={`${process.env.PUBLIC_URL}/left-sidebar/product/${product.id}`}>
                            <h6>{product.productName}</h6>
                        </Link>
                        <h4>{product.price}₹
                                    <del><span className="money">{product.price}₹</span></del></h4>
                        {/* {product.variants?
                                <ul className="color-variant">
                                    {product.variants.map((vari, i) => {
                                        return (
                                            <li className={vari.color} key={i} title={vari.color} onClick={() => this.onClickHandle(vari.images)}></li>)
                                    })}
                                </ul>:''} */}
                    </div>
                </div>
                <Modal open={open} onClose={this.onCloseModal} center>
                    <div className="modal-dialog modal-lg modal-dialog-centered" role="document">
                        <div className="modal-content quick-view-modal">
                            <div className="modal-body">
                                <div className="row">
                                    <div className="col-lg-6  col-xs-12">
                                        <div className="quick-view-img">
                                            <img src={(product.productImage != "") ? Baseurl + '/' + product.productImage : this.state.defaultImage} alt="" className="img-fluid" />
                                        </div>
                                    </div>
                                    <div className="col-lg-6 rtl-text">
                                        <div className="product-right">
                                            <h2> {product.title} </h2>
                                            <h3>{product.price}₹
                                                        <del><span className="money">{product.price}₹</span></del>
                                            </h3>
                                            {/* {product.variants?
                                                    <ul className="color-variant">
                                                        {product.variants.map((vari, i) =>
                                                            <li className={vari.color} key={i} title={vari.color} onClick={() => this.onClickHandle(vari.images)}></li>)
                                                        }
                                                    </ul>:''} */}
                                            <div className="border-product">
                                                <h6 className="product-title">product details</h6>
                                                <p>{product.shortDetails}</p>
                                            </div>
                                            <div className="product-description border-product">
                                                {product.size ?
                                                    <div className="size-box">
                                                        <ul>
                                                            {product.size.map((size, i) => {
                                                                return <li key={i}><a href="#">{size}</a></li>
                                                            })}
                                                        </ul>
                                                    </div> : ''}
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
                                            <div className="product-buttons">
                                                <button className="btn btn-solid" onClick={() => onAddToCartClicked(product, this.state.quantity)} >add to cart</button>
                                                <Link to={`${process.env.PUBLIC_URL}/left-sidebar/product/${product.id}`} className="btn btn-solid">view detail</Link>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </Modal>
            </div>
        )
    }
}

export default ProductListItem;