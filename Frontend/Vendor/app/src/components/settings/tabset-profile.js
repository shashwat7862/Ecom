import React, { Component } from 'react';
import { Tabs, TabList, TabPanel, Tab } from 'react-tabs';
import { User, Settings } from 'react-feather';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import { EditVendorProfile } from '../../Action/ProfileAction';
import { connect } from 'react-redux';

export class Tabset_profile extends Component {

    constructor(props) {
        let vendorData = JSON.parse(localStorage.getItem('vendorDetails'));


        super(props);
        this.state = {
            id: vendorData._id,
            email: vendorData.email,
            mobile: vendorData.mobile,
            fullName: vendorData.fullName,
            Gender: vendorData.Gender,
            DOB: vendorData.DOB,
            country: vendorData.country,
            account_no: vendorData.account_no,
            business_name: vendorData.business_name,
            business_category: vendorData.business_category,
            GST_number: vendorData.GST_number,
            Pan_number: vendorData.Pan_number,
            vendorData: vendorData,
            enableEditSection: false,

        }
        this.onUpdateChange = this.onUpdateChange.bind(this);
        this.enable_edit = this.enable_edit.bind(this);
        this.cencelEdit = this.cencelEdit.bind(this);
        this.edit_Profile_vendor = this.edit_Profile_vendor.bind(this);
    }

    componentWillReceiveProps(nextProps, ) {
        console.log("nextProps------->>", nextProps)
        if (this.props !== nextProps) {
            console.log(nextProps.editProfileResult.length > 0 ,"nextProps.editProfileResult.length", nextProps.editProfileResult.length)
                console.log(nextProps.editProfileResult,"nextProps.editProfileResult")
                console.log("inside in")
                localStorage.setItem('vendorDetails',JSON.stringify(nextProps.editProfileResult));
            }

            toast.success("Profile Edited Successfully");
            this.setState({
                enableEditSection: false
            })

            setTimeout(function(){
                window.location.reload()
            },1000)
        
    }



    enable_edit() {
        this.setState({
            enableEditSection: true
        })

    }

    edit_Profile_vendor() {
        this.props.Edit_Profile({
            email: this.state.email,
            mobile: this.state.mobile,
            fullName: this.state.fullName,
            Gender: this.state.Gender,
            DOB: this.state.DOB,
            country: this.state.country,
            account_no: this.state.account_no,
            IFSC: this.state.IFSC,
            business_name: this.state.business_name,
            business_category: this.state.business_category,
            GST_number: this.state.GST_number,
            Pan_number: this.state.Pan_number,
        }, this.state.id)
    }

    cencelEdit() {
        this.setState({
            enableEditSection: false
        })
    }


    onUpdateChange(e) {
        console.log(e.target.name, e.target.value, "change");


        this.setState({
            [e.target.name]: e.target.value
        })
    }


    render() {

        return (
            <div>
                <Tabs>
                    <div style={{ float: 'right' }}>
                        <span onClick={() => {
                            this.enable_edit()

                        }}><i className="fa fa-pencil" style={{ width: 35, fontSize: 20, padding: 11, color: 'rgb(40, 167, 69)' }}></i></span>
                        {this.state.enableEditSection ? <span onClick={() => { this.cencelEdit() }}><i className="fa fa-remove" style={{ width: 35, fontSize: 20, padding: 11 }}></i></span> : null}


                    </div>
                    <TabList className="nav nav-tabs tab-coupon" >
                        <Tab className="nav-link"><User className="mr-2" />Profile</Tab>
                        <Tab className="nav-link"><Settings className="mr-2" />Business</Tab>
                    </TabList>
                    <ToastContainer />
                    <TabPanel>
                        <div className="tab-pane fade show active">
                            <h5 className="f-w-600 f-16">Profile</h5>
                            <div className="table-responsive profile-table">
                                <table className="table table-responsive">
                                    <tbody>
                                        <tr>
                                            <td>Full Name:</td>
                                            {this.state.enableEditSection ? <td><input className="form-control" name="fullName" onChange={this.onUpdateChange} value={this.state.fullName} id="validationCustom01" type="text" required="" /></td> : <td>{(this.state.fullName) ? this.state.fullName : 'NA'}</td>}


                                        </tr>

                                        <tr>
                                            <td>Email:</td>
                                            {this.state.enableEditSection ? <td><input className="form-control" name="email" onChange={this.onUpdateChange} value={this.state.email} id="validationCustom01" type="text" required="" /></td> : <td>{(this.state.email) ? this.state.email : 'NA'}</td>}
                                        </tr>
                                        <tr>
                                            <td>Gender:</td>
                                            {this.state.enableEditSection ? <td><input className="form-control" name="Gender" onChange={this.onUpdateChange} value={this.state.Gender} id="validationCustom01" type="text" required="" /></td> : <td>{(this.state.Gender) ? this.state.Gender : 'NA'}</td>}
                                        </tr>
                                        <tr>
                                            <td>Mobile Number:</td>
                                            {this.state.enableEditSection ? <td><input className="form-control" name="mobile" onChange={this.onUpdateChange} value={this.state.mobile} id="validationCustom01" type="text" required="" /></td> : <td>{(this.state.mobile) ? this.state.mobile : 'NA'}</td>}
                                        </tr>
                                        <tr>
                                            <td>DOB:</td>
                                            {this.state.enableEditSection ? <td><input className="form-control" name="DOB" onChange={this.onUpdateChange} value={this.state.DOB} id="validationCustom01" type="text" required="" /></td> : <td>{(this.state.DOB) ? this.state.DOB : 'NA'}</td>}
                                        </tr>
                                        <tr>
                                            <td>Location:</td>
                                            {this.state.enableEditSection ? <td><input className="form-control" name="country" onChange={this.onUpdateChange} value={this.state.country} id="validationCustom01" type="text" required="" /></td> : <td>{(this.state.country) ? this.state.country : 'NA'}</td>}
                                        </tr>
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </TabPanel>
                    <TabPanel>
                        {/* <div className="tab-pane fade"> */}
                        <div className="account-setting">

                            <div className="tab-pane fade show active">
                                <h5 className="f-w-600 f-16">Bank</h5>
                                <div className="table-responsive profile-table">
                                    <table className="table table-responsive">
                                        <tbody>
                                            <tr>
                                                <td>Account Number</td>
                                                {this.state.enableEditSection ? <td><input className="form-control" name="account_no" onChange={this.onUpdateChange} value={this.state.account_no} id="validationCustom01" type="text" required="" /></td> : <td>{(this.state.account_no) ? this.state.account_no : 'NA'}</td>}
                                            </tr>

                                            <tr>
                                                <td>IFSC Code:</td>
                                                {this.state.enableEditSection ? <td><input className="form-control" name="IFSC" onChange={this.onUpdateChange} value={this.state.IFSC} id="validationCustom01" type="text" required="" /></td> : <td>{(this.state.IFSC) ? this.state.IFSC : 'NA'}</td>}

                                            </tr>
                                            <br></br>
                                            <h5 className="f-w-600 f-16">Business</h5>
                                            <tr>
                                                <td>Business Name:</td>
                                                {this.state.enableEditSection ? <td><input className="form-control" name="business_name" onChange={this.onUpdateChange} value={this.state.business_name} id="validationCustom01" type="text" required="" /></td> : <td>{(this.state.business_name) ? this.state.business_name : 'NA'}</td>}
                                            </tr>
                                            <tr>
                                                <td>Business Category:</td>
                                                {this.state.enableEditSection ? <td><input className="form-control" name="business_category" onChange={this.onUpdateChange} value={this.state.business_category} id="validationCustom01" type="text" required="" /></td> : <td>{(this.state.business_category) ? this.state.business_category : 'NA'}</td>}
                                            </tr>
                                            <tr>
                                                <td>GST Number:</td>
                                                {this.state.enableEditSection ? <td><input className="form-control" name="GST_number" onChange={this.onUpdateChange} value={this.state.GST_number} id="validationCustom01" type="text" required="" /></td> : <td>{(this.state.GST_number) ? this.state.GST_number : 'NA'}</td>}
                                            </tr>
                                            <tr>
                                                <td>Pan Number:</td>
                                                {this.state.enableEditSection ? <td><input className="form-control" name="Pan_number" onChange={this.onUpdateChange} value={this.state.Pan_number} id="validationCustom01" type="text" required="" /></td> : <td>{(this.state.Pan_number) ? this.state.Pan_number : 'NA'}</td>}
                                            </tr>

                                        </tbody>
                                    </table>
                                </div>
                            </div>
                        </div>
                    </TabPanel>
                    {this.state.enableEditSection ? <input type="submit" className="btn btn-success" value="Edit Profile" onClick={this.edit_Profile_vendor} ></input> : null}

                </Tabs>
            </div>
        )
    }
}




const mapStateToProps = (state) => {
    console.log("state---------mapto", state);
    return {
        editProfileResult: (state.ProfileReducer != "") ? state.ProfileReducer.object.object : []
    }
};

const mapDispatchToProps = (dispatch) => {
    return {
        Edit_Profile: (payload, vendorId) => { dispatch(EditVendorProfile(payload, vendorId)) }

    }
}


export default connect(mapStateToProps, mapDispatchToProps)(Tabset_profile);