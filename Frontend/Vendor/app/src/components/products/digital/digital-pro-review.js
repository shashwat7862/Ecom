import React, { Component, Fragment } from 'react'
import Breadcrumb from '../../common/breadcrumb';
import ReactTable from 'react-table';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Baseurl from '../../../assets/data/urls'
import { reviewList, searchProducts } from '../../../Action/ProductAction';
import { connect } from 'react-redux';
import axios from 'axios';
import Switch from "react-switch";

export class Digital_pro_review extends Component {

    constructor(props) {
        super(props);
        this.state = {
            reviewList: [{}],
            cols: ["productName", "Age"],
            isLoading: false,
            checked: true,
            defaultImage: "https://www.mnn.com/static/img/not_available.png",
            vendorData: JSON.parse(localStorage.getItem('vendorDetails'))
        };
        this.handleChange = this.handleChange.bind(this);

    }

    handleChange(checked) {
    console.log(checked)
        this.setState({
            checked
        });
        this.props.getReviewList()

    }


    responseFacebook(response) {
        console.log(response);
    }


    onSearch = (e) => {
        let searchQuery = e.target.value;
        this.props.productSearch(searchQuery, this.state.vendorData._id)
    }

    deleteProduct(data) {
        axios.delete(`${Baseurl}/api/v1/vendor/DeleteProduct/electronics/${data.original._id}`)
            .then(response => {
                toast.success("Successfully Deleted !");
                this.props.getReviewList();
                setTimeout(function () {
                    window.location.reload()
                }, 500)
            })
            .catch(error => {
                console.error(error);
                toast.error("Error Occurs !")
            });
    }

    editProductData(data) {
        console.log(JSON.stringify(data.original), "JSON.stringify(data.original)")
        this.props.history.push(`${process.env.PUBLIC_URL}/products/digital/digital-edit-product/${JSON.stringify(data.original)}`);
    }


    componentDidMount() {
        this.props.getReviewList()
    }




    render() {
        console.log(this.state, "this.state-------------------------------render");
        console.log(this.props, "this.props-------------------------------render");

        const columns = [{
            Header: 'Product ID',
            accessor: 'productId',
            style: {
                "textAlign": "center"
            },
            minWidth: 100
        },
        {
            Header: 'Image',
            Cell: props => (
                <div>
                    <img className="img-responsive" style={{ height: 50 + 'px', width: 50 + 'px' }} src={(props.original.productImage !== "") ? Baseurl + "/" + props.original.productImage : this.state.defaultImage} />
                </div>
            ),
            minWidth: 55
        }, {
            Header: 'Rating',
            accessor: 'startRating',
            style: {
                "textAlign": "center"
            },
            minWidth: 55
        }, {
            Header: 'Review',
            accessor: 'review',
            style: {
                "textAlign": "center"
            },
            minWidth: 90
        }, {
            Header: 'BY',
            accessor: 'byUser',
            sortable: false,
            style: {
                "textAlign": "center"
            },
            minWidth: 50
        }, {
            Header: "Vendor Name",
            accessor: 'vendorName',
            style: {
                "textAlign": "center"
            },
            minWidth: 60
        }];

        return (
            <Fragment>
                <ToastContainer />
                <Breadcrumb title="Product Reviews" parent="Digital" />
                <div className="container-fluid">
                    <div className="row">
                        <div className="col-sm-12">
                            <div className="card">
                                <div className="card-body">

                                    {/* <span> <Switch onChange={this.handleChange} checked={this.state.checked} uncheckedIcon="" /></span> */}
                                    {/* <br></br><br></br> */}
                                    {/* <input type="text" onChange={this.onSearch} placeholder="Search" className="form-control" /> */}
                                    <div className="clearfix"></div>
                                    <div id="basicScenario" className="product-physical">
                                        <ReactTable
                                            data={this.props.reviewList}
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


const mapStateToProps = (state) => {
    console.log("state---------mapto", state);
    return {
        reviewList: (state.ProductReducer != "" ) ? state.ProductReducer.object.object.reviewList : [{}]
    }
};

const mapDispatchToProps = (dispatch) => {
    return {
        getReviewList: () => { dispatch(reviewList()) },
        // productSearch: (query, vendor_id) => { dispatch(searchProducts(query, vendor_id)) }
    }
}


export default connect(mapStateToProps, mapDispatchToProps)(Digital_pro_review);
