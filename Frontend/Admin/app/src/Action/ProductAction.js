import axios from 'axios';
import Baseurl from '../assets/data/url'
export const ProductList = 'product:ProductList';
export const ProvideApproval = 'product:ProvideApproval';
export const OrderList = 'product:OrderList';
export const ReviewList = 'product:ReviewList';

function Product_List(data) {
  return {
    type: ProductList,
    payload: data
  };
}

function Order_List(data) {
  return {
    type: OrderList,
    payload: data
  };
}


function provide_Approval(data) {
  return {
    type: ProvideApproval,
    payload: data
  };
}

function Review_List(data){
  return {
    type: ReviewList,
    payload: data
  };
}



export function productList(isApprove) {
  return function (dispatch) {
    return axios.get(`${Baseurl}/api/v1/All/ProductsList/electronics/${isApprove}/100/0`)
      .then(({ data }) => {
        console.log(data)
        dispatch(Product_List(data));
      });
  };
}

export function orderList() {
  return function (dispatch) {
    return axios.get(`${Baseurl}/api/v1/common/getOrderList/null/null/All/10/0`)
      .then(({ data }) => {
        console.log(data)
        dispatch(Order_List(data));
      });
  };
}

export function reviewList() {
  return function (dispatch) {
    return axios.get(`${Baseurl}/api/v1/common/getProductReview/null/null/admin`)
      .then(({ data }) => {
        console.log(data)
        dispatch(Review_List(data));
      });
  };
}

export function fetchVendorList() {
  return function (dispatch) {
    return axios.get(`${Baseurl}/api/v1/common/getProductReview/null/null/admin`)
      .then(({ data }) => {
        console.log(data)
        dispatch(Review_List(data));
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