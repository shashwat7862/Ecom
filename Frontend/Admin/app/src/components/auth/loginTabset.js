import React, { Component, Fragment } from 'react';
import { Tabs, TabList, TabPanel, Tab } from 'react-tabs';
import { User, Unlock } from 'react-feather';
import { withRouter } from 'react-router-dom';
import axios from 'axios';

export class LoginTabset extends Component {
    constructor(props) {
        super(props);
        this.state = {
            activeShow: true,
            startDate: new Date(),
            email: '',
            password: '',
            mobile: null
        }
        this.handleChange = this.handleChange.bind(this);
        this.registerVendor = this.registerVendor.bind(this)

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
            })
            .catch(error => {
                console.log(error);
            });

    }

    // routeChange = () => {
    //     this.props.history.push(`${process.env.PUBLIC_URL}/dashboard`);
    // }
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
                            <form className="form-horizontal auth-form">
                                <div className="form-group">
                                    <input required="" name="email" type="email" className="form-control" placeholder="Username" id="exampleInputEmail1" />
                                </div>
                                <div className="form-group">
                                    <input required="" name="password" type="password" className="form-control" placeholder="Password" />
                                </div>
                                <div className="form-terms">
                                    <div className="custom-control custom-checkbox mr-sm-2">
                                        <input type="checkbox" className="custom-control-input" id="customControlAutosizing" />
                                        <label className="d-block">
                                            <input className="checkbox_animated" id="chk-ani2" type="checkbox" />
                                            Reminder Me <span className="pull-right"> <a href="#" className="btn btn-default forgot-pass p-0">lost your password</a></span>
                                        </label>
                                    </div>
                                </div>
                                {/* <div className="form-button"> */}
                                <button className="btn btn-primary" type="submit" onClick={this.registerVendor}>Login</button>
                                {/* </div> */}
                                <div className="form-footer">
                                    <span>Or Login up with social platforms</span>
                                    <ul className="social">
                                        <li><a className="fa fa-facebook" href=""></a></li>
                                        <li><a className="fa fa-twitter" href=""></a></li>
                                        <li><a className="fa fa-instagram" href=""></a></li>
                                        <li><a className="fa fa-pinterest" href=""></a></li>
                                    </ul>
                                </div>
                            </form>
                        </TabPanel>
                        <TabPanel>
                            <br></br>
                            <div className="input-group">
                                <div className="input-group-prepend">
                                    <span className="input-group-text">Email</span>
                                </div>
                                <input type="text" name="email" className="form-control" placeholder="Email" onChange={this.onUpdateFormValue} aria-label="First name" className="form-control" />
                            </div>
                            <br />

                            <div className="input-group">
                                <div className="input-group-prepend">
                                    <span className="input-group-text">Password &nbsp;&nbsp;&nbsp;&nbsp;</span>
                                </div>
                                <input type="text" name="password" className="form-control" placeholder="Password" onChange={this.onUpdateFormValue} aria-label="First name" className="form-control" />
                            </div><br />

                            <div className="input-group">
                                <div className="input-group-prepend">
                                    <span className="input-group-text">Phone &nbsp;&nbsp;&nbsp;&nbsp;</span>
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

