import React, { Component } from 'react';
import { Helmet } from 'react-helmet';
import StickyBox from "react-sticky-box";
import Breadcrumb from "../common/breadcrumb";
import NewProduct from "../common/new-product";
import Filter from "./common/filter";
import FilterBar from "./common/filter-bar";
import ProductListing from "./common/product-listing";
import Baseurl from '../../api/url';
import axios from 'axios';
import Caurosel from '../common/carousel';
import {ProductsListElectronicsService} from "../../services/userService";

 
class CollectionLeftSidebar extends Component {

	state = {
		layoutColumns: 3,
		products: [],
		scrollData: [{
			src: ''
		}]
	}

	LayoutViewClicked(colums) {
		this.setState({
			layoutColumns: colums
		})
	}

	openFilter = () => {
		document.querySelector(".collection-filter").style = "left: -15px";
	}

	async componentDidMount() {
		try{
	        	const response = await ProductsListElectronicsService();
				let scrollData = []
				response.data.object.object.forEach(function (val) {
					let obj = {}
					obj.src = Baseurl + '/' + val.productImage
					obj.price =  val.price
					obj.name = val.productName
					scrollData.push(obj)
				});
				this.setState({
					scrollData: scrollData
				});

			}catch(error){
				console.log(error);
			}
	}

	render() {
		const setting = {
			dots: true,
			infinite: true,
			speed: 500,
		}

		console.log("this.state", this.state)
		return (
			<div>
				{/*SEO Support*/}
				<Helmet>
					<title>WeShop | Products</title>
					<meta name="description" content="Multikart – Multipurpose eCommerce React Template is a multi-use React template. It is designed to go well with multi-purpose websites. Multikart Bootstrap 4 Template will help you run multiple businesses." />
				</Helmet>
				{/*SEO Support End */}

				{/* <Breadcrumb title={'Products'} /> */}

				<section className="section-b-space">
					<div className="collection-wrapper">
						<div className="container">
							<div className="row">
								<div className="col-sm-3 collection-filter">

									<StickyBox offsetTop={20} offsetBottom={20}>
										<div>
											{/* <Filter/> */}
											<NewProduct />
											
											{/* <div className="collection-sidebar-banner">
                                                <a href="#">
                                                    <img src={`${process.env.PUBLIC_URL}/assets/images/side-banner.png`} className="img-fluid" alt="" />
                                                </a>
                                            </div> */}
										</div>
									</StickyBox>
									
									{/*side-bar banner end here*/}
								</div>
								<div className="collection-content col-sm-9">
									<div className="page-main-content ">
										<div className="">
											<div className="row">
												<div className="col-sm-12">
													<div className="top-banner-wrapper">
													<a href="#"><img src="http://img5a.flixcart.com/www/promos/new/20150819-154015-slider-1.jpg" className="img-fluid" alt=""/></a>
                                                        {/* <div className="top-banner-content small-section">
                                                            <h4>fashion</h4>
                                                            <h5>Lorem Ipsum is simply dummy text of the printing and typesetting industry.</h5>
                                                            <p>Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum. </p>
                                                        </div> */}
													</div>
													<div className="collection-product-wrapper">
														<div className="product-top-filter">
															<div className="container-fluid p-0">
																<div className="row">
																	<div className="col-xl-12">
																		<div className="filter-main-btn">
																			<span onClick={this.openFilter}
																				className="filter-btn btn btn-theme"><i
																					className="fa fa-filter"
																					aria-hidden="true"></i> Filter</span>
																		</div>
																	</div>
																</div>
																<div className="row">
																	<div className="col-12">
																		<FilterBar onLayoutViewClicked={(colmuns) => this.LayoutViewClicked(colmuns)}/>
																	</div>
																</div>
															</div>
														</div>

														{/* Products Listing Component */}
														<ProductListing colSize={this.state.layoutColumns} />
													</div>
												</div>
											</div>
										</div>
									</div>
								</div>
								<div className="col-12 pt-lg-5">
									<Caurosel data={this.state.scrollData} settings={setting} />
								</div>
							</div>
						</div>
					</div>
				</section>

			</div>
		)
	}
}

export default CollectionLeftSidebar;