import { REQUEST_PATH } from '../utils/paths-config';
import { getRequest, putRequest } from '../utils/request';
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
    getRequest(REQUEST_PATH.productList(isApprove))
      .then(({ data }) => {
        const resp = data.object;
        dispatch(Product_List(resp.object));
      })
      .catch(error => {
        console.log('productList error *****', error.response)
      })
  };
}

export function provideApproval(payload, callback) {
  return function (dispatch) {
    putRequest(REQUEST_PATH.provideApproval, payload)
      .then(({ data }) => {
        const resp = data.object;
        if (callback) {
          callback();
        }
        dispatch(provide_Approval(resp.object));
      })
      .catch(error => {
        console.log('provideApproval error *****', error.response)
      })
  };
} 