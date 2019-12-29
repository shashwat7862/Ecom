import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import ReactTable from 'react-table';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Breadcrumb from '../common/breadcrumb';
import Baseurl from '../../assets/data/url'
import { orderList } from '../../Action/ProductAction';
export class Orders extends Component {
	constructor(props) {
		super(props);
		this.state = {
			orderList: [{}],
			cols: ["productName", "Age"],
			isLoading: false,
			checked: true,
			defaultImage: "https://www.mnn.com/static/img/not_available.png",
			vendorData: JSON.parse(localStorage.getItem('vendorDetails'))
		};
		this.handleChange = this.handleChange.bind(this);
	}

	componentDidMount() {
		this.props.getOrderList();
	}

	handleChange(checked) {
		console.log(checked)
		this.setState({
			checked
		});
		this.props.getOrderList();
	}

	responseFacebook(response) {
		console.log(response);
	}

	onSearch = (e) => {
		let searchQuery = e.target.value;
		this.props.productSearch(searchQuery, this.state.vendorData._id)
	}

	editProductData(data) {
		console.log(JSON.stringify(data.original), "JSON.stringify(data.original)")
		this.props.history.push(`${process.env.PUBLIC_URL}/products/digital/digital-edit-product/${JSON.stringify(data.original)}`);
	}

	render() {
		console.log(this.state, "this.state-------------------------------render");
		console.log(this.props, "this.props-------------------------------render");

		const columns = [{
			Header: 'Order ID',
			accessor: 'orderId',
			style: {
				"textAlign": "center"
			},
			minWidth: 100
		}, {
			Header: 'Product ID',
			accessor: 'productId',
			style: {
				"textAlign": "center"
			},
			minWidth: 50
		},
		{
			Header: 'Image',
			Cell: props => (
				<div>
					<img className="img-responsive" style={{ height: 50 + 'px', width: 50 + 'px' }} src={(props.original.productImage !== "") ? Baseurl + "/" + props.original.productImage : this.state.defaultImage} />
				</div>
			),
			minWidth: 55
		}, {
			Header: 'Order Status',
			accessor: 'orderStatus',
			style: {
				"textAlign": "center"
			},
			minWidth: 50
		}, {
			Header: 'Product Price',
			accessor: 'productPrice',
			style: {
				"textAlign": "center"
			},
			minWidth: 40
		}, {
			Header: 'Product',
			accessor: 'productName',
			sortable: false,
			style: {
				"textAlign": "center"
			},
			minWidth: 50
		}, {
			Header: "Order Date",
			accessor: 'createdAt',
			style: {
				"textAlign": "center"
			},
			minWidth: 60
		}];

		return (
			<Fragment>
				<ToastContainer />
				<Breadcrumb title="Manage Orders" parent="Digital" />
				<div className="container-fluid">
					<div className="row">
						<div className="col-sm-12">
							<div className="card">
								<div className="card-body">

									{/* <span> <Switch onChange={this.handleChange} checked={this.state.checked} uncheckedIcon="" /></span> */}
									{/* <br></br><br></br> */}
									{/* <input type="text" onChange={this.onSearch} placeholder="Search" className="form-control" /> */}
									<div className="clearfix"></div>
									<div id="basicScenario" className="product-physical">
										<ReactTable
											data={this.props.orderList}
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
	console.log("state---------mapto", state);
	return {
		// orderList: (state.ProductReducer != "" ) ? state.ProductReducer.object.object.data : [{}]
		orderList: state.product.orderList.data
	}
};

const mapDispatchToProps = (dispatch) => {
	return {
		getOrderList: () => { dispatch(orderList()) },
		// productSearch: (query, vendor_id) => { dispatch(searchProducts(query, vendor_id)) }
	}
}

export default connect(mapStateToProps, mapDispatchToProps)(Orders);
