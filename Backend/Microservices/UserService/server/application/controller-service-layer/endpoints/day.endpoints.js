let proxy = require('@3g/request-proxy');


const wrapper = proxy.createWrapper("http://localhost:8089/api/");

 
exports.module = createSickDays = async (body, qs) => (
  wrapper.proxyJsonRequest('shift/sick-days', 'POST', {
    qs,
    body,
  })
);

exports.module = get = async (qs) => (
  wrapper.proxyJsonRequest('shift/days', 'GET', {
    qs,
  })
);
