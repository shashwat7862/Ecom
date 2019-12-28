import React, { Component } from 'react';
import Slider from 'react-slick';
import {Link} from 'react-router-dom';

import {Slider3} from "../../../services/script"

class BlogSection extends Component {
    render (){

        return (
                <div className="container">
                    <div className="row">
                        <div className="col-md-12">
                            <Slider {...Slider3} className="slide-3 no-arrow ">
                                <div>
                                    <div className="col-md-12">
                                        <Link to={`${process.env.PUBLIC_URL}/blog/details`} >
                                            <div className="classic-effect">
                                                <img style={{marginLeft:103+'px'}} src={`https://rukminim1.flixcart.com/image/150/150/k070zgw0/smartwatch/x/h/v/gsw1-gionee-original-imafjz5dygcynnu2.jpeg?q=70`} className="img-fluid" alt="" />
                                                    <span></span>
                                            </div>
                                        </Link>
                                        <div className="blog-details">
                                            <h4>25 January 2018</h4>
                                            <Link to={`${process.env.PUBLIC_URL}/blog/details`} >
                                                <p>Lorem ipsum dolor sit consectetur adipiscing elit, </p></Link>
                                            <hr className="style1" />
                                                <h6>by: John Dio , 2 Comment</h6>
                                        </div>
                                    </div>
                                </div>
                                <div>
                                    <div className="col-md-12">
                                        <Link to={`${process.env.PUBLIC_URL}/blog/details`} >
                                            <div className="classic-effect">
                                                <img style={{marginLeft:103+'px'}} src={`https://rukminim1.flixcart.com/image/150/150/ji3g70w0/smart-monitoring-system/h/h/2/d706-hd-360-original-imaf5ytyumn77nyg.jpeg?q=70`} className="img-fluid" alt="" />
                                                    <span></span>
                                            </div>
                                        </Link>
                                        <div className="blog-details">
                                            <h4>25 January 2018</h4>
                                            <Link to={`${process.env.PUBLIC_URL}/blog/details`} >
                                                <p>Lorem ipsum dolor sit consectetur adipiscing elit, </p></Link>
                                            <hr className="style1"/>
                                                <h6>by: John Dio , 2 Comment</h6>
                                        </div>
                                    </div>
                                </div>
                                <div>
                                    <div className="col-md-12">
                                        <Link to={`${process.env.PUBLIC_URL}/blog/details`} >
                                            <div className="classic-effect">
                                                <img style={{marginLeft:103+'px'}} src={`https://rukminim1.flixcart.com/image/150/150/jzfvma80/smartwatch/y/r/b/ghj-dz09-shopping-mart-original-imaev59gpe7efuhn.jpeg?q=70`} className="img-fluid" alt="" />
                                                    <span></span>
                                            </div>
                                        </Link>
                                        <div className="blog-details">
                                            <h4>25 January 2018</h4>
                                            <Link to={`${process.env.PUBLIC_URL}/blog/details`} ><p>Lorem ipsum dolor sit consectetur adipiscing elit, </p></Link>
                                            <hr className="style1"/>
                                                <h6>by: John Dio , 2 Comment</h6>
                                        </div>
                                    </div>
                                </div>
                                <div>
                                    <div className="col-md-12">
                                    <Link to={`${process.env.PUBLIC_URL}/blog/details`} >
                                        <div className="classic-effect">
                                            <img style={{marginLeft:103+'px'}} src={`https://rukminim1.flixcart.com/image/150/150/headphone/stero-dynamic/j/e/5/boat-rockerz-400-original-imaern54feugsgen.jpeg?q=70`} className="img-fluid" alt="" />
                                                <span></span>
                                        </div>
                                    </Link>
                                    <div className="blog-details">
                                        <h4>25 January 2018</h4>
                                        <Link to={`${process.env.PUBLIC_URL}/blog/details`} ><p>Lorem ipsum dolor sit consectetur adipiscing elit, </p></Link>
                                        <hr className="style1"/>
                                            <h6>by: John Dio , 2 Comment</h6>
                                    </div>
                                </div>
                                </div>
                                <div>
                                    <div className="col-md-12">
                                        <Link to={`${process.env.PUBLIC_URL}/blog/details`} >
                                            <div className="classic-effect">
                                                <img style={{marginLeft:103+'px'}} src={`https://images-eu.ssl-images-amazon.com/images/I/61+zSvZxJ5L._AC_SY200_.jpg`} className="img-fluid" alt="" />
                                                    <span></span>
                                            </div>
                                        </Link>
                                        <div className="blog-details">
                                            <h4>25 January 2018</h4>
                                            <Link to={`${process.env.PUBLIC_URL}/blog/details`} ><p>Lorem ipsum dolor sit consectetur adipiscing elit, </p></Link>
                                            <hr className="style1" />
                                                <h6>by: John Dio , 2 Comment</h6>
                                        </div>
                                    </div>
                                </div>
                            </Slider>
                        </div>
                    </div>
                </div>
        )
    }
}

export default BlogSection;