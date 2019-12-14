import React, { Component } from 'react';
import axios from 'axios';

import Breadcrumb from "../common/breadcrumb";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

class Register extends Component {

    constructor(props) {
        super(props);

        this.state = {
            email: '',
            Password: '',
            mobile: '',
            fullName: ''
        }
        this.registerCustomer = this.registerCustomer.bind(this)

    }

    registerCustomer() {
        axios.post('//localhost:8080/api/v1/customer/Register', {
            "email": this.state.email,
            "mobile": this.state.mobile,
            "password": this.state.password,
            "fullName": this.state.fullName,
            "loginFrom": "email"
        })
            .then(response => {
                localStorage.clear();
                toast.success("Registered Successfully..!!")
                console.log(response, "data")
                console.log(response.data.object.object.authToken);
                localStorage.setItem('authToken', response.data.object.object.authToken);
                localStorage.setItem('customerDetails', JSON.stringify(response.data.object.object.customerDetails));
                this.props.history.push(`${process.env.PUBLIC_URL}/products`);
            })
            .catch(error => {
                console.log(error);
            });

    }

    onUpdateFormValue = (e) => {
        console.log(e.target.name, e.target.value, "change")
        this.setState({
            [e.target.name]: e.target.value
        })
    }

    render() {


        return (
            <div>
                <ToastContainer />
                <Breadcrumb title={'create account'} />


                {/*Regsiter section*/}
                <section className="register-page section-b-space">
                    <div className="container">
                        <div className="row">
                            <div className="col-lg-12">
                                <h3>create account</h3>
                                <div className="theme-card">
                                    <form className="theme-form">
                                        <div className="form-row">
                                            <div className="col-md-6">
                                                <label htmlFor="email">Full Name</label>
                                                <input type="text" name="fullName" onChange={this.onUpdateFormValue} className="form-control" id="fname"
                                                    placeholder="First Name" required="" />
                                            </div>
                                            <div className="col-md-6">
                                                <label htmlFor="email">Mobile</label>
                                                <input type="text" name="mobile" onChange={this.onUpdateFormValue} className="form-control" id="fname"
                                                    placeholder="Phone" required="" />
                                            </div>
                                        </div>
                                        <div className="form-row">
                                            <div className="col-md-6">
                                                <label htmlFor="email">email</label>
                                                <input type="text" name="email" onChange={this.onUpdateFormValue} className="form-control" id="email"
                                                    placeholder="Email" required="" />
                                            </div>
                                            <div className="col-md-6">
                                                <label htmlFor="review">Password</label>
                                                <input type="password" name="password" onChange={this.onUpdateFormValue} className="form-control" id="review"
                                                    placeholder="Enter your password" required="" />
                                            </div>
                                            <a onClick={this.registerCustomer} className="btn btn-solid">create Account</a>
                                        </div>
                                    </form>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>

            </div>
        )
    }
}

export default Register