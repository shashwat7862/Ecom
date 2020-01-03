import React, { Component, Fragment } from 'react';
import Breadcrumb from '../common/breadcrumb';
import data from '../../assets/data/listVendor';
import Datatable from '../common/datatable'

export class List_vendors extends Component {
    render() {
        return (
            <Fragment>
                <Breadcrumb title="Vendor List" parent="Vendors" />
                <div className="container-fluid">
                    <div className="card">
                        <div className="card-header">
                            <h5>Vendor Details</h5>
                        </div>
                        <div className="card-body vendor-table coupon-list-delete">
                            <Datatable
                                multiSelectOption={true}
                                myData={data}
                                pageSize={10}
                                pagination={true}
                                class="-striped -highlight"
                            />
                        </div>
                    </div>
                </div>
            </Fragment>
        )
    }
}

export default List_vendors



// import React, { Component, Fragment } from 'react'
// import Breadcrumb from '../common/breadcrumb';
// import ReactTable from 'react-table';
// import { ToastContainer, toast } from 'react-toastify';
// import 'react-toastify/dist/ReactToastify.css';
// import Baseurl from '../../assets/data/urls'
// import { fetchVendorList } from '../../Action/ProductAction';
// import { connect } from 'react-redux';
// import Switch from "react-switch";

// export class List_vendors extends Component {

//     constructor(props) {
//         super(props);
//         this.state = {
//             orderList: [{}],
//             cols: ["productName", "Age"],
//             isLoading: false,
//             checked: true,
//             defaultImage: "https://www.mnn.com/static/img/not_available.png",
//             vendorData: JSON.parse(localStorage.getItem('vendorDetails'))
//         };
//         this.handleChange = this.handleChange.bind(this);

//     }

//     handleChange(checked) {
//         console.log(checked)
//         this.setState({
//             checked
//         });
//         this.props.getCustomerList(this.state.vendorData._id)

//     }


//     responseFacebook(response) {
//         console.log(response);
//     }


//     onSearch = (e) => {
//         let searchQuery = e.target.value;
//         this.props.productSearch(searchQuery, this.state.vendorData._id)
//     }


 

//     componentDidMount() {
//         this.props.getCustomerList(this.state.vendorData._id)
//     }




//     render() {
//         console.log(this.state, "this.state-------------------------------render");
//         console.log(this.props, "this.props-------------------------------render");

//         const columns = [{
//             Header: 'Customer Name',
//             accessor: 'userData[0].fullName',
//             style: {
//                 "textAlign": "center"
//             },
//             minWidth: 100
//         }, {
//             Header: 'Customer Id',
//             accessor: 'userData[0]._id',
//             style: {
//                 "textAlign": "center"
//             },
//             minWidth: 50
//         },
//          {
//             Header: 'Email',
//             accessor: 'userData[0].email',
//             style: {
//                 "textAlign": "center"
//             },
//             minWidth: 50
//         }, {
//             Header: 'Mobile',
//             accessor: 'userData[0].mobile',
//             style: {
//                 "textAlign": "center"
//             },
//             minWidth: 40
//         }, {
//             Header: 'OrderId',
//             accessor: 'orderData.orderId',
//             sortable: false,
//             style: {
//                 "textAlign": "center"
//             },
//             minWidth: 50
//         }, {
//             Header: "Order Date",
//             accessor: 'orderData.createdAt',
//             style: {
//                 "textAlign": "center"
//             },
//             minWidth: 60
//         }];

//         return (
//             <Fragment>
//                 <ToastContainer />
//                 <Breadcrumb title="Customers" parent="Digital" />
//                 <div className="container-fluid">
//                     <div className="row">
//                         <div className="col-sm-12">
//                             <div className="card">
//                                 <div className="card-body">

//                                     {/* <span> <Switch onChange={this.handleChange} checked={this.state.checked} uncheckedIcon="" /></span> */}
//                                     {/* <br></br><br></br> */}
//                                     {/* <input type="text" onChange={this.onSearch} placeholder="Search" className="form-control" /> */}
//                                     <div className="clearfix"></div>
//                                     <div id="basicScenario" className="product-physical">
//                                         <ReactTable
//                                             data={this.props.list}
//                                             columns={columns}
//                                             defaultPageSize={7}
//                                             noDataText={"No Orders Found"}
//                                         />

//                                     </div>
//                                 </div>
//                             </div>
//                         </div>
//                     </div>
//                 </div>
//             </Fragment>
//         )
//     }
// }


// const mapStateToProps = (state) => {
//     console.log("state---------mapto", state);
//     return {
//         list:( state.ProductReducer !== "")?  state.ProductReducer.object.object.getCustomerList : []
//     }
// };

// const mapDispatchToProps = (dispatch) => {
//     return {
//         getCustomerList: (vendorId) => { dispatch(fetchVendorList(vendorId)) },
//         // productSearch: (query, vendor_id) => { dispatch(searchProducts(query, vendor_id)) }
//     }
// }
// export default connect(mapStateToProps, mapDispatchToProps)(List_vendors);




