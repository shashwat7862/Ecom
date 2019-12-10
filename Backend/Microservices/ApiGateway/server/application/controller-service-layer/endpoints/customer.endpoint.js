

let proxy = require('@3g/request-proxy');


const Userwrapper = proxy.createWrapper("http://localhost:8001/");
const Productwrapper = proxy.createWrapper("http://localhost:8002/");

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

exports.module = search_Products_ForCustomers = async (params,qs) => (
  Productwrapper.proxyJsonRequest(`search_Products_ForCustomers/${params.categroy}?search=${qs.search}`, 'GET')
);







module.exports = {
  register_Customer,
  Customer_Login,
  Cart,
  Wish_List,
  Cart_List,
  search_Products_ForCustomers
}