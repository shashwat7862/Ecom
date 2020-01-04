export const FETCH_LOGIN   = 'FETCH_LOGIN';
export const FETCH_LOGIN_SUCCESS = 'FETCH_LOGIN_SUCCESS';
export const FETCH_LOGIN_FAILURE = 'FETCH_LOGIN_FAILURE';

export const fetchLogin = () => ({
  type: FETCH_LOGIN
});

export const fetchLoginSuccess = userData => ({
  type: FETCH_LOGIN_SUCCESS,
  payload: userData 
});

export const fetchLoginFailure = error => ({
  type: FETCH_LOGIN_FAILURE,
  payload: error
});