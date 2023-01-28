import React, { Fragment } from 'react'
import { useFormik } from 'formik';
import Milk from '../Video/Blue.mp4'
import axios from 'axios';
import Swal from 'sweetalert2';
import { API } from '../API';
import { useNavigate } from 'react-router-dom';

function Userdata() {

    const Navigation = useNavigate()

    //Alert function;
    const Toast = Swal.mixin({
        toast: true,
        position: 'top-end',
        showConfirmButton: false,
        timer: 2000,
        timerProgressBar: true,
        didOpen: (toast) => {
            toast.addEventListener('mouseenter', Swal.stopTimer)
            toast.addEventListener('mouseleave', Swal.resumeTimer)
        }
    })

    //Formik validation;
    let formik = useFormik({
        initialValues: {
            Name: "",
            Password: "",
            Age: "",
            Email: "",
            Gender: ""
        },
        validate: () => {
            let errors = {}
            return errors
        },
        onSubmit: async (User) => {
            try {
                let change = await axios.post(`${API.Call}/Register`, User);
                Toast.fire({ icon: 'success', title: `OTP Successfully Sended` })
                if (change.data) {
                    const value = change.data.data
                    Navigation('/OTPVerify', { state: { id:value.UserID, Token: value.Token } })
                }
            } catch (error) {
                Toast.fire({ icon: 'error', title: `${error}` })
            }
        }
    });

    return (
        <>
            <div className='View Video-container'>
                <video src={Milk} autoPlay loop muted />

                <div className="container">
                    <div className="row pt-5">
                        <div className="mx-auto col-xl-5 col-md-7 mb-4 mt-5 pt-5">

                            {/* User information  */}
                            <div className="card fadeInDown">
                                <form id='formContent' onSubmit={formik.handleSubmit}>
                                    <div className="card-body fadeIn first">
                                        <div className="test-center">
                                            <h4 className='text-light text-center'><strong><i>Enter Your detail</i></strong></h4>
                                            <hr />

                                            <div className="form-group g-3 fadeIn second">
                                                <i className="fa fa-user text-light" aria-hidden="true"></i>
                                                <label htmlFor="name" className='text-light mb-1'><Fragment>&nbsp;</Fragment>Name</label>
                                                <input type="text" id='name' className='form-control text-white' value={formik.values.Name} onChange={formik.handleChange} name="Name" />
                                            </div>

                                            <div className="form-group mt-2 fadeIn third">
                                                <i className="fa fa-key text-light" aria-hidden="true"></i>
                                                <label htmlFor="Password" className='text-light mb-1'><Fragment>&nbsp;</Fragment>Password</label>
                                                <input type="password" id='Password' className='form-control text-white' value={formik.values.Password} onChange={formik.handleChange} name='Password' required />
                                            </div>

                                            <div className="form-group mt-2 fadeIn fourth">
                                                <i className="fa fa-calendar text-light" aria-hidden="true"></i>
                                                <label htmlFor="Age" className='text-light mb-1'><Fragment>&nbsp;</Fragment>Age</label>
                                                <input type="number" id='Age' className='form-control text-white' value={formik.values.Age} onChange={formik.handleChange} name='Age' required />
                                            </div>

                                            <div className="form-group mt-3 fadeIn fifth">
                                                <i className="fa fa-envelope text-light" aria-hidden="true"></i>
                                                <label htmlFor="Email" className='text-light mb-1'><Fragment>&nbsp;</Fragment>Email</label>
                                                <input type="email" id='Email' className='form-control text-white' value={formik.values.Email} onChange={formik.handleChange} name='Email' required />
                                            </div>

                                            <div className='mt-3 ms-5 fadeIn sixth' role="group" aria-labelledby="my-radio-group">
                                                <i className="fa fa-transgender" aria-hidden="true"></i>
                                                <label className='text-light me-4 text-light'><Fragment>&nbsp;</Fragment>Gender</label>
                                                <div className="form-check form-check-inline">
                                                    <input className="form-check-input text-white" {...formik.getFieldProps("Gender")} type="radio" name="Gender" id="inlineRadio1" value="Male" />
                                                    <label className="form-check-label text-light" htmlFor="inlineRadio1">Male</label>
                                                </div>
                                                <div className="form-check form-check-inline">
                                                    <input className="form-check-input text-white" {...formik.getFieldProps("Gender")} type="radio" name="Gender" id="inlineRadio2" value="Female" />
                                                    <label className="form-check-label text-light" htmlFor="inlineRadio2">Female</label>
                                                </div>
                                                <div className="form-check form-check-inline">
                                                    <input className="form-check-input text-white" {...formik.getFieldProps("Gender")} type="radio" name="Gender" id="inlineRadio3" value="Others" />
                                                    <label className="form-check-label text-light" htmlFor="inlineRadio3">Others</label>
                                                </div>
                                            </div>

                                            <div className="text-center mt-5 fadeIn seventh text-light">
                                                <button type='submit' className='btn btn-outline-dark text-light'>Submit</button>
                                            </div>
                                        </div>
                                    </div>
                                </form>
                            </div>


                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Userdata