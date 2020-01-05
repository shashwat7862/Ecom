import React, { Component } from 'react'
import Baseurl from '../../../assets/data/urls';

export class User_panel extends Component {
    constructor(props) {
        super(props)
        let vendorData = JSON.parse(localStorage.getItem('vendorDetails'));
        this.state = {
            vendorData: vendorData,
            defaultImage:"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSnNMyzD6j0LEKXxS5wo3OtC-P6gMK0KVbnPoBEvD4MutaKT4n3Dw&s"
        }
    }

    render() {
        return (
            <div>
                <div className="sidebar-user text-center">
                    <div><img className="img-60 rounded-circle lazyloaded blur-up" src={(this.state.vendorData)?(this.state.vendorData.VendorImage != "") ? Baseurl+'/'+this.state.vendorData.VendorImage : this.state.defaultImage : this.state.defaultImage} alt="#" />
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

