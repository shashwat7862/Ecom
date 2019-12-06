let proxy = require('@3g/request-proxy');


const wrapper = proxy.createWrapper("http://localhost:8001/");

exports.module = Save_Products = async (body, qs) => (
    wrapper.proxyJsonRequest(`Save_Products/${qs}`, 'POST', {
        body,
    })
);

exports.module = Products_List = async (qs) => (
    wrapper.proxyJsonRequest(`Products_List/${qs.category}/${qs.isApprove}/${qs.limit}/${qs.skip}`, 'GET')
);

exports.module = Product_ApprovalRequest = async (body,qs) => (
    wrapper.proxyJsonRequest(`Product_ApprovalRequest/${qs.category}`, 'PUT', {
        body,
    })
);


exports.module = Edit_ProductsDetails = async (body,qs) => (
    wrapper.proxyJsonRequest(`Edit_ProductsDetails/${qs.category}`, 'PUT', {
        body,
    })
);



module.exports = {
    Save_Products,
    Products_List,
    Product_ApprovalRequest,
    Edit_ProductsDetails

}