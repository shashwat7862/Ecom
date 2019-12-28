import React, { Component } from 'react';

import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Baseurl from '../../api/url';

class orderSuccess extends Component {

    constructor(props) {
        super(props);

        this.state = {
            orderData: [{
                orderId:'',
                createdAt:''

            }],
            paymentData:[{
                FinalTotal:0,
                shiping_Location_Area:'',
                shiping_City:'',
                shiping_State:'',
                shiping_Pincode:''
            }],
            orderTotal:0
        }

    }

    componentDidMount() {
        const { match: { params } } = this.props;
        console.log(params, "params")
        let orderId = params.orderId
        console.log("orderId", orderId);
        // alert("init");
        axios.get(`${Baseurl}/api/v1/common/getOrderDetails/${orderId}`)
            .then(response => {
                // toast.success("Address Fetched")
                console.log(response, "orderId details");
                console.log("response.data.object.object.getOrderData", response.data.object.object.getOrderData.orderList)
                console.log("response.data.object.object.getPaymentData", response.data.object.object.getPaymentData.paymentDetails)
                
                
                this.setState({
                    orderData: response.data.object.object.getOrderData.orderList,
                    paymentData: response.data.object.object.getPaymentData.paymentDetails
                })

            })
            .catch(error => {
                console.log(error);
            });
    }

    render() {
        console.log(this.state, "this.state");

        // const {payment, items, symbol, orderTotal} = this.props.location.state;
        const { orderData,paymentData } = this.state;
        let symbol = '₹';
        console.log(orderData, "orderData");
        console.log(paymentData, "paymentData");

        // let orderLists = orderData.getOrderData.orderList;
        var options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
        var current = new Date();
        var next5days = new Date(Date.now() + 5 * 86400000);
        let CheckDate = current.toLocaleDateString("en-US", options).toString()
        let deliveryDate = next5days.toLocaleDateString("en-US", options).toString()

           

            return (
                (orderData) ?
                    <div>
                        <section className="section-b-space light-layout">
                            <div className="container">
                                <div className="row">
                                    <div className="col-md-12">
                                        <div className="success-text">
                                            <i className="fa fa-check-circle" aria-hidden="true"></i>
                                            <h2>thank you</h2>
                                            <p>Your has been Order Placed Successfully</p>
                                            <p>Order ID: {orderData[0].orderId}</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </section>

                        <section className="section-b-space">
                            <div className="container">
                                <div className="row">
                                    <div className="col-lg-6">
                                        <div className="product-order">
                                            <h3>your order details</h3>
                                            {orderData.map((item, index) => {
                                                return <div className="row product-order-detail" key={index}>
                                                    <div className="col-3">
                                                    <h4>product Image</h4>
                                                        
                                                    <img src={Baseurl+'/'+item.productImage} alt="not fetched" style={{height:50+'px',width:50+'px'}} className="img-fluid" />
                                                    </div>
                                                    <div className="col-3 order_detail">
                                                        <div>
                                                            <h4>product name</h4>
                                                            <h5>{item.productName}</h5>
                                                        </div>
                                                    </div>
                                                    <div className="col-3 order_detail">
                                                        <div>
                                                            <h4>quantity</h4>
                                                            <h5>{item.QTY}</h5>
                                                        </div>
                                                    </div>
                                                    <div className="col-3 order_detail">
                                                        <div>
                                                            <h4>price</h4>
                                                            <h5>{symbol}{item.productPrice}</h5>
                                                        </div>
                                                    </div>
                                                </div>
                                            })}
                                            <div className="total-sec">
                                                <ul>
                                                    <li>subtotal <span>{symbol}{paymentData[0].FinalTotal}</span></li>
                                                    <li>shipping <span>$0</span></li>
                                                    <li>tax(GST) <span>$0</span></li>
                                                </ul>
                                            </div>
                                            <div className="final-total">
                                                <h3>total <span>{symbol}{paymentData[0].FinalTotal}</span></h3>
                                                     </div>
                                        </div><br></br>
                                        <a href="/products" className="btn btn-solid">back to home</a>
                                    </div>
                                    <div className="col-lg-6">
                                        <div className="row order-success-sec">
                                            <div className="col-sm-6">
                                                <h4>summery</h4>
                                                <ul className="order-detail">
                                                    {(paymentData[0]) ?
                                                        <div>
                                                            <li>payer ID: {paymentData[0].UserId}</li>
                                                            <li>payment ID: {paymentData[0].id}</li>
                                                            {/* <li>payment Token: {payment.paymentToken}</li> */}
                                                            </div>
                                                        :
                                                        <li>Order ID: {orderData[0].orderId}</li>}

                                                    <li>Order Date: {orderData[0].createdAt}</li>
                                                    <li>Order Total: {symbol}{paymentData[0].FinalTotal}</li>
                                                </ul>
                                            </div>
                                            <div className="col-sm-6">
                                                <h4>shipping address</h4>
                                                <ul className="order-detail"> 
                                                    <li>{paymentData[0].shiping_Location_Area}</li>
                                                    <li>{paymentData[0].shiping_City}</li>
                                                    <li>{paymentData[0].shiping_State}</li>
                                                    <li>{paymentData[0].shiping_Pincode}</li>
                                                </ul>
                                            </div>
                                            
                                            <div className="col-sm-12 payment-mode">
                                            <br></br><br></br>
                                                <h4>payment method</h4>
                                                <p> Cash on delivery (COD) 
                                                 </p>
                                            </div>
                                            <div className="col-md-12">
                                                <div className="delivery-sec">
                                                    <h3>expected date of delivery</h3>
                                                    <h2>{deliveryDate}</h2>
                                                </div>
                                            </div>
                                           
                                        </div>
                                    </div>

                                </div>
                            </div>
                        </section>
                    </div>
                    :
                    <section className="p-0">
                        <div className="container">
                            <div className="row">
                                <div className="col-sm-12">
                                    <div className="error-section">
                                        <h1>404</h1>
                                        <h2>page not found</h2>
                                        <a href="index.html" className="btn btn-solid">back to home</a>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </section>
            )
    }
}

export default orderSuccess