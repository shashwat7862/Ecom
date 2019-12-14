import { combineReducers } from 'redux';

import LoginReducer from './LoginReducer';
import ProductReducer from './productReducer';
import ProfileReducer from './profileReducer';


const rootReducer = combineReducers({
  LoginReducer: LoginReducer,
  ProductReducer: ProductReducer,
  ProfileReducer: ProfileReducer

});

export default rootReducer;
