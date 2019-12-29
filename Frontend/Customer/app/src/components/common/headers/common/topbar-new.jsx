import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { withTranslate } from 'react-redux-multilingual';
import CartContainer from "../../../../containers/CartContainer";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import ReactSearchBox from 'react-search-box'

class TopBar extends Component {

  constructor(props) {
    const customerDetails = JSON.parse(localStorage.getItem('customerDetails'))
    super(props)
    this.state = {
      customerDetails: customerDetails,
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
    window.location.reload()
  }
  render() {
    const { translate } = this.props;
    let data = [
      {
        key: 'john',
        value: 'John Doe',
      },
      {
        key: 'jane',
        value: 'Jane Doe',
      },
      {
        key: 'mary',
        value: 'Mary Phillips',
      },
      {
        key: 'robert',
        value: 'Robert',
      },
      {
        key: 'karius',
        value: 'Karius',
      },
    ]


    return (
      <div className="top-header white-bg">
        <ToastContainer />
        <div className="row">
          <div className="col-lg-6" style={{ paddingTop: 26 }}>
            <ReactSearchBox
              placeholder="Search for John, Jane or Mary"
              data={data}
              onSelect={record => console.log(record)}
              onFocus={() => {
                console.log('This function is called when is focussed')
              }}
              onChange={value => console.log(value)}
              fuseConfigs={{
                threshold: 0.05,
              }}
            />
            {/* <form class="form-inline">
  <i class="fas fa-search" aria-hidden="true"></i>
  <input class="form-control form-control-sm ml-3 w-75" type="text" placeholder="Search"
    aria-label="Search"/>
</form> */}
            {/* <form className="form-inline">
              <input className="form-control mr-sm-2" style={{ width: 300 + 'px' }} type="search" placeholder="Search" aria-label="Search" />
              <button className="btn btn-outline-warning my-2 my-sm-0" type="submit">Search</button>
            </form> */}
            {/* <div>
              <form className="form_search" role="form" style={{ marginTop: -30 + 'px', marginRight: 170 + 'px' }}>
                <input id="query search-autocomplete" type="search"
                  placeholder="        Search Anything"
                  className="nav-search nav-search-field" aria-expanded="true" />
                <button type="submit" name="nav-submit-button" className="btn-search">
                  <i className="fa fa-search"></i>
                </button>
              </form>
            </div> */}
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
            <ul className="header-dropdown">
              <li className="onhover-dropdown mobile-account">
                {/* <i className="fa fa-user" aria-hidden="true"></i>  */}
                Login & Register
                {/* {(this.state.customerDetails) ?
                  <ul className="onhover-show-div">
                    <li onClick={this.logOut}>logout  </li>

                  </ul> :
                  <ul className="onhover-show-div">
                    <li>
                      <Link to={`${process.env.PUBLIC_URL}/login`} data-lng="en">Login</Link>
                    </li>
                    <li>
                      <Link to={`${process.env.PUBLIC_URL}/register`} data-lng="en">Register</Link>
                    </li>
                  </ul> */}
              </li>
            </ul>

          </div>
        </div>
      </div>
    )
  }
}

export default withTranslate(TopBar);