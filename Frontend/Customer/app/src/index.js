// import React from 'react';
// import ReactDOM from 'react-dom';
// import { Provider } from 'react-redux';
// import { BrowserRouter, Route, Switch } from 'react-router-dom';
// import { ScrollContext } from 'react-router-scroll-4';
// import { IntlReducer as Intl, IntlProvider } from 'react-redux-multilingual'
// import './index.scss';

// // Import custom components
// import store from './store';
// import translations from './constants/translations'
// import { getAllProducts } from './actions'
// import Landing from './components/landing'


// // Layouts
// import Fashion from './components/layouts/fashion/main';
// import Vegetables from './components/layouts/vegetables/main';
// import Kids from './components/layouts/kids/main';
// import Pets from './components/layouts/pets/main';
// import Furniture from './components/layouts/furniture/main';
// import Watch from './components/layouts/watch/main';
// import Beauty from './components/layouts/beauty/main';
// import Electronic from './components/layouts/electronic/main';


// //Collection Pages
// import CollectionLeftSidebar from "./components/collection/collection-left-sidebar";
// import CollectionNoSidebar from "./components/collection/collection-no-sidebar";
// import CollectionRightSidebar from "./components/collection/collection-right-sidebar";
// import CollectionFullWidth from "./components/collection/collection-full-width";
// import CollectionMetro from "./components/collection/collection-metro";

// // Product Pages
// import LeftSideBar from "./components/products/left-sidebar";
// import RightSideBar from "./components/products/right-sidebar";
// import NoSideBar from "./components/products/no-sidebar";
// import LeftImage from "./components/products/left-image";
// import RightImage from "./components/products/right-image";
// import Accordian from "./components/products/accordian";
// import ColumnLeft from "./components/products/column-left";
// import ColumnRight from "./components/products/column-right";
// import Column from "./components/products/column";
// import Vertical from "./components/products/vertical";

// // Features
// import Layout from './components/app'
// import Cart from './components/cart'
// import Compare from './components/compare/index'
// import wishList from './components/wishlist'
// import checkOut from './components/checkout'
// import orderSuccess from './components/checkout/success-page'

// // Extra Pages
// import aboutUs from './components/pages/about-us'
// import PageNotFound from './components/pages/404'
// import lookbook from './components/pages/lookbook'
// import Login from './components/pages/login'
// import Register from './components/pages/register'
// import Search from './components/pages/search'
// import Collection from './components/pages/collection'
// import ForgetPassword from './components/pages/forget-password'
// import Contact from './components/pages/contact'
// import Dashboard from './components/pages/dashboard'
// import Faq from './components/pages/faq'

// // Blog Pages
// import RightSide from './components/blogs/right-sidebar'
// import Details from './components/blogs/details'
// import BlogPage from './components/blogs/blog-page'

// // Theme Element
// import ElementTitle from "./components/features/theme/element-title"
// import ElementBanner from "./components/features/theme/element-banner";
// import ElementSlider from "./components/features/theme/element-slider";
// import ElementCategory from "./components/features/theme/element-category";
// import ElementService from "./components/features/theme/element-service";
// import ElementRatio from "./components/features/theme/element-ratio";

// // Product Elements
// import ElementProductBox from "./components/features/product/element-product-box"
// import ElementProductSlider from "./components/features/product/element-product-slider"
// import ElementProductNoSlider from "./components/features/product/element-product-no-slider"
// import ElementMultipleSlider from "./components/features/product/element-multiple-slider"
// import ElementProductTab from "./components/features/product/element-product-tab"

// class Root extends React.Component {

//     render() {
//         store.dispatch(getAllProducts());

//         return(
//         	<Provider store={store}>
//                 <IntlProvider translations={translations} locale='en'>
// 				<BrowserRouter basename={'/'} >
// 					<ScrollContext>
						
// 					  </ScrollContext>
// 					</BrowserRouter>
//                 </IntlProvider>
// 			</Provider>
//     	);
//     }
// }

// ReactDOM.render(<Root />, document.getElementById('root'));

import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';
import { IntlReducer as Intl, IntlProvider } from 'react-redux-multilingual';
import createHistory from 'history/createBrowserHistory';
import { ScrollContext } from 'react-router-scroll-4';
import Routes from './redux/routes';
import translations from './constants/translations';
import { getAllProducts } from './actions';
import './index.scss';

import configureStore from './redux/store';
const initialState = {};

const history = createHistory();
const store = configureStore(initialState, history)

const Root = () => {
	store.dispatch(getAllProducts());
	return (
		<Provider store={store}>
			<IntlProvider translations={translations} locale='en'>
				<BrowserRouter basename={'/'}>
					<ScrollContext>
						<Routes />
					</ScrollContext>
				</BrowserRouter>
			</IntlProvider>
		</Provider>
	)
}

ReactDOM.render(<Root />,document.getElementById('root'));


