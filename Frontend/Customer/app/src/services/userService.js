import http from "./httpService";
import Baseurl from '../api/url';

export function getAllProductsService() {
  return http.get(Baseurl + "/api/v1/All/ProductsList/electronics/false/100/0");
}

export function getCartListService(id) {
  return http.get(Baseurl + "/api/v1/customer/CartList/" + id);
}

export function removeFromCartService(obj) {
  return http.put(Baseurl + "/api/v1/customer/Cart/REMOVE", obj);
}


export function getAddressService(id) {
  return http.get(Baseurl + "/api/v1/common/getAddress/" + id);
}

export function getReviews(userId) {
  return http.get(Baseurl + `/api/v1/common/getProductReview/null/${userId}/user`);
}


export function placeOrderService(obj) {
  return http.post(Baseurl + "/api/v1/customer/createOrder", obj);
}


export function SaveAddressService(obj) {
  return http.post(Baseurl + "/api/v1/common/saveAddress", obj);
}


export function getOrderDetailsService(id) {
  return http.get(Baseurl + "/api/v1/common/getOrderDetails/" + id);
}

export function ProductsListElectronicsService() {
  return http.get(Baseurl + "/api/v1/All/ProductsList/electronics/true/10/0");
}


export function addToWishListService(obj) {
  return http.put(Baseurl + "/api/v1/customer/WishList/ADD", obj);
}

export function addToCartService(obj) {
  return http.put(Baseurl + "/api/v1/customer/Cart/ADD", obj);
}

export function ProductsListElectronics_2Service() {
  return http.get(Baseurl + "/api/v1/All/ProductsList/electronics/true/100/0");
}


export function loginCustomerService(data) {
  return http.post(Baseurl + "/api/v1/customer/Login", data);
}


export function registerCustomerService(data) {
  return http.post(Baseurl + "/api/v1/customer/Register", data);
}


export function submitReviewService(id, data) {
  return http.post(Baseurl + "/api/v1/customer/saveProductReview/" + id, data);
}

export function getWishListService(id) {
  return http.get(Baseurl + "/api/v1/customer/GetAllWishLists/" + id);
}

export function removeFromWishListService(obj) {
  return http.put(Baseurl + "/api/v1/customer/WishList/REMOVE", obj);
}


export function getOrderList(userId) {
  return http.get(Baseurl + `/api/v1/common/getOrderList/${userId}/null/user/10/0`);
}

export function createOrderComplaint(payload) {
  return http.post(Baseurl + "/api/v1/customer/SaveComplaint" , payload);
}

export function fetchComplaintList(userId) {
  return http.get(Baseurl + `/api/v1/common/getComplaint/${userId}/null/user`);
}


