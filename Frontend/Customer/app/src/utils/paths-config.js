export const REQUEST_PATH = {
  BaseUrl : 'http://13.232.88.106:8080',
  productList: '/api/v1/All/ProductsList/electronics/false/100/0',
  cartList: (id) => `/api/v1/customer/CartList/${id}`,
  removeCart: '/api/v1/customer/Cart/REMOVE'
}