import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import ReactTable from 'react-table';
import { ToastContainer, toast } from 'react-toastify';
import Switch from "react-switch";
import Breadcrumb from '../../common/breadcrumb';
import 'react-toastify/dist/ReactToastify.css';
import { productList, provideApproval } from '../../../Action/ProductAction';
import { REQUEST_PATH } from '../../../utils/paths-config';
export class Digital_pro_list extends Component {
	constructor(props) {
		super(props);
		this.state = {
			ProductsList: [{}],
			cols: ["productName", "id"],
			isLoading: false,
			checked: true,
			defaultImage: "https://www.mnn.com/static/img/not_available.png",
		}
		this.handleChange = this.handleChange.bind(this);
	}

	componentDidMount() {
		this.getProductList();
	}

	responseFacebook(response) {
		console.log(response);
	}

	handleChange(checked) {
		console.log(checked)
		this.setState({
			checked
		});
		this.getProductList(checked);
	}

	getProductList(isApprove) {
		this.props.getProductList(isApprove);
	}

	editProductData(data) {
		console.log(JSON.stringify(data.original), "JSON.stringify(data.original)")
		this.props.history.push(`${process.env.PUBLIC_URL}/products/digital/digital-edit-product/${JSON.stringify(data.original)}`);
	}

	provideApproval(val, props) {
		console.log(val, props.original._id, "-----------------")
		this.props.ProvideApproval({
			"id": props.original._id,
			"isApprove": val
		}, this.getProductList.bind(this))
	}

	render() {
		console.log(this.state, "this.state-------------------------------render");
		console.log(this.props, "this.props-------------------------------render");

		const columns = [{
			Header: 'Product ID',
			accessor: '_id',
			style: {
				"textAlign": "center"
			},
			minWidth: 50
		}, {
			Header: 'Image',
			Cell: props => (
				<div>
					<img className="img-responsive" style={{ height: 50 + 'px', width: 50 + 'px' }} src={(props.original.productImage !== "") ? REQUEST_PATH.BaseUrl + "/" + props.original.productImage : this.state.defaultImage} />
				</div>
			),
			minWidth: 55
		}, {
			Header: 'Product Name',
			accessor: 'productName',
			style: {
				"textAlign": "center"
			},
			minWidth: 70
		}, {
			Header: 'Brand',
			accessor: 'brandName',
			style: {
				"textAlign": "center"
			},
			minWidth: 40
		}, {
			Header: 'Vendor`s Email',
			accessor: 'vendorId.email',
			style: {
				"textAlign": "center"
			},
			minWidth: 70
		}, {
			Header: 'Price',
			accessor: 'price',
			sortable: false,
			style: {
				"textAlign": "center"
			},
			minWidth: 45
		}, {
			Header: "Date",
			accessor: 'createdAt',
			style: {
				"textAlign": "center"
			},
			minWidth: 35
		}, {
			Header: 'Action',
			Cell: (props) => (
				<div>
					<span onClick={() => {

						this.provideApproval(true, props)

					}}>
						<i className="fa fa-check" title="Approve" style={{ width: 35, fontSize: 20, padding: 11, color: '#e4566e' }}
						></i>
					</span>

					<span onClick={() => {
						if (window.confirm('Are you sure you wish to disappove this item?')) {
							this.provideApproval(false, props)
						}


					}}><i className="fa fa-remove" title="Disapprove" style={{ width: 35, fontSize: 20, padding: 11, color: 'rgb(40, 167, 69)' }}></i></span>
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
				<Breadcrumb title="All Product List" parent="Digital" />
				<div className="container-fluid">
					<div className="row">
						<div className="col-sm-12">
							<div className="card">
								<div className="card-body">
									<span> <Switch onChange={this.handleChange} checked={this.state.checked} uncheckedIcon="" /></span>
									{/* <input type="text" onChange={this.onSearch} placeholder="Search" className="form-control" /> */}
									<div className="clearfix"></div>
									<div id="basicScenario" className="product-physical">
										<ReactTable
											data={this.props.ProductsList}
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

const mapStateToProps = (state) => {
	return {
		ProductsList: state.product.productList
	}
};

const mapDispatchToProps = (dispatch) => {
	return {
		getProductList: (isApprove) => { dispatch(productList(isApprove)) },
		ProvideApproval: (query, callback) => { dispatch(provideApproval(query, callback)) }
	}
}

export default connect(mapStateToProps, mapDispatchToProps)(Digital_pro_list);
