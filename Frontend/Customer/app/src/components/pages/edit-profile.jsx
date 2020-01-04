import React, { Component } from 'react';
import axios from 'axios';
import Baseurl from '../../api/url'
import Breadcrumb from "../common/breadcrumb";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import {updateProfile} from '../../services/userService';

class EditProfile extends Component {
    constructor(){
        super();
        this.state={
            userId:'', 
             userObj:{
                 fullName:'',
                 email:'',
                 mobile:'',
                 state:'',
                 city:'',
                 country:'',
                 userImg:''
             }
         }
    }

    uploadProductImage =(e) =>{
       var fileName = e.target.files[0].name;
        if(e.target.files[0]) {
            const fd = new FormData();
            fd.append('file', e.target.files[0], e.target.files[0].name);
            axios.post(`${Baseurl}/api/v1/common/aws/saveAllImages`, fd)
                .then(response => {
                    const userObj = {...this.state.userObj};
                    userObj.CustomerImage = response.data.object.name
                    this.setState({userObj: userObj});
                    const customerDetails =  JSON.parse(localStorage.getItem('customerDetails'));
                    customerDetails.CustomerImage = userObj.CustomerImage;
                    localStorage.setItem('customerDetails', JSON.stringify(customerDetails));
                })
                .catch(error => {
                    console.log(error);
                });
        }
    }

   componentDidMount(){
       const response = JSON.parse(localStorage.getItem('customerDetails'));
       const userObj = {
        fullName:response.fullName,
        email:response.email,
        mobile:response.mobile,
        state:response.state,
        city:response.city,
        country:response.country,
        CustomerImage:response.CustomerImage
       } 

       this.setState({userObj:userObj,userId:response._id})
   }


   onUpdateFormValue = (e) => {
    const userObj = {...this.state.userObj};
    userObj[e.target.name] = e.target.value;
    this.setState({userObj: userObj})
   }

     updateProfile = async() =>{
        try{
            const response = await updateProfile(this.state.userObj,this.state.userId);
            toast.success("updated Successfully..!!");
            const customerDetails =  JSON.parse(localStorage.getItem('customerDetails'));
            customerDetails.fullName = this.state.userObj.fullName;
            customerDetails.mobile = this.state.userObj.mobile;
            customerDetails.state = this.state.userObj.state;
            customerDetails.city = this.state.userObj.city;
            customerDetails.country = this.state.userObj.country;
            customerDetails.CustomerImage = this.state.userObj.CustomerImage;
            localStorage.setItem('customerDetails', JSON.stringify(customerDetails));
         }catch(error){
            console.log(error);
        }
    }

    render() {
        const {userObj} = this.state;
        return (
            <div>
                <ToastContainer />
                <Breadcrumb title={'Edit Profile'} />
                <section className="register-page section-b-space">
                    <div className="container">
                        <div className="row">
                            <div className="col-lg-12">
                                <h3>Edit Profile</h3>
                                <div className="theme-card">
                                    <form className="theme-form">
                                      <div className="form-row">
                                          <div className="col-sm-6">
                                              {!userObj.CustomerImage &&
                                               <div className="userImg">
                                                 <img src="/assets/images/default.png"/> 
                                               </div>
                                              }
                                            {userObj.CustomerImage &&
                                               <div className="userImg">
                                                 <img src={Baseurl+'/'+userObj.CustomerImage}/> 
                                               </div>
                                              }

<div className="upload-btn-wrapper">
  <button className="btn">Upload Image</button>
  <input type="file" onChange={this.uploadProductImage}/>
</div>



                                              
                                             
                                          </div>
                                      </div>

                                      <br/> <br/>

                                        <div className="form-row">
                                            <div className="col-md-6">
                                                <label htmlFor="email">Full Name</label>
                                                <input type="text" value={userObj.fullName} name="fullName" onChange={this.onUpdateFormValue} className="form-control" id="fname"
                                                 required="" />
                                            </div>
                                            <div className="col-md-6">
                                                <label htmlFor="email">Mobile</label>
                                                <input type="text" value={userObj.mobile} name="mobile" onChange={this.onUpdateFormValue} className="form-control" id="fname"
                                                 required="" />
                                            </div>
                                        </div>

                                        <div className="form-row">
                                            <div className="col-md-6">
                                                <label htmlFor="email">email</label>
                                                <input readOnly  type="text" value={userObj.email} name="email" onChange={this.onUpdateFormValue} className="form-control" id="email"
                                                    required="" />
                                            </div>
                                            <div className="col-md-6">
                                                <label htmlFor="review">Country</label>
                                                <input type="text" value={userObj.country} name="country" onChange={this.onUpdateFormValue} className="form-control" id="review"
                                                     required="" />
                                            </div>
                                        </div>  


                                        <div className="form-row">
                                            <div className="col-md-6">
                                                <label htmlFor="email">State</label>
                                                <input type="text" value={userObj.state} name="state" onChange={this.onUpdateFormValue} className="form-control" id="email"
                                                     required="" />
                                            </div>
                                            <div className="col-md-6">
                                                <label htmlFor="review">City</label>
                                                <input type="text" value={userObj.city} name="city" onChange={this.onUpdateFormValue} className="form-control" id="review"
                                                    required="" />
                                            </div>
                                        </div>  

                                          <div className="form-row">
                                            <a onClick={this.updateProfile} className="btn btn-solid">Update</a>
                                        </div>  
                                    </form>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>

            </div>
        )
    }
}

export default EditProfile