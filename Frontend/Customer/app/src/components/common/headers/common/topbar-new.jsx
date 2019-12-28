import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { withTranslate } from 'react-redux-multilingual';
import CartContainer from "../../../../containers/CartContainer";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { IsLoggeIn } from '../../../../actions';

class TopBar extends Component {

  constructor(props) {
    const customerDetails = JSON.parse(localStorage.getItem('customerDetails'))
    console.log('topbar customerdetails **', customerDetails)
    super(props)
    this.state = {
      customerDetails: customerDetails,
      loggedIn: (customerDetails) ? true: false,
      defaultImage: "https://www.mnn.com/static/img/not_available.png",
    }
  }

  logOut = () => {
    localStorage.removeItem('authToken');
    localStorage.removeItem('customerDetails');
    localStorage.removeItem('GuestCart');
    localStorage.removeItem('prevUrl');
    // this.props.history.push(`${process.env.PUBLIC_URL}/login`);
    toast.success("logout Successfully ");
    this.props.IsLoggeIn(false);
    // this.setState({ loggedIn: false })
    // window.location.reload()
  }

  render() {
    const { translate, isLogin } = this.props;
    console.log('topbar state **', this.state)
    console.log('topbar props ******', this.props)
    return (
      <div className="top-header white-bg">
        <ToastContainer />
        <div className="row">
          <div className="col-lg-6" style={{ paddingTop: 26 }}>
            {/* <form class="form-inline">
  <i class="fas fa-search" aria-hidden="true"></i>
  <input class="form-control form-control-sm ml-3 w-75" type="text" placeholder="Search"
    aria-label="Search"/>
</form> */}
            {/* <form className="form-inline">
              <input className="form-control mr-sm-2" style={{ width: 300 + 'px' }} type="search" placeholder="Search" aria-label="Search" />
              <button className="btn btn-outline-warning my-2 my-sm-0" type="submit">Search</button>
            </form> */}
            <div>
              <form className="form_search" role="form" style={{ marginTop: -30 + 'px', marginRight: 170 + 'px' }}>
                <input id="query search-autocomplete" type="search"
                  placeholder="        Search Anything"
                  className="nav-search nav-search-field" aria-expanded="true" />
                <button type="submit" name="nav-submit-button" className="btn-search">
                  <i className="fa fa-search"></i>
                </button>
              </form>
            </div>
          </div>
          <div className="col-lg-6" style={{ padding: 0, display: 'flex', justifyContent: 'center' }}>
            <ul className="header-dropdown">
              <li className="onhover-dropdown mobile-account">
                More
                  <ul className="onhover-show-div">
                   
                   <li><CartContainer /></li>
                   <li>
                      <Link to={`${process.env.PUBLIC_URL}/wishlist`} data-lng="en">wishlist</Link>
                    </li>
                  </ul>



              </li>
              {/* <li className="mobile-wishlist"><Link to={`${process.env.PUBLIC_URL}/wishlist`}><i className="fa fa-heart" aria-hidden="true"></i>{translate('wishlist')}</Link></li> */}
              {/* <li><CartContainer /></li> */}
              {/* <li className="onhover-div mobile-setting">
                  <div><img src={`${process.env.PUBLIC_URL}/assets/images/icon/setting.png`} className="img-fluid" alt="" />
                    <i className="fa fa-cog"></i></div>
                  <div className="show-div setting">
                    <h6>language</h6>
                    <ul>
                      <li><a href={null} onClick={() => this.changeLanguage('en')}>English</a> </li>
                      <li><a href={null} onClick={() => this.changeLanguage('fn')}>French</a> </li>
                    </ul>
                    <h6>currency</h6>
                    <ul className="list-inline">
                      <li><a href={null} onClick={() => this.props.changeCurrency('€')}>euro</a> </li>
                      <li><a href={null} onClick={() => this.props.changeCurrency('₹')}>rupees</a> </li>
                      <li><a href={null} onClick={() => this.props.changeCurrency('£')}>pound</a> </li>
                      <li><a href={null} onClick={() => this.props.changeCurrency('$')}>doller</a> </li>
                    </ul>
                  </div>
                </li> */}
            </ul>
            {(isLogin) ? (
              <ul className="header-dropdown">
                <li className="onhover-dropdown mobile-account">
                  <i className="fa fa-user" aria-hidden="true"></i> {translate('my_account')}
                  <ul className="onhover-show-div">
                    <li onClick={this.logOut}>logout</li>
                    <li>Order Details</li>
                  </ul>
                </li>
              </ul>
            ): 
            <div className="header-dropdown"><li><Link to={`${process.env.PUBLIC_URL}/login`}>{'Login & Register'}</Link></li></div>}
          </div>
          </div>
        </div>
        )
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
    
    export default connect(mapStateToProps, mapDispatchToProps)(withTranslate(TopBar));
    
// export default withTranslate(TopBar);