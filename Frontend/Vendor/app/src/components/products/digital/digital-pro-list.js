import React, { Component, Fragment } from 'react'
import Breadcrumb from '../../common/breadcrumb';
import data from '../../../assets/data/pro_list';
import Datatable from '../../common/datatable';
import axios from 'axios';

export class Digital_pro_list extends Component {

    constructor(props) {
        super(props);
        this.state = {
            ProductsList: [],

        }
        // this.handleChange = this.handleChange.bind(this);


    }

    responseFacebook(response) {
        console.log(response);
    }

   

    componentDidMount() {
        axios.get('//localhost:8080/api/v1/vendor/ProductsList/electronics/false/10/0')
            .then(response => {
                // alert("Fetched IN")
                console.log(response, "fetchded Data");
                this.setState({
                    ProductsList: response.data.object.object
                })

                // console.log("this.ProductsList", this.ProductsList)
            })
            .catch(error => {
                console.log(error);
            });
    }

    render() {
        console.log(this.state,"this.state")
        return (
            <Fragment>
                <Breadcrumb title="Product List" parent="Digital" />
                {/* <!-- Container-fluid starts--> */}
                <div className="container-fluid">
                    <div className="row">
                        <div className="col-sm-12">
                            <div className="card">
                                <div className="card-header">
                                    <h5>Product Lists</h5>
                                </div>
                                <div className="card-body">
                                    <div className="clearfix"></div>
                                    {/* <h1>{this.state.ProductsList[0]._id}</h1> */}
                                    <div id="basicScenario" className="product-physical">
                                        <Datatable
                                            multiSelectOption={false}
                                            myData={this.state.ProductsList}
                                            pageSize={9}
                                            pagination={false}
                                            class="-striped -highlight"
                                        />
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                {/* <!-- Container-fluid Ends--> */}
            </Fragment>
        )
    }
}

export default Digital_pro_list
