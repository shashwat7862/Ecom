import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { IsLoggeIn } from '../../../../reducers/login/login-action';
import { withTranslate } from 'react-redux-multilingual';
import CartContainer from "../../../../containers/CartContainer";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import ReactSearchBox from 'react-search-box';
import {withRouter} from 'react-router-dom';
import elasticsearch from "elasticsearch";
var client = new elasticsearch.Client({
  host: 'localhost:9200',
  log: 'trace',
  apiVersion: '7.2', // use the same version of your Elasticsearch instance
});

class TopBar extends Component {
  

  constructor(props) {
    const customerDetails = JSON.parse(localStorage.getItem('customerDetails'))
    super(props)
    this.state = {
      customerDetails: customerDetails,
      defaultImage: "https://www.mnn.com/static/img/not_available.png",
      isLogin:false
    }
  }

  componentDidMount(){
    if(JSON.parse(localStorage.getItem("customerDetails"))){
      this.setState({isLogin:true});
    }else{
      this.setState({isLogin:false});
    }
  }



  logOut = () => {
    localStorage.removeItem('authToken');
    localStorage.removeItem('customerDetails');
    localStorage.removeItem('GuestCart');
    localStorage.removeItem('prevUrl');
    this.props.history.push(`${process.env.PUBLIC_URL}/login`);
    toast.success("logout Successfully ");
    this.props.IsLoggeIn(false);
    // window.location.reload()
  }

  async searchChange(q) {
    let searchQ = q
    console.log("params", q)

    try {
      const response = await client.search({
        q: q
      });
      console.log(response.hits.hits, "elecstic search result");

      let arr = [];

      response.hits.hits.forEach(function (val) {
        val.value = val.productName
        arr.push(val._source)
      })
      this.setState({
        products: arr
      })
    } catch (error) {
      console.trace(error.message)
    }
  }

  render() {
    const { translate, isLogin } = this.props;
    // const {isLogin} = this.state;

    let data = [
      {
        key: 'key',
        value: 'Data',
      },
      {
        key: 'Data',
        value: 'Cameras',
      },
      {
        key: 'Data1',
        value: 'MacBook',
      },
      {
        key: 'mary',
        value: 'Camera',
      },
      {
        key: 'robert',
        value: 'Apple Mac',
      },
      {
        key: 'karius',
        value: 'Data Device',
      },
    ]


    return (

      <div className="clearfix">
      <div className="search-box pull-left">
      <ReactSearchBox
              placeholder="Search for John, Jane or Mary"
              data={data}
              onSelect={record => {
                this.props.history.push(`${process.env.PUBLIC_URL}/search/${record.value}`);
              }}
              onFocus={() => {
                console.log('This function is called when is focussed')
              }}
              onChange={value => {
                 this.searchChange(value)
              }}
              fuseConfigs={{
                threshold: 0.05,
              }}
            />
      </div>

      <div className="header-nav-list pull-right">
        <ul className="header-list">
            <li><CartContainer /></li> 
            <li><Link to={`${process.env.PUBLIC_URL}/wishlist`} data-lng="en">wishlist</Link></li> 

            {!isLogin &&
            <React.Fragment>
              <li><Link to={`${process.env.PUBLIC_URL}/login`}>Login</Link></li> 
              <li><Link to={`${process.env.PUBLIC_URL}/register`}>Register</Link></li> 
            </React.Fragment>
           }

         {isLogin &&
            <li>
             <div className="userProfileCover">
                <div className="userProfileImg">
                  <img src="/assets/images/default.png"/>
                </div>  

                <ul className="user-profile-list">
                   <li><Link to={`${process.env.PUBLIC_URL}/cart`}>Your Cart</Link></li>
                   <li><Link to={`${process.env.PUBLIC_URL}/wishlist`}>Your WishList</Link></li>
                   <li><Link to={`${process.env.PUBLIC_URL}/profile/edit-profile`}>Edit Profile</Link></li>
                   <li><Link to={`${process.env.PUBLIC_URL}/profile/notificationPreferences`}>Notification Preferences</Link></li>
                   <li><Link to={`${process.env.PUBLIC_URL}/profile/manageAddress`}>Manage Address</Link></li>
                   <li><Link to={`${process.env.PUBLIC_URL}/profile/orders`}>Your Orders</Link></li>
                   <li><Link to={`${process.env.PUBLIC_URL}/profile/reviews`}>Your Reviews</Link></li>
                   <li><Link to={`${process.env.PUBLIC_URL}/profile/orderComplaint`}>Order Complaints</Link></li>
                   <li><a onClick={this.logOut}>Logout</a></li>
                </ul>
                                
             </div>
             </li> 
          }
               
              
        </ul>
      </div>
    </div>

//       <div className="top-header white-bg">
//         <ToastContainer />
//         <div className="row">
//           <div className="col-lg-6" style={{ paddingTop: 26 }}>
//             <ReactSearchBox
//               placeholder="Search for John, Jane or Mary"
//               data={data}
//               onSelect={record => {
//                 this.props.history.push(`${process.env.PUBLIC_URL}/search/${record.value}`);
//               }}
//               onFocus={() => {
//                 console.log('This function is called when is focussed')
//               }}
//               onChange={value => {
//                  this.searchChange(value)
//               }}
//               fuseConfigs={{
//                 threshold: 0.05,
//               }}
//             />
//             {/* <form class="form-inline">
//   <i class="fas fa-search" aria-hidden="true"></i>
//   <input class="form-control form-control-sm ml-3 w-75" type="text" placeholder="Search"
//     aria-label="Search"/>
// </form> */}
//             {/* <form className="form-inline">
//               <input className="form-control mr-sm-2" style={{ width: 300 + 'px' }} type="search" placeholder="Search" aria-label="Search" />
//               <button className="btn btn-outline-warning my-2 my-sm-0" type="submit">Search</button>
//             </form> */}
//             {/* <div>
//               <form className="form_search" role="form" style={{ marginTop: -30 + 'px', marginRight: 170 + 'px' }}>
//                 <input id="query search-autocomplete" type="search"
//                   placeholder="        Search Anything"
//                   className="nav-search nav-search-field" aria-expanded="true" />
//                 <button type="submit" name="nav-submit-button" className="btn-search">
//                   <i className="fa fa-search"></i>
//                 </button>
//               </form>
//             </div> */}
//           </div>
//           <div className="col-lg-6" style={{ padding: 0, display: 'flex', justifyContent: 'center' }}>
//             <ul className="header-dropdown">
//               <li className="onhover-dropdown mobile-account">
//                 More
//                   <ul className="onhover-show-div">

//                   <li><CartContainer /></li>
//                   <li>
//                     <Link to={`${process.env.PUBLIC_URL}/wishlist`} data-lng="en">wishlist</Link>
//                   </li>
//                 </ul>



//               </li>
//               {/* <li className="mobile-wishlist"><Link to={`${process.env.PUBLIC_URL}/wishlist`}><i className="fa fa-heart" aria-hidden="true"></i>{translate('wishlist')}</Link></li> */}
//               {/* <li><CartContainer /></li> */}
//               {/* <li className="onhover-div mobile-setting">
//                   <div><img src={`${process.env.PUBLIC_URL}/assets/images/icon/setting.png`} className="img-fluid" alt="" />
//                     <i className="fa fa-cog"></i></div>
//                   <div className="show-div setting">
//                     <h6>language</h6>
//                     <ul>
//                       <li><a href={null} onClick={() => this.changeLanguage('en')}>English</a> </li>
//                       <li><a href={null} onClick={() => this.changeLanguage('fn')}>French</a> </li>
//                     </ul>
//                     <h6>currency</h6>
//                     <ul className="list-inline">
//                       <li><a href={null} onClick={() => this.props.changeCurrency('€')}>euro</a> </li>
//                       <li><a href={null} onClick={() => this.props.changeCurrency('₹')}>rupees</a> </li>
//                       <li><a href={null} onClick={() => this.props.changeCurrency('£')}>pound</a> </li>
//                       <li><a href={null} onClick={() => this.props.changeCurrency('$')}>doller</a> </li>
//                     </ul>
//                   </div>
//                 </li> */}
//             </ul>
//             <ul className="header-dropdown">
//               <li className="onhover-dropdown mobile-account">
//                 {/* <i className="fa fa-user" aria-hidden="true"></i>  */}
//                 Login & Register
//                 {/* {(this.state.customerDetails) ?
//                   <ul className="onhover-show-div">
//                     <li onClick={this.logOut}>logout  </li>

//                   </ul> :
//                   <ul className="onhover-show-div">
//                     <li>
//                       <Link to={`${process.env.PUBLIC_URL}/login`} data-lng="en">Login</Link>
//                     </li>
//                     <li>
//                       <Link to={`${process.env.PUBLIC_URL}/register`} data-lng="en">Register</Link>
//                     </li>
//                   </ul> */}
//               </li>
//             </ul>

//           </div>
//         </div>
//       </div>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    isLogin: state.login.isLogin
  }
};

const mapDispatchToProps = (dispatch) => {
  return {
    IsLoggeIn: (status) => { dispatch(IsLoggeIn(status)) },
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(withTranslate(TopBar)));