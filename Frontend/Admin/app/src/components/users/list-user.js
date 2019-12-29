
import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import ReactTable from 'react-table';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Breadcrumb from '../../components/common/breadcrumb';
import { customerList } from '../../Action/CustomerAction';
import { REQUEST_PATH } from '../../utils/paths-config';
export class List_user extends Component {
	constructor(props) {
		super(props);
		this.state = {
			customerList: [{}],
			cols: ["productName", "id"],
			isLoading: false,
			checked: true,
			defaultImage: "https://www.mnn.com/static/img/not_available.png",
		}
		this.handleChange = this.handleChange.bind(this);
	}

	componentDidMount() {
		this.props.customer_List();
	}

	responseFacebook(response) {
		console.log(response);
	}

	handleChange(checked) {
		console.log(checked)
		this.setState({
			checked
		});
		this.props.customer_List();
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
		})
		window.location.reload()
	}

	render() {
		console.log(this.state, "this.state-------------------------------render");
		console.log(this.props, "this.props-------------------------------render");

		const columns = [{
			Header: 'Customer ID',
			accessor: '_id',
			style: {
				"textAlign": "center"
			},
			minWidth: 50
		}, {
			Header: 'Image',
			Cell: props => (
				<div>
					<img className="img-responsive" style={{ height: 50 + 'px', width: 50 + 'px' }} src={(props.original.CustomerImage !== "") ? REQUEST_PATH.BaseUrl + "/" + props.original.CustomerImage : this.state.defaultImage} />
				</div>
			),
			minWidth: 55
		}, {
			Header: 'Customer Name',
			accessor: 'fullName',
			style: {
				"textAlign": "center"
			},
			minWidth: 70
		}, {
			Header: 'Email',
			accessor: 'email',
			style: {
				"textAlign": "center"
			},
			minWidth: 40
		}, {
			Header: 'Mobile',
			accessor: 'mobile',
			sortable: false,
			style: {
				"textAlign": "center"
			},
			minWidth: 45
		}, {
			Header: "Registered Date",
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
				<Breadcrumb title="Customers List" parent="Customer" />
				<div className="container-fluid">
					<div className="row">
						<div className="col-sm-12">
							<div className="card">
								<div className="card-body">
									{/* <span> <Switch onChange={this.handleChange} checked={this.state.checked} uncheckedIcon="" /></span> */}
									{/* <input type="text" onChange={this.onSearch} placeholder="Search" className="form-control" /> */}
									<div className="clearfix"></div>
									<div id="basicScenario" className="product-physical">
										<ReactTable
											data={(typeof this.props.customerList == 'object') ? this.props.customerList : []}
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
		// customerList: (state.CustomerReducer != "" && state.CustomerReducer.object.object) ? state.CustomerReducer.object.object.customerlist : []
		customerList: state.customer.customerList
	}
};

const mapDispatchToProps = (dispatch) => {
	return {
		customer_List: () => { dispatch(customerList()) },
	}
}

export default connect(mapStateToProps, mapDispatchToProps)(List_user);


