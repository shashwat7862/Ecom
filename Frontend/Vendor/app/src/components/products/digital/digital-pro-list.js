import React, { Component, Fragment } from 'react'
import Breadcrumb from '../../common/breadcrumb';
import ReactTable from 'react-table';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Baseurl from '../../../assets/data/urls'
import { productList, searchProducts } from '../../../Action/ProductAction';
import { connect } from 'react-redux';
import axios from 'axios';
import Switch from "react-switch";

export class Digital_pro_list extends Component {

    constructor(props) {
        super(props);
        this.state = {
            ProductsList: [{}],
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
        this.props.getProductList(this.state.vendorData._id, checked)

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
                this.props.getProductList();
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
        this.props.getProductList(this.state.vendorData._id, true)
    }




    render() {
        console.log(this.state, "this.state-------------------------------render");
        console.log(this.props, "this.props-------------------------------render");

        const columns = [{
            Header: 'ID',
            accessor: '_id',
            style: {
                "textAlign": "center"
            },
            minWidth: 40
        },
        {
            Header: 'Image',
            Cell: props => (
                <div>
                    <img className="img-responsive" style={{ height: 50 + 'px', width: 50 + 'px' }} src={(props.original.productImage !== "") ? Baseurl + "/" + props.original.productImage : this.state.defaultImage} />
                </div>
            ),
            minWidth: 45
        }, {
            Header: 'Product Name',
            accessor: 'productName',
            style: {
                "textAlign": "center"
            },
            minWidth: 50
        }, {
            Header: 'Brand',
            accessor: 'brandName',
            style: {
                "textAlign": "center"
            },
            minWidth: 50
        }, {
            Header: 'TotalStock ',
            accessor: 'inStockCount',
            sortable: false,
            style: {
                "textAlign": "center"
            },
            minWidth: 60
        }, {
            Header: 'Available/Sold',
            Cell: props => (
                <div>
                    <span style={{ color: 'green' }}>{props.original.inStockCount - props.original.orderCount}</span>&nbsp;&nbsp;/&nbsp;&nbsp;<span style={{ color: 'red' }}>{props.original.orderCount}</span>
                </div>
            ),
            sortable: false,
            style: {
                "textAlign": "center"
            },
            minWidth: 80
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
                        <i className="fa fa-trash" style={{ width: 35, fontSize: 20, padding: 11, color: '#e4566e' }}
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
                <Breadcrumb title="Product List" parent="Digital" />
                <div className="container-fluid">
                    <div className="row">
                        <div className="col-sm-12">
                            <div className="card">
                                <div className="card-body">

                                    <span> <Switch onChange={this.handleChange} checked={this.state.checked} uncheckedIcon="" /></span>
                                    <br></br><br></br>
                                    <input type="text" onChange={this.onSearch} placeholder="Search" className="form-control" />
                                    <div className="clearfix"></div>
                                    <div id="basicScenario" className="product-physical">
                                        <ReactTable
                                            data={(typeof this.props.ProductsList == 'object') ? this.props.ProductsList : []}
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
        ProductsList: (state.ProductReducer != "" && state.ProductReducer.object.object && Array.isArray(state.ProductReducer.object.object) && !state.ProductReducer.object.object.hasOwnProperty('Details')) ? state.ProductReducer.object.object : [{}]
    }
};

const mapDispatchToProps = (dispatch) => {
    return {
        getProductList: (vendor_id, isApproved) => { dispatch(productList(vendor_id, isApproved)) },
        productSearch: (query, vendor_id) => { dispatch(searchProducts(query, vendor_id)) }
    }
}


export default connect(mapStateToProps, mapDispatchToProps)(Digital_pro_list);
