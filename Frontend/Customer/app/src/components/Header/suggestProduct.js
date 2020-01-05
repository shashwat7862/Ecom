import React from 'react';
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
const responsive = {
    superLargeDesktop: {
      // the naming can be any, depends on you.
      breakpoint: { max: 4000, min: 3000 },
      items: 5,
    },
    desktop: {
      breakpoint: { max: 3000, min: 1024 },
      items: 5,
    },
    tablet: {
      breakpoint: { max: 1024, min: 768 },
      items: 3,
    },
    landscapemob: {
        breakpoint: { max: 767, min: 465 },
        items: 2,
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
            <div className="container pro-item">
            <div className="head-title">
             <h3>Suggested for you</h3>
            </div>
               <Carousel responsive={responsive}>
              
      
   <div className="item-slide">
     <div className="product-grid">
       <div className="product-image">
         <a href="#">
           <img className="pic-1" src="/assets/images/product/81.jpg" />
           <img className="pic-2" src="/assets/images/product/82.jpg" />
         </a>
         <ul className="social">
           <li><a href data-tip="Quick View"><i className="fa fa-search" /></a></li>
           <li><a href data-tip="Add to Wishlist"><i className="fa fa-shopping-bag" /></a></li>
           <li><a href data-tip="Add to Cart"><i className="fa fa-shopping-cart" /></a></li>
         </ul>
         <span className="product-new-label">Sale</span>
         <span className="product-discount-label">20%</span>
       </div>
       <ul className="rating">
         <li className="fa fa-star" />
         <li className="fa fa-star" />
         <li className="fa fa-star" />
         <li className="fa fa-star" />
         <li className="fa fa-star disable" />
       </ul>
       <div className="product-content">
         <h3 className="title"><a href="#">Women's Blouse</a></h3>
         <div className="price">$16.00
           <span>$20.00</span>
         </div>
         <a className="add-to-cart" href>+ Add To Cart</a>
       </div>
     </div>
   </div>
   <div className="item-slide">
     <div className="product-grid">
       <div className="product-image">
         <a href="#">
           <img className="pic-1" src="/assets/images/product/83.jpg" />
           <img className="pic-2" src="/assets/images/product/84.jpg" />
         </a>
         <ul className="social">
           <li><a href data-tip="Quick View"><i className="fa fa-search" /></a></li>
           <li><a href data-tip="Add to Wishlist"><i className="fa fa-shopping-bag" /></a></li>
           <li><a href data-tip="Add to Cart"><i className="fa fa-shopping-cart" /></a></li>
         </ul>
         <span className="product-new-label">Sale</span>
         <span className="product-discount-label">50%</span>
       </div>
       <ul className="rating">
         <li className="fa fa-star" />
         <li className="fa fa-star" />
         <li className="fa fa-star" />
         <li className="fa fa-star" />
         <li className="fa fa-star" />
       </ul>
       <div className="product-content">
         <h3 className="title"><a href="#">Men's Plain Tshirt</a></h3>
         <div className="price">$5.00
           <span>$10.00</span>
         </div>
         <a className="add-to-cart" href>+ Add To Cart</a>
       </div>
     </div>
   </div>
   <div className="item-slide">
     <div className="product-grid">
       <div className="product-image">
         <a href="#">
           <img className="pic-1" src="/assets/images/product/85.jpg" />
           <img className="pic-2" src="/assets/images/product/86.jpg" />
         </a>
         <ul className="social">
           <li><a href data-tip="Quick View"><i className="fa fa-search" /></a></li>
           <li><a href data-tip="Add to Wishlist"><i className="fa fa-shopping-bag" /></a></li>
           <li><a href data-tip="Add to Cart"><i className="fa fa-shopping-cart" /></a></li>
         </ul>
         <span className="product-new-label">Sale</span>
         <span className="product-discount-label">50%</span>
       </div>
       <ul className="rating">
         <li className="fa fa-star" />
         <li className="fa fa-star" />
         <li className="fa fa-star" />
         <li className="fa fa-star" />
         <li className="fa fa-star" />
       </ul>
       <div className="product-content">
         <h3 className="title"><a href="#">Men's Plain Tshirt</a></h3>
         <div className="price">$5.00
           <span>$10.00</span>
         </div>
         <a className="add-to-cart" href>+ Add To Cart</a>
       </div>
     </div>
   </div>
   <div className="item-slide">
     <div className="product-grid">
       <div className="product-image">
         <a href="#">
           <img className="pic-1" src="/assets/images/product/87.jpg" />
           <img className="pic-2" src="/assets/images/product/88.jpg" />
         </a>
         <ul className="social">
           <li><a href data-tip="Quick View"><i className="fa fa-search" /></a></li>
           <li><a href data-tip="Add to Wishlist"><i className="fa fa-shopping-bag" /></a></li>
           <li><a href data-tip="Add to Cart"><i className="fa fa-shopping-cart" /></a></li>
         </ul>
         <span className="product-new-label">Sale</span>
         <span className="product-discount-label">50%</span>
       </div>
       <ul className="rating">
         <li className="fa fa-star" />
         <li className="fa fa-star" />
         <li className="fa fa-star" />
         <li className="fa fa-star" />
         <li className="fa fa-star" />
       </ul>
       <div className="product-content">
         <h3 className="title"><a href="#">Men's Plain Tshirt</a></h3>
         <div className="price">$5.00
           <span>$10.00</span>
         </div>
         <a className="add-to-cart" href>+ Add To Cart</a>
       </div>
     </div>
   </div>
   <div className="item-slide">
     <div className="product-grid">
       <div className="product-image">
         <a href="#">
           <img className="pic-1" src="/assets/images/product/89.jpg" />
           <img className="pic-2" src="/assets/images/product/90.jpg" />
         </a>
         <ul className="social">
           <li><a href data-tip="Quick View"><i className="fa fa-search" /></a></li>
           <li><a href data-tip="Add to Wishlist"><i className="fa fa-shopping-bag" /></a></li>
           <li><a href data-tip="Add to Cart"><i className="fa fa-shopping-cart" /></a></li>
         </ul>
         <span className="product-new-label">Sale</span>
         <span className="product-discount-label">50%</span>
       </div>
       <ul className="rating">
         <li className="fa fa-star" />
         <li className="fa fa-star" />
         <li className="fa fa-star" />
         <li className="fa fa-star" />
         <li className="fa fa-star" />
       </ul>
       <div className="product-content">
         <h3 className="title"><a href="#">Men's Plain Tshirt</a></h3>
         <div className="price">$5.00
           <span>$10.00</span>
         </div>
         <a className="add-to-cart" href>+ Add To Cart</a>
       </div>
     </div>
   </div>
   <div className="item-slide">
     <div className="product-grid">
       <div className="product-image">
         <a href="#">
           <img className="pic-1" src="/assets/images/product/91.jpg" />
           <img className="pic-2" src="/assets/images/product/92.jpg" />
         </a>
         <ul className="social">
           <li><a href data-tip="Quick View"><i className="fa fa-search" /></a></li>
           <li><a href data-tip="Add to Wishlist"><i className="fa fa-shopping-bag" /></a></li>
           <li><a href data-tip="Add to Cart"><i className="fa fa-shopping-cart" /></a></li>
         </ul>
         <span className="product-new-label">Sale</span>
         <span className="product-discount-label">20%</span>
       </div>
       <ul className="rating">
         <li className="fa fa-star" />
         <li className="fa fa-star" />
         <li className="fa fa-star" />
         <li className="fa fa-star" />
         <li className="fa fa-star disable" />
       </ul>
       <div className="product-content">
         <h3 className="title"><a href="#">Women's Blouse</a></h3>
         <div className="price">$16.00
           <span>$20.00</span>
         </div>
         <a className="add-to-cart" href>+ Add To Cart</a>
       </div>
     </div>
   </div>
   <div className="item-slide">
     <div className="product-grid">
       <div className="product-image">
         <a href="#">
           <img className="pic-1" src="/assets/images/product/93.jpg" />
           <img className="pic-2" src="/assets/images/product/94.jpg" />
         </a>
         <ul className="social">
           <li><a href data-tip="Quick View"><i className="fa fa-search" /></a></li>
           <li><a href data-tip="Add to Wishlist"><i className="fa fa-shopping-bag" /></a></li>
           <li><a href data-tip="Add to Cart"><i className="fa fa-shopping-cart" /></a></li>
         </ul>
         <span className="product-new-label">Sale</span>
         <span className="product-discount-label">50%</span>
       </div>
       <ul className="rating">
         <li className="fa fa-star" />
         <li className="fa fa-star" />
         <li className="fa fa-star" />
         <li className="fa fa-star" />
         <li className="fa fa-star" />
       </ul>
       <div className="product-content">
         <h3 className="title"><a href="#">Men's Plain Tshirt</a></h3>
         <div className="price">$5.00
           <span>$10.00</span>
         </div>
         <a className="add-to-cart" href>+ Add To Cart</a>
       </div>
     </div>
   </div>
   <div className="item-slide">
     <div className="product-grid">
       <div className="product-image">
         <a href="#">
           <img className="pic-1" src="/assets/images/product/95.jpg" />
           <img className="pic-2" src="/assets/images/product/96.jpg" />
         </a>
         <ul className="social">
           <li><a href data-tip="Quick View"><i className="fa fa-search" /></a></li>
           <li><a href data-tip="Add to Wishlist"><i className="fa fa-shopping-bag" /></a></li>
           <li><a href data-tip="Add to Cart"><i className="fa fa-shopping-cart" /></a></li>
         </ul>
         <span className="product-new-label">Sale</span>
         <span className="product-discount-label">20%</span>
       </div>
       <ul className="rating">
         <li className="fa fa-star" />
         <li className="fa fa-star" />
         <li className="fa fa-star" />
         <li className="fa fa-star" />
         <li className="fa fa-star disable" />
       </ul>
       <div className="product-content">
         <h3 className="title"><a href="#">Women's Blouse</a></h3>
         <div className="price">$16.00
           <span>$20.00</span>
         </div>
         <a className="add-to-cart" href>+ Add To Cart</a>
       </div>
     </div>
   </div>
               </Carousel>
                </div> 
        )
    }
}
export default SuggestProduct;