import axios from 'axios';
import Baseurl from '../assets/data/urls';

export const ProductList = 'product:ProductList';
export const AddProduct = 'product:AddProduct';
export const EditProduct = 'product:EditProduct';
export const SearchProducts = 'product:SearchProducts';

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

function Search_Products(data){
  return {
    type: SearchProducts,
    payload: data
  };
}

export function productList(vendor_id,isApproved) {
  return function (dispatch) {
    return axios.get(`${Baseurl}/api/v1/vendor/${vendor_id}/ProductsList/electronics/${isApproved}/100/0`)
      .then(({ data }) => {
        console.log(data)
        dispatch(Product_List(data));
      });
  };
}

export function addProduct(payload) {
  return function (dispatch) {
    return axios.post(`${Baseurl}/api/v1/vendor/SaveProducts/electronics`, payload)
      .then(({ data }) => {
        console.log(data)
        dispatch(Add_Product(data));
      });
  };
}

export function EditProductToDB(payload){
  return function (dispatch) {
    return axios.put(`${Baseurl}/api/v1/vendor/EditProductsDetails/electronics`, payload)
      .then(({ data }) => {
        console.log(data)
        dispatch(Edit_Product(data));
      });
  }; 
}


export function searchProducts(searchQuery,vendor_id){
  return function (dispatch) {
    return axios.get(`${Baseurl}/api/v1/vendor/${vendor_id}/searchProducts/electronics?search=${searchQuery}`)
      .then(({ data }) => {
        console.log(data)
        dispatch(Search_Products(data));
      });
  }; 
}


 
 
