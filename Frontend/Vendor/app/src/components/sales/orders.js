import React, { Component, Fragment } from 'react'
import Breadcrumb from '../common/breadcrumb';
import ReactTable from 'react-table';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Baseurl from '../../assets/data/urls'
import { orderList } from '../../Action/ProductAction';
import { connect } from 'react-redux';
import Select from 'react-select';
import axios from 'axios';
import { css } from 'glamor';

export class Orders extends Component {

    constructor(props) {
        super(props);
        this.state = {
            orderList: [{}],
            isLoading: false,
            selectedOption: null,
            orderStatusOptions: [{
                value: 'CREATED',
                label: 'CREATED'
            }, {
                value: 'PACKED',
                label: 'PACKED'
            }, {
                value: 'SHIPPED',
                label: 'SHIPPED'
            }, {
                value: 'DELIVERED',
                label: 'DELIVERED'
            }, {
                value: 'CANCEL',
                label: 'CANCEL'
            },
            {
                value: 'HOLD',
                label: 'HOLD'
            }],
            checked: true,
            defaultImage: "https://www.mnn.com/static/img/not_available.png",
            vendorData: JSON.parse(localStorage.getItem('vendorDetails'))
        };
        // this.handleChange = this.handleChange.bind(this);

    }

    

    handleChange = e => {
        let data = JSON.parse(e.target.value)
        this.setState({ selectedOption: data });
        console.log(`Option selected:`, data);

        this.orderUpdate(data)
    };


    orderUpdate = (data) => {
        axios.put(`${Baseurl}/api/v1/vendor/shipment/orderUpdate/${data.id}`, {
            orderStatus: data.action
        })
            .then(response => {
                if(response){
                    this.props.getOrderList(this.state.vendorData._id);
                    toast.success("Order Has been Updated", {
                        position: toast.POSITION.TOP_CENTER,
                        autoClose:2000,
                        draggablePercent: 60,
                        hideProgressBar:true,
                        bodyClassName:css({
                            height: '24px',
                            fontSize: '16px'
                          }),
                      });
                }
            })
            .catch(error => {
                console.error(error);
                toast.error("Error Occurs !")
            });
    }


    responseFacebook(response) {
        console.log(response);
    }


    onSearch = (e) => {
        let searchQuery = e.target.value;
        this.props.productSearch(searchQuery, this.state.vendorData._id)
    }



    editProductData(data) {
        console.log(JSON.stringify(data.original), "JSON.stringify(data.original)")
        this.props.history.push(`${process.env.PUBLIC_URL}/Vendor/products/digital/digital-edit-product/${JSON.stringify(data.original)}`);
    }


    componentDidMount() {
        this.props.getOrderList(this.state.vendorData._id)
    }




    render() {
        console.log(this.state, "this.state-------------------------------render");
        console.log(this.props, "this.props-------------------------------render");

        const columns = [{
            Header: 'Order ID',
            accessor: 'orderId',
            style: {
                "textAlign": "center"
            },
            minWidth: 70
        }, {
            Header: 'Product ID',
            accessor: 'productId',
            style: {
                "textAlign": "center"
            },
            minWidth: 50
        },{
            Header: 'Status',
            accessor: 'orderStatus',
            style: {
                "textAlign": "center"
            },
            minWidth: 50
        },
        {
            Header: 'Image',
            Cell: props => (
                <div>
                    <img className="img-responsive" style={{ height: 50 + 'px', width: 50 + 'px' }} src={(props.original.productImage !== "") ? Baseurl + "/" + props.original.productImage : this.state.defaultImage} />
                </div>
            ),
            minWidth: 55
        },
        {
            Header: 'Action',
            Cell: props => (
                <select className="form-control" value={props.original.orderStatus} onChange={this.handleChange}>
                    <option value={JSON.stringify({ action: 'CREATED', id: props.original.orderId })} >CREATED</option>
                    <option value={JSON.stringify({ action: 'PACKED', id: props.original.orderId })}>PACKED</option>
                    <option value={JSON.stringify({ action: 'SHIPPED', id: props.original.orderId })}>SHIPPED</option>
                    <option value={JSON.stringify({ action: 'DELIVERED', id: props.original.orderId })}>DELIVERED</option>
                    <option value={JSON.stringify({ action: 'HOLD', id: props.original.orderId })}>HOLD</option>
                    <option value={JSON.stringify({ action: 'CANCEL', id: props.original.orderId })}>CANCEL</option>
                </select>
            ),
            style: {
                "textAlign": "center"
            },
            minWidth: 80
        }, {
            Header: 'Product Price',
            accessor: 'productPrice',
            style: {
                "textAlign": "center"
            },
            minWidth: 90
        }, {
            Header: 'Product',
            accessor: 'productName',
            sortable: false,
            style: {
                "textAlign": "center"
            },
            minWidth: 50
        }, {
            Header: "Order Date",
            accessor: 'createdAt',
            style: {
                "textAlign": "center"
            },
            minWidth: 60
        }];

        return (
            <Fragment>
                <ToastContainer />
                <Breadcrumb title="Manage Orders" parent="Digital" />
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
                                            data={this.props.orderList}
                                            columns={columns}
                                            defaultPageSize={7}
                                            noDataText={"No Orders Found"}
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
        orderList: (state.ProductReducer != "") ? state.ProductReducer.object.object.data : [{}]
    }
};

const mapDispatchToProps = (dispatch) => {
    return {
        getOrderList: (vendorId) => { dispatch(orderList(vendorId)) },
        // productSearch: (query, vendor_id) => { dispatch(searchProducts(query, vendor_id)) }
    }
}


export default connect(mapStateToProps, mapDispatchToProps)(Orders);
