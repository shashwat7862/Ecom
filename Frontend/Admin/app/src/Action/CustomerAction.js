import axios from 'axios';
import Baseurl from '../assets/data/url'
export const CustomerList = 'product:CustomerList';
export const ProvideApproval = 'product:ProvideApproval';
export const OrderList = 'product:OrderList';
export const ReviewList = 'product:ReviewList';

function Customer_list(data) {
  return {
    type: CustomerList,
    payload: data
  };
}


 

export function customerList() {
  return function (dispatch) {
    return axios.get(`${Baseurl}/api/v1/common/getUserList/0/10/admin`)
      .then(({ data }) => {
        console.log(data)
        dispatch(Customer_list(data));
      });
  };
}

 

 