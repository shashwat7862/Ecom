import React, { Component, Fragment } from 'react';
import { Tabs, TabList, TabPanel, Tab } from 'react-tabs';
import { User, Unlock } from 'react-feather';
import { withRouter } from 'react-router-dom';
import axios from 'axios';
import FacebookLogin from 'react-facebook-login';
import { GoogleLogin } from 'react-google-login';


export class LoginTabset extends Component {
    constructor(props) {
        super(props);
        this.state = {
            activeShow: true,
            startDate: new Date(),
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
        this.sendOTP = this.sendOTP.bind(this);
        this.VerifyOTP = this.VerifyOTP.bind(this);

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
    }

    sendOTP() {
        axios.post('//localhost:8080/api/v1/vendor/SendOTP', {
            "mobile": this.state.mobileFromOTPForm,
        }).then(response => {
                alert("OTP has been Sent");
                console.log(response, "data")
            })
            .catch(error => {
                console.log(error);
            });
    }



    VerifyOTP() {
        axios.post('//localhost:8080/api/v1/vendor/VerifyOTP', {
            "mobile": this.state.mobileFromOTPForm,
            "otp": this.state.otp,
            "email": this.state.emailFromOTPForm
        })
            .then(response => {
                alert(response.data.object.object.msg)
                localStorage.setItem('authToken', response.data.object.object.authToken);
                this.props.history.push(`${process.env.PUBLIC_URL}/dashboard`);
            })
            .catch(error => {
                console.log(error);
            });
    }



    registerVendor() {
        axios.post('//localhost:8080/api/v1/vendor/Register', {
            "email": this.state.email,
            "mobile": this.state.mobile,
            "password": this.state.password,
            "loginFrom": "email"
        })
            .then(response => {
                alert("registered")
                console.log(response, "data")
                console.log(response.data.object.object.authToken);
                localStorage.setItem('authToken', response.data.object.object.authToken);
                this.props.history.push(`${process.env.PUBLIC_URL}/dashboard`);
            })
            .catch(error => {
                console.log(error);
            });

    }

    loginVendor() {
        axios.post('//localhost:8080/api/v1/vendor/Login', {
            "email": this.state.loginEmail,
            "password": this.state.loginPassword,
            "loginFrom": "email"
        })
            .then(response => {
                alert("logged IN")
                console.log(response, "login Data")
                console.log(response.data.object.object.authToken);
                localStorage.setItem('authToken', response.data.object.object.authToken);
                this.props.history.push(`${process.env.PUBLIC_URL}/dashboard`);
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
                            <button onClick={this.loginVendor} className='btn btn-primary' >Login</button>
                            <br></br><hr></hr><br></br>
                            <input type="number" name="mobileFromOTPForm" className="form-control" onChange={this.onUpdateOTPForm} placeholder="Enter Your Number"></input>

                            <br></br>
                            <input type="email" name="emailFromOTPForm" className="form-control" onChange={this.onUpdateOTPForm} placeholder="Enter Your Email"></input>
                            <br></br>
                            <input type="number" name="otp" className="form-control" onChange={this.onUpdateOTPForm} placeholder="Enter OTP"></input> <br></br>
                            <button className='btn btn-primary' onClick={this.VerifyOTP} >Login</button>
                            <button onClick={this.sendOTP} className='btn btn-primary' >Send OTP</button>
                            <br></br>
                            <div className="form-footer">

                                Login up with social platforms
                                <br />
                                <ul className="social">
                                    <FacebookLogin
                                        appId="119401125387521"
                                        autoLoad={false}
                                        fields="name,email,picture"
                                        scope="public_profile,user_friends,user_actions.books"
                                        callback={this.responseFacebook}
                                    /><br/>
                                        <GoogleLogin
                                            clientId="658977310896-knrl3gka66fldh83dao2rhgbblmd4un9.apps.googleusercontent.com"
                                            buttonText="Login"
                                            onSuccess={this.responseGoogle}
                                            onFailure={this.responseGoogle}
                                            cookiePolicy={'single_host_origin'}
                                        />
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

export default withRouter(LoginTabset)

