// import React from 'react';
// import { Route, Switch } from 'react-router-dom';
// import App from '../components/app';

// // Components
// import Dashboard from '../components/dashboard';

// // Products physical
// import Category from '../components/products/physical/category';
// import Sub_category from '../components/products/physical/sub-category';
// import Product_list from '../components/products/physical/product-list';
// import Add_product from '../components/products/physical/add-product';
// import Product_detail from '../components/products/physical/product-detail';

// //Product Digital
// import Digital_category from '../components/products/digital/digital-category';
// import Digital_sub_category from '../components/products/digital/digital-sub-category';
// import Digital_pro_list from '../components/products/digital/digital-pro-list';
// import Digital_add_pro from '../components/products/digital/digital-add-pro';
// import Digital_edit_product from '../components/products/digital/digital-edit-Product'

// //Sales
// import Orders from '../components/sales/orders';
// import Transactions_sales from '../components/sales/transactions-sales';
// //Coupons
// import ListCoupons from '../components/coupons/list-coupons';
// import Create_coupons from '../components/coupons/create-coupons';

// //Pages
// import ListPages from '../components/pages/list-page';
// import Create_page from '../components/pages/create-page';
// import Media from '../components/media/media';
// import List_menu from '../components/menus/list-menu';
// import Create_menu from '../components/menus/create-menu';
// import List_user from '../components/users/list-user';
// import Create_user from '../components/users/create-user';
// import List_vendors from '../components/vendors/list-vendors';
// import Create_vendors from '../components/vendors/create.vendors';
// import Translations from '../components/localization/translations';
// import Rates from '../components/localization/rates';
// import Taxes from '../components/localization/taxes';
// import Profile from '../components/settings/profile';
// import Reports from '../components/reports/report';
// import Invoice from '../components/invoice';
// import Datatable from '../components/common/datatable'
// import Login from '../components/auth/login';

// export const Routes = () => (
//   <Switch>
//     <Route exact path={`${process.env.PUBLIC_URL}/`} component={Login} />
//     <Route exact path={`${process.env.PUBLIC_URL}/auth/login`} component={Login} />

//     <App>
//       <Route path={`${process.env.PUBLIC_URL}/dashboard`} component={Dashboard} />

//       <Route path={`${process.env.PUBLIC_URL}/products/physical/category`} component={Category} />
//       <Route path={`${process.env.PUBLIC_URL}/products/physical/sub-category`} component={Sub_category} />
//       <Route path={`${process.env.PUBLIC_URL}/products/physical/product-list`} component={Product_list} />
//       <Route path={`${process.env.PUBLIC_URL}/products/physical/product-detail`} component={Product_detail} />
//       <Route path={`${process.env.PUBLIC_URL}/products/physical/add-product`} component={Add_product} />

//       <Route path={`${process.env.PUBLIC_URL}/products/digital/digital-category`} component={Digital_category} />
//       <Route path={`${process.env.PUBLIC_URL}/products/digital/digital-sub-category`} component={Digital_sub_category} />
//       <Route path={`${process.env.PUBLIC_URL}/products/digital/digital-product-list`} component={Digital_pro_list} />
//       <Route path={`${process.env.PUBLIC_URL}/products/digital/digital-add-product`} component={Digital_add_pro} />
//       <Route path={`${process.env.PUBLIC_URL}/products/digital/digital-edit-product/:data`} component={Digital_edit_product} />


//       <Route path={`${process.env.PUBLIC_URL}/sales/orders`} component={Orders} />
//       <Route path={`${process.env.PUBLIC_URL}/sales/transactions`} component={Transactions_sales} />

//       <Route path={`${process.env.PUBLIC_URL}/coupons/list-coupons`} component={ListCoupons} />
//       <Route path={`${process.env.PUBLIC_URL}/coupons/create-coupons`} component={Create_coupons} />

//       <Route path={`${process.env.PUBLIC_URL}/pages/list-page`} component={ListPages} />
//       <Route path={`${process.env.PUBLIC_URL}/pages/create-page`} component={Create_page} />

//       <Route path={`${process.env.PUBLIC_URL}/media`} component={Media} />

//       <Route path={`${process.env.PUBLIC_URL}/menus/list-menu`} component={List_menu} />
//       <Route path={`${process.env.PUBLIC_URL}/menus/create-menu`} component={Create_menu} />

//       <Route path={`${process.env.PUBLIC_URL}/users/list-user`} component={List_user} />
//       <Route path={`${process.env.PUBLIC_URL}/users/create-user`} component={Create_user} />

//       <Route path={`${process.env.PUBLIC_URL}/vendors/list_vendors`} component={List_vendors} />
//       <Route path={`${process.env.PUBLIC_URL}/vendors/create-vendors`} component={Create_vendors} />

//       <Route path={`${process.env.PUBLIC_URL}/localization/transactions`} component={Translations} />
//       <Route path={`${process.env.PUBLIC_URL}/localization/currency-rates`} component={Rates} />
//       <Route path={`${process.env.PUBLIC_URL}/localization/taxes`} component={Taxes} />

//       <Route path={`${process.env.PUBLIC_URL}/reports/report`} component={Reports} />

//       <Route path={`${process.env.PUBLIC_URL}/settings/profile`} component={Profile} />

//       <Route path={`${process.env.PUBLIC_URL}/invoice`} component={Invoice} />

//       <Route path={`${process.env.PUBLIC_URL}/data-table`} component={Datatable} />

//     </App>
//   </Switch>
// );

// export default Routes;

import React from 'react';
import { Route, Switch } from 'react-router-dom';

// Import custom components
import Landing from '../components/landing';

// Layouts
import Fashion from '../components/layouts/fashion/main';
import Vegetables from '../components/layouts/vegetables/main';
import Kids from '../components/layouts/kids/main';
import Pets from '../components/layouts/pets/main';
import Furniture from '../components/layouts/furniture/main';
import Watch from '../components/layouts/watch/main';
import Beauty from '../components/layouts/beauty/main';
import Electronic from '../components/layouts/electronic/main';


//Collection Pages
import CollectionLeftSidebar from "../components/collection/collection-left-sidebar";
import CollectionNoSidebar from "../components/collection/collection-no-sidebar";
import CollectionRightSidebar from "../components/collection/collection-right-sidebar";
import CollectionFullWidth from "../components/collection/collection-full-width";
import CollectionMetro from "../components/collection/collection-metro";

// Product Pages
import LeftSideBar from "../components/products/left-sidebar";
import RightSideBar from "../components/products/right-sidebar";
import NoSideBar from "../components/products/no-sidebar";
import LeftImage from "../components/products/left-image";
import RightImage from "../components/products/right-image";
import Accordian from "../components/products/accordian";
import ColumnLeft from "../components/products/column-left";
import ColumnRight from "../components/products/column-right";
import Column from "../components/products/column";
import Vertical from "../components/products/vertical";

// Features
import Layout from '../components/app'
import Cart from '../components/cart'
import Compare from '../components/compare/index'
import wishList from '../components/wishlist'
import checkOut from '../components/checkout'
import orderSuccess from '../components/checkout/success-page'

// Extra Pages
import aboutUs from '../components/pages/about-us'
import PageNotFound from '../components/pages/404'
import lookbook from '../components/pages/lookbook'
import Login from '../components/pages/login'
import Register from '../components/pages/register'
import Search from '../components/pages/search'
import Collection from '../components/pages/collection'
import ForgetPassword from '../components/pages/forget-password'
import Contact from '../components/pages/contact'
import Dashboard from '../components/pages/dashboard'
import Faq from '../components/pages/faq'

// Blog Pages
import RightSide from '../components/blogs/right-sidebar'
import Details from '../components/blogs/details'
import BlogPage from '../components/blogs/blog-page'

// Theme Element
import ElementTitle from "../components/features/theme/element-title"
import ElementBanner from "../components/features/theme/element-banner";
import ElementSlider from "../components/features/theme/element-slider";
import ElementCategory from "../components/features/theme/element-category";
import ElementService from "../components/features/theme/element-service";
import ElementRatio from "../components/features/theme/element-ratio";

// Product Elements
import ElementProductBox from "../components/features/product/element-product-box"
import ElementProductSlider from "../components/features/product/element-product-slider"
import ElementProductNoSlider from "../components/features/product/element-product-no-slider"
import ElementMultipleSlider from "../components/features/product/element-multiple-slider"
import ElementProductTab from "../components/features/product/element-product-tab"

export const Routes = () => (
  <Switch>
    <Route exact path={`${process.env.PUBLIC_URL}/`} component={Landing} />
    <Route path={`${process.env.PUBLIC_URL}/vegetables`} component={Vegetables} />
    <Route path={`${process.env.PUBLIC_URL}/electronic`} component={Electronic} />
    <Route path={`${process.env.PUBLIC_URL}/furniture`} component={Furniture} />
    <Route path={`${process.env.PUBLIC_URL}/pets`} component={Pets} />
    <Route path={`${process.env.PUBLIC_URL}/watch`} component={Watch} />
    <Route path={`${process.env.PUBLIC_URL}/kids`} component={Kids} />
    <Route path={`${process.env.PUBLIC_URL}/beauty`} component={Beauty} />
    <Layout>

      {/*Routes For Layouts*/}
      <Route path={`${process.env.PUBLIC_URL}/fashion`} component={Fashion} />

      {/*Routes For Features (Product Collection) */}
      <Route path={`${process.env.PUBLIC_URL}/products`} component={CollectionLeftSidebar} />
      <Route path={`${process.env.PUBLIC_URL}/login`} component={Login} />
      <Route path={`${process.env.PUBLIC_URL}/register`} component={Register} />

      <Route path={`${process.env.PUBLIC_URL}/left-sidebar/collection`} component={CollectionLeftSidebar} />
      <Route path={`${process.env.PUBLIC_URL}/no-sidebar/collection`} component={CollectionNoSidebar} />
      <Route path={`${process.env.PUBLIC_URL}/right-sidebar/collection`} component={CollectionRightSidebar} />
      <Route path={`${process.env.PUBLIC_URL}/full-width/collection`} component={CollectionFullWidth} />
      <Route path={`${process.env.PUBLIC_URL}/metro/collection`} component={CollectionMetro} />

      {/*Routes For Single Product*/}
      <Route path={`${process.env.PUBLIC_URL}/left-sidebar/product/:id`} component={LeftSideBar} />
      <Route path={`${process.env.PUBLIC_URL}/right-sidebar/product/:id`} component={RightSideBar} />
      <Route path={`${process.env.PUBLIC_URL}/no-sidebar/product/:id`} component={NoSideBar} />
      <Route path={`${process.env.PUBLIC_URL}/col-left/product/:id`} component={ColumnLeft} />
      <Route path={`${process.env.PUBLIC_URL}/col-right/product/:id`} component={ColumnRight} />
      <Route path={`${process.env.PUBLIC_URL}/accordian/product/:id`} component={Accordian} />
      <Route path={`${process.env.PUBLIC_URL}/column/product/:id`} component={Column} />
      <Route path={`${process.env.PUBLIC_URL}/left-image/product/:id`} component={LeftImage} />
      <Route path={`${process.env.PUBLIC_URL}/right-image/product/:id`} component={RightImage} />
      <Route path={`${process.env.PUBLIC_URL}/vertical/product/:id`} component={Vertical} />


      {/*Routes For custom Features*/}
      <Route path={`${process.env.PUBLIC_URL}/cart`} component={Cart} />
      <Route path={`${process.env.PUBLIC_URL}/wishlist`} component={wishList} />
      <Route path={`${process.env.PUBLIC_URL}/compare`} component={Compare} />
      <Route path={`${process.env.PUBLIC_URL}/checkout`} component={checkOut} />
      <Route path={`${process.env.PUBLIC_URL}/order-success`} component={orderSuccess} />

      <Route path={`${process.env.PUBLIC_URL}/sales/orders`} component={aboutUs} />

      {/*Routes For Extra Pages*/}
      <Route path={`${process.env.PUBLIC_URL}/pages/about-us`} component={aboutUs} />
      <Route path={`${process.env.PUBLIC_URL}/pages/404`} component={PageNotFound} />
      <Route path={`${process.env.PUBLIC_URL}/pages/lookbook`} component={lookbook} />
      <Route path={`${process.env.PUBLIC_URL}/pages/login`} component={Login} />
      <Route path={`${process.env.PUBLIC_URL}/pages/register`} component={Register} />
      <Route path={`${process.env.PUBLIC_URL}/pages/search`} component={Search} />
      <Route path={`${process.env.PUBLIC_URL}/pages/collection`} component={Collection} />
      <Route path={`${process.env.PUBLIC_URL}/pages/forget-password`} component={ForgetPassword} />
      <Route path={`${process.env.PUBLIC_URL}/pages/contact`} component={Contact} />
      <Route path={`${process.env.PUBLIC_URL}/pages/dashboard`} component={Dashboard} />
      <Route path={`${process.env.PUBLIC_URL}/pages/faq`} component={Faq} />

      {/*Features*/}
      {/*Theme Elements*/}
      <Route path={`${process.env.PUBLIC_URL}/features/element-title`} component={ElementTitle} />
      <Route path={`${process.env.PUBLIC_URL}/features/element-banner`} component={ElementBanner} />
      <Route path={`${process.env.PUBLIC_URL}/features/element-slider`} component={ElementSlider} />
      <Route path={`${process.env.PUBLIC_URL}/features/element-category`} component={ElementCategory} />
      <Route path={`${process.env.PUBLIC_URL}/features/element-service`} component={ElementService} />
      <Route path={`${process.env.PUBLIC_URL}/features/element-ratio`} component={ElementRatio} />

      {/*Product Elements*/}
      <Route path={`${process.env.PUBLIC_URL}/features/element-product-box`} component={ElementProductBox} />
      <Route path={`${process.env.PUBLIC_URL}/features/element-product-slider`} component={ElementProductSlider} />
      <Route path={`${process.env.PUBLIC_URL}/features/element-product-no-slider`} component={ElementProductNoSlider} />
      <Route path={`${process.env.PUBLIC_URL}/features/element-product-multiple-slider`} component={ElementMultipleSlider} />
      <Route path={`${process.env.PUBLIC_URL}/features/element-product-tab`} component={ElementProductTab} />

      {/*Blog Pages*/}
      <Route path={`${process.env.PUBLIC_URL}/blog/right-sidebar`} component={RightSide} />
      <Route path={`${process.env.PUBLIC_URL}/blog/details`} component={Details} />
      <Route path={`${process.env.PUBLIC_URL}/blog/blog-page`} component={BlogPage} />

      {/* <Route exact path="*" component={PageNotFound} /> */}
    </Layout>
  </Switch>
);

export default Routes;
