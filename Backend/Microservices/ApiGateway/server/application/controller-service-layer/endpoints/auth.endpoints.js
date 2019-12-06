let proxy = require('@3g/request-proxy');


const wrapper = proxy.createWrapper("http://localhost:8086/");

exports.module = register_Vendor = async (body) => (
  wrapper.proxyJsonRequest('registerVendor', 'POST', {
    body,
  })
);

exports.module = login_Vendor = async (body, qs) => (
  wrapper.proxyJsonRequest('login_Vendor', 'POST', {
    body,
  })
);

exports.module = Send_OTP = async (body) => (
  wrapper.proxyJsonRequest('Send_OTP', 'POST', {
    body,
  })
);

exports.module = Verify_OTP = async (body) => (
  wrapper.proxyJsonRequest('Verify_OTP', 'POST', {
    body,
  })
);

exports.module = Forgot_Password = async (body) => (
  wrapper.proxyJsonRequest('Forgot_Password', 'POST', {
    body,
  })
);

exports.module = Reset_Password = async (body) => (
  wrapper.proxyJsonRequest('Reset_Password', 'POST', {
    body,
  })
);


module.exports = {
  register_Vendor,
  login_Vendor,
  Send_OTP,
  Verify_OTP,
  Forgot_Password,
  Reset_Password
}