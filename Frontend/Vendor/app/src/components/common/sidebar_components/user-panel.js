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
                    <div><img className="img-60 rounded-circle lazyloaded blur-up" src={man} alt="#" />
                    </div>
                    <h6 className="mt-3 f-14">{this.state.vendorData.fullName}</h6>
                    <h6 className="mt-3 f-14">{this.state.vendorData.email}</h6>
                    {/* <p>general manager.</p> */}
                </div>
            </div>
        )
    }
}

export default User_panel

