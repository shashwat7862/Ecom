import React, { Component, Fragment } from 'react';
import { Tabs, TabList, TabPanel, Tab } from 'react-tabs';
import { User, Unlock } from 'react-feather';
import { withRouter } from 'react-router-dom';
import axios from 'axios';
import FacebookLogin from 'react-facebook-login';
import { GoogleLogin } from 'react-google-login';

import * as actionCreator from '../../Action/LoginAction';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


export class LoginTabset extends Component {
    constructor(props) {
        super(props);
        this.state = {
            loginEmail: '',
            loginPassword: null,
        }
        this.loginAdmin = this.loginAdmin.bind(this);
        this.onUpdateChange = this.onUpdateChange.bind(this);
    }

    
   
    loginAdmin() {
        console.log(this.state)
        if(this.state.loginEmail == "admin@gmail.com" && this.state.loginPassword =="admin@123"){
            toast.success("Successfully login");
            localStorage.setItem('auth', JSON.stringify({
                email: this.state.loginEmail
            }))
             this.props.history.push(`${process.env.PUBLIC_URL}/products/digital/digital-product-list`);
        }
    }

    onUpdateChange(e) {
        console.log(e.target.name, e.target.value, "change")
        this.setState({
            [e.target.name]: e.target.value
        })
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
                            {/* <Tab className="nav-link" onClick={(e) => this.clickActive(e)}><Unlock />Register</Tab> */}
                        </TabList>

                        <TabPanel>
                            <div className="input-group">
                                <div className="input-group-prepend">
                                </div>
                                <input type="text" name="loginEmail" className="form-control" placeholder="Email" onChange={this.onUpdateChange} aria-label="First name" className="form-control" />
                            </div>
                            <br />

                            <div className="input-group">
                                <div className="input-group-prepend">
                                </div>
                                <input type="text" name="loginPassword" className="form-control" placeholder="Password" onChange={this.onUpdateChange} aria-label="First name" className="form-control" />
                            </div>
                            <button onClick={this.loginAdmin} className='btn btn-primary' >Login With Email</button>
                            
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


