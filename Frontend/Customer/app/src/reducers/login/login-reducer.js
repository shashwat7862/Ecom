import {
    FETCH_LOGIN,
    FETCH_LOGIN_SUCCESS,
    FETCH_LOGIN_FAILURE
  } from './login-action';
  
  const initialState = {
    userData: {},
    loading:false,
    error: null
  };
  
export default function loginReducer(state = initialState, action) {
    switch(action.type) {
      case FETCH_LOGIN:
        return {
          ...state,
          loading: true,
          error: null
        };
  
      case FETCH_LOGIN_SUCCESS:
        return {
          ...state,
          loading: false,
          userData: action.payload
        };
  
      case FETCH_LOGIN_FAILURE:
        return {
          ...state,
          loading: false,
          error: action.payload,
          userData: {}
        };
  
      default:
        return state;
    }
  }