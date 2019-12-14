import axios from 'axios';

export const EditProfile = 'vendor:EditProfile';


function Edit_Profile(data) {
  return {
    type: EditProfile,
    payload: data
  };
}


export function EditVendorProfile(payload, vendorId) {
  return function (dispatch) {
    return axios.put('//localhost:8080/api/v1/vendor/ProfileUpdate/' + vendorId, payload)
      .then(({ data }) => {
        console.log(data)
        dispatch(Edit_Profile(data));
      });
  };
}





