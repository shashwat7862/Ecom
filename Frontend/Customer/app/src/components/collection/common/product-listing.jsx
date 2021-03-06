import React, { Component } from 'react';
import { connect } from 'react-redux'
import { Link } from 'react-router-dom';
import InfiniteScroll from 'react-infinite-scroll-component';
import axios from 'axios';
import { getTotal, getCartProducts } from '../../../reducers'
import { addToCart, addToWishlist, addToCompare } from '../../../actions'
import { getVisibleproducts } from '../../../services';
import ProductListItem from "./product-list-item";
import Baseurl from '../../../api/url';

class ProductListing extends Component {

    constructor(props) {
        super(props)

        this.state = {
            products: []
        };

    }

    componentDidMount() {
        axios.get(`${Baseurl}/api/v1/All/ProductsList/electronics/true/10/0`)
            .then(response => {
                console.log(response, "product--------------- Data");
                this.setState({
                    products: response.data.object.object
                })

            })
            .catch(error => {
                console.log(error);
            });
    }

    // componentWillMount() {
    //     this.fetchMoreItems();
    // }



    fetchMoreItems = () => {
        if (this.state.limit >= this.props.products.length) {
            this.setState({ hasMoreItems: false });
            return;
        }
        // a fake async api call
        setTimeout(() => {
            this.setState({
                limit: this.state.limit + 5
            });
        }, 3000);


    }

    render() {
        const {  addToCart, symbol, addToWishlist, addToCompare } = this.props;
        const { products } = this.state
        console.log(this.props.colSize, products, "product ------------------------")
        return (
            <div>
                <div className="product-wrapper-grid">
                    <div className="container-fluid">
                        {products.length > 0 ?
                            <InfiniteScroll
                                dataLength={this.state.limit} //This is important field to render the next data
                                // next={this.fetchMoreItems}
                                // hasMore={this.state.hasMoreItems}
                                // loader={<div className="loading-cls"></div>}
                                 
                            >
                                <div className="row">
                                    {products.slice(0, 10).map((product, index) =>
                                        <div className={`${this.props.colSize === 3 ? 'col-xl-3 col-md-6 col-grid-box' : 'col-lg-' + this.props.colSize}`} key={index}>
                                            <ProductListItem product={product} symbol={symbol}
                                                onAddToCompareClicked={() => addToCompare(product)}
                                                onAddToWishlistClicked={() => addToWishlist(product)}
                                                onAddToCartClicked={addToCart} key={index} />
                                        </div>)
                                    }
                                </div>
                            </InfiniteScroll>
                            :
                            <div className="row">
                                <div className="col-sm-12 text-center section-b-space mt-5 no-found" >
                                    <img src={`${process.env.PUBLIC_URL}/assets/images/empty-search.jpg`} className="img-fluid mb-4" />
                                    <h3>Sorry! Couldn't find the product you were looking For!!!    </h3>
                                    <p>Please check if you have misspelt something or try searching with other words.</p>
                                    <Link to={`${process.env.PUBLIC_URL}/`} className="btn btn-solid">continue shopping</Link>
                                </div>
                            </div>
                        }
                    </div>
                </div>
            </div>
        )
    }
}
const mapStateToProps = (state) => ({
    products: getVisibleproducts(state.data, state.filters),
    symbol: state.data.symbol,
})

export default connect(
    mapStateToProps, { addToCart, addToWishlist, addToCompare }
)(ProductListing)