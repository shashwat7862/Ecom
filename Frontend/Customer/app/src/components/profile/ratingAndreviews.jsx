import React, { Component, Fragment } from 'react'
import Breadcrumb from '../common/breadcrumb';
import ReactTable from 'react-table';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import 'react-table/react-table.css';
import Baseurl from '../../api/url'
import { getReviews } from '../../services/userService';

export class RatingAndReviews extends Component {

    constructor(props) {
        const customerDetails = JSON.parse(localStorage.getItem('customerDetails'))
        super(props)
        this.state = {
            customerDetails: customerDetails,
            reviewList: [{}],

        };

    }

    async  fetchReviewsList(data) {
        const list = await getReviews(this.state.customerDetails._id);
        console.log(list,"list")
        this.setState({
            reviewList: list.data.object.object.reviewList
        })
    }

    componentDidMount() {
        this.fetchReviewsList()
    }




    render() {
        console.log(this.state, "this.state-------------------------------render");
        console.log(this.props, "this.props-------------------------------render");

        const columns = [{
            Header: 'Title',
            accessor: 'title',
            style: {
                "textAlign": "center"
            },
            minWidth: 40
        },
       {
            Header: 'Review',
            accessor: 'review',
            style: {
                "textAlign": "center"
            },
            minWidth: 120
        }, {
            Header: 'Rating',
            accessor: 'startRating',
            style: {
                "textAlign": "center"
            },
            minWidth: 20
        }, {
            Header: 'Product Name',
            accessor: 'productName',
            style: {
                "textAlign": "center"
            },
            minWidth: 35
        }, {
            Header: 'Image',
            accessor: 'productImage',
            style: {
                "textAlign": "center"
            },
            minWidth: 30
        }, {
            Header: "Date",
            accessor: 'createdAt',
            style: {
                "textAlign": "center"
            },
            minWidth: 60
        }, {
            Header: 'Action',
            Cell: (props) => (
                <div>
                    <span onClick={() => {
                        if (window.confirm('Are you sure you wish to delete this item?')) {
                            this.deleteProduct(props)
                        }


                    }}>
                        <i className="fa fa-eye" style={{ width: 35,  padding: 11, color: '#e4566e' }}
                        ></i>
                    </span>

                    <span onClick={() => {
                        this.editProductData(props)

                    }}><i className="fa fa-pencil" style={{ width: 35, fontSize: 20, padding: 11, color: 'rgb(40, 167, 69)' }}></i></span>
                </div>
            ),
            style: {
                "textAlign": "center"
            },
            minWidth: 50
        }];

        return (
            <Fragment>
                <ToastContainer />
                <br></br><br></br><br></br><br></br><br></br>
                <Breadcrumb  title={'Ratings And Reviews'} />
                <div className="container-fluid">
                    <div className="row">
                        <div className="col-sm-12">
                            <div className="card">
                                <div className="card-body">

                                    <div className="clearfix"></div>
                                    <div id="basicScenario" className="product-physical">
                                        <ReactTable
                                            data={this.state.reviewList}
                                            columns={columns}
                                            defaultPageSize={7}
                                            noDataText={"Please Add Products to see the Product List"}
                                        />

                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </Fragment>
        )
    }
}




export default RatingAndReviews;
