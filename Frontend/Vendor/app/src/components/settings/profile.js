import React, { Component ,Fragment} from 'react'

import designer from '../../assets/images/dashboard/designer.jpg';
import Tabset_profile from './tabset-profile';
import Breadcrumb from '../common/breadcrumb';

export class Profile extends Component {

    constructor(props){
        super(props);
        this.state = {
            vendorData : JSON.parse(localStorage.getItem('vendorDetails'))
        }
    }
    render() {
        console.log(this.state,"this state")
        return (
            <Fragment>
                <Breadcrumb title="Profile" parent="Settings" />
                 <div className="container-fluid">
                <div className="row">
                    <div className="col-xl-4">
                        <div className="card">
                            <div className="card-body">
                                <div className="profile-details text-center">
                                    <img src={designer} alt="" className="img-fluid img-90 rounded-circle blur-up lazyloaded" />
                                    <h5 className="f-w-600 f-16 mb-0">{this.state.fullName}</h5>
                                    <span>{this.state.vendorData.email}</span>
                                    <div className="social">
                                        <div className="form-group btn-showcase">
                                            <button className="btn social-btn btn-fb d-inline-block"> <i className="fa fa-facebook"></i></button>
                                            <button className="btn social-btn btn-twitter d-inline-block"><i className="fa fa-google"></i></button>
                                            <button className="btn social-btn btn-google d-inline-block mr-0"><i className="fa fa-twitter"></i></button>
                                        </div>
                                    </div>
                                </div>
                                <hr />
                                <div className="project-status">
                                    {/* <h5 className="f-w-600 f-16">Employee Status</h5> */}
                                    <div className="media">
                                        {/* <div className="media-body">
                                            <h6>Performance <span className="pull-right">80%</span></h6>
                                            <div className="progress sm-progress-bar">
                                                <div className="progress-bar bg-primary" role="progressbar" style={{width: '90%'}} aria-valuenow="25" aria-valuemin="0" aria-valuemax="100"></div>
                                            </div>
                                        </div> */}
                                    </div>
                                    <div className="media">
                                        {/* <div className="media-body">
                                            <h6>Overtime <span className="pull-right">60%</span></h6>
                                            <div className="progress sm-progress-bar">
                                                <div className="progress-bar bg-secondary" role="progressbar" style={{width: '60%'}} aria-valuenow="25" aria-valuemin="0" aria-valuemax="100"></div>
                                            </div>
                                        </div> */}
                                    </div>
                                    <div className="media">
                                        {/* <div className="media-body">
                                            <h6>Leaves taken <span className="pull-right">50%</span></h6>
                                            <div className="progress sm-progress-bar">
                                                <div className="progress-bar bg-danger" role="progressbar" style={{width: '50%'}} aria-valuenow="25" aria-valuemin="0" aria-valuemax="100"></div>
                                            </div>
                                        </div> */}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="col-xl-8">
                        <div className="card profile-card">
                            <div className="card-body">
                                <Tabset_profile />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            </Fragment>
        )
    }
}

export default Profile
