import React from 'react';

class HomeBanner2 extends React.Component{
    render(){
        return(
                <div className="container-fluid">
                <div className="row">
                    <div className="head-title">
                    <h3>Hot Deals</h3>
                    </div>
                        <div className="banner row">
                            <div className="banner1 col-md-4">
                                <a><img src="/assets/images/banner/banner4.jpg" /></a>
                            </div>
                            <div className="banner1 col-md-4">
                                <a><img src="/assets/images/banner/banner5.jpg" /></a>
                            </div>
                            <div className="banner1 col-md-4">
                                <a><img src="/assets/images/banner/banner6.jpg" /></a>
                            </div>

                            </div>
                       
                    </div>
                </div>
         
        )
    }
}
export default HomeBanner2;