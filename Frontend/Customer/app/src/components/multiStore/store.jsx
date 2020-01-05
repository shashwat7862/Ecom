import React, { Component } from "react";
import InfiniteScroll from 'react-infinite-scroll-component';
// import { getVisibleproducts } from '../../../../services/index';
// import ProductListItem from "../../../collection/common/product-listing";
import Baseurl from '../../api/url'
import { Link } from 'react-router-dom';
import axios from 'axios'

import elasticsearch from "elasticsearch";
var client = new elasticsearch.Client({
    host: 'localhost:9200',
    log: 'trace',
    apiVersion: '7.2', // use the same version of your Elasticsearch instance
});

class Store extends Component {
    constructor(props) {
        super(props);

        this.state = {
            isClicked: false,
            message: "🔬Show Filters",
            products: [],
            limit: 10,
            defaultImage: "https://www.mnn.com/static/img/not_available.png",
        };
    }



    async componentDidMount() {
        const { match: { params } } = this.props;
        let storeId = params.storeId;
        let storeName = params.storeName
        console.log("params", storeId, storeName);

        axios.get(`${Baseurl}/api/v1/vendor/multiStore/getStoreDetails/${storeId}`)
            .then(({ data }) => {
                console.log(data)
                this.setState({
                    products:data.object.object.storeList
                })
            });



        // try {
        //   const response = await client.search({
        //     q: searchQ
        //   });
        //   console.log(response.hits.hits, "elecstic search result");

        //   let arr = [];

        //   response.hits.hits.forEach(function (val) {
        //     arr.push(val._source)
        //   })
        //   this.setState({
        //     products: arr
        //   })
        // } catch (error) {
        //   console.trace(error.message)
        // }
    }

    fetchMoreData = () => {
        // a fake async api call like which sends
        // 20 more records in 1.5 secs
        // setTimeout(() => {
        //   this.setState({
        //     items: this.state.items.concat(Array.from({ length: 20 }))
        //   });
        // }, 1500);
    };


    handleClick() {
        this.setState({
            isClicked: !this.state.isClicked,
            message: this.state.isClicked ? "🔬 Show Filters" : "🎬 Show Movies"
        });
    }
    render() {
        console.log("this.state", this.state)
        const { products } = this.state;
        console.log("products", products);
        const style = {
            height: 30,
            border: "1px solid green",
            margin: 6,
            padding: 8
        };


        return (


            <div className="product-wrapper-grid">
                <div className="container-fluid">
                    {(products.length > 0) ?

                        <InfiniteScroll
                            dataLength={products.length}
                            next={this.fetchMoreData}
                            hasMore={true}
                            loader={<h4>Loading...</h4>}
                        >
                            {products.map((product, index) => (
                                <div className="card" key={index} style={{ width: 18 + 'rem' }}>
                                    <img className="card-img-top" src={(product.productImage != "") ? Baseurl + '/' + product.productImage : this.state.defaultImage} alt="Card image cap" />
                                    <div className="card-body">
                                        <h5 className="card-title">{product.title}</h5>
                                        {/* <p className="card-text">Some quick example text to build on the card title and make up the bulk of the card's content.</p> */}
                                        <a href="#" className="btn btn-primary">Add To Cart</a>
                                    </div>
                                </div>
                            ))}
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

        )
    }
}

export default Store;

