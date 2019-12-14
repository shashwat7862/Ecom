import axios from 'axios';
import Baseurl from '../assets/data/urls';

export const VerifyOTP = 'tasks:VerifyOTP';
export const SendOTP = 'tasks:Send_OTP';


function Verify_OTP(data) {
    console.log(data)
    return {
      type: VerifyOTP,
      payload: data
    };
  }

  function Send_OTP(data){
    console.log(data)
    return {
      type: Send_OTP,
      payload: data
    };
  }

export function verifyOTP(payload) {
  console.log(payload)
    return function(dispatch) {
      return axios.post(`${Baseurl}/api/v1/vendor/VerifyOTP` ,payload)
        .then(({ data }) => {
          console.log(data)
        dispatch(Verify_OTP(data));
      });
    };
  }

  export function sendOtp(payload){
    console.log(payload,"payload")
    return function(dispatch) {
      return axios.post(`${Baseurl}/api/v1/vendor/SendOTP` ,payload)
        .then(({ data }) => {
          console.log(data)
        dispatch(Send_OTP(data));
      });
    };
  }

  