import { combineReducers } from 'redux';

import LoginReducer from './LoginReducer';
import ProductReducer from './productReducer';
import ProfileReducer from './profileReducer';
import CustomerReducer from './customerReducer';


const rootReducer = combineReducers({
  LoginReducer: LoginReducer,
  ProductReducer: ProductReducer,
  ProfileReducer: ProfileReducer,
  CustomerReducer:CustomerReducer
});

export default rootReducer;
