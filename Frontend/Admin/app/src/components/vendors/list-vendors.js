import React, { Component, Fragment } from 'react'
import Breadcrumb from '../common/breadcrumb';
import ReactTable from 'react-table';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Baseurl from '../../assets/data/url'
import { fetchVendorList } from '../../Action/ProductAction';
import { connect } from 'react-redux';
import Switch from "react-switch";
import axios from 'axios';
import { css } from 'glamor';

export class List_vendors extends Component {

    constructor(props) {
        super(props);
        this.state = {
            orderList: [{}],
            cols: ["productName", "Age"],
            isLoading: false,
            checked: false,
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
        this.props.getVendorList(checked)

    }


    responseFacebook(response) {
        console.log(response);
    }


    onSearch = (e) => {
        let searchQuery = e.target.value;
        this.props.productSearch(searchQuery, this.state.vendorData._id)
    }




    componentDidMount() {
        this.props.getVendorList(this.state.checked)
    }

    provideApproval =(actionValue,vendorData)=>{
        console.log("vendorData",vendorData)
        axios
        .put(`${Baseurl}/api/v1/vendor/ProfileUpdate/${vendorData.original._id}`,{
            isApproved: actionValue
        })
        .then(response => {
            toast.success("Vendor Has Been Approved", {
                position: toast.POSITION.TOP_CENTER,
                autoClose:2000,
                draggablePercent: 60,
                hideProgressBar:true,
                bodyClassName:css({
                    height: '24px',
                    fontSize: '16px'
                  }),
              });
              this.props.getVendorList(false)
        })
        .catch(error => {
            toast.error("Something Went Wrong", {
                position: toast.POSITION.TOP_CENTER,
                autoClose:2000,
                draggablePercent: 60,
                hideProgressBar:true,
                bodyClassName:css({
                    height: '24px',
                    fontSize: '16px'
                  }),
              });
        })
        
    }




    render() {
        console.log(this.state, "this.state-------------------------------render");
        console.log(this.props, "this.props-------------------------------render");

        const columns = [{
            Header: 'Vendor ID',
            accessor: '_id',
            style: {
                "textAlign": "center"
            },
            minWidth: 100
        }, {
            Header: 'Vendor Name',
            accessor: 'fullName',
            style: {
                "textAlign": "center"
            },
            minWidth: 40
        },
        {
            Header: 'Email',
            accessor: 'email',
            style: {
                "textAlign": "center"
            },
            minWidth: 50
        }, {
            Header: 'Mobile',
            accessor: 'mobile',
            style: {
                "textAlign": "center"
            },
            minWidth: 40
        }, {
            Header: 'login From',
            accessor: 'loginFrom',
            sortable: false,
            style: {
                "textAlign": "center"
            },
            minWidth: 60
        }, {
            Header: "Regiserted Date",
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

                        this.provideApproval(true,props)

                    }}>
                        <i className="fa fa-check" title="Approve" style={{ width: 35, fontSize: 20, padding: 11, color: 'rgb(40, 167, 69)' }}
                        ></i>
                    </span>

                    {/* <span onClick={() => {
                        if (window.confirm('Are you sure you wish to disappove this item?')) {
                            this.provideApproval(false, props)
                        }


                    }}><i className="fa fa-remove" title="Disapprove" style={{ width: 35, fontSize: 20, padding: 11, color: 'rgb(40, 167, 69)' }}></i></span> */}
                </div>
            ),
            style: {
                "textAlign": "center"
            },
            minWidth: 50
        }];

        if(this.state.checked){
           columns.pop()
        }


        return (
            <Fragment>
                <ToastContainer />
                <Breadcrumb title="Vendor Management" parent="Digital" />

                <div className="container-fluid">
                    <div className="row">
                        <div className="col-sm-12">
                            <div className="card">
                                <div className="card-body">
                                    <span> <Switch onChange={this.handleChange} checked={this.state.checked} uncheckedIcon="" /></span>

                                    {/* <span> <Switch onChange={this.handleChange} checked={this.state.checked} uncheckedIcon="" /></span> */}
                                    {/* <br></br><br></br> */}
                                    {/* <input type="text" onChange={this.onSearch} placeholder="Search" className="form-control" /> */}
                                    <div className="clearfix"></div>
                                    <div id="basicScenario" className="product-physical">
                                        <ReactTable
                                            data={this.props.list}
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
        list: (state.ProductReducer !== "") ? state.ProductReducer.object.object : []
    }
};

const mapDispatchToProps = (dispatch) => {
    return {
        getVendorList: (isApproved) => { dispatch(fetchVendorList(isApproved)) },
        // productSearch: (query, vendor_id) => { dispatch(searchProducts(query, vendor_id)) }
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(List_vendors);




