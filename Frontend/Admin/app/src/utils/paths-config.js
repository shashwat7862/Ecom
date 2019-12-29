export const REQUEST_PATH = {
  BaseUrl : 'http://13.232.88.106:8080',
  productList: (isApprove) => `/api/v1/All/ProductsList/electronics/${isApprove}/100/0`,
  provideApproval: '/api/v1/vendor/ProductApprovalRequest/electronics',
  orderList: (vendorId) => `/api/v1/common/getOrderList/null/${vendorId}/Vendor/10/0`,
  reviewList: '/api/v1/common/getProductReview',
  customerList: '/api/v1/common/getUserList/0/10/admin'
}