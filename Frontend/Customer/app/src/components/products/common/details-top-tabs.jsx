import React, { Component } from 'react';
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import 'react-tabs/style/react-tabs.scss';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Baseurl from '../../../api/url';
import {submitReviewService} from '../../../services/userService';

class DetailsTopTabs extends Component {

    constructor(props) {
        super(props);
        const customerDetails = JSON.parse(localStorage.getItem('customerDetails'))
        super(props)
        this.state = {
            customerDetails: (customerDetails) ? customerDetails : {
                email: ''
            },
            defaultImage: "https://www.mnn.com/static/img/not_available.png",
            review: '',
            reviewTitle: '',
            startRating: ''
        }
        this.onUpdateChange = this.onUpdateChange.bind(this);
    }

    async submitReview(){
      try{
        const response = await submitReviewService(this.state.customerDetails._id,{
            "title": this.state.reviewTitle,
            "review": this.state.review,
            "byUser": (this.state.customerDetails._id) ? this.state.customerDetails._id : 'Guest123',
            "startRating": (this.state.startRating)?this.state.startRating : "5",
            "productId": this.props.item._id,
            "productName": this.props.item.productName,
            "productImage": this.props.item.productImage,
            "vendorId": this.props.item.vendorId._id,
            "vendorName": this.props.item.vendorId.fullName
        });
                toast.success("Thanks For Review");
                this.setState({
                    reviewTitle: '',
                    review: ''
                })
            }catch(error){
                console.log(error);
            };
    }

    onUpdateChange(e) {
        this.setState({
            [e.target.name]: e.target.value
        })
    }


    setStatus = (e) => {
        this.setState({
            startRating: e.target.value
        })
    }


    render() {
        const { item } = this.props
        return (
            <section className="tab-product m-0">
                <div className="row">
                    <div className="col-sm-12 col-lg-12">
                        <Tabs className="tab-content nav-material">
                            <TabList className="nav nav-tabs nav-material">
                                <Tab className="nav-item">
                                    <span className="nav-link active">
                                        <i className="icofont icofont-ui-home"></i>Description</span>
                                    <div className="material-border"></div>
                                </Tab>
                                <Tab className="nav-item">
                                    <span className="nav-link" ><i className="icofont icofont-man-in-glasses"></i>Details</span>
                                    <div className="material-border"></div>
                                </Tab>
                                <Tab className="nav-item">
                                    <span className="nav-link" >
                                        <i className="icofont icofont-contacts"></i>Vendor</span>
                                    <div className="material-border"></div>
                                </Tab>
                                <Tab className="nav-item">
                                    <span className="nav-link" >
                                        <i className="icofont icofont-contacts"></i>Write Review</span>
                                    <div className="material-border"></div>
                                </Tab>
                            </TabList>
                            <TabPanel className="tab-pane fade mt-4 show active">
                                <table className="table table-striped mb-0">
                                    <tbody>
                                        <tr>
                                            <th>Brand:</th>
                                            <td>{this.props.item.brandName}</td>
                                        </tr>
                                        <tr>
                                            <th>Model :</th>
                                            <td>{this.props.item.modelNo}</td>
                                        </tr>
                                        <tr>
                                            <th>Size :</th>
                                            <td>{this.props.item.attributes.size}</td>
                                        </tr>
                                        <tr>
                                            <th>Type :</th>
                                            <td>{this.props.item.attributes.Material_type}</td>
                                        </tr>
                                        <tr>
                                            <th>color :</th>
                                            <td>{this.props.item.attributes.color}</td>
                                        </tr>
                                        <tr>
                                            <th>Category :</th>
                                            <td>{this.props.item.category}</td>
                                        </tr>

                                    </tbody>
                                </table>
                            </TabPanel>
                            <TabPanel>
                                <p className="mt-4 p-0">
                                    <td>{this.props.item.productDescription}</td>
                                </p>
                            </TabPanel>
                            <TabPanel>
                                <table className="table table-striped mb-0">
                                    <tbody>
                                        <tr>
                                            <th>
                                                Vendor Name :
                                            </th>
                                            <td>{this.props.item.vendorId.fullName}</td>
                                        </tr>
                                        <tr>
                                            <th>
                                                Business Category :
                                            </th>
                                            <td>{(this.props.item.vendorId.business_category) ? this.props.item.vendorId.business_category : 'NA'}</td>
                                        </tr>
                                    </tbody>
                                </table>
                            </TabPanel>
                            <TabPanel>
                                {/* <form className="theme-form mt-4"> */}
                                <div className="form-row">
                                    <div className="col-md-12 ">
                                        <div className="media m-0">
                                            <label>Rating</label>

                                            <div className="media-body ml-3">
                                                {/* <div className="rating three-star">
                                                        <i className="fa fa-star"></i>
                                                        <i className="fa fa-star"></i>
                                                        <i className="fa fa-star"></i>
                                                        <i className="fa fa-star"></i>
                                                        <i className="fa fa-star"></i>
                                                    </div> */}
                                                <ul className="rating">
                                                    <li> <span className="ratingSelector">
                                                        <input type="radio" name="ratings[1]" id="Degelijkheid-1-5" onClick={this.setStatus} value="1" className="radio" />
                                                        <label className="full" htmlFor="Degelijkheid-1-5"></label>
                                                        <input type="radio" name="ratings[1]" id="Degelijkheid-2-5" onClick={this.setStatus} value="2" className="radio" />
                                                        <label className="full" htmlFor="Degelijkheid-2-5"></label>
                                                        <input type="radio" name="ratings[1]" id="Degelijkheid-3-5" onClick={this.setStatus} value="3" className="radio" />
                                                        <label className="full" htmlFor="Degelijkheid-3-5"></label>
                                                        <input type="radio" name="ratings[1]" id="Degelijkheid-4-5" onClick={this.setStatus} value="4" className="radio" />
                                                        <label className="full" htmlFor="Degelijkheid-4-5"></label>
                                                        <input type="radio" name="ratings[1]" id="Degelijkheid-5-5" onClick={this.setStatus} value="5" className="radio" />
                                                        <label className="full" htmlFor="Degelijkheid-5-5"></label>
                                                    </span>
                                                    </li>
                                                </ul>
                                            </div>
                                        </div>
                                    </div>
                                    {/* <div className="col-md-6">
                                            <label htmlFor="name">Name</label>
                                            <input type="text" className="form-control" id="name" placeholder="Enter Your name" required />
                                        </div> */}
                                    <div className="col-md-6">
                                        <label htmlFor="email">Email</label>
                                        <input type="text" className="form-control" defaultValue={this.state.customerDetails.email} id="email" placeholder="Email" required />
                                    </div>
                                    <div className="col-md-12">
                                        <label htmlFor="review">Review Title</label>
                                        <input type="text" className="form-control" onChange={this.onUpdateChange} name="reviewTitle" value={this.state.reviewTitle} placeholder="Enter your Review Subjects" required />
                                    </div>
                                    <div className="col-md-12">
                                        <label htmlFor="review">Review Content </label>
                                        <textarea className="form-control" name="review" value={this.state.review} onChange={this.onUpdateChange} placeholder="Wrire Your Review Here" id="exampleFormControlTextarea1" rows="6"></textarea>
                                    </div>

                                </div>
                                <button className="btn" onClick={this.submitReview} type="submit">Submit YOur Review</button>

                            </TabPanel>
                        </Tabs>
                    </div>
                </div>
            </section>
        )
    }
}

export default DetailsTopTabs;