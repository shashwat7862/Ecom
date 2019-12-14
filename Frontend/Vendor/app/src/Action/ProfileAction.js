import axios from 'axios';
import Baseurl from '../assets/data/urls';
export const EditProfile = 'vendor:EditProfile';


function Edit_Profile(data) {
  return {
    type: EditProfile,
    payload: data
  };
}


export function EditVendorProfile(payload, vendorId) {
  return function (dispatch) {
    return axios.put(`${Baseurl}api/v1/vendor/ProfileUpdate/${vendorId}`, payload)
      .then(({ data }) => {
        console.log(data)
        dispatch(Edit_Profile(data));
      });
  };
}





