import React, { Component,Fragment } from 'react'
import {Link} from 'react-router-dom'
import { Redirect } from 'react-router'
//images import
import man from '../../../assets/images/dashboard/man.png'
export class User_menu extends Component {

    constructor(props){
        super(props)

        this.state = {
            redirect: false
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
          return <Redirect to='/Admin/auth/login'/>;
        }


        return (
            <Fragment>

                
                    <li className="onhover-dropdown">
                        <div className="media align-items-center">
                            <img className="align-self-center pull-right img-50 rounded-circle blur-up lazyloaded" src={"https://previews.123rf.com/images/kraft2727/kraft27271412/kraft2727141200018/34583214-logo-admin-icon-administrator-illustration-of-a-man-in-a-jacket-and-shirt-ties-jacket-and-shirt-.jpg"} alt="header-user" />
                            {/* <div className="dotted-animation"><span className="animate-circle"></span><span className="main-circle"></span></div> */}
                        </div>
                        <ul className="profile-dropdown onhover-show-div p-20 profile-dropdown-hover">
                            {/* <li><Link to={`${process.env.PUBLIC_URL}/settings/profile`} ><i data-feather="user"></i>Edit Profile</Link></li> */}
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
