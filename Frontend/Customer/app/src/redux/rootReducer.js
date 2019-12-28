import { combineReducers } from 'redux';
import { LOCATION_CHANGE } from 'react-router-redux';
import { IntlReducer as Intl } from 'react-redux-multilingual';
import productReducer from '../reducers/products';
import cartReducer from '../reducers/cart';
import filtersReducer from '../reducers/filters';
import wishlistReducer from '../reducers/wishlist';
import compareReducer from '../reducers/compare';
import LoginReducer from '../reducers/login';

import cakeReducer from './cake/cakeReducer';
import iceCreamReducer from './iceCream/iceCreamReducer';
import userReducer from './user/userReducer';
import loginReducer from './login/loginReducer';
// import LoginReducer from '../reducer/LoginReducer';
// import ProductReducer from '../reducer/productReducer';
// import ProfileReducer from '../reducer/profileReducer';

/*
 * routeReducer
 *
 * The reducer merges route location changes into our state.
 * The change is necessitated by moving to react-router-redux@4
 *
 */

// Initial routing state
const routeInitialState = {
  locationBeforeTransitions: null
};

/**
 * Merge route into the global application state
 */
function routeReducer(state = routeInitialState, action) {
  switch (action.type) {
    case LOCATION_CHANGE:
      return state.merge({
        locationBeforeTransitions: action.payload
      });
    default:
      return state;
  }
}

/**
 * Creates the main reducer with the asynchronously loaded ones
 */
export default function createReducer(asyncReducers) {
  return combineReducers({
    route: routeReducer,
    data: productReducer,
    cartList: cartReducer,
    filters: filtersReducer,
    wishlist: wishlistReducer,
    compare: compareReducer,
    Intl,
    LoginReducer: LoginReducer,
    // product: ProductReducer,
    // ProfileReducer: ProfileReducer,
    cake: cakeReducer,
    iceCream: iceCreamReducer,
    user: userReducer,
    login:loginReducer,
    ...asyncReducers,
  });
}