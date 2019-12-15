import axios from 'axios';
import Baseurl from '../assets/data/url'
export const ProductList = 'product:ProductList';
export const ProvideApproval = 'product:ProvideApproval';

function Product_List(data) {
  return {
    type: ProductList,
    payload: data
  };
}

function provide_Approval(data) {
  return {
    type: ProvideApproval,
    payload: data
  };
}



export function productList(vendor_id) {
  return function (dispatch) {
    return axios.get(`${Baseurl}/api/v1/All/ProductsList/electronics/false/100/0`)
      .then(({ data }) => {
        console.log(data)
        dispatch(Product_List(data));
      });
  };
}

export function provideApproval(payload) {
  return function (dispatch) {
    return axios.put(`${Baseurl}/api/v1/vendor/ProductApprovalRequest/electronics`, payload)
      .then(({ data }) => {
        console.log(data)
        dispatch(provide_Approval(data));
      });
  };
} 