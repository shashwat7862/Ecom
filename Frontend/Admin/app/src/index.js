import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import './index.scss';
import App from './components/app';
import { checkLogin } from './utils/common';
import PrivateRoute from './components/auth/privateRoute';
import { ScrollContext } from 'react-router-scroll-4';

// Components
import Dashboard from './components/dashboard';

// Products physical
import Category from './components/products/physical/category';
import Sub_category from './components/products/physical/sub-category';
import Product_list from './components/products/physical/product-list';
import Add_product from './components/products/physical/add-product';
import Product_detail from './components/products/physical/product-detail';

//Product Digital
import Digital_category from './components/products/digital/digital-category';
import Digital_sub_category from './components/products/digital/digital-sub-category';
import Digital_pro_list from './components/products/digital/digital-pro-list';
import Digital_add_pro from './components/products/digital/digital-add-pro';
import Digital_edit_product from './components/products/digital/digital-edit-Product';
import Digital_pro_review from './components/products/digital/digital-pro-review';

//Sales
import Orders from './components/sales/orders';
import Transactions_sales from './components/sales/transactions-sales';
//Coupons
import ListCoupons from './components/coupons/list-coupons';
import Create_coupons from './components/coupons/create-coupons';

//Pages
import ListPages from './components/pages/list-page';
import Create_page from './components/pages/create-page';
import Media from './components/media/media';
import List_menu from './components/menus/list-menu';
import Create_menu from './components/menus/create-menu';
import List_user from './components/users/list-user';
import Create_user from './components/users/create-user';
import List_vendors from './components/vendors/list-vendors';
import Create_vendors from './components/vendors/create.vendors';
import Translations from './components/localization/translations';
import Rates from './components/localization/rates';
import Taxes from './components/localization/taxes';
import Profile from './components/settings/profile';
import Reports from './components/reports/report';
import Invoice from './components/invoice';
import Datatable from './components/common/datatable'
import Login from './components/auth/login';

import store from './store/store';
import { Provider } from 'react-redux';

class Root extends Component {
    render() {
        return (
            <BrowserRouter basename={'/'}>
                <ScrollContext>
                    <Switch>
                        <Route exact path={`${process.env.PUBLIC_URL}/`} component={Login} />
                        <Route exact path={`${process.env.PUBLIC_URL}/Admin/auth/login`} component={Login} />

                        <App>
                            <PrivateRoute path={`${process.env.PUBLIC_URL}/Admin/dashboard`} component={Dashboard} authed={checkLogin} />

                            <PrivateRoute path={`${process.env.PUBLIC_URL}/Admin/products/physical/category`} component={Category} authed={checkLogin} />
                            <PrivateRoute path={`${process.env.PUBLIC_URL}/Admin/products/physical/sub-category`} component={Sub_category} authed={checkLogin} />
                            <PrivateRoute path={`${process.env.PUBLIC_URL}/Admin/products/physical/product-list`} component={Product_list} authed={checkLogin} />
                            <PrivateRoute path={`${process.env.PUBLIC_URL}/Admin/products/physical/product-detail`} component={Product_detail} authed={checkLogin} />
                            <PrivateRoute path={`${process.env.PUBLIC_URL}/Admin/products/physical/add-product`} component={Add_product} authed={checkLogin} />

                            <PrivateRoute path={`${process.env.PUBLIC_URL}/Admin/products/digital/digital-category`} component={Digital_category} authed={checkLogin} />
                            <PrivateRoute path={`${process.env.PUBLIC_URL}/Admin/products/digital/digital-sub-category`} component={Digital_sub_category} authed={checkLogin} />
                            <PrivateRoute path={`${process.env.PUBLIC_URL}/Admin/products/digital/digital-product-list`} component={Digital_pro_list} authed={checkLogin} />
                            <PrivateRoute path={`${process.env.PUBLIC_URL}/Admin/products/digital/digital-add-product`} component={Digital_add_pro} authed={checkLogin} />
                            <PrivateRoute path={`${process.env.PUBLIC_URL}/Admin/products/digital/digital-edit-product/:data`} component={Digital_edit_product} authed={checkLogin} />
                            <PrivateRoute path={`${process.env.PUBLIC_URL}/Admin/products/digital/digital-pro-review`} component={Digital_pro_review} authed={checkLogin} />

                            <PrivateRoute path={`${process.env.PUBLIC_URL}/Admin/sales/orders`} component={Orders} authed={checkLogin} />
                            <PrivateRoute path={`${process.env.PUBLIC_URL}/Admin/sales/transactions`} component={Transactions_sales} authed={checkLogin} />

                            <PrivateRoute path={`${process.env.PUBLIC_URL}/Admin/coupons/list-coupons`} component={ListCoupons} authed={checkLogin} />
                            <PrivateRoute path={`${process.env.PUBLIC_URL}/Admin/coupons/create-coupons`} component={Create_coupons} authed={checkLogin} />

                            <PrivateRoute path={`${process.env.PUBLIC_URL}/Admin/pages/list-page`} component={ListPages} authed={checkLogin} />
                            <PrivateRoute path={`${process.env.PUBLIC_URL}/Admin/pages/create-page`} component={Create_page} authed={checkLogin} />

                            <PrivateRoute path={`${process.env.PUBLIC_URL}/Admin/media`} component={Media} authed={checkLogin} />

                            <PrivateRoute path={`${process.env.PUBLIC_URL}/Admin/menus/list-menu`} component={List_menu} authed={checkLogin} />
                            <PrivateRoute path={`${process.env.PUBLIC_URL}/Admin/menus/create-menu`} component={Create_menu} authed={checkLogin} />

                            <PrivateRoute path={`${process.env.PUBLIC_URL}/Admin/users/list-user`} component={List_user} authed={checkLogin} />
                            <PrivateRoute path={`${process.env.PUBLIC_URL}/Admin/users/create-user`} component={Create_user} authed={checkLogin} />

                            <PrivateRoute path={`${process.env.PUBLIC_URL}/Admin/vendors/list_vendors`} component={List_vendors} authed={checkLogin} />
                            <PrivateRoute path={`${process.env.PUBLIC_URL}/Admin/vendors/create-vendors`} component={Create_vendors} authed={checkLogin} />

                            <PrivateRoute path={`${process.env.PUBLIC_URL}/Admin/localization/transactions`} component={Translations} authed={checkLogin} />
                            <PrivateRoute path={`${process.env.PUBLIC_URL}/Admin/localization/currency-rates`} component={Rates} authed={checkLogin} />
                            <PrivateRoute path={`${process.env.PUBLIC_URL}/Admin/localization/taxes`} component={Taxes} authed={checkLogin} />

                            <PrivateRoute path={`${process.env.PUBLIC_URL}/Admin/reports/report`} component={Reports} authed={checkLogin} />

                            <PrivateRoute path={`${process.env.PUBLIC_URL}/Admin/settings/profile`} component={Profile} authed={checkLogin} />

                            <PrivateRoute path={`${process.env.PUBLIC_URL}/Admin/invoice`} component={Invoice} authed={checkLogin} />

                            <PrivateRoute path={`${process.env.PUBLIC_URL}/Admin/data-table`} component={Datatable} authed={checkLogin} />

                        </App>

                    </Switch>
                </ScrollContext>
            </BrowserRouter>
        )
    }
}

ReactDOM.render(
    <Provider store={store}>
        <Root />
    </Provider>, document.getElementById('root'));


