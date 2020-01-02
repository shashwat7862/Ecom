

let proxy = require('@3g/request-proxy');


const Userwrapper = proxy.createWrapper("http://localhost:8001/");
const Productwrapper = proxy.createWrapper("http://localhost:8002/");
const Orderwrapper = proxy.createWrapper("http://localhost:8005/");

/*
  User Miroservice Apis

*/

exports.module = register_Customer = async (body) => (
  Userwrapper.proxyJsonRequest('register_Customer', 'POST', {
    body,
  })
);

exports.module = Customer_Login = async (body) => (
  Userwrapper.proxyJsonRequest('Customer_Login', 'POST', {
    body,
  })
)

exports.module = get_CustomerList = async (qs) => (
  Userwrapper.proxyJsonRequest(`get_CustomerList/${qs.skip}/${qs.limit}/${qs.FetchFor}`, 'GET')
);

exports.module = Customer_Profile_Update = async (qs, body) => (
  Userwrapper.proxyJsonRequest(`Customer_Profile_Update/${qs.userId}`, 'PUT', {
    body,
  })
);





exports.module = create_Order = async (body) => (
  Orderwrapper.proxyJsonRequest('create_Order', 'POST', {
    body,
  })
)

exports.module = get_OrderList = async (qs) => (
  Orderwrapper.proxyJsonRequest(`get_OrderList/${qs.userId}/${qs.vendorId}/${qs.fetch}/${qs.limit}/${qs.skip}`, 'GET')
)

exports.module = get_OrderDetails = async (qs) => (
  Orderwrapper.proxyJsonRequest(`get_OrderDetails/${qs.orderId}`, 'GET')
)


exports.module = search_Orders = async (qs) => (
  Orderwrapper.proxyJsonRequest(`search_Orders/?q=${qs.q}`, 'GET')
)

exports.module = save_Address = async (body) => (
  Orderwrapper.proxyJsonRequest(`save_Address`, 'POST', {
    body,
  })
);

exports.module = get_Address = async (qs) => (
  Orderwrapper.proxyJsonRequest(`get_Address/${qs.userId}`, 'GET')
);

exports.module = edit_Address = async (body, qs) => (
  Orderwrapper.proxyJsonRequest(`edit_Address/${qs.userId}/${qs.addressId}`, 'PUT', {
    body,
  })
);

exports.module = delete_Address = async (qs) => (
  Orderwrapper.proxyJsonRequest(`delete_Address/${qs.userId}/${qs.addressId}`, 'DELETE')
);

exports.module = Save_Complaint = async (body) => (
  Orderwrapper.proxyJsonRequest(`Save_Complaint`, 'POST', {
    body,
  })
);







/*
  Products Miroservice Apis

*/

exports.module = Cart = async (params, body) => (
  Productwrapper.proxyJsonRequest(`Cart/${params.action}`, 'PUT', {
    body,
  })
);

exports.module = Wish_List = async (params, body) => (
  Productwrapper.proxyJsonRequest(`Wish_List/${params.action}`, 'PUT', {
    body,
  })
);

exports.module = Cart_List = async (userId) => (
  Productwrapper.proxyJsonRequest(`Cart_List/${userId}`, 'GET')
);

exports.module = GetAll_WishLists = async (userId) => (
  Productwrapper.proxyJsonRequest(`GetAll_WishLists/${userId}`, 'GET')
);

exports.module = search_Products_ForCustomers = async (params, qs) => (
  Productwrapper.proxyJsonRequest(`search_Products_ForCustomers/${params.categroy}?search=${qs.search}`, 'GET')
);

exports.module = save_ProductReview = async (userId, body) => (
  Productwrapper.proxyJsonRequest(`save_ProductReview/${userId}`, 'POST', {
    body,
  })
);

exports.module = get_ProductReview = async (qs) => (
  Productwrapper.proxyJsonRequest(`get_ProductReview/${qs.vendorId}`, 'GET')
);





module.exports = {
  register_Customer,
  Customer_Login,
  Cart,
  Wish_List,
  Cart_List,
  search_Products_ForCustomers,
  create_Order,
  get_OrderList,
  get_OrderDetails,
  save_Address,
  get_Address,
  edit_Address,
  save_ProductReview,
  get_ProductReview,
  get_CustomerList
}