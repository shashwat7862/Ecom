import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import AnchorLink from 'react-anchor-link-smooth-scroll';
import { IsLoggeIn } from './../actions';
import HeaderSix from './common/headers/header-six';
import './landing.scss';
import '../components/common/index.scss';
import Slider from 'react-slick';
import ThemeSettings from "../components/common/theme-settings";

// Import custom components
import TopCollection from "../components/layouts/common/collection"
import HeaderOne from "../components/common/headers/header-one"
import FooterOne from "../components/common/footers/footer-one"
import Instagram from "../components/layouts/common/instagram"
import MultiSlider from "../components/layouts/multiple-slider";
import BlogSection from "../components/layouts/common/blogsection";
import {
    svgFreeShipping,
    svgservice,
    svgoffer
} from "../services/script"

class Landing extends Component {

    constructor(props) {
        super(props)
        this.state = {
            toggle: false
        }
    }

    async componentDidMount() {
        const customerDetails = await JSON.parse(localStorage.getItem('customerDetails'));
        const isLogin = (customerDetails) ? true: false;
        this.props.IsLoggeIn(isLogin)
        setTimeout(function () {
            document.querySelector(".loader-wrapper").style = "display: none";
        }, 2000);

        // let sky = document.querySelector('#img-bg'),
        // elemOne = document.querySelector('#img-1'),
        // elemTwo = document.querySelector('#img-2'),
        // elemThree = document.querySelector('#img-3'),
        // elemFour = document.querySelector('#img-4'),
        // elemFive = document.querySelector('#img-5'),
        // elemSix = document.querySelector('#img-6'),
        // elemSeven = document.querySelector('#img-7'),
        // elemEight = document.querySelector('#img-8'),
        // elemNine = document.querySelector('#img-9'),
        // elemTen = document.querySelector('#img-10'),
        // elemEleven = document.querySelector('#img-11');


        // sky.addEventListener('mousemove', function (e) {
        //     var pageX = e.clientX - window.innerWidth / 2,
        //         pageY = e.clientY - window.innerHeight / 2;
        //     elemOne.style.transform = 'translateX(' + (7 + pageX / 150) + '%) translateY(' + (1 + pageY / 150) + '%)';
        //     elemTwo.style.transform = 'translateX(' + (7 + pageX / 150) + '%) translateY(' + (1 + pageY / 150) + '%)';
        //     elemThree.style.transform = 'translateX(' + (7 + pageX / 150) + '%) translateY(' + (1 + pageY / 150) + '%)';
        //     elemFour.style.transform = 'translateX(' + (7 + pageX / 150) + '%) translateY(' + (1 + pageY / 150) + '%)';
        //     elemFive.style.transform = 'translateX(' + (7 + pageX / 150) + '%) translateY(' + (1 + pageY / 150) + '%)';
        //     elemSix.style.transform = 'translateX(' + (7 + pageX / 150) + '%) translateY(' + (1 + pageY / 150) + '%)';
        //     elemSeven.style.transform = 'translateX(' + (7 + pageX / 150) + '%) translateY(' + (1 + pageY / 150) + '%)';
        //     elemEight.style.transform = 'translateX(' + (7 + pageX / 150) + '%) translateY(' + (1 + pageY / 150) + '%)';
        //     elemNine.style.transform = 'translateX(' + (7 + pageX / 150) + '%) translateY(' + (1 + pageY / 150) + '%)';
        //     elemTen.style.transform = 'translateX(' + (7 + pageX / 150) + '%) translateY(' + (1 + pageY / 150) + '%)';
        //     elemEleven.style.transform = 'translateX(' + (7 + pageX / 150) + '%) translateY(' + (1 + pageY / 150) + '%)';
        // });
    }

    toggleMenu = () => {
        this.setState({
            toggle: !this.state.toggle
        })
    }


    render() {
        return (

            <div className="landing-page-multikart">
                <header id="sticky" className="sticky">
                    <div className="container-fluid">
                        <div className="row">
                            <HeaderSix logoName={'logo.png'} />
                            {/* <br></br><br></br> */}

                        </div>
                    </div>

                </header>




                <section className="p-0">
                    <Slider className="slide-1 home-slider">
                        <div>
                            <div className="home home21 text-center p-right">
                                <div className="container">
                                    <div className="row">
                                        <div className="col">
                                            <div className="slider-contain">
                                                <div>
                                                    {/* <h4>for kids</h4> */}
                                                    {/* <h1>spring collection</h1><a href="#" className="btn btn-solid">shop now</a> */}
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div>
                            <div className="home home22 text-center">
                                <div className="container">
                                    <div className="row">
                                        <div className="col">
                                            <div className="slider-contain">
                                                <div>
                                                    {/* <h4>30% off</h4> */}
                                                    {/* <h1>lowest price</h1> */}
                                                    {/* <a href="#" className="btn btn-solid">shop now</a> */}
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </Slider>
                </section>

                {/*collection banner layout*/}
                <section className="banner-padding absolute-banner pb-0 ratio2_1">
                    <div className="container absolute-bg">
                        <div className="row partition2">
                            <div className="col-md-6">
                                <a href="#">
                                    <div className="collection-banner p-right text-center">
                                        <div>
                                            <img src={'https://images-eu.ssl-images-amazon.com/images/G/31/img19/Wireless/OnePlus/OnePlus6T/PriceDrop/D9867094_IN_WLME_OnePlus_PriceDrop_NewKV_PC_LP_1500x600._CB465812565_.jpg'}
                                                className="img-fluid  bg-img" alt="" />
                                        </div>
                                        <div className="contain-banner">
                                            {/* <div>
                                                <h4>save 30%</h4>
                                                <h2>outfits</h2>
                                            </div> */}
                                        </div>
                                    </div>
                                </a>
                            </div>
                            <div className="col-md-6">
                                <a href="#">
                                    <div className="collection-banner p-right text-center">
                                        <div>
                                            <img src={'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTgnP-6uU4Z_w3-prcOxjJ7-qoqmZX_9QSIjiQrX5P4Ly4jtYZF&s'}
                                                className="img-fluid  lazyload bg-img" alt="" />
                                        </div>
                                        <div className="contain-banner">
                                            {/* <div>
                                                <h4>save 60%</h4>
                                                <h2>toys</h2>
                                            </div> */}
                                        </div>
                                    </div>
                                </a>
                            </div>
                        </div>
                    </div>
                </section>
                {/*collection banner layout end*/}

                {/*Product slider*/}
                <TopCollection type={'kids'} />
                {/*Product slider End*/}

                {/*Parallax banner*/}
                <section className="p-0">
                    <div className="full-banner parallax parallax-banner11 text-center p-left">
                        <div className="container">
                            <div className="row">
                                <div className="col">
                                    <div className="banner-contain">
                                        {/* <h2>2018</h2>
                                        <h3>top trends</h3>
                                        <h4>special offer</h4> */}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>
                {/*Parallax banner end*/}

                {/*Product Slider*/}
                <MultiSlider type={'kids'} />
                {/*Product Slider End*/}

                {/*Instagram Section*/}
                {/* <Instagram /> */}
                {/*Instagram Section End*/}

                {/* Logo Block Section*/}
                {/* <LogoBlock /> */}
                {/* Logo Block Section End*/}






                {/*service layout*/}
                <div className="container">
                    <section className="service border-section small-section ">
                        <div className="row">
                            <div className="col-md-4 service-block">
                                <div className="media">
                                    <div dangerouslySetInnerHTML={{ __html: svgFreeShipping }} />
                                    <div className="media-body">
                                        <h4>free shipping</h4>
                                        <p>free shipping world wide</p>
                                    </div>
                                </div>
                            </div>
                            <div className="col-md-4 service-block">
                                <div className="media">
                                    <div dangerouslySetInnerHTML={{ __html: svgservice }} />
                                    <div className="media-body">
                                        <h4>24 X 7 service</h4>
                                        <p>online service for new customer</p>
                                    </div>
                                </div>
                            </div>
                            <div className="col-md-4 service-block">
                                <div className="media">
                                    <div dangerouslySetInnerHTML={{ __html: svgoffer }} />
                                    <div className="media-body">
                                        <h4>festival offer</h4>
                                        <p>new online special festival offer</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </section>
                </div>
                {/*Blog Section end*/}
                <div className="container">
                    <div className="row">
                        <div className="col">
                            <div className="title1 section-t-space">
                                <h4>Recent Story</h4>
                                <h2 className="title-inner1">from the blog</h2>
                            </div>
                        </div>
                    </div>
                </div>
                <section className="blog p-t-0">
                    <BlogSection />
                </section>
                {/*Blog Section End*/}

                {/*Footer section*/}
                <section id="footer" className="section-b-space grey-bg footer">
                    <div className="container">
                        <div className="row">
                            <div className="col">
                                <div className="footer-section">
                                    <div>
                                        <ul className="rate-section">
                                            <li><i className="fa fa-star" aria-hidden="true"></i></li>
                                            <li><i className="fa fa-star" aria-hidden="true"></i></li>
                                            <li><i className="fa fa-star" aria-hidden="true"></i></li>
                                            <li><i className="fa fa-star" aria-hidden="true"></i></li>
                                            <li><i className="fa fa-star" aria-hidden="true"></i></li>
                                        </ul>
                                        <h2>purchase the multikart <br />
                                            & create beautiful online store</h2>
                                        <a target="_blank"
                                            href="https://themeforest.net/item/multikart-responsive-react-ecommerce-template/23067773?s_rank=3"
                                            className="btn btn-primary">purchase now</a>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>

                {/*Tap To Top*/}
                <div className="tap-top">
                    <div>
                        <i className="fa fa-angle-double-up"></i>
                    </div>
                </div>
                <FooterOne logoName={'logo/6.png'} />

                <ThemeSettings />

            </div>
        );
    }
}

const mapStateToProps = (state) => {
    return {
      isLogin: state.LoginReducer.isLogin
    }
  };
  
  const mapDispatchToProps = (dispatch) => {
    return {
      IsLoggeIn: (status) => { dispatch(IsLoggeIn(status)) },
    }
  }
  
  export default connect(mapStateToProps, mapDispatchToProps)(Landing);

// export default Landing;
