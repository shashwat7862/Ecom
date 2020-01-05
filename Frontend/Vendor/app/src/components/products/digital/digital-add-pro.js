import React, { Component, Fragment } from 'react';
import Breadcrumb from '../../common/breadcrumb';
import CKEditors from "react-ckeditor-component";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Baseurl from '../../../assets/data/urls';
import { addProduct } from '../../../Action/ProductAction';
import { connect } from 'react-redux';
import axios from 'axios';
import _ from 'underscore';
import Select from 'react-select';



export class Digital_add_pro extends Component {
    constructor(props) {
        super(props)
        this.state = {
            category: "electronics",
            title: '',
            productName: "",
            Material_type: "",
            stockCount:0,
            productDescription: "",
            brandName: "",
            price: 0,
            color: "",
            isAvailable: true,
            model: '',
            size: '',
            customField: '',
            customValue: '',
            AdditionalFeatures: {},
            productImage: '',
            selectedOption: null,
            shopList: [{}],
            vendorData: JSON.parse(localStorage.getItem('vendorDetails'))
        }



        this.onUpdateChange = this.onUpdateChange.bind(this);
        this.onDescriptionChange = this.onDescriptionChange.bind(this);
        this.addProductToDB = this.addProductToDB.bind(this);
        this.uploadProductImage = this.uploadProductImage.bind(this);


    }


    handleChange = selectedOption => {
        this.setState({ selectedOption });
        console.log(`Option selected:`, selectedOption);
    };

    async  fetchShopList(data) {
        axios.get(`${Baseurl}/api/v1/vendor/multiStore/getAllStore/${this.state.vendorData._id}/all`)
            .then(response => {
                console.log(response, "product--------------- Data");
                let shopLists = []
                response.data.object.object.storeList.forEach(function (val) {
                    let obj = {}
                    obj.value = val.storeName
                    obj.label = val.storeName
                    Object.assign(obj, val)
                    shopLists.push(obj)
                });
                console.log("shopLists", shopLists)
                this.setState({
                    shopList: shopLists
                })

            })
            .catch(error => {
                console.log(error);
            });



    }


    componentDidMount() {
        this.fetchShopList();
    }

    onUpdateChange(e) {
        console.log(e.target.name, e.target.value, "change");

        // if(e.target.name == 'customeField' || e.target.value == 'customeValue' ){
        //     let obj = this.state.AdditionalFeatures;

        // }
        this.setState({
            [e.target.name]: e.target.value
        })
    }

    uploadProductImage(e) {
        console.log(e.target.files[0]);

        if (e.target.files[0]) {
            const fd = new FormData();
            fd.append('file', e.target.files[0], e.target.files[0].name)
            axios.post(`${Baseurl}/api/v1/common/aws/saveAllImages`, fd)
                .then(response => {
                    console.log(response, "product--------------- Data");
                    this.setState({
                        productImage: response.data.object.name
                    })

                })
                .catch(error => {
                    console.log(error);
                });

        }
    }

    onDescriptionChange(e) {
        var newContent = e.editor.getData();
        this.setState({
            productDescription: newContent
        })
    }



    addProductToDB() {
        let VendorData = localStorage.getItem('VendorData');
        var storeId = [];
        storeId.push(this.state.selectedOption._id)
        this.props.AddProductToDB({
            subCategory: this.state.category,
            productName: this.state.productName,
            productDescription: this.remove_html_tags(this.state.productDescription),
            brandName: this.state.brandName,
            attributes: {
                color: this.state.color,
                size: this.state.size,
                Material_type: this.state.Material_type
            },
            shopIds: storeId,
            inStockCount:this.state.stockCount,
            modelNo: this.state.model,
            price: this.state.price,
            isAvailable: (this.state.isAvailable == 'on') ? true : false,
            title: this.state.title,
            vendorId: this.state.vendorData._id,
            productImage: this.state.productImage,
            addCustomeFeatures: this.state.AdditionalFeatures
        })
    }

    componentWillReceiveProps(nextProps, ) {
        console.log("nextProps------->>", nextProps.addProductResult)
        if (this.props !== nextProps) {
            toast.success("Product Saved Successfully");

            let history = this.props.history

            setTimeout(function () {
                history.push(`${process.env.PUBLIC_URL}/Vendor/products/digital/digital-product-list`);
            }, 1000)

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
                size: '',
                model: ''
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

    addCustomeFeatures = () => {
        console.log(this.state.customField);
        console.log(this.state.customValue);
        let obj = this.state.AdditionalFeatures;
        obj[this.state.customField] = this.state.customValue
        console.log("add feta", obj);

        this.setState({
            AdditionalFeatures: obj,
            customField: '',
            customValue: ''
        })
    }


    render() {

        console.log(this.state, "this.state");
        const { selectedOption } = this.state;
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
                                            <label className="col-form-label pt-0"><span>*</span> Select Store</label>
                                            <Select
                                                value={selectedOption}
                                                onChange={this.handleChange}
                                                options={this.state.shopList}
                                            />
                                        </div>
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
                                        <label className="col-form-label"><span>*</span>  Product Upload</label>
                                        <br></br>
                                        <input type="file" onChange={this.uploadProductImage} ></input>
                                        <div className="form-group">
                                            <br />
                                            <label className="col-form-label pt-0"> <b>Additional Features</b></label><br></br>
                                            <label className="col-form-label">Custome Field</label>
                                            <input className="form-control" name="customField" value={this.state.customField} onChange={this.onUpdateChange} id="validationCustom02" type="text" required="" />

                                            <label className="col-form-label"><span></span> Custome Value</label>
                                            <input className="form-control" name="customValue" value={this.state.customValue} onChange={this.onUpdateChange} id="validationCustom02" type="text" required="" />
                                            <br></br>
                                            <input type="button" className="btn" value="Add" onClick={this.addCustomeFeatures}></input>
                                        </div>

                                        <div>
                                            {(() => {
                                                let container = []; _.each(this.state.AdditionalFeatures, function (value, key) {
                                                    console.log(key, value);

                                                    container.push(
                                                        <div key={key} >
                                                            <span>{key}- {value}</span>
                                                        </div>)
                                                }); return container;
                                            })()}
                                        </div>
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
                                        <label className="col-form-label"><span>*</span>  Brand Name</label>
                                            <input className="form-control" value={this.state.brandName} name="brandName" onChange={this.onUpdateChange} id="validationCustom05" type="text" required="" />
                                        </div>
                                        <div className="form-group">
                                        <label className="col-form-label"><span>*</span>  Available Products in Stock</label>
                                            <input className="form-control" value={this.state.stockCount} name="stockCount" onChange={this.onUpdateChange} id="validationCustom05" type="number" required="" />
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
                                                <button type="button" onClick={this.addProductToDB} className="btn btn-default">Add Product</button>
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
        AddProductToDB: (payload) => { dispatch(addProduct(payload)) }
    }
}


export default connect(mapStateToProps, mapDispatchToProps)(Digital_add_pro);