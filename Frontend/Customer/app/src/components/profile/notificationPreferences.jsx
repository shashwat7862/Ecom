import React, { Component, Fragment } from 'react'
import Breadcrumb from '../common/breadcrumb';
import ReactTable from 'react-table';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import 'react-table/react-table.css';
import Baseurl from '../../api/url'
import { getAddressService } from '../../services/userService';
import { css } from 'glamor';


export class NotificationPreferences extends Component {

    constructor(props) {
        const customerDetails = JSON.parse(localStorage.getItem('customerDetails'))
        super(props)
        this.state = {
            customerDetails: customerDetails,
            AddressList: [{}],

        };
    }

    saveSettings = () => {
        toast.success("Settings Has been Saved", {
            position: toast.POSITION.TOP_CENTER,
            autoClose:2000,
            draggablePercent: 60,
            hideProgressBar:true,
            bodyClassName:css({
                height: '24px',
                fontSize: '16px'
              }),
          });
    }


    render() {
        
        return (
            <Fragment>
                <br></br><br></br><br></br><br></br><br></br>
                <Breadcrumb title={'Notification Preferences'} />
                <div className="container-fluid">
                    <div className="row">
                        <div className="col-sm-12">
                            <div className="col-sm-6">
                                <br></br>
                                <span><b>Newsletter Subscription :</b></span><br>
                                </br>
                                <input type="radio"></input>&nbsp;YES &nbsp;&nbsp;&nbsp;
                            <input type="radio"></input>&nbsp;NO
                            <br></br><br></br>

                                <input type="button" className="btn btn-default" onClick={this.saveSettings} value="Submit" />
                            </div>
                            <br></br><br></br><br></br><br></br><br></br>
                        </div>
                    </div>
                </div>



            </Fragment>
        )
    }
}




export default NotificationPreferences;
