import React, { Component, Fragment } from 'react';
import Breadcrumb from '../../common/breadcrumb';
import CKEditors from "react-ckeditor-component";
import MyDropzone from '../../common/dropzone'
import axios from 'axios';

export class Digital_add_pro extends Component {
    constructor(props) {
        super(props)
        this.state = {
            category: "electronics",
            productName: "",
            Material_type: "",
            productDescription: [{
                data: ""
            }],
            brandName: "",
            price: 0,
            color: "",
            isAvailable: true,
            model: ''
        }

        this.onUpdateChange = this.onUpdateChange.bind(this);
        this.onDescriptionChange = this.onDescriptionChange.bind(this);
        this.addProduct = this.addProduct.bind(this);

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
            productDescription: [{
                data: newContent
            }]
        })

    }

    addProduct() {
        axios.post('//localhost:8080/api/v1/vendor/SaveProducts/electronics', {
            subCategory: this.state.category,
            productName: this.state.productName,
            Material_type: this.state.Material_type,
            productDescription: this.state.productDescription,
            brandName: this.state.brandName,
            price: this.state.price,
            color: this.state.color,
            isAvailable: (this.state.isAvailable == 'on') ? true : false
        }).then(response => {
            alert("product Saved")
            console.log(response, "data")
        })
            .catch(error => {
                console.log(error);
            });
    }

    render() {
        console.log(this.state, "this.state")
        return (
            <Fragment>
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
                                            <label className="col-form-label pt-0"><span>*</span> Product Name</label>
                                            <input className="form-control" name="productName" onChange={this.onUpdateChange} id="validationCustom01" type="text" required="" />
                                        </div>
                                        <div className="form-group">
                                            <label className="col-form-label pt-0"><span>*</span> Model</label>
                                            <input className="form-control" name="model" onChange={this.onUpdateChange} id="validationCustom02" type="text" required="" />
                                        </div>
                                        <div className="form-group">
                                            <label className="col-form-label"><span>*</span> Categories</label>
                                            <select className="custom-select" required="">
                                                <option value="">--Select--</option>
                                                <option value="1">Electronics</option>

                                            </select>
                                        </div>
                                        <div className="form-group">
                                            <label className="col-form-label">Color</label>
                                            <input className="form-control" name="color" onChange={this.onUpdateChange} id="validationCustom02" type="text" required="" />
                                        </div>
                                        <div className="form-group">
                                            <label className="col-form-label"><span>*</span> Product Price</label>
                                            <input className="form-control" name="price" onChange={this.onUpdateChange} id="validationCustom02" type="number" required="" />
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
                                                    activeclassName="p10"
                                                    content={this.state.productDescription[0].data}
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
                                            <input className="form-control" name="brandName" onChange={this.onUpdateChange} id="validationCustom05" type="text" required="" />
                                        </div>
                                        <div className="form-group">
                                            <label className="col-form-label">Material Type</label>
                                            <input className="form-control" name="Material_type" onChange={this.onUpdateChange} id="validationCustom05" type="text" required="" />
                                        </div>
                                        <div className="form-group mb-0">
                                            <div className="product-buttons text-center">
                                                <button type="button" onClick={this.addProduct} className="btn btn-primary">Add</button>
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

export default Digital_add_pro
