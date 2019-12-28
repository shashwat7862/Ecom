export const REQUEST_PATH = {
  BaseUrl : 'http://13.232.88.106:8080',
  productList: (isApprove) => `/api/v1/All/ProductsList/electronics/${isApprove}/100/0`,
  provideApproval: '/api/v1/vendor/ProductApprovalRequest/electronics'
}