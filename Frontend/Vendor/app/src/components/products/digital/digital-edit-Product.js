import React, { Component, Fragment } from 'react';
import Breadcrumb from '../../common/breadcrumb';
import CKEditors from "react-ckeditor-component";
import MyDropzone from '../../common/dropzone';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Baseurl from '../../../assets/data/urls';
import { EditProductToDB } from '../../../Action/ProductAction';
import { connect } from 'react-redux';
import axios from 'axios';

export class Digital_edit_product extends Component {
    constructor(props) {
        super(props)
        this.state = {
            id: null,
            category: "electronics",
            title: '',
            productName: "",
            Material_type: "",
            attributes: {
                color: "",
                Material_type: "",
                size: ""
            },
            productDescription: "",
            brandName: "",
            price: 0,
            color: "",
            productImage: "",
            isAvailable: true,
            model: '',
            vendorData: JSON.parse(localStorage.getItem('vendorDetails'))
        }

        this.onUpdateChange = this.onUpdateChange.bind(this);
        this.onDescriptionChange = this.onDescriptionChange.bind(this);
        this.editProductDetails = this.editProductDetails.bind(this);
        this.setStatus = this.setStatus.bind(this);
        this.uploadProductImage = this.uploadProductImage.bind(this)
    }

    componentDidMount() {
        // const { match: { params } } = this.props;
        // let data = JSON.parse(params.data);

        let enc = window.location.href
        var dec = decodeURI(enc).split('/{')

        let product;
        let data;
        for (let val of dec) {
            if (val.length > 50) {
                product = val
            }
        }
        data = JSON.parse("{" + product);

        this.setState({
            price: (data.price == null) ? '' : data.price,
            productName: (data.productName == null) ? '' : data.productName,
            Material_type: (data.Material_type == null) ? '' : data.Material_type,
            productDescription: (data.productDescription == null) ? '' : data.productDescription,
            brandName: (data.brandName == null) ? '' : data.brandName,
            isAvailable: (data.isAvailable == null) ? 'on' : (data.isAvailable) ? 'on' : 'off',
            model: (data.modelNo == null) ? '' : data.modelNo,
            title: (data.title == null) ? '' : data.title,
            attributes: {
                color: (!data.hasOwnProperty('attributes')) ? '' : data.attributes.color,
                size: (!data.hasOwnProperty('attributes')) ? '' : data.attributes.size,
                Material_type: (!data.hasOwnProperty('attributes')) ? '' : data.attributes.Material_type
            },
            id: (data._id == null) ? '' : data._id,
            productImage: data.productImage

        })
    }

    onUpdateChange(e) {
        console.log(e.target.name, e.target.value, "change")
        this.setState({
            [e.target.name]: e.target.value
        })
    }

    onDescriptionChange(e) {
        var newContent = e.editor.getData();
        this.setState({
            productDescription: newContent
        })

    }


    editProductDetails() {
        console.log("productImage--------------edit", this.state, this.state.productImage)
        let VendorData = localStorage.getItem('VendorData');
        this.props.EditProductToDB({
            id: this.state.id,
            subCategory: this.state.category,
            productName: this.state.productName,
            productDescription: this.state.productDescription,
            brandName: this.state.brandName,
            attributes: {
                color: this.state.attributes.color,
                size: this.state.attributes.size,
                Material_type: this.state.attributes.Material_type
            },
            modelNo: this.state.model,
            price: this.state.price,
            isAvailable: (this.state.isAvailable == 'on') ? true : false,
            title: this.state.title,
            productImage: this.state.productImage,
            vendorId: this.state.vendorData._id
        })


    }

    componentWillReceiveProps(nextProps, ) {
        console.log("nextProps------->>", nextProps.editProductResult)
        if (this.props !== nextProps) {
            toast.success("Product Edited Successfully");
            this.setState({
                category: '',
                productName: '',
                Material_type: '',
                productDescription: "",
                brandName: '',
                price: 0,
                color: '',
                isAvailable: false,
                title: ''

            })
            let history =this.props.history

            setTimeout(function(){
                history.push(`${process.env.PUBLIC_URL}/products/digital/digital-product-list`);
            },1000)


        }
    }

    setStatus(e) {
        console.log(e.target.value, "setStatus val")
        this.setState({
            isAvailable: (e.target.value == 'on') ? true : false
        })
    }

    uploadProductImage(e) {
        console.log(e.target.files[0]);

        if (e.target.files[0]) {
            const fd = new FormData();
            fd.append('file', e.target.files[0], e.target.files[0].name)
            axios.post(`${Baseurl}/api/v1/common/aws/saveAllImages`, fd)
                .then(response => {
                    console.log(this.state.productImage)
                    console.log(response, "product--------------- Data");
                    this.setState({
                        productImage: response.data.object.name
                    })
                    console.log(this.state.productImage)

                })
                .catch(error => {
                    console.log(error);
                });

        }
    }



    render() {



        console.log(this.state, "this.state")
        return (
            <Fragment>
                <ToastContainer />
                <Breadcrumb title="Edit Products" parent="Digital" />
                <div className="container-fluid">
                    <div className="row product-adding">
                        <div className="col-xl-6">
                            <div className="card">
                                <div className="card-header">
                                    <h5>General</h5>
                                </div>
                                <div className="card-body">
                                    <div className="digital-add needs-validation">
                                        <div className="form-group">
                                            <label className="col-form-label pt-0"><span>*</span> Title</label>
                                            <input className="form-control" name="title" onChange={this.onUpdateChange} value={this.state.title} id="validationCustom01" type="text" required="" />
                                        </div>
                                        <div className="form-group">
                                            <label className="col-form-label pt-0"><span>*</span> Product Name</label>
                                            <input className="form-control" name="productName" onChange={this.onUpdateChange} value={this.state.productName} id="validationCustom01" type="text" required="" />
                                        </div>
                                        <div className="form-group">
                                            <label className="col-form-label pt-0"><span>*</span> Model</label>
                                            <input className="form-control" name="model" onChange={this.onUpdateChange} value={this.state.model} id="validationCustom02" type="text" required="" />
                                        </div>
                                        {/* <div className="form-group">
                                            <label className="col-form-label"><span>*</span> Categories</label>
                                            <select className="custom-select" required="">
                                                <option value="">--Select--</option>
                                                <option value="1" selected>Electronics</option>

                                            </select>
                                        </div> */}
                                        <div className="form-group">
                                            <label className="col-form-label">Color</label>
                                            <input className="form-control" name="color" value={this.state.attributes.color} onChange={this.onUpdateChange} id="validationCustom02" type="text" required="" />
                                        </div>
                                        <div className="form-group">
                                            <label className="col-form-label"><span>*</span> Product Price</label>
                                            <input className="form-control" name="price" onChange={this.onUpdateChange} value={this.state.price} id="validationCustom02" type="number" required="" />
                                        </div>
                                        <div className="form-group">
                                            <label className="col-form-label"><span>*</span> Status</label>
                                            <div className="m-checkbox-inline mb-0 custom-radio-ml d-flex radio-animated">
                                                <label className="d-block">
                                                    <input className="radio_animated" onClick={this.setStatus} id="isAvailable" name="isAvailable" value="on" defaultChecked={this.state.isAvailable} type="radio" />
                                                    Enable
                                            </label>
                                                <label className="d-block" >
                                                    <input className="radio_animated" onClick={this.setStatus} id="isAvailable" name="isAvailable" value="off" defaultChecked={!this.state.isAvailable} type="radio" />
                                                    Disable
                                            </label>
                                            </div>
                                        </div>
                                        <label className="col-form-label pt-0"> Product Upload</label><br></br>
                                        <input type="file" onChange={this.uploadProductImage} ></input>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="col-xl-6">
                            <div className="card">
                                <div className="card-header">
                                    <h5>Add Description</h5>
                                </div>
                                <div className="card-body">
                                    <div className="digital-add needs-validation">
                                        <div className="form-group mb-0">
                                            <div className="description-sm">
                                                <CKEditors

                                                    activeclassName="p10"
                                                    content={this.state.productDescription}
                                                    events={{
                                                        "blur": this.onBlur,
                                                        "afterPaste": this.afterPaste,
                                                        "change": this.onDescriptionChange
                                                    }}
                                                />
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="card">
                                <div className="card-header">
                                    {/* <h5>Meta Data</h5> */}
                                </div>
                                <div className="card-body">
                                    <div className="digital-add needs-validation">
                                        <div className="form-group">
                                            <label className="col-form-label pt-0"> Brand Name</label>
                                            <input className="form-control" value={this.state.brandName} name="brandName" onChange={this.onUpdateChange} id="validationCustom05" type="text" required="" />
                                        </div>
                                        <div className="form-group">
                                            <label className="col-form-label pt-0"> Size</label>
                                            <input className="form-control" name="size" value={this.state.attributes.size} onChange={this.onUpdateChange} id="validationCustom05" type="text" required="" />
                                        </div>
                                        <div className="form-group">
                                            <label className="col-form-label">Material Type</label>
                                            <input className="form-control" value={this.state.attributes.Material_type} name="Material_type" onChange={this.onUpdateChange} id="validationCustom05" type="text" required="" />
                                        </div>
                                        <div className="form-group mb-0">
                                            <div className="product-buttons text-center">
                                                <button type="button" onClick={this.editProductDetails} className="btn btn-primary">Edit Product</button>
                                                {/* <button type="button" className="btn btn-light">Discard</button> */}
                                            </div>
                                        </div>
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
        editProductResult: (state.ProductReducer != "") ? state.ProductReducer.object.object : []
    }
};

const mapDispatchToProps = (dispatch) => {
    return {
        EditProductToDB: (payload) => { dispatch(EditProductToDB(payload)) }

    }
}


export default connect(mapStateToProps, mapDispatchToProps)(Digital_edit_product);