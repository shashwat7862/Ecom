import React, { Component } from 'react';
import axios from 'axios';
import Baseurl from '../../api/url';
import Breadcrumb from "../common/breadcrumb";
import { loginCustomerService } from '../../services/userService';
import {connect} from 'react-redux';
import {fetchLogin,fetchLoginSuccess,fetchLoginFailure} from '../../reducers/login/login-action';

class Login extends Component {

    constructor(props) {
        super(props);

        this.state = {
            email: '',
            Password: '',
        }
        this.loginCustomer = this.loginCustomer.bind(this)
    }

     async loginCustomer() {
        try {
            const response = await loginCustomerService({
                "email": this.state.email,
                "password": this.state.password,
                "loginFrom": "email"
            })
            localStorage.removeItem('customerDetails');
            localStorage.removeItem('authToken');
            let prevUrl = localStorage.getItem('prevUrl');
            if (prevUrl == 'cart') {
                localStorage.setItem('prevUrl','redirectedFromLogin')
            }
            localStorage.setItem('authToken', response.data.object.object.authToken);
            localStorage.setItem('customerDetails', JSON.stringify(response.data.object.object.customerDetails));
            
            if (prevUrl == 'cart') {
                this.props.history.push(`${process.env.PUBLIC_URL}/${prevUrl}`);
                window.location.reload();
            } else {
                this.props.history.push(`${process.env.PUBLIC_URL}/products`);
                window.location.reload();
            }
        } catch (error) {
            console.log(error);
        };
    }

    onUpdateFormValue = (e) => {
        this.setState({
            [e.target.name]: e.target.value
        })
    }

    render() {
        const {userData,loading,error} =  this.props;
        console.log(this.userData);
        return (
            <div>
                <Breadcrumb title={'Login'} />
                <section className="login-page section-b-space">
                    <div className="container">
                        <div className="row">
                            <div className="col-lg-6">
                                <h3>Login</h3>
                                <div className="theme-card">
                                    <form className="theme-form">
                                        <div className="form-group">
                                            <label htmlFor="email">Email</label>
                                            <input type="text" name="email" onChange={this.onUpdateFormValue} className="form-control" id="email" placeholder="Email"
                                                required="" />
                                        </div>
                                        <div className="form-group">
                                            <label htmlFor="review">Password</label>
                                            <input type="password" name="password" onChange={this.onUpdateFormValue} className="form-control" id="review"
                                                placeholder="Enter your password" required="" />
                                        </div>
                                        <a onClick={this.loginCustomer} className="btn btn-solid">Login</a>
                                    </form>
                                </div>
                            </div>
                            <div className="col-lg-6 right-login">
                                <h3>New Customer</h3>
                                <div className="theme-card authentication-right">
                                    <h6 className="title-font">Create A Account</h6>
                                    <p>Sign up for a free account at our store. Registration is quick and easy. It
                                        allows you to be able to order from our shop. To start shopping click
                                        register.</p>
                                    <a href="/register" className="btn btn-solid">Create an Account</a>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>

            </div>
        )
    }
}

// const mapStateToProps = state => ({
//     userData:state.login.userData,
//     loading:state.login.loading,
//     error:state.login.error
// })



export default Login

//export default connect(mapStateToProps)(Login);

