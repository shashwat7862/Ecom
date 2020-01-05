let proxy = require('@3g/request-proxy');


const Productwrapper = proxy.createWrapper("http://localhost:8002/");

 
exports.module = stockUpdate = async (body, productId) => {
  console.log("----------------------",body,productId)
  Productwrapper.proxyJsonRequest(`stockUpdate/${productId}`, 'PUT', {
    body,
  })
};
 