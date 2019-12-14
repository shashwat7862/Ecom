let proxy = require('@3g/request-proxy');


const Userwrapper = proxy.createWrapper("http://localhost:8001/");
const Productwrapper = proxy.createWrapper("http://localhost:8002/");

/*
  User Miroservice Apis

*/

exports.module = register_Vendor = async (body) => (
  Userwrapper.proxyJsonRequest('registerVendor', 'POST', {
    body,
  })
);

exports.module = login_Vendor = async (body, qs) => (
  Userwrapper.proxyJsonRequest('login_Vendor', 'POST', {
    body,
  })
);

exports.module = Send_OTP = async (body) => (
  Userwrapper.proxyJsonRequest('Send_OTP', 'POST', {
    body,
  })
);

exports.module = Verify_OTP = async (body) => (
  Userwrapper.proxyJsonRequest('Verify_OTP', 'POST', {
    body,
  })
);

exports.module = Forgot_Password = async (body) => (
  Userwrapper.proxyJsonRequest('Forgot_Password', 'POST', {
    body,
  })
);

exports.module = Reset_Password = async (body) => (
  Userwrapper.proxyJsonRequest('Reset_Password', 'POST', {
    body,
  })
);

exports.module = Vendor_Profile_Update = async (body,id) => (
  Userwrapper.proxyJsonRequest(`Vendor_Profile_Update/${id}`, 'PUT', {
      body,
  })
);

/*
  Products Miroservice Apis

*/

exports.module = Save_Products = async (body, qs) => (
  Productwrapper.proxyJsonRequest(`Save_Products/${qs}`, 'POST', {
      body,
  })
);

exports.module = Products_List = async (qs) => (
  Productwrapper.proxyJsonRequest(`Products_List/${qs.vendor_id}/${qs.category}/${qs.isApprove}/${qs.limit}/${qs.skip}`, 'GET')
);

exports.module = Product_ApprovalRequest = async (body, qs) => (
  Productwrapper.proxyJsonRequest(`Product_ApprovalRequest/${qs.category}`, 'PUT', {
      body,
  })
);


exports.module = Edit_ProductsDetails = async (body, qs) => (
  Productwrapper.proxyJsonRequest(`Edit_ProductsDetails/${qs.category}`, 'PUT', {
      body,
  })
);


exports.module = Delete_Product = async (qs) => (
  Productwrapper.proxyJsonRequest(`Delete_Product/${qs.category}/${qs.id}`, 'DELETE')
);

exports.module = Filter_Products = async (params, qs) => (
  Productwrapper.proxyJsonRequest(`Filter_Products/${params.category}?filter=${qs.search}`, 'GET')
);


exports.module = Search_Products = async (params, qs) => (
  Productwrapper.proxyJsonRequest(`Search_Products/${params.vendor_id}/${params.category}?search=${qs.search}`, 'GET')
);


exports.module = AllProducts_List = async ( qs) => (
  Productwrapper.proxyJsonRequest(`All_Products_List/${qs.category}/${qs.isApprove}/${qs.limit}/${qs.skip}`, 'GET')
);




module.exports = {
  register_Vendor,
  login_Vendor,
  Send_OTP,
  Verify_OTP,
  Forgot_Password,
  Reset_Password,
  Vendor_Profile_Update,
  Save_Products,
  Products_List,
  Product_ApprovalRequest,
  Edit_ProductsDetails,
  Filter_Products,
  Delete_Product,
  Search_Products,
  AllProducts_List

}