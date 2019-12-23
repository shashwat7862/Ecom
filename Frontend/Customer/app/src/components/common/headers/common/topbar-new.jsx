import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { withTranslate } from 'react-redux-multilingual';
import CartContainer from "../../../../containers/CartContainer";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

class TopBar extends Component {

  constructor(props) {
    const customerDetails = JSON.parse(localStorage.getItem('customerDetails'))
    super(props)
    this.state = {
      customerDetails: customerDetails,
      defaultImage: "https://www.mnn.com/static/img/not_available.png",
    }
  }

  logOut=()=>{
    localStorage.removeItem('authToken');
    localStorage.removeItem('customerDetails');
    localStorage.removeItem('GuestCart');
    localStorage.removeItem('prevUrl');
    // this.props.history.push(`${process.env.PUBLIC_URL}/login`);
    toast.success("logout Successfully ");
    window.location.reload()
  }
  render() {
    const { translate } = this.props;
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
            <form className="form-inline">
              <input className="form-control mr-sm-2" style={{ width: 300 + 'px' }} type="search" placeholder="Search" aria-label="Search" />
              <button className="btn btn-outline-default my-2 my-sm-0" type="submit">Search</button>
            </form>
          </div>
          <div className="col-lg-6" style={{ padding: 0, display: 'flex', justifyContent: 'center' }}>
            <ul className="header-dropdown">
              <li className="onhover-dropdown mobile-account">
                <i className="fa fa-user" aria-hidden="true"></i> {translate('my_account')}
                {(this.state.customerDetails) ?
                  <ul className="onhover-show-div">
                    <li onClick={this.logOut}>logout
                 </li>

                  </ul> :
                  <ul className="onhover-show-div">
                    <li>
                      <Link to={`${process.env.PUBLIC_URL}/login`} data-lng="en">Login</Link>
                    </li>
                    <li>
                      <Link to={`${process.env.PUBLIC_URL}/register`} data-lng="en">Register</Link>
                    </li>
                  </ul>
                }



              </li>
              <li className="mobile-wishlist"><Link to={`${process.env.PUBLIC_URL}/wishlist`}><i className="fa fa-heart" aria-hidden="true"></i>{translate('wishlist')}</Link></li>
              <li><CartContainer /></li>
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
          </div>
        </div>
      </div>
    )
  }
}

export default withTranslate(TopBar);