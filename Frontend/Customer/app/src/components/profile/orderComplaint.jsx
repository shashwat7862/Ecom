import React, { Component, Fragment } from 'react'
import Breadcrumb from '../common/breadcrumb';
import ReactTable from 'react-table';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import 'react-table/react-table.css';
import Baseurl from '../../api/url'
import { fetchComplaintList, getOrderList, createOrderComplaint } from '../../services/userService';
import Modal from 'react-responsive-modal';
import Select from 'react-select';
import { css } from 'glamor';

export class OrderComplaint extends Component {


    constructor(props) {
        const customerDetails = JSON.parse(localStorage.getItem('customerDetails'))
        super(props)
        this.state = {
            customerDetails: customerDetails,
            complaintList: [{}],
            selectedOption: null,
            orderList: [{}],
            productDes: "",
            type: ''
        };

    }

    async  fetchOrderList(data) {
        const list = await getOrderList(this.state.customerDetails._id);
        console.log(list, "list");

        let orderListed = []
        list.data.object.object.data.forEach(function (val) {
            let obj = {}
            obj.value = val.orderId
            obj.label = val.productName
            Object.assign(obj, val)
            orderListed.push(obj)
        });
        console.log("orderListed", orderListed)
        this.setState({
            orderList: orderListed
        })
    }


    componentDidMount() {
        this.fetchOrderList();
        this.getComplaint_List()
    }







    async  getComplaint_List(data) {
        const list = await fetchComplaintList(this.state.customerDetails._id);
        console.log(list, "list")
        this.setState({
            complaintList: list.data.object.object.complaintList
        })
    }




    onOpenModal = () => {
        this.setState({ open: true });
    };

    onCloseModal = () => {
        this.setState({ open: false });
    };

    onUpdateChange = (e) => {
        console.log(e.target.name, e.target.value, "change")
        this.setState({
            [e.target.name]: e.target.value
        })
    }


    handleChange = selectedOption => {
        this.setState({ selectedOption });
        console.log(`Option selected:`, selectedOption);
    };

    createComplaint = async () => {
        console.log(this.state);
        let response = await createOrderComplaint({
            productName: this.state.selectedOption.productName,
            complaintProductImage: this.state.selectedOption.productImage,
            ordersComplaintStatus: "PENDING",
            orderId: this.state.selectedOption.orderId,
            UserId: this.state.selectedOption.UserId,
            vendorId: this.state.selectedOption.VendorId,
            productId: this.state.selectedOption.productId,
            complainType: this.state.type,
            problemDes: this.state.productDes
        })

        if(response){
            toast.success("Complaint Has been Created", {
                position: toast.POSITION.TOP_CENTER,
                autoClose:2000,
                draggablePercent: 60,
                hideProgressBar:true,
                bodyClassName:css({
                    height: '24px',
                    fontSize: '16px'
                  }),
              });
              this.getComplaint_List()

              this.onCloseModal()
        }

    }




    render() {
        console.log(this.state, "this.state-------------------------------render");
        console.log(this.props, "this.props-------------------------------render");
        const { selectedOption } = this.state;
        const columns = [{
            Header: 'OrderId',
            accessor: 'orderId',
            style: {
                "textAlign": "center"
            },
            minWidth: 130
        },
        {
            Header: 'Product Name',
            accessor: 'productName',
            style: {
                "textAlign": "center"
            },
            minWidth: 70
        },{
            Header: 'Complaint Type',
            accessor: 'complainType',
            style: {
                "textAlign": "center"
            },
            minWidth: 120
        }, {
            Header: 'Complaint',
            accessor: 'problemDes',
            style: {
                "textAlign": "center"
            },
            minWidth: 150
        }, {
            Header: 'Complaint Status',
            accessor: 'ordersComplaintStatus',
            style: {
                "textAlign": "center"
            },
            minWidth: 150
        }, {
            Header: "Date",
            accessor: 'createdAt',
            style: {
                "textAlign": "center"
            },
            minWidth: 60
        }];

        return (
            <Fragment>
                <ToastContainer />
                <br></br><br></br><br></br><br></br><br></br>
                <Breadcrumb title={'Order Complaint'} />
                <div className="container-fluid">
                    <div className="row">
                        <div className="col-sm-12">
                            <div style={{ marginBottom: 20 + 'px' }}>
                                <span onClick={() => {
                                    // this.editProductData()

                                }}>Create Complaint<i className="fa fa-plus" onClick={this.onOpenModal} style={{ width: 35, fontSize: 20, padding: 11, color: 'rgb(40, 167, 69)' }}></i></span>
                            </div>
                            <div className="card">
                                <div className="card-body">

                                    <div className="clearfix"></div>
                                    <div id="basicScenario" className="product-physical">
                                        <ReactTable
                                            data={this.state.complaintList}
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
                <Modal open={this.state.open} onClose={this.onCloseModal} center>
                    <div className="modal-dialog modal-dialog-centered" role="document">
                        <div className="modal-content">
                            <div className="modal-header">
                                <h3 className="modal-title" id="exampleModalLabel"><b>Create Order Complaint</b></h3>
                            </div>
                            <div className="modal-body">
                                <div className="row check-out">
                                    <div className="form-group col-md-12 col-sm-12 col-xs-12">
                                        <div className="field-label">Select Orders</div>
                                        <Select
                                            value={selectedOption}
                                            onChange={this.handleChange}
                                            options={this.state.orderList}
                                        />
                                    </div>
                                    <div className="form-group col-md-12 col-sm-12 col-xs-12">
                                        <div className="field-label">Complaint Type</div>
                                        <select name="type" className="form-control" value={this.state.type} onChange={this.onUpdateChange}>
                                            <option>delay in Delivery</option>
                                            <option>Damage product</option>
                                            <option>Others</option>
                                        </select>
                                    </div>
                                    <div className="form-group col-md-6 col-sm-6 col-xs-12">
                                        <div className="field-label">Problem Description</div>
                                        <textarea type="text" className="form-control" name="productDes" onChange={this.onUpdateChange} ></textarea>
                                        <br></br>
                                        <button className="btn" onClick={this.createComplaint}>Create Complaint</button>
                                    </div>


                                </div>
                            </div>
                        </div>
                    </div>
                </Modal>
            </Fragment>
        )
    }
}




export default OrderComplaint;
