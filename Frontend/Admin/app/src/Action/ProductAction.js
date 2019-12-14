import axios from 'axios';

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
    return axios.get(`//localhost:8080/api/v1/All/ProductsList/electronics/false/100/0`)
      .then(({ data }) => {
        console.log(data)
        dispatch(Product_List(data));
      });
  };
}

export function provideApproval(payload) {
  return function (dispatch) {
    return axios.put('//localhost:8080/api/v1/vendor/ProductApprovalRequest/electronics', payload)
      .then(({ data }) => {
        console.log(data)
        dispatch(provide_Approval(data));
      });
  };
} 