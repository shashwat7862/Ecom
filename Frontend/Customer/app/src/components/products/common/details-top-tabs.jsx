import React, { Component } from 'react';
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import 'react-tabs/style/react-tabs.scss';
import { Link } from 'react-router-dom'

class DetailsTopTabs extends Component {

    constructor(props) {
        super(props);
    }


    render() {
        const { item } = this.props
        console.log(item, "item-------------------details")
        console.log(item.price,"attributes")

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
                                <form className="theme-form mt-4">
                                    <div className="form-row">
                                        <div className="col-md-12 ">
                                            <div className="media m-0">
                                                <label>Rating</label>
                                                <div className="media-body ml-3">
                                                    <div className="rating three-star">
                                                        <i className="fa fa-star"></i>
                                                        <i className="fa fa-star"></i>
                                                        <i className="fa fa-star"></i>
                                                        <i className="fa fa-star"></i>
                                                        <i className="fa fa-star"></i>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="col-md-6">
                                            <label htmlFor="name">Name</label>
                                            <input type="text" className="form-control" id="name" placeholder="Enter Your name" required />
                                        </div>
                                        <div className="col-md-6">
                                            <label htmlFor="email">Email</label>
                                            <input type="text" className="form-control" id="email" placeholder="Email" required />
                                        </div>
                                        <div className="col-md-12">
                                            <label htmlFor="review">Review Title</label>
                                            <input type="text" className="form-control" id="review" placeholder="Enter your Review Subjects" required />
                                        </div>
                                        <div className="col-md-12">
                                            <label htmlFor="review">Review Title</label>
                                            <textarea className="form-control" placeholder="Wrire Your Testimonial Here" id="exampleFormControlTextarea1" rows="6"></textarea>
                                        </div>
                                        <div className="col-md-12">
                                            <button className="btn btn-solid" type="submit">Submit YOur Review</button>
                                        </div>
                                    </div>
                                </form>
                            </TabPanel>
                        </Tabs>
                    </div>
                </div>
            </section>
        )
    }
}

export default DetailsTopTabs;