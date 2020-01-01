import React, { Component } from 'react';
import Slider from 'react-slick';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom'
import axios from 'axios';
import { getBestSeller } from "../../services";
import Baseurl from '../../api/url'
import {ProductsListElectronicsService} from '../../services/userService';

class NewProduct extends Component {

    constructor(props) {
        super(props)

        this.state = {
            products: [],
            defaultImage: "https://www.mnn.com/static/img/not_available.png",
        }

    }

  async componentDidMount() {
       try{
            const response = await ProductsListElectronicsService();
                console.log(response, "product--------------- Data");
                this.setState({
                    products: response.data.object.object
                })

            }catch(error){
                console.log(error);
            }
    }

    render() {
        const { products } = this.state;
        let symbol = "₹";
        var arrays = [];
        while (products.length > 0) {
            arrays.push(products.splice(0, 3));
        }

        return (
            <div className="theme-card">
                <h5 className="title-border">new product</h5>
                <Slider className="offer-slider slide-1">
                    {arrays.map((products, index) =>
                        <div key={index}>
                            {products.map((product, i) =>
                                <div className="media" key={i}>
                                    <Link to={`${process.env.PUBLIC_URL}/left-sidebar/product/${product._id}`}>
                                        <img className="img-fluid" src={(product.productImage != "") ? Baseurl + '/' + product.productImage : this.state.defaultImage} alt="" /></Link>
                                    <div className="media-body align-self-center">
                                        <div className="rating">
                                            <i className="fa fa-star"></i>
                                            <i className="fa fa-star"></i>
                                            <i className="fa fa-star"></i>
                                            <i className="fa fa-star"></i>
                                            <i className="fa fa-star"></i>
                                        </div>
                                        <Link to={`${process.env.PUBLIC_URL}/left-sidebar/product/${product._id}`}><h6>{product.name}</h6></Link>
                                        <h4>{symbol}{product.price}
                                            <del><span className="money">{product.price}</span></del></h4>
                                    </div>
                                </div>
                            )}
                        </div>
                    )}
                </Slider>
            </div>
        )
    }
}

function mapStateToProps(state) {
    return {
        items: getBestSeller(state.data.products),
        symbol: state.data.symbol
    }
}

export default connect(mapStateToProps, null)(NewProduct);
