import React, { Component, Fragment } from 'react'
import Breadcrumb from '../common/breadcrumb';
import ReactTable from 'react-table';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import 'react-table/react-table.css';
import Baseurl from '../../api/url'
import { getOrderList } from '../../services/userService';

export class OrderList extends Component {

    constructor(props) {
        const customerDetails = JSON.parse(localStorage.getItem('customerDetails'))
        super(props)
        this.state = {
            customerDetails: customerDetails,
            orderList: [{}],

        };

    }






    async  fetchOrderList(data) {
        const list = await getOrderList(this.state.customerDetails._id);
        console.log(list,"list")
        this.setState({
            orderList: list.data.object.object.data
        })
    }

    editProductData(data) {
        console.log(JSON.stringify(data.original), "JSON.stringify(data.original)")
        this.props.history.push(`${process.env.PUBLIC_URL}/products/digital/digital-edit-product/${JSON.stringify(data.original)}`);
    }


    componentDidMount() {
        this.fetchOrderList()
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
            minWidth: 130
        },
        {
            Header: 'Image',
            Cell: props => (
                <div>
                    <img className="img-responsive" style={{ height: 50 + 'px', width: 50 + 'px' }} src={(props.original.productImage !== "") ? Baseurl + "/" + props.original.productImage : this.state.defaultImage} />
                </div>
            ),
            minWidth: 35
        }, {
            Header: 'Product Name',
            accessor: 'productName',
            style: {
                "textAlign": "center"
            },
            minWidth: 100
        }, {
            Header: 'Order Status',
            accessor: 'orderStatus',
            style: {
                "textAlign": "center"
            },
            minWidth: 90
        }, {
            Header: 'QTY',
            accessor: 'QTY',
            style: {
                "textAlign": "center"
            },
            minWidth: 20
        }, {
            Header: 'Product Price',
            accessor: 'productPrice',
            sortable: false,
            style: {
                "textAlign": "center"
            },
            minWidth: 50
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

                    {/* <span onClick={() => {
                        this.editProductData(props)

                    }}><i className="fa fa-pencil" style={{ width: 35, fontSize: 20, padding: 11, color: 'rgb(40, 167, 69)' }}></i></span> */}
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
                <Breadcrumb  title={'Order List'} />
                <div className="container-fluid">
                    <div className="row">
                        <div className="col-sm-12">
                            <div className="card">
                                <div className="card-body">

                                    <div className="clearfix"></div>
                                    <div id="basicScenario" className="product-physical">
                                        <ReactTable
                                            data={this.state.orderList}
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




export default OrderList;
