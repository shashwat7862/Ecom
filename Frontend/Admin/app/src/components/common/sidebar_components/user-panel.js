import React, { Component } from 'react'
import man from '../../../assets/images/dashboard/man.png'

export class User_panel extends Component {
    constructor(props) {
        super(props)
        let vendorData = JSON.parse(localStorage.getItem('vendorDetails'));
        this.state = {
            vendorData: vendorData
        }
    }

    render() {
        return (
            <div>
                <div className="sidebar-user text-center">
                    <div><img className="img-60 rounded-circle lazyloaded blur-up" src={"https://previews.123rf.com/images/kraft2727/kraft27271412/kraft2727141200018/34583214-logo-admin-icon-administrator-illustration-of-a-man-in-a-jacket-and-shirt-ties-jacket-and-shirt-.jpg"} alt="#" />
                    </div>
                    <h6 className="mt-3 f-14">Admin</h6>
                    <h6 className="mt-3 f-14">Admin@weshop.com</h6>
                    {/* <p>general manager.</p> */}
                </div>
            </div>
        )
    }
}

export default User_panel

