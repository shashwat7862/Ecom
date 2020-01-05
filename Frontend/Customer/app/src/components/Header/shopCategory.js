import React from 'react';
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
const responsive = {
    superLargeDesktop: {
      // the naming can be any, depends on you.
      breakpoint: { max: 4000, min: 3000 },
      items: 7,
    },
    desktop: {
      breakpoint: { max: 3000, min: 1024 },
      items: 10,
    },
    tablet: {
      breakpoint: { max: 1024, min: 768 },
      items: 3,
    },
    landscapemob: {
        breakpoint: { max: 767, min: 465 },
        items: 6,
      },
    mobile: {
      breakpoint: { max: 464, min: 0 },
      items: 1,
    },
  };
class SuggestProduct extends React.Component
{
    render(){
        return(
            <div className="container-fluid pro-item">
            <div className="head-title">
             <h3>Shop by Category</h3>
            </div>
               <Carousel responsive={responsive}>
        
               <div  id="inventory">
        <div className="card">
          <img className="img-fluid" src="/assets/images/category/cat1.jpg" alt="Card image cap" />
          <button className="btn view-btn">GAMES CONSOLE</button>
          <div className="ribbon"><span>Popular</span></div>
        </div>
      </div>
      
      
  <div  id="inventory">
        <div className="card">
          <img className="img-fluid" src="/assets/images/category/cat2.jpg" alt="Card image cap" />
          <button className="btn view-btn">COMPUTER</button>
          <div className="ribbon"><span>Popular</span></div>
        </div>
      </div>
  <div id="inventory">
        <div className="card">
          <img className="img-fluid" src="/assets/images/category/cat3.jpg" alt="Card image cap" />
          <button className="btn view-btn">TELEVISION</button>
          <div className="ribbon"><span>Popular</span></div>
        </div>
      </div>
  <div id="inventory">
        <div className="card">
          <img className="img-fluid" src="/assets/images/category/cat4.jpg" alt="Card image cap" />
          <button className="btn btn-danger view-btn">MOBILE PHONE</button>               
          <div className="ribbon">
            <span>Popular</span>
          </div>
        </div>
      </div>
  <div id="inventory">
        <div className="card">
          <img className="img-fluid" src="/assets/images/category/cat5.jpg" alt="Card image cap" />
          <button className="btn view-btn">GAMING</button>
        </div>
      </div>
  <div id="inventory">
        <div className="card">
          <img className="img-fluid" src="/assets/images/category/cat6.jpg" alt="Card image cap" />
          <button className="btn btn-danger view-btn">CAMERA</button>
        </div>
      </div>
  <div id="inventory">
        <div className="card">
          <img className="img-fluid" src="/assets/images/category/cat7.jpg" alt="Card image cap" />
          <button className="btn btn-danger view-btn">SMART SPEAKER</button>
        </div>
      </div>
  <div id="inventory">
        <div className="card">
          <img className="img-fluid" src="/assets/images/category/cat8.jpg" alt="Card image cap" />
          <button className="btn  view-btn">HEADPHONES</button>               
        </div>
</div>
<div id="inventory">
        <div className="card">
          <img className="img-fluid" src="/assets/images/category/cat9.jpg" alt="Card image cap" />
          <button className="btn  view-btn">PRINTER</button>               
        </div>
</div>
<div id="inventory">
        <div className="card">
          <img className="img-fluid" src="/assets/images/category/cat4.jpg" alt="Card image cap" />
          <button className="btn btn-danger view-btn">MOBILE PHONE</button>               
          <div className="ribbon">
            <span>Popular</span>
          </div>
        </div>
      </div>
  <div id="inventory">
        <div className="card">
          <img className="img-fluid" src="/assets/images/category/cat5.jpg" alt="Card image cap" />
          <button className="btn view-btn">GAMING</button>
        </div>
      </div>


               </Carousel>
                </div> 
        )
    }
}
export default SuggestProduct;