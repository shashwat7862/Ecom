import React, { Component } from 'react';
import { Helmet } from 'react-helmet'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import axios from 'axios';
import Breadcrumb from "../common/breadcrumb";
import { getCartTotal } from "../../services";
import { removeFromCart, incrementQty, decrementQty } from '../../actions'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Baseurl from '../../api/url'
import {getCartListService, removeFromCartService} from '../../services/userService';

class cartComponent extends Component {

    constructor(props) {
        super(props)
        const customerDetails = JSON.parse(localStorage.getItem('customerDetails'))
        this.state = {
            customerDetails: customerDetails,
            cartItems: [{}],
            totalSum: 0,
            defaultImage: "https://www.mnn.com/static/img/not_available.png",
        }
        this.redirectToCheckOut = this.redirectToCheckOut.bind(this)
    }

    componentDidMount() {
        this.getCartList();
    }

    redirectToCheckOut() {
        let prevUrl = localStorage.getItem('prevUrl');
        if (this.state.customerDetails && prevUrl !== undefined) {
            this.props.history.push(`${process.env.PUBLIC_URL}/checkout/${JSON.stringify(this.state.cartItems)}`);
        } else {
            localStorage.setItem('prevUrl', 'cart');
            this.props.history.push(`${process.env.PUBLIC_URL}/login`);
        }
    }

   async getCartList() {
        let prevUrl = localStorage.getItem('prevUrl')
        if (this.state.customerDetails && prevUrl !== "redirectedFromLogin" ) {
              try {
                const response = await getCartListService(this.state.customerDetails._id);
                console.log("response", response);
                var sum = 0
                response.data.object.object.cartList.forEach(function (data) {
                sum = sum + data.price
                });
                this.setState({
                    cartItems: response.data.object.object.cartList,
                    totalSum: sum
                })
              } catch (error) {
                console.error(error);
              }
        } else {
            let data = JSON.parse(localStorage.getItem('GuestCart'));
            console.log(data, "data cartItem");
            let total = 0;
            if (data) {
                data.forEach(function (val) {
                    total = total + val.price
                });
            }
            this.setState({
                cartItems: data,
                totalSum: total
            })
        }
    }

    async removeFromCart(productData) {
        let prevUrl = localStorage.getItem('prevUrl');
        if (this.state.customerDetails && prevUrl ) {
            try {
                const response = await removeFromCartService({
                    "productId": productData.productId,
                    "userId": this.state.customerDetails._id
                })
                this.getCartList();
                console.log(response, "data")
            }
            catch(error){
                console.log(error);
            }
        } else {
            let guestCart = [];
            let payload = {
                "productId": productData.productId,
                "userId": 'Guest'
            }


            let loadCart = (localStorage.getItem('GuestCart')) ? JSON.parse(localStorage.getItem('GuestCart')) : []

            var isCartUpdated = false;
            var isCartRemoved = false;
            if (loadCart.length > 0) {
                loadCart.forEach(function (product) {
                    if (product.productId == payload.productId) {
                        if (product.productCount == 1 || product.productCount == null) {
                            // let indexof = loadCart.indexOf(product);
                            // loadCart.splice(indexof, 1);
                            isCartRemoved = true;
                            isCartUpdated = true;
                            localStorage.removeItem('GuestCart')
                        } else {
                            product.productCount = product.productCount - 1
                            isCartUpdated = true
                        }

                    }
                })
            }

            if (!isCartUpdated) {
                loadCart.push(payload);
            }

            if (!isCartRemoved) {
                localStorage.setItem('GuestCart', JSON.stringify(loadCart));
            }

            // toast.success("Product REMOVE to Cart");
            this.getCartList();
        }
    }

    incrementQty(item, number) {
        //       console.log(item,"--------------item")
        //       this.setState({
        //         cartItems.productCount 
        //       })
    }


    render() {

        const { symbol, total } = this.props;
        const { cartItems } = this.state;
        console.log(cartItems, "cartItems");




        return (
            <div>
                {/*SEO Support*/}
                <Helmet>
                    <title>WeShop | Cart List Page</title>
                    <meta name="description" content="cart" />
                </Helmet>
                {/*SEO Support End */}

                <Breadcrumb title={'Cart Page'} />

                {cartItems ?
                    <section className="cart-section section-b-space">
                        <div className="container">
                            <div className="row">
                                <div className="col-sm-12">
                                    <table className="table cart-table table-responsive-xs">
                                        <thead>
                                            <tr className="table-head">
                                                <th scope="col">image</th>
                                                <th scope="col">product name</th>
                                                <th scope="col">price</th>
                                                <th scope="col">quantity</th>
                                                <th scope="col">action</th>
                                                <th scope="col">total</th>
                                            </tr>
                                        </thead>
                                        {cartItems.map((item, index) => {
                                            return (
                                                <tbody key={index}>
                                                    <tr>
                                                        <td>
                                                            <Link to={`${process.env.PUBLIC_URL}/left-sidebar/product/${item._id}`}>
                                                                <img src={(item.productImage != "") ? Baseurl + '/' + item.productImage : this.state.defaultImage} alt="" />
                                                                {/* <ImageZoom image={(item.productImage) ? item.productImage : this.state.defaultImage} /> */}
                                                            </Link>
                                                        </td>
                                                        <td><Link to={`${process.env.PUBLIC_URL}/left-sidebar/product/${item.id}`}>{item.productName}</Link>
                                                            <div className="mobile-cart-content row">
                                                                <div className="col-xs-3">
                                                                    <div className="qty-box">
                                                                        <div className="input-group">
                                                                            <input type="text" name="quantity"
                                                                                className="form-control input-number" defaultValue={item.productCount} />
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                                <div className="col-xs-3">
                                                                    <h2 className="td-color">{item.price}₹</h2>
                                                                </div>
                                                                <div className="col-xs-3">
                                                                    <h2 className="td-color">
                                                                        <a className="icon" >
                                                                            <i className="icon-close"></i>
                                                                        </a>
                                                                    </h2>
                                                                </div>
                                                            </div>
                                                        </td>
                                                        <td><h2>{item.price}₹</h2></td>
                                                        <td>
                                                            <div className="qty-box">
                                                                <div className="input-group">
                                                                    <span className="input-group-prepend">
                                                                        <button type="button" className="btn quantity-left-minus" onClick={() => this.incrementQty(item.id)} data-type="minus" data-field="">
                                                                            <i className="fa fa-angle-left"></i>
                                                                        </button>
                                                                    </span>
                                                                    <input type="text" name="quantity" value={item.productCount} readOnly={true} className="form-control input-number" />

                                                                    <span className="input-group-prepend">
                                                                        <button className="btn quantity-right-plus" onClick={() => this.incrementQty(item, 1)} data-type="plus" disabled={(item.qty >= item.stock) ? true : false}>
                                                                            <i className="fa fa-angle-right"></i>
                                                                        </button>
                                                                    </span>
                                                                </div>
                                                            </div>{(item.qty >= item.stock) ? 'out of Stock' : ''}
                                                        </td>
                                                        <td>
                                                            <a className="icon" onClick={() => this.removeFromCart(item)}>
                                                                <i className="fa fa-times"></i>
                                                            </a>
                                                        </td>
                                                        <td><h2 className="td-color">{item.price}₹</h2></td>
                                                    </tr>
                                                </tbody>)
                                        })}
                                    </table>
                                    <table className="table cart-table table-responsive-md">
                                        <tfoot>
                                            <tr>
                                                <td>total price :</td>
                                                <td><h2> {this.state.totalSum}₹ </h2></td>
                                            </tr>
                                        </tfoot>
                                    </table>
                                </div>
                            </div>
                            <div className="row cart-buttons">
                                <div className="col-6">
                                    <Link to={`${process.env.PUBLIC_URL}/products`} className="btn btn-solid">continue shopping</Link>
                                </div>
                                <div className="col-6">
                                    <button type="button" onClick={this.redirectToCheckOut} className="btn btn-solid" >Check Out</button>
                                    {/* <Link to={`${process.env.PUBLIC_URL}/checkout`} className="btn btn-solid">check out</Link> */}
                                </div>
                            </div>
                        </div>
                    </section>
                    :
                    <section className="cart-section section-b-space">
                        <div className="container">
                            <div className="row">
                                <div className="col-sm-12">
                                    <div >
                                        <div className="col-sm-12 empty-cart-cls text-center">
                                            <img src={`${process.env.PUBLIC_URL}/assets/images/icon-empty-cart.png`} className="img-fluid mb-4" alt="" />
                                            <h3>
                                                <strong>Your Cart is Empty</strong>
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
    cartItems: state.cartList.cart,
    symbol: state.data.symbol,
    total: getCartTotal(state.cartList.cart)
})

export default connect(
    mapStateToProps,
    { removeFromCart, incrementQty, decrementQty }
)(cartComponent)