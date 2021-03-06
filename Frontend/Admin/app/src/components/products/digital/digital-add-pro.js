import React, { Component, Fragment } from 'react';
import Breadcrumb from '../../common/breadcrumb';
import CKEditors from "react-ckeditor-component";
import MyDropzone from '../../common/dropzone';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import { addProduct } from '../../../Action/ProductAction';
import { connect } from 'react-redux';


export class Digital_add_pro extends Component {
    constructor(props) {
        super(props)
        this.state = {
            category: "electronics",
            title: '',
            productName: "",
            Material_type: "",
            productDescription: "",
            brandName: "",
            price: 0,
            color: "",
            isAvailable: true,
            model: '',
            size:'',
            vendorData : JSON.parse(localStorage.getItem('vendorDetails'))
        }

        this.onUpdateChange = this.onUpdateChange.bind(this);
        this.onDescriptionChange = this.onDescriptionChange.bind(this);
        this.addProductToDB = this.addProductToDB.bind(this);

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

   

    addProductToDB() {
        let VendorData = localStorage.getItem('VendorData');
        this.props.AddProductToDB({
            subCategory: this.state.category,
            productName: this.state.productName,
            productDescription: this.remove_html_tags(this.state.productDescription),
            brandName: this.state.brandName,
            attributes:{
                color: this.state.color,
                size: this.state.size,
                Material_type:this.state.Material_type
            },
            modelNo:this.state.model,
            price: this.state.price,
            isAvailable: (this.state.isAvailable == 'on') ? true : false,
            title: this.state.title,
            vendorId: this.state.vendorData._id
        })
    }

    componentWillReceiveProps(nextProps, ) {
        console.log("nextProps------->>", nextProps.addProductResult)
        if (this.props !== nextProps) {
            toast.success("Product Saved Successfully");
            this.setState({
                category: '',
                productName: '',
                Material_type: '',
                productDescription: "",
                brandName: '',
                price: 0,
                color: '',
                isAvailable: false,
                title: '',
                size:'',
                model:''

            })

        }
    }

    remove_html_tags(str) {
        if ((str === null) || (str === ''))
            return false;
        else
            str = str.toString();
        return str.replace(/<[^>]*>/g, '');
    }


    render() {

        console.log(this.state, "this.state")
        return (
            <Fragment>
                <ToastContainer />
                <Breadcrumb title="Add Products" parent="Digital" />
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
                                            <input className="form-control" name="title" value={this.state.title} onChange={this.onUpdateChange} id="validationCustom01" type="text" required="" />
                                        </div>
                                        <div className="form-group">
                                            <label className="col-form-label pt-0"><span>*</span> Product Name</label>
                                            <input className="form-control" name="productName" value={this.state.productName} onChange={this.onUpdateChange} id="validationCustom01" type="text" required="" />
                                        </div>
                                        <div className="form-group">
                                            <label className="col-form-label pt-0"><span>*</span> Model</label>
                                            <input className="form-control" name="model" value={this.state.model} onChange={this.onUpdateChange} id="validationCustom02" type="text" required="" />
                                        </div>
                                        <div className="form-group">
                                            <label className="col-form-label"><span>*</span> Categories</label>
                                            <select className="custom-select" name="categories" id="categories">
                                                <option value="">--Select--</option>
                                                <option value="Electronics" >Electronics</option>

                                            </select>
                                        </div>
                                        <div className="form-group">
                                            <label className="col-form-label">Color</label>
                                            <input className="form-control" name="color" value={this.state.color} onChange={this.onUpdateChange} id="validationCustom02" type="text" required="" />
                                        </div>
                                        <div className="form-group">
                                            <label className="col-form-label"><span>*</span> Product Price</label>
                                            <input className="form-control" name="price" value={this.state.price} onChange={this.onUpdateChange} id="validationCustom02" type="number" required="" />
                                        </div>
                                        <div className="form-group">
                                            <label className="col-form-label"><span>*</span> Status</label>
                                            <div className="m-checkbox-inline mb-0 custom-radio-ml d-flex radio-animated">
                                                <label className="d-block">
                                                    <input className="radio_animated" id="isAvailable" name="isAvailable" onChange={this.onUpdateChange} type="radio" />
                                                    Enable
                                            </label>
                                                <label className="d-block" >
                                                    <input className="radio_animated" id="isAvailable" name="isAvailable" onChange={this.onUpdateChange} type="radio" />
                                                    Disable
                                            </label>
                                            </div>
                                        </div>
                                        <label className="col-form-label pt-0"> Product Upload</label>
                                        <MyDropzone />
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
                                                   value={this.state.productDescription}
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
                                            <input className="form-control" value={this.state.size} name="size" onChange={this.onUpdateChange} id="validationCustom05" type="text" required="" />
                                        </div>
                                        <div className="form-group">
                                            <label className="col-form-label">Material Type</label>
                                            <input className="form-control" value={this.state.Material_type} name="Material_type" onChange={this.onUpdateChange} id="validationCustom05" type="text" required="" />
                                        </div>
                                        <div className="form-group mb-0">
                                            <div className="product-buttons text-center">
                                                <button type="button" onClick={this.addProductToDB} className="btn btn-primary">Add Product</button>
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
        addProductResult: (state.ProductReducer != "") ? state.ProductReducer.object.object : []
    }
};

const mapDispatchToProps = (dispatch) => {
    return {
        // AddProductToDB: (payload) => { dispatch(addProduct(payload)) }
    }
}


export default connect(mapStateToProps, mapDispatchToProps)(Digital_add_pro);