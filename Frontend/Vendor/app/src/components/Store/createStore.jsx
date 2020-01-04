import React, { Component, Fragment } from 'react'
import Breadcrumb from '../common/breadcrumb';
import ReactTable from 'react-table';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import 'react-table/react-table.css';
import Baseurl from '../../assets/data/urls'
import Modal from 'react-responsive-modal';
import Select from 'react-select';
import { css } from 'glamor';
import axios from 'axios';

export class CreateStore extends Component {


    constructor(props) {
        super(props)
        this.state = {
            vendorData: JSON.parse(localStorage.getItem('vendorDetails')),
            storeList: [{}],
            storeName: '',
            storeAddress: '',
            email: '',
            branch: '',
            website: '',
            logo: '',
            defaultImage:"https://static.im-cdn.com/assets/images/online-store/online-store-header.3b3929124cc2.png"
        };

    }

    async  fetchStoreList() {
        axios.get(`${Baseurl}/api/v1/vendor/multiStore/getAllStore/${this.state.vendorData._id}/vendor`)
            .then(({ data }) => {
                console.log(data, "storelist---");
                this.setState({
                    storeList: data.object.object.storeList
                })
            });

    }


    componentDidMount() {
        this.fetchStoreList();
    }

    uploadProductImage = (e) => {
        var fileName = e.target.files[0].name;
        if (e.target.files[0]) {
            const fd = new FormData();
            fd.append('file', e.target.files[0], e.target.files[0].name);
            axios.post(`${Baseurl}/api/v1/common/aws/saveAllImages`, fd)
                .then(response => {
                    this.setState({ logo: response.data.object.name });
                })
                .catch(error => {
                    console.log(error);
                });
        }
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

    createStore = async () => {
        axios.post(`${Baseurl}/api/v1/vendor/multiStore/createStore/${this.state.vendorData._id}`, {
            "email": this.state.email,
            "website": this.state.website,
            "storeName": this.state.storeName,
            "storeAddress": this.state.storeAddress,
            "branchName": this.state.branch,
            "pincode": this.state.pincode,
            "storeLogo": this.state.logo
        })
            .then(({ data }) => {
                console.log(data, "storelist---");

                if (data) {
                    toast.success("Store Has been Created", {
                        position: toast.POSITION.TOP_CENTER,
                        autoClose: 2000,
                        draggablePercent: 60,
                        hideProgressBar: true,
                        bodyClassName: css({
                            height: '24px',
                            fontSize: '16px'
                        }),
                    });
                    this.fetchStoreList()

                    this.onCloseModal()
                }
            });



    }




    render() {
        console.log(this.state, "this.state-------------------------------render");
        console.log(this.props, "this.props-------------------------------render");
        const { selectedOption } = this.state;
        const columns = [{
            Header: 'Store Name',
            accessor: 'storeName',
            style: {
                "textAlign": "center"
            },
            minWidth: 70
        },  {
            Header: 'Image',
            Cell: props => (
                <div>
                    <img className="img-responsive" style={{ height: 50 + 'px', width: 50 + 'px' }} src={(props.original.storeLogo !== "") ? Baseurl + "/" + props.original.storeLogo : this.state.defaultImage} />
                </div>
            ),
            minWidth: 55
        },
        {
            Header: 'Address',
            accessor: 'storeAddress',
            style: {
                "textAlign": "center"
            },
            minWidth: 120
        }, {
            Header: 'Email',
            accessor: 'email',
            style: {
                "textAlign": "center"
            },
            minWidth: 50
        }, {
            Header: 'Website',
            accessor: 'website',
            style: {
                "textAlign": "center"
            },
            minWidth: 70
        }, {
            Header: 'zipCode',
            accessor: 'pincode',
            style: {
                "textAlign": "center"
            },
            minWidth: 50
        }, {
            Header: "Registered Date",
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
                <Breadcrumb title={'Store Management'} />
                <div className="container-fluid">
                    <div className="row">
                        <div className="col-sm-12">
                            <div style={{ marginBottom: 20 + 'px' }}>
                                <span onClick={() => {
                                }}>CREATE STORE<i className="fa fa-plus" onClick={this.onOpenModal} style={{ width: 35, fontSize: 20, padding: 11, color: 'rgb(40, 167, 69)' }}></i></span>
                            </div>
                            <div className="card">
                                <div className="card-body">

                                    <div className="clearfix"></div>
                                    <div id="basicScenario" className="product-physical">
                                        <ReactTable
                                            data={this.state.storeList}
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
                                <h3 className="modal-title" id="exampleModalLabel"><b>Create Your Store</b></h3>
                            </div>
                            <div className="modal-body">
                                <div className="row check-out">


                                    <div className="form-group col-md-6 col-sm-6 col-xs-12">
                                        <div className="field-label">Store Name</div>
                                        <input type="text" className="form-control" name="storeName" onChange={this.onUpdateChange} />
                                        <br></br>

                                    </div>
                                    <div className="form-group col-md-6 col-sm-6 col-xs-12">
                                        <div className="field-label">Store Address</div>
                                        <textarea type="text" className="form-control" name="storeAddress" onChange={this.onUpdateChange} ></textarea>
                                        <br></br>

                                    </div>
                                    <div className="form-group col-md-6 col-sm-6 col-xs-12">
                                        <div className="field-label">Website</div>
                                        <input type="text" className="form-control" name="website" onChange={this.onUpdateChange} />
                                        <br></br>

                                    </div>
                                    <div className="form-group col-md-6 col-sm-6 col-xs-12">
                                        <div className="field-label">Email</div>
                                        <input type="text" className="form-control" name="email" onChange={this.onUpdateChange} />
                                        <br></br>

                                    </div>
                                    <div className="form-group col-md-6 col-sm-6 col-xs-12">
                                        <div className="field-label">Zip Code</div>
                                        <input type="text" className="form-control" name="pincode" onChange={this.onUpdateChange} />
                                        <br></br>
                                    </div>
                                    <div className="form-group col-md-6 col-sm-6 col-xs-12">
                                        <div className="field-label">Branch Name</div>
                                        <input type="text" className="form-control" name="branch" onChange={this.onUpdateChange} />
                                        <br></br>
                                    </div>
                                    <div className="form-group col-md-6 col-sm-6 col-xs-12">
                                        <div className="field-label">Upload Logo</div>
                                        <input type="file" className="form-control" name="logo" onChange={this.uploadProductImage} />
                                        <br></br>
                                        <button className="btn" onClick={this.createStore}>Create</button>
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




export default CreateStore;
