import React from 'react';

class HomeBanner extends React.Component{
    render(){
        return(
                <div className="container-fluid">
                <div className="row">
                    <div className="head-title">
                    <h3>Featured Brand</h3>
                    </div>
                        <div className="banner row">
                            <div className="banner1 col-md-4">
                                <a><img src="/assets/images/banner/banner1.jpg" /></a>
                            </div>
                            <div className="banner1 col-md-4">
                                <a><img src="/assets/images/banner/banner2.jpg" /></a>
                            </div>
                            <div className="banner1 col-md-4">
                                <a><img src="/assets/images/banner/banner3.jpg" /></a>
                            </div>

                            </div>
                       
                    </div>
                </div>
         
        )
    }
}
export default HomeBanner;