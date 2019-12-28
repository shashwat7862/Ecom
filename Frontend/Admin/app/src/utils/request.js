import axios from 'axios';
import { REQUEST_PATH } from './paths-config';

export function getRequest(path, data) {
  const getOptions = {
    url: REQUEST_PATH.BaseUrl + path,
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
    data,
  };
  console.log('getOptions *******', getOptions)
  return axios(getOptions)
    .then((resp) => { return resp })
    .catch((error) => { throw error });
}

export function putRequest(path, data) {
  const putOptions = {
    url: REQUEST_PATH.BaseUrl + path,
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    data,
  };
  console.log('putOptions *******', putOptions)
  return axios(putOptions)
    .then((resp) => { return resp })
    .catch((error) => { throw error });
}

export function postRequest(path, data) {
  const postOptions = {
    url: REQUEST_PATH.BaseUrl + path,
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data,
  };

  return axios(postOptions)
    .then((resp) => { return resp })
    .catch((error) => { throw error });
}

export function deleteRequest(path, data) {
  const deleteOptions = {
    url: REQUEST_PATH.BaseUrl + path,
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json',
    },
    data,
  };
  console.log('deleteOptions *******', deleteOptions)
  return axios(deleteOptions)
    .then((resp) => { return resp })
    .catch((error) => { throw error });
}

