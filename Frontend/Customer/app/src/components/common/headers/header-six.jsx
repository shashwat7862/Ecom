import React, { Component } from 'react';
import { connect } from "react-redux";
import { IntlActions } from 'react-redux-multilingual';
import Pace from 'react-pace-progress';

// Import custom components
import store from '../../../store';
import NavBar from "./common/navbar";
import SideBar from "./common/sidebar";
import TopBar from "./common/topbar-new";
import LogoImage from "./common/logo";
import { changeCurrency } from '../../../actions';

class HeaderSix extends Component {
    constructor(props) {
      super(props);
      this.state = {
        isLoading:false
      }
    }
    /*=====================
         Pre loader
         ==========================*/
    componentDidMount() {
      setTimeout(function() {
          document.querySelector(".loader-wrapper").style = "display: none";
      }, 2000);

      this.setState({ open: true });
    }

    componentWillMount(){
      window.addEventListener('scroll', this.handleScroll);
    }
    
    componentWillUnmount() {
      window.removeEventListener('scroll', this.handleScroll);
    }

    handleScroll = () => {
      let number = window.pageXOffset || document.documentElement.scrollTop || document.body.scrollTop || 0;
      if (number >= 300) {
        if (window.innerWidth < 576) {
            document.getElementById("sticky").classList.remove('fixed');
        } else
          document.getElementById("sticky").classList.add('fixed');
      } else {
          document.getElementById("sticky").classList.remove('fixed');
      }
    }

    changeLanguage(lang) {
      store.dispatch(IntlActions.setLocale(lang));
	  }

    openNav() {
      const openmyslide = document.getElementById("mySidenav");
      if(openmyslide) {
          openmyslide.classList.add('open-side')
		  }
    }

    openSearch() {
      document.getElementById("search-overlay").style.display = "block";
    }

    closeSearch() {
      document.getElementById("search-overlay").style.display = "none";
    }

    load = ()=>{
      this.setState({isLoading: true});
      fetch().then(()=>{
        // deal with data fetched
        this.setState({isLoading: false})
      })
    };
    
    renderLeftSide = () => (
      <div className="menu-left">
        <div className="navbar" style={{padding: '20px 45px 20px 0'}}>
          <a href="javascript:void(0)" onClick={this.openNav}>
            <div className="bar-style"> <i className="fa fa-bars sidebar-bar" aria-hidden="true"></i></div>
          </a>
          {/*SideBar Navigation Component*/}
          <SideBar />
        </div>
        <div className="brand-logo">
          <LogoImage logo={this.props.logoName} />
        </div>
      </div>
    );

  renderRightSide = () => (
    <div className="menu-right pull-right col-lg-12" style={{padding: 0, justifyContent: 'flex-end'}}>
    {/* <div className="menu-right pull-right col-lg-12" style={{marginTop:-41+'px'}}> */}
      <NavBar />
    </div>
  );
	
	render() {
		return (
      <div>
				<header id="sticky" className="sticky">
					{this.state.isLoading ? <Pace color="#27ae60"/> : null}
					<div className="mobile-fix-option"></div>
					<div className="container">
						<div className="row">

              <div className="col-lg-12" style={{ maxWidth: '100%', padding: 0 }}>
                <TopBar/>
              </div>

							<div className="col-lg-12" style={{ display: 'flex', flexDirection: 'column'}}>
								<div className="main-menu">
                  <div className="col-lg-12" style={{ padding: 0, display: 'flex' }}>
                    <div className="col-lg-2">{this.renderLeftSide()}</div>
                    <div className="col-lg-10" style={{ maxWidth: '100%', padding: 0, display: 'flex', alignItems: 'center' }}>
                      {this.renderRightSide()}
                    </div>
                  </div>
								</div>
							</div>
    
						</div>
					</div>
				</header>
			</div>
    )
	}
}

export default connect(null,
    { changeCurrency }
)(HeaderSix);