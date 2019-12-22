import React, { Component } from 'react';
import { Helmet } from 'react-helmet'
import { connect } from 'react-redux'
import { Link, Redirect } from 'react-router-dom'
import PaypalExpressBtn from 'react-paypal-express-checkout';
import SimpleReactValidator from 'simple-react-validator';

import Breadcrumb from "../common/breadcrumb";
import { removeFromWishlist } from '../../actions'
import { getCartTotal } from "../../services";

import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Baseurl from '../../api/url';
import Modal from 'react-responsive-modal';

class checkOut extends Component {

    constructor(props) {
        super(props)
        const customerDetails = JSON.parse(localStorage.getItem('customerDetails'))
        this.state = {
            payment: 'stripe',
            address1: '',
            address2: '',
            area: '',
            country: '',
            address: '',
            city: '',
            state: '',
            billingAddress: '',
            shippingAddress: '',
            pincode: '',
            productsData: [],
            create_account: '',
            addressList: [
            ],
            showMenu: false,
            total: 0,
            ShippingMenu: false,
            open: false,
            customerDetails: customerDetails,
        }



        this.showMenu = this.showMenu.bind(this);
        this.closeMenu = this.closeMenu.bind(this);
        this.SaveAddress = this.SaveAddress.bind(this);
        this.showShippingMenu = this.showShippingMenu.bind(this);
        this.closeShippingMenu = this.closeShippingMenu.bind(this);
        this.placeOrder = this.placeOrder.bind(this);
        this.validator = new SimpleReactValidator();

    }

    onOpenModal = () => {
        this.setState({ open: true });
    };

    onCloseModal = () => {
        this.setState({ open: false });
    };

    componentDidMount() {
        // const { match: { params } } = this.props;
        // let data = JSON.parse(params.data);

        let enc = window.location.href
        // let enc ="http://weshopcustomer.s3-website.ap-south-1.amazonaws.com/checkout/[%7B%22productId%22:%225df614f991338a4a29de3eb7%22,%22productName%22:%22Portable%20Wi-Fi%20Data%20Device%22,%22price%22:1790,%22productCount%22:1,%22category%22:%22electronics%22,%22productImage%22:%221576408610203.jpg%22,%22_id%22:%225dfbb8e116dc81d866a180b5%22%7D]"
        var dec = decodeURI(enc).split('/[{')

        let product;
        let data;
        console.log(dec, "dec")
        for (let val of dec) {
            if (val.length > 50) {
                product = val
            }
        }
        data = JSON.parse("[{" + product);
        console.log("data", data);
        this.setState({
            productsData: data
        });

        let total = 0;
        data.forEach(function (singleProduct) {
            total = total + singleProduct.price
        });

        console.log(total, "total")
        this.setState({
            productsData: data,
            total: total
        });


        // alert("init");
       this.getAddress()
    }

    getAddress = () =>{
        axios.get(`${Baseurl}/api/v1/common/getAddress/${this.state.customerDetails._id}`)
        .then(response => {
            // toast.success("Address Fetched")
            console.log(response, "address")
            // let addressList = response.object.object.Data;
            this.setState({
                addressList: response.data.object.object.Data
            })

        })
        .catch(error => {
            console.log(error);
        });
    }

    setStateFromInput = (event) => {
        var obj = {};
        obj[event.target.name] = event.target.value;
        this.setState(obj);

    }

    placeOrder() {
        localStorage.setItem('prevUrl', 'complete');
        axios.post(`${Baseurl}/api/v1/customer/createOrder`, {
            productDetails: this.state.productsData,
            paymentDetails: {
                cardType: '',
                paymentMethod: "COD",
                cardNumber: '',
                totalItemsCost: this.state.total,
                packageCharge: 0.0,
                totalBeforeTax: this.state.total,
                Tax: 0,
                FinalTotal: this.state.total

            },
            addressDetails: {
                billing_Location_Area: this.state.billingAddress.location_area,
                billing_City: this.state.billingAddress.city,
                billing_State: this.state.billingAddress.state,
                billing_NearBy: this.state.billingAddress.nearBy,
                billing_Pincode: this.state.billingAddress.pincode,
                shiping_Location_Area: this.state.shippingAddress.location_area,
                shiping_City: this.state.shippingAddress.city,
                shiping_State: this.state.shippingAddress.state,
                shiping_NearBy: this.state.shippingAddress.nearBy,
                shiping_Pincode: this.state.shippingAddress.pincode,
            },
            UserId: this.state.customerDetails._id
        }

        )
            .then(response => {
                // toast.success("Your Order Has been Placed")
                console.log(response, "address");
                let orderId = response.data.object.object[0].saveDataInOrderTable.orderId;
                this.props.history.push(`${process.env.PUBLIC_URL}/order-success/${orderId}`);
                localStorage.removeItem('GuestCart')
            })
            .catch(error => {
                console.log(error);
            });
    }

    setStateFromCheckbox = (event) => {
        var obj = {};
        obj[event.target.name] = event.target.checked;
        this.setState(obj);

        if (!this.validator.fieldValid(event.target.name)) {
            this.validator.showMessages();
        }
    }

    checkhandle(value) {
        this.setState({
            payment: value
        })
    }

    showMenu(event) {
        event.preventDefault();

        this.setState({ showMenu: true }, () => {
            document.addEventListener('click', this.closeMenu);
        });
    }

    showShippingMenu(event) {
        event.preventDefault();

        this.setState({ ShippingMenu: true }, () => {
            document.addEventListener('click', this.closeShippingMenu);
        });
    }

    closeShippingMenu() {
        this.setState({ ShippingMenu: false }, () => {
            document.addEventListener('click', this.closeShippingMenu);
        });
    }

    closeMenu() {
        this.setState({ showMenu: false }, () => {
            document.removeEventListener('click', this.closeMenu);
        });
    }

    SaveAddress() {
        axios.post(`${Baseurl}/api/v1/common/saveAddress`, {
            address1: this.state.address1,
            address2: this.state.address2,
            state: this.state.state,
            city: this.state.city,
            location_area: this.state.area,
            pincode: this.state.pincode,
            nearBy: this.state.nearBy,
            userName: this.state.customerDetails.fullName,
            userId: this.state.customerDetails._id
        })
            .then(response => {
                toast.success("Address has been Saved")
                console.log(response, "save address data");
                this.setState({ open: false });
                this.getAddress();
            })
            .catch(error => {
                console.log(error);
            });
    }

    selectBiilingAddress(address) {
        console.log(address, "select biiling address");
        this.setState({
            billingAddress: address
        })
    }

    selectShippingAddress(address) {
        console.log(address, "select shipping address");
        this.setState({
            shippingAddress: address
        })
    }

    StripeClick = () => {

        if (this.validator.allValid()) {
            alert('You submitted the form and stuff!');

            var handler = (window).StripeCheckout.configure({
                key: 'pk_test_glxk17KhP7poKIawsaSgKtsL',
                locale: 'auto',
                token: (token) => {
                    console.log(token)
                    this.props.history.push({
                        pathname: '/order-success',
                        state: { payment: token, items: this.state.productsData, orderTotal: this.state.total, symbol: this.props.symbol }
                    })
                }
            });
            handler.open({
                name: 'Multikart',
                description: 'Online Fashion Store',
                amount: this.amount * 100
            })
        } else {
            this.validator.showMessages();
            // rerender to show messages for the first time
            this.forceUpdate();
        }
    }



    render() {
        const { cartItems } = this.props;
        const { total } = this.state;
        let symbol = '₹';

        console.log("cartItems", cartItems)


        // Paypal Integration
        const onSuccess = (payment) => {
            console.log("The payment was succeeded!", payment);
            this.props.history.push({
                pathname: '/order-success',
                state: { payment: payment, items: cartItems, orderTotal: total, symbol: symbol }
            })

        }

        const onCancel = (data) => {

            console.log('The payment was cancelled!', data);
        }

        const onError = (err) => {
            console.log("Error!", err);
        }

        const client = {
            sandbox: 'AZ4S98zFa01vym7NVeo_qthZyOnBhtNvQDsjhaZSMH-2_Y9IAJFbSD3HPueErYqN8Sa8WYRbjP7wWtd_',
            production: 'AZ4S98zFa01vym7NVeo_qthZyOnBhtNvQDsjhaZSMH-2_Y9IAJFbSD3HPueErYqN8Sa8WYRbjP7wWtd_',
        }

        console.log("this.state", this.state)


        return (
            <div>

                {/*SEO Support*/}
                <Helmet>
                    <title>WeShop | CheckOut Page</title>
                    <meta name="description" content="Multikart – Multipurpose eCommerce React Template is a multi-use React template. It is designed to go well with multi-purpose websites. Multikart Bootstrap 4 Template will help you run multiple businesses." />
                </Helmet>
                {/*SEO Support End */}

                <Breadcrumb title={'Checkout'} />

                <section className="section-b-space">
                    <div className="container padding-cls">
                        <button className="btn " style={{ marginLeft: -230 + 'px' }} data-toggle="modal"
                            data-target="#sizemodal" onClick={this.onOpenModal} style={{ marginLeft: -100 + 'px' }} >Add New Address</button>
                        <div className="checkout-page">
                            <div className="checkout-form">
                                <br></br>
                                <Modal open={this.state.open} onClose={this.onCloseModal} center>
                                    <div className="modal-dialog modal-dialog-centered" role="document">
                                        <div className="modal-content">
                                            <div className="modal-header">
                                                <h5 className="modal-title" id="exampleModalLabel">Add Address</h5>
                                            </div>
                                            <div className="modal-body">
                                                <div className="row check-out">
                                                    <div className="form-group col-md-6 col-sm-6 col-xs-12">
                                                        <div className="field-label">State</div>
                                                        <input type="text" className="form-control" name="state" onChange={this.setStateFromInput} />
                                                        {this.validator.message('state', this.state.first_name, 'required|alpha')}
                                                    </div>
                                                    <div className="form-group col-md-6 col-sm-6 col-xs-12">
                                                        <div className="field-label">City</div>
                                                        <input type="text" className="form-control" name="city" onChange={this.setStateFromInput} />
                                                        {this.validator.message('city', this.state.last_name, 'required|alpha')}
                                                    </div>
                                                    <div className="form-group col-md-6 col-sm-6 col-xs-12">
                                                        <div className="field-label">Pincode</div>
                                                        <input type="text" className="form-control" name="pincode" onChange={this.setStateFromInput} />
                                                        {/* {this.validator.message('phone', this.state.phone, 'required|phone')} */}
                                                    </div>
                                                    <div className="form-group col-md-6 col-sm-6 col-xs-12">
                                                        <div className="field-label">Near By</div>
                                                        <input type="text" className="form-control" name="nearBy" onChange={this.setStateFromInput} />
                                                        {/* {this.validator.message('email', this.state.email, 'required|email')} */}
                                                    </div>
                                                    <div className="form-group col-md-6 col-sm-6 col-xs-12">
                                                        <div className="field-label">Location / Area</div>
                                                        <input type="text" className="form-control" name="area" onChange={this.setStateFromInput} />
                                                        {/* {this.validator.message('email', this.state.email, 'required|email')} */}
                                                    </div>
                                                    <div className="form-group col-md-12 col-sm-12 col-xs-12">
                                                        <div className="field-label">Country</div>
                                                        <select name="country" value={this.state.country} onChange={this.setStateFromInput}>
                                                            <option>Oman</option>
                                                            <option>India</option>
                                                            <option>Australia</option>
                                                        </select>
                                                        {this.validator.message('country', this.state.country, 'required')}
                                                    </div>
                                                    <div className="form-group col-md-12 col-sm-12 col-xs-12">
                                                        <div className="field-label">Address 1</div>
                                                        <input type="text" className="form-control" name="address1" onChange={this.setStateFromInput} placeholder="Street address" />
                                                        {this.validator.message('address1', this.state.address, 'required|min:20|max:120')}
                                                    </div>
                                                    <div className="form-group col-md-12 col-sm-12 col-xs-12">
                                                        <div className="field-label">Address 2</div>
                                                        <input type="text" className="form-control" name="address2" onChange={this.setStateFromInput} />
                                                        {/* {this.validator.message('city', this.state.city, 'required|alpha')} */}
                                                    </div>
                                                    <button className="btn btn-success" style={{ marginLeft: 20 + 'px' }} onClick={this.SaveAddress}>Save</button>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </Modal>
                                <div className="checkout row">
                                    <div className="col-lg-3 col-sm-12 col-xs-12">
                                        <br></br><br></br><br></br><br></br>
                                        <h3>Billing Details</h3>
                                        <div>
                                            <button onClick={this.showMenu} className="btn">
                                                Select Address</button>
                                            {this.state.showMenu ? (

                                                <div className="menu">
                                                    <div>
                                                        <div>
                                                            {(() => {
                                                                let container = [<div>Select or Add Address</div>]; this.state.addressList.forEach((val, index) => {
                                                                    container.push(
                                                                        <div className="card" onClick={() => this.selectBiilingAddress(val)} key={index} style={{ width: 200 + 'px' }}>
                                                                            <div className="card-body" style={{ width: 200 + 'px' }}>
                                                                                <span>{val.location_area},
                                                                                            {val.city},{val.state},{val.country},{val.pincode}
                                                                                    <br>
                                                                                    </br>
                                                                                    {val.address1}</span>
                                                                            </div>
                                                                        </div>)
                                                                }); return container;
                                                            })()}
                                                        </div>
                                                    </div>
                                                </div>

                                            ) : (null)}
                                        </div><br></br><br></br>
                                        {(this.state.billingAddress != '') ?
                                            <div className="card" style={{ width: 200 + 'px' }}>
                                                <div className="cart-title"> &nbsp;Selected Billing Address</div>
                                                <div className="card-body" style={{ width: 200 + 'px' }}>
                                                    <span>{this.state.billingAddress.location_area},
                                                             {this.state.billingAddress.city},{this.state.billingAddress.state},{this.state.billingAddress.country},{this.state.billingAddress.pincode}
                                                        <br>
                                                        </br>
                                                        {this.state.billingAddress.address1}</span>
                                                </div>
                                            </div> : null}
                                    </div>
                                    <div className="col-lg-3 col-sm-12 col-xs-12">
                                        <br></br><br></br><br></br><br></br>
                                        <h3>Shipping Details</h3>
                                        <div>
                                            <button onClick={this.showShippingMenu} className="btn">
                                                Select Address</button>

                                            {this.state.ShippingMenu ? (

                                                <div className="menu">
                                                    <div>
                                                        <div>
                                                            {(() => {
                                                                let container = [<div>Select or Add Address</div>]; this.state.addressList.forEach((val, index) => {
                                                                    container.push(
                                                                        <div className="card" onClick={() => this.selectShippingAddress(val)} key={index} style={{ width: 200 + 'px' }}>
                                                                            <div className="card-body" style={{ width: 200 + 'px' }}>
                                                                                <span>{val.location_area},
                                                                                            {val.city},{val.state},{val.country},{val.pincode}
                                                                                    <br>
                                                                                    </br>
                                                                                    {val.address1}</span>
                                                                            </div>
                                                                        </div>)
                                                                }); return container;
                                                            })()}
                                                        </div>
                                                    </div>
                                                </div>
                                            ) : (null)}
                                        </div>
                                        <br></br><br></br>
                                        {(this.state.shippingAddress != '') ?
                                            <div className="card" style={{ width: 200 + 'px' }}>
                                                <div className="cart-title">&nbsp; Selected shipping Address</div>
                                                <div className="card-body" style={{ width: 200 + 'px' }}>
                                                    <span>{this.state.shippingAddress.location_area},
                                                             {this.state.shippingAddress.city},{this.state.shippingAddress.state},{this.state.shippingAddress.country},{this.state.shippingAddress.pincode}
                                                        <br>
                                                        </br>
                                                        {this.state.shippingAddress.address1}</span>
                                                </div>
                                            </div> : null}
                                    </div>



                                    <div className="col-lg-6 col-sm-12 col-xs-12">
                                        <div className="checkout-details">
                                            <div className="order-box">
                                                <div className="title-box">
                                                    <div>Product <span> Total</span></div>
                                                </div>
                                                <ul className="qty">
                                                    {this.state.productsData.map((item, index) => {
                                                        return <li key={index}>{item.productsName} × {item.productCount} <span>{symbol} {item.price}</span></li>
                                                    })
                                                    }
                                                    <li>Shipping <div className="shipping">
                                                        <br></br>
                                                        <div className="shopping-option">
                                                            <input type="checkbox" name="free-shipping" id="free-shipping" />
                                                            <label htmlFor="free-shipping">&nbsp;&nbsp;Free Shipping</label>
                                                        </div>

                                                    </div>
                                                    </li>
                                                </ul>
                                                <ul className="sub-total">
                                                    <li>Subtotal <span className="count">{symbol}{total}</span></li>
                                                    <li>Coupon Discount <span className="count">{symbol}0.00</span></li>
                                                    <li>Gross Total <span className="count">{symbol}{total}</span></li>
                                                    <li>Tax <span className="count">{symbol}0.00</span></li>
                                                    <li> Shipping Fees <span className="count">{symbol}0.00</span></li>



                                                </ul>

                                                <ul className="total">
                                                    <li>NET PAYABLE <span className="count">{symbol}{total}</span></li>
                                                </ul>
                                            </div>

                                            <div className="payment-box">
                                                <div className="upper-box">
                                                    <div className="payment-options">
                                                        <ul>
                                                            <li>
                                                                <div className="radio-option stripe">
                                                                    <input type="radio" name="payment-group" id="payment-2" defaultChecked={true} onClick={() => this.checkhandle('stripe')} />
                                                                    <label htmlFor="payment-2">COD</label>
                                                                </div>
                                                            </li>
                                                            <li>
                                                                <div className="radio-option paypal">
                                                                    <input type="radio" disabled name="payment-group" id="payment-1" onClick={() => this.checkhandle('paypal')} />
                                                                    <label htmlFor="payment-1">PayPal<span className="image"><img src={`${process.env.PUBLIC_URL}/assets/images/paypal.png`} alt="" /></span></label>
                                                                </div>
                                                            </li>
                                                        </ul>
                                                    </div>
                                                </div>
                                                {/* {(total !== 0) ?
                                                    <div className="text-right">
                                                        {(this.state.payment === 'stripe') ? <button type="button" className="btn-solid btn" onClick={() => this.StripeClick()} >Place Order</button> :
                                                            <PaypalExpressBtn env={'sandbox'} client={client} currency={'USD'} total={total} onError={onError} onSuccess={onSuccess} onCancel={onCancel} />}
                                                    </div>
                                                    : ''} */}

                                            </div>
                                            <button className="btn-solid btn" onClick={this.placeOrder} >Place Order</button>
                                        </div>
                                    </div>
                                </div>

                            </div>
                        </div>
                    </div>
                </section>
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
    { removeFromWishlist }
)(checkOut)