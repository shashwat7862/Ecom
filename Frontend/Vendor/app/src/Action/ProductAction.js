import { REQUEST_PATH } from '../utils/paths-config';
import { getRequest, putRequest, deleteRequest, postRequest } from '../utils/request';
import { ToastContainer, toast } from 'react-toastify';

export const ProductList = 'product:ProductList';
export const AddProduct = 'product:AddProduct';
export const EditProduct = 'product:EditProduct';
export const SearchProducts = 'product:SearchProducts';
export const OrderList = 'product:OrderList';
export const ReviewList = 'product:ReviewList';

function Product_List(data) {
  return {
    type: ProductList,
    payload: data
  };
}

function Add_Product(data) {
  return {
    type: AddProduct,
    payload: data
  };
}

function Edit_Product(data) {
  return {
    type: EditProduct,
    payload: data
  };
}

function Search_Products(data) {
  return {
    type: SearchProducts,
    payload: data
  };
}

function Review_List(data) {
  return {
    type: ReviewList,
    payload: data
  };
}

function Order_List(data) {
  return {
    type: OrderList,
    payload: data
  };
}

export function orderList(vendorId) {
  return function (dispatch) {
    // return axios.get(`${Baseurl}/api/v1/common/getOrderList/null/${vendorId}/Vendor/10/0`)
    //   .then(({ data }) => {
    //     console.log(data)
    //     dispatch(Order_List(data));
    //   });
    getRequest(REQUEST_PATH.orderList(vendorId))
    .then(({ data }) => {
      const resp = data.object;
      console.log('orderList *****', data)
      dispatch(Order_List(resp.object));
    })
    .catch(error => {
      console.log('orderList error *****', error.response)
    })
  };
}

export function productList(vendor_id, isApproved) {
  return function (dispatch) {
  //   return axios.get(`${REQUEST_PATH.BaseUrl}/api/v1/vendor/${vendor_id}/ProductsList/electronics/${isApproved}/100/0`)
  //     .then(({ data }) => {
  //       console.log('^^^^^^^^^^^',data)
  //       dispatch(Product_List(data));
  //     });
  // };

    getRequest(REQUEST_PATH.productList(vendor_id,isApproved))
    .then(({ data }) => {
      const resp = data.object;
      dispatch(Product_List(resp.object));
    })
    .catch(error => {
      console.log('productList error *****', error.response)
    })
  }
}

export function deleteProduct(id, callback) {
  return function (dispatch) {
    deleteRequest(REQUEST_PATH.deleteProduct(id))
    .then(({ data }) => {
      console.log('delete data ****', data);
      toast.success("Successfully Deleted !");
      if(callback) {
        callback();
      }
      // const resp = data.object;
      // dispatch(Product_List(resp.object));
    })
    .catch(error => {
      console.log('deleteProduct error *****', error.response)
    })
  }
}

export function reviewList() {
  return function (dispatch) {
    // return axios.get(`${Baseurl}/api/v1/common/getProductReview`)
    //   .then(({ data }) => {
    //     console.log(data)
    //     dispatch(Review_List(data));
    //   });
    getRequest(REQUEST_PATH.reviewList)
    .then(({ data }) => {
      console.log('product Reviews ***', data)
      const resp = data.object;
      dispatch(Review_List(resp.object));
    })
    .catch(error => {
      console.log('reviewList error *****', error.response)
    })
  };
}



export function addProduct(payload) {
  return function (dispatch) {
    postRequest(REQUEST_PATH.addProduct, payload)
    .then(({ data }) => {
      console.log('addProduct ******', data)
      const resp = data.object;
      toast.success(resp.object.Message);
      dispatch(Add_Product(resp.object.Details));
    })
    .catch(error => {
      console.log('addProduct error *****', error.response)
    })
  };
}

export function EditProductToDB(payload) {
  return function (dispatch) {
    // return axios.put(`${Baseurl}/api/v1/vendor/EditProductsDetails/electronics`, payload)
    //   .then(({ data }) => {
    //     console.log(data)
    //     dispatch(Edit_Product(data));
    //   });
    putRequest(REQUEST_PATH.editProduct, payload)
    .then(({ data }) => {
      // const resp = data.object;
      // toast.success(resp.object.Message);
      dispatch(Edit_Product(data));
    })
    .catch(error => {
      console.log('editProduct error *****', error.response)
    })
  }; 
}

export function searchProducts(searchQuery,vendorId){
  return function (dispatch) {
    // return axios.get(`${Baseurl}/api/v1/vendor/${vendor_id}/searchProducts/electronics?search=${searchQuery}`)
    //   .then(({ data }) => {
    //     console.log(data)
    //     dispatch(Search_Products(data));
    //   });
    getRequest(REQUEST_PATH.search(vendorId,searchQuery))
    .then(({ data }) => {
      const resp = data.object;
      dispatch(Search_Products(data));
    })
    .catch(error => {
      console.log('searchProducts error *****', error.response)
    })
  }; 
}




