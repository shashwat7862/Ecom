import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import AnchorLink from 'react-anchor-link-smooth-scroll'
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
import Baseurl from '../api/url';
import axios from 'axios';
import {ProductsListElectronicsService} from '../services/userService';
import {
    svgFreeShipping,
    svgservice,
    svgoffer
} from "../services/script";
import Caurosel from '../components/common/carousel';

class Landing extends Component {

    constructor(props) {
        super(props)
        this.state = {
            toggle: false,
            products: [],
            scrollData: [{
                src: ''
            }]
        }
    }

    async componentDidMount() {
        try{
             const response = await ProductsListElectronicsService();
                let scrollData = []

                response.data.object.object.forEach(function (val) {
                    let obj = {}
                    obj.src = Baseurl + '/' + val.productImage
                    obj.price = val.price
                    obj.name = val.productName
                    scrollData.push(obj)
                });
                this.setState({
                    scrollData: scrollData
                });

            }catch(error){
                console.log(error);
            }

        setTimeout(function () {
            document.querySelector(".loader-wrapper").style = "display: none";
        }, 2000);

    }

    toggleMenu = () => {
        this.setState({
            toggle: !this.state.toggle
        })
    }


    render() {

        const setting = {
            dots: true,
            infinite: true,
            speed: 500,
        }

        console.log("this.state", this.state)

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
                {/*Collection Banner section*/}
                <section className="banner-furniture ratio_45">
                    <div className="container-fluid">
                        <div className="row partition3">
                            <div className="col-md-3">
                                <a href="#">
                                    <div className="collection-banner p-right text-right">
                                        <div className="img-part">
                                            <img src={'https://images-eu.ssl-images-amazon.com/images/G/31/in-certifiedrefurbished/gateway/Desktop_Laptops_1198211_379x304._SY304_CB448276994_.jpg'} />
                                        </div>
                                        <div className="contain-banner banner-3">
                                            {/* <div>
                                                <h4>save 30%</h4>
                                                <h2>sofa</h2>
                                            </div> */}
                                        </div>
                                    </div>
                                </a>
                            </div>
                            <div className="col-md-3">
                                <a href="#">
                                    <div className="collection-banner p-right text-right">
                                        <div className="img-part">
                                            <img src={`https://images-eu.ssl-images-amazon.com/images/G/31/IN-hq/2019/img/Home_Improvement/XCM_Manual_379x304_1198909XCM_Manual_1198909__2_1573718372_jpg_LOWER_QL85_._SY304_CB448756436_.jpg`} alt=""
                                                className="img-fluid  lazyload bg-img" />
                                        </div>
                                        <div className="contain-banner banner-3">
                                            {/* <div>
                                                <h4>save 60%</h4>
                                                <h2>new arrival</h2>
                                            </div> */}
                                        </div>
                                    </div>
                                </a>
                            </div>
                            <div className="col-md-3">
                                <a href="#">
                                    <div className="collection-banner p-right text-right">
                                        <div className="img-part">
                                            <img src={`https://images-eu.ssl-images-amazon.com/images/G/31/in-certifiedrefurbished/gateway/Desktop_Headphones_1198213_379x304._SY304_CB448269172_.jpg`} alt=""
                                                className="img-fluid  lazyload bg-img" />
                                        </div>
                                        <div className="contain-banner banner-3">
                                            {/* <div>
                                                <h4>save 60%</h4>
                                                <h2>chair</h2>
                                            </div> */}
                                        </div>
                                    </div>
                                </a>
                            </div>
                            <div className="col-md-3">
                                <a href="#">
                                    <div className="collection-banner p-right text-right">
                                        <div className="img-part">
                                            <img src={`https://images-eu.ssl-images-amazon.com/images/G/31/in-certifiedrefurbished/gateway/Desktop_Speakers_1198382_379x304._SY304_CB448485373_.jpg`} alt=""
                                                className="img-fluid  lazyload bg-img" />
                                        </div>
                                        <div className="contain-banner banner-3">
                                            {/* <div>
                                                <h4>save 60%</h4>
                                                <h2>chair</h2>
                                            </div> */}
                                        </div>
                                    </div>
                                </a>
                            </div>
                        </div>
                    </div>
                </section>
                <section>
                    <img src="https://images-eu.ssl-images-amazon.com/images/G/31/img19/Laptops/Microsoft/Co-op/Nov/ModernPCdigital-1500X300.jpg"></img>
                </section>

                <br></br>
                <section>
                    <Caurosel data={this.state.scrollData} settings={setting} />

                </section>






              
                {/*Blog Section end*/}
                <div className="container">
                    <div className="row">
                        <div className="col">
                            <div className="title1 section-t-space">
                                <h4>Smart Wearables & Home Devices</h4>
                                {/* <h2 className="title-inner1">from the blog</h2> */}
                            </div>
                        </div>
                    </div>
                </div>
                <section className="blog p-t-0">
                    <BlogSection />
                </section>
                <section className="banner-furniture ratio_45">
                    <div className="container-fluid">
                        <div className="row partition3">
                            <div className="col-md-4">
                                <a href="#">
                                    <div className="collection-banner p-right text-right">
                                        <div className="img-part">
                                            <img src={'https://images-eu.ssl-images-amazon.com/images/G/31/in-certifiedrefurbished/gateway/Desktop_AllCat_1198380_379x304._SY304_CB448485346_.jpg'} />
                                        </div>
                                        <div className="contain-banner banner-3">
                                            {/* <div>
                                                <h4>save 30%</h4>
                                                <h2>sofa</h2>
                                            </div> */}
                                        </div>
                                    </div>
                                </a>
                            </div>
                            <div className="col-md-4">
                                <a href="#">
                                    <div className="collection-banner p-right text-right">
                                        <div className="img-part">
                                            <img src={`https://images-eu.ssl-images-amazon.com/images/G/31/img19/Audio/Blaupunkt/BPWEEK/379X304._SY304_CB427199255_.jpg`} alt=""
                                                className="img-fluid  lazyload bg-img" />
                                        </div>
                                        <div className="contain-banner banner-3">
                                            {/* <div>
                                                <h4>save 60%</h4>
                                                <h2>new arrival</h2>
                                            </div> */}
                                        </div>
                                    </div>
                                </a>
                            </div>
                            <div className="col-md-4">
                                <a href="#">
                                    <div className="collection-banner p-right text-right">
                                        <div className="img-part">
                                            <img src={`https://images-eu.ssl-images-amazon.com/images/G/31/in-certifiedrefurbished/gateway/Desktop_Headphones_1198213_379x304._SY304_CB448269172_.jpg`} alt=""
                                                className="img-fluid  lazyload bg-img" />
                                        </div>
                                        <div className="contain-banner banner-3">
                                            {/* <div>
                                                <h4>save 60%</h4>
                                                <h2>chair</h2>
                                            </div> */}
                                        </div>
                                    </div>
                                </a>
                            </div>
                            
                        </div>
                    </div>
                </section>
                {/*Blog Section End*/}

                {/*Footer section*/}
                <section id="footer" className="section-b-space grey-bg footer">
                    <div className="container">
                        <div className="row">
                            <div className="col">
                                <div className="footer-section">
                                    <div>
                                         
                                        <h2>More items to Explore</h2>
                                        <a target="_blank"
                                            href="https://themeforest.net/item/multikart-responsive-react-ecommerce-template/23067773?s_rank=3"
                                            className="btn btn-primary">VIEW ALL</a>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>

                <section className="banner-furniture ratio_45">
                    <div className="container-fluid">
                        <div className="row partition3">
                            <div className="col-lg-6">
                                <a href="#">
                                    <div className="collection-banner p-right text-right">
                                        <div className="img-part">
                                            <img src={'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQFitygmEB0cCEWLndfSfsTnaLmVcgRJx73woh8PWL5nM0ORlmb8g&s'} />
                                        </div>
                                        <div className="contain-banner banner-3">
                                            {/* <div>
                                                <h4>save 30%</h4>
                                                <h2>sofa</h2>
                                            </div> */}
                                        </div>
                                    </div>
                                </a>
                            </div>
                            <div className="col-lg-6">
                                <a href="#">
                                    <div className="collection-banner p-right text-right">
                                        <div className="img-part">
                                            <img src={`https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR6X5M5OT6q7Tp02dTuz8Tm7aCSs6d84A74GU8jqGgkyMGT5BV0qg&s`} alt=""
                                                className="img-fluid  lazyload bg-img" />
                                        </div>
                                        <div className="contain-banner banner-3">
                                            {/* <div>
                                                <h4>save 60%</h4>
                                                <h2>new arrival</h2>
                                            </div> */}
                                        </div>
                                    </div>
                                </a>
                            </div>
                                                      
                        </div>
                    </div>
                </section>

                <section>
                    <img src="https://images-eu.ssl-images-amazon.com/images/G/31/img19/Audio/Blaupunkt/BPWEEK/D14632060_Blaukpunt-week_3_1500X300.jpg"></img>
                </section>

                
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

                {/*Tap To Top*/}
                <div className="tap-top">
                    <div>
                        <i className="fa fa-angle-double-up"></i>
                    </div>
                </div>
                <FooterOne logoName={'logo.png'} />

                <ThemeSettings />

            </div>
        );
    }
}

export default Landing;
