import React, { Component,Fragment } from 'react'
import {Link} from 'react-router-dom'
import { Redirect } from 'react-router'
//images import
import man from '../../../assets/images/dashboard/man.png'
import Baseurl from '../../../assets/data/urls';
export class User_menu extends Component {

    constructor(props){
        super(props)

        this.state = {
            redirect: false,
            vendorData: JSON.parse(localStorage.getItem('vendorDetails')),
            defaultImage:"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSnNMyzD6j0LEKXxS5wo3OtC-P6gMK0KVbnPoBEvD4MutaKT4n3Dw&s"
          }

        this.logout = this.logout.bind(this)
    };


    logout(){
        localStorage.removeItem('authToken');
        this.setState({ redirect: true })

    }

    render() {

        const { redirect } = this.state;

        if (redirect) {
          return <Redirect to='/Vendor/auth/login'/>;
        }


        return (
            <Fragment>

                
                    <li className="onhover-dropdown">
                        <div className="media align-items-center">
                            <img className="align-self-center pull-right img-50 rounded-circle blur-up lazyloaded" src={(this.state.vendorData)?(this.state.vendorData.VendorImage != "") ? Baseurl+'/'+this.state.vendorData.VendorImage : this.state.defaultImage : this.state.defaultImage} alt="header-user" />
                            {/* <div className="dotted-animation"><span className="animate-circle"></span><span className="main-circle"></span></div> */}
                        </div>
                        <ul className="profile-dropdown onhover-show-div p-20 profile-dropdown-hover">
                            <li><Link to={`${process.env.PUBLIC_URL}/Vendor/settings/profile`} ><i data-feather="user"></i>Edit Profile</Link></li>
                            {/* <li><a href="javascript:void(0)"><i data-feather="mail"></i>Inbox</a></li> */}
                            {/* <li><a href="javascript:void(0)"><i data-feather="lock"></i>Lock Screen</a></li> */}
                            {/* <li><a href="javascript:void(0)"><i data-feather="settings"></i>Settings</a></li> */}
                            <li onClick={this.logout}><i data-feather="log-out"></i>Logout</li>
                        </ul>
                    </li>
            </Fragment>
        )
    }
}

export default User_menu
