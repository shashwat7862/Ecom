export const REQUEST_PATH = {
  BaseUrl : 'http://13.232.88.106:8080',
  productList: (vendorId,isApprove) => `/api/v1/vendor/${vendorId}/ProductsList/electronics/${isApprove}/100/0`,
  deleteProduct: (id) => `/api/v1/vendor/DeleteProduct/electronics/${id}`,
  addProduct: '/api/v1/vendor/SaveProducts/electronics',
  editProduct: '/api/v1/vendor/EditProductsDetails/electronics',
  search: (vendorId, searchQuery) => `/api/v1/vendor/${vendorId}/searchProducts/electronics?search=${searchQuery}`
}