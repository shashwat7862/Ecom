import { REQUEST_PATH } from '../utils/paths-config';
import { getRequest } from '../utils/request';
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
    // return axios.get(`${Baseurl}/api/v1/common/getUserList/0/10/admin`)
    //   .then(({ data }) => {
    //     console.log('customerList *****', data)
    //     dispatch(Customer_list(data));
    //   })
    //   .catch(error => {
    //       console.log('customerList error *****', error)
    //     })
    getRequest(REQUEST_PATH.customerList)
    .then(({ data }) => {
      const resp = data.object;
      console.log('customerList *****', data)
      dispatch(Customer_list(resp.object));
    })
    .catch(error => {
      console.log('customerList error *****', error.response)
    })
  };
}

 

 