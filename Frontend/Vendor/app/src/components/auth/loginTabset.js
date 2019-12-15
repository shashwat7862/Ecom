import React, { Component, Fragment } from 'react';
import { Tabs, TabList, TabPanel, Tab } from 'react-tabs';
import { User, Unlock } from 'react-feather';
import { withRouter } from 'react-router-dom';
import axios from 'axios';
import FacebookLogin from 'react-facebook-login';
import { GoogleLogin } from 'react-google-login';
import Baseurl from '../../assets/data/urls';
import * as actionCreator from '../../Action/LoginAction';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


export class LoginTabset extends Component {
    constructor(props) {
        super(props);
        this.state = {
            activeShow: true,
            startDate: new Date(),
            userData: {},
            email: '',
            password: '',
            mobile: null,
            loginEmail: '',
            loginPassword: null,
            mobileFromOTPForm: null,
            emailFromOTPForm: '',
            otp: null
        }
        this.handleChange = this.handleChange.bind(this);
        this.registerVendor = this.registerVendor.bind(this);
        this.loginVendor = this.loginVendor.bind(this);
        this.onUpdateOTPForm = this.onUpdateOTPForm.bind(this);
        this.VerifyOTP = this.VerifyOTP.bind(this);

    }

    componentWillReceiveProps(nextProps) {

        console.log(nextProps, "nextProps");
        console.log(this.state, "state");
        console.log(this.props, "this.props")


        if (nextProps.url.LoginReducer !== this.props.url.LoginReducer) {
            this.setState({
                userData: nextProps.url.LoginReducer.object.object.UserData,
                authToken: nextProps.url.LoginReducer.object.object.authToken
            });

            localStorage.setItem('authToken', nextProps.url.LoginReducer.object.object.authToken);
            localStorage.setItem('vendorDetails', JSON.stringify(nextProps.url.LoginReducer.object.object.vendorDetails));
            this.props.history.push(`${process.env.PUBLIC_URL}/products/digital/digital-product-list`);
        }

    }

    responseFacebook(response) {
        console.log(response);
    }

    responseGoogle = (response) => {
        console.log(response);
    }

    clickActive = (event) => {
        document.querySelector(".nav-link").classList.remove('show');
        event.target.classList.add('show');
    }
    handleChange(date) {
        this.setState({
            startDate: date
        });
    }

    onUpdateFormValue = (e) => {
        console.log(e.target.name, e.target.value, "change")
        this.setState({
            [e.target.name]: e.target.value
        })
    }

    onUpdateOTPForm(e) {
        console.log(e.target.name, e.target.value, "change")
        this.setState({
            [e.target.name]: e.target.value
        })

        if (e.target.name == 'mobileFromOTPForm') {
            if (e.target.value.length == 10) {
                let mobile = this.state.mobileFromOTPForm
                this.props.sendOtp({
                    "mobile": mobile,
                    "userRole": "VENDOR"
                })
                setTimeout(function () {
                    toast.success("OTP has been sent");
                }, 1000)
            }
        }
    }

    VerifyOTP() {
        this.props.verifyOTP({
            "mobile": this.state.mobileFromOTPForm,
            "otp": this.state.otp,
            //         "email": this.state.emailFromOTPForm
        })
    }




    registerVendor() {
        axios.post(`${Baseurl}/api/v1/vendor/Register`, {
            "email": this.state.email,
            "mobile": this.state.mobile,
            "password": this.state.password,
            "loginFrom": "email"
        })
            .then(response => {
                console.log(response, "data")
                console.log(response.data.object.object.authToken);
                localStorage.setItem('authToken', response.data.object.object.authToken);
                localStorage.setItem('vendorDetails', JSON.stringify(response.data.object.object.vendorDetails));
                this.props.history.push(`${process.env.PUBLIC_URL}/products/digital/digital-product-list`);
            })
            .catch(error => {
                console.log(error);
            });

    }

    loginVendor() {
        axios.post(`${Baseurl}/api/v1/vendor/Login`, {
            "email": this.state.loginEmail,
            "password": this.state.loginPassword,
            "loginFrom": "email"
        })
            .then(response => {
                console.log(response, "login Data")
                console.log(response.data.object.object.authToken);
                localStorage.setItem('authToken', response.data.object.object.authToken);
                localStorage.setItem('vendorDetails', JSON.stringify(response.data.object.object.vendorDetails));
                this.props.history.push(`${process.env.PUBLIC_URL}/products/digital/digital-product-list`);
            })
            .catch(error => {
                console.log(error);
            });

    }


    render() {
        console.log(this.state, "state")
        return (
            <div>
                <Fragment>
                    <ToastContainer />
                    <Tabs>
                        <TabList className="nav nav-tabs tab-coupon" >
                            <Tab className="nav-link" onClick={(e) => this.clickActive(e)}><User />Login</Tab>
                            <Tab className="nav-link" onClick={(e) => this.clickActive(e)}><Unlock />Register</Tab>
                        </TabList>

                        <TabPanel>
                            <div className="input-group">
                                <div className="input-group-prepend">
                                </div>
                                <input type="text" name="loginEmail" className="form-control" placeholder="Email" onChange={this.onUpdateFormValue} aria-label="First name" className="form-control" />
                            </div>
                            <br />

                            <div className="input-group">
                                <div className="input-group-prepend">
                                </div>
                                <input type="text" name="loginPassword" className="form-control" placeholder="Password" onChange={this.onUpdateFormValue} aria-label="First name" className="form-control" />
                            </div>
                            <button onClick={this.loginVendor} className='btn btn-primary' >Login With Email</button>
                            <br></br><hr></hr><br></br>
                            {/* <input type="number" name="mobileFromOTPForm" className="form-control" onChange={this.onUpdateOTPForm} placeholder="Enter Your Number"></input> */}


                            {/* <br></br> */}
                            {/* <input type="email" name="emailFromOTPForm" className="form-control" onChange={this.onUpdateOTPForm} placeholder="Enter Your Email"></input> */}
                            {/* <br></br> */}
                            {/* <input type="number" name="otp" className="form-control" onChange={this.onUpdateOTPForm} placeholder="Enter OTP"></input> <br></br> */}
                            {/* <button className='btn btn-primary' onClick={this.VerifyOTP} >Login With OTP</button> */}

                            <br></br>
                            <div className="form-footer">

                                {/* Login up with social platforms */}
                                <br />
                                <ul className="social">
                                    {/* <FacebookLogin
                                        appId="119401125387521"
                                        autoLoad={false}
                                        fields="name,email,picture"
                                        scope="public_profile,user_friends,user_actions.books"
                                        callback={this.responseFacebook}
                                    /><br />
                                    <GoogleLogin
                                        clientId="658977310896-knrl3gka66fldh83dao2rhgbblmd4un9.apps.googleusercontent.com"
                                        buttonText="Login"
                                        onSuccess={this.responseGoogle}
                                        onFailure={this.responseGoogle}
                                        cookiePolicy={'single_host_origin'}
                                    /> */}
                                    {/* <li><a className="fa fa-facebook" href=""></a></li>
                                    <li><a className="fa fa-twitter" href=""></a></li>
                                    <li><a className="fa fa-instagram" href=""></a></li>
                                    <li><a className="fa fa-pinterest" href=""></a></li> */}
                                </ul>
                            </div>
                        </TabPanel>
                        <TabPanel>
                            <br></br>
                            <div className="input-group">
                                <div className="input-group-prepend">
                                </div>
                                <input type="text" name="email" className="form-control" placeholder="Email" onChange={this.onUpdateFormValue} aria-label="First name" className="form-control" />
                            </div>
                            <br />

                            <div className="input-group">
                                <div className="input-group-prepend">
                                </div>
                                <input type="text" name="password" className="form-control" placeholder="Password" onChange={this.onUpdateFormValue} aria-label="First name" className="form-control" />
                            </div><br />

                            <div className="input-group">
                                <div className="input-group-prepend">
                                </div>
                                <input type="text" name="mobile" className="form-control" placeholder="Phone" onChange={this.onUpdateFormValue} aria-label="First name" className="form-control" />
                            </div>
                            <br></br>
                            <button onClick={this.registerVendor} className='btn btn-primary' >Register</button>
                        </TabPanel>
                    </Tabs>
                </Fragment>
            </div>
        )
    }
}

const mapStateToProps = state => ({
    url: state,
});


export default compose(
    withRouter,
    connect(mapStateToProps, actionCreator)
)(LoginTabset);


