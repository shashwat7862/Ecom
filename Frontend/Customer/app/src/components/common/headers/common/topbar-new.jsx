import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { withTranslate } from 'react-redux-multilingual';
import CartContainer from "../../../../containers/CartContainer";
class TopBar extends Component {
  render() {
    const { translate } = this.props;
    return (
      <div className="top-header white-bg">
        <div className="row" style={{justifyContent: 'flex-end', alignItems: 'baseline'}}>
          <div style={{ paddingTop: 10 }}>
            <form className="col-lg-12" style={{ width: '100%', flexWrap: 'nowrap', paddingLeft: 0, paddingRight:0, border: '1px solid #d4d4d4', borderRadius: 5 }} onSubmit={e => e.preventDefault()}>
              <input
                type='text'
                size='45'
                placeholder='Search a Product'
                className="col-lg-11"
                style={{ padding: 10, borderRadius: 10, border: 'none', height: '100%' }}
              />
              <button
                type='submit'
                className="col-lg-1"
                style={{ padding: 7, position: 'absolute', right: 5, background: 'none', border: 'none' }}
              // onClick={this.handleGoClick.bind(this)}
              >
                <i className="fa fa-search" />
              </button>
            </form>
          </div>
          <div style={{ padding: 0, float: 'right',  }}>
            <ul className="header-dropdown">
              <li className="onhover-dropdown mobile-account">
                <i className="fa fa-user" aria-hidden="true"></i> {translate('my_account')}
                <ul className="onhover-show-div">
                  <li>
                    <Link to={`${process.env.PUBLIC_URL}/login`} data-lng="en">Login</Link>
                  </li>
                  <li>
                    <Link to={`${process.env.PUBLIC_URL}/register`} data-lng="en">Register</Link>
                  </li>
                </ul>
              </li>
              <li className="mobile-wishlist"><Link to={`${process.env.PUBLIC_URL}/wishlist`}><i className="fa fa-heart" aria-hidden="true"></i>{translate('wishlist')}</Link></li>
              <CartContainer />
              <li className="onhover-div mobile-setting">
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
              </li>
            </ul>
          </div>
        </div>
      </div>
    )
  }
}

export default withTranslate(TopBar);