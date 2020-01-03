import React, { Component, Fragment } from 'react'
import Breadcrumb from '../common/breadcrumb';
import ReactTable from 'react-table';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import 'react-table/react-table.css';
import Baseurl from '../../api/url'
import { getAddressService } from '../../services/userService';

export class ManageAddress extends Component {

    constructor(props) {
        const customerDetails = JSON.parse(localStorage.getItem('customerDetails'))
        super(props)
        this.state = {
            customerDetails: customerDetails,
            AddressList: [{}],

        };

    }






    async  fetchAddressList(data) {
        const list = await getAddressService(this.state.customerDetails._id);
        console.log(list,"list")
        this.setState({
            AddressList: list.data.object.object.Data
        })
    }

    editProductData(data) {
        console.log(JSON.stringify(data.original), "JSON.stringify(data.original)")
        this.props.history.push(`${process.env.PUBLIC_URL}/products/digital/digital-edit-product/${JSON.stringify(data.original)}`);
    }


    componentDidMount() {
        this.fetchAddressList()
    }




    render() {
        console.log(this.state, "this.state-------------------------------render");
        console.log(this.props, "this.props-------------------------------render");

        const columns = [{
            Header: 'Address 1',
            accessor: 'address1',
            style: {
                "textAlign": "center"
            },
            minWidth: 130
        },
       {
            Header: 'City',
            accessor: 'city',
            style: {
                "textAlign": "center"
            },
            minWidth: 100
        }, {
            Header: 'State',
            accessor: 'state',
            style: {
                "textAlign": "center"
            },
            minWidth: 90
        }, {
            Header: 'Area',
            accessor: 'location_area',
            style: {
                "textAlign": "center"
            },
            minWidth: 20
        }, {
            Header: 'Pincode',
            accessor: 'pinCode',
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
                <Breadcrumb  title={'Manage Addresses'} />
                <div className="container-fluid">
                    <div className="row">
                        <div className="col-sm-12">
                            <div className="card">
                                <div className="card-body">

                                    <div className="clearfix"></div>
                                    <div id="basicScenario" className="product-physical">
                                        <ReactTable
                                            data={this.state.AddressList}
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




export default ManageAddress;
