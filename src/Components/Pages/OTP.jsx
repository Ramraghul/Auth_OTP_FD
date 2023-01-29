import React, { Fragment, useEffect, useState } from 'react'
import { useFormik } from 'formik';
import Milk from '../Video/Blue.mp4'
import axios from 'axios';
import Swal from 'sweetalert2';
import { API } from '../API';
import { useLocation, useNavigate } from 'react-router-dom';

function OTP() {
    //Timing control
    const [minutes, setMinutes] = useState(5);
    const [seconds, setSeconds] = useState(0);

    const Location = useLocation()
    const Navigation = useNavigate()

    const Verifiy = Location.state

    useEffect(() => {
        if (minutes >= 0 && seconds >= 0) {
            let intervalId = setInterval(() => {
                if (seconds === 0) {
                    if (minutes === 0) {
                        clearInterval(intervalId);
                        return;
                    }
                    setMinutes(minutes - 1);
                    setSeconds(59);
                } else {
                    setSeconds(seconds - 1);
                }
            }, 1000);
            return () => clearInterval(intervalId);
        }
    }, [minutes, seconds]);

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
            userOTP:{
                a:"",
                b:"",
                c:"",
                d:"",
                e:"",
                f:""
            }
        },
        validate: () => {
            let errors = {}
            return errors
        },
        onSubmit: async (User) => {
            try {
                let value=await axios.post(`${API.Call}/Verification/${Verifiy.id}/${Verifiy.Token}`,User);
                Toast.fire({ icon: 'success', title: `Account Activated` })
                const jsons = value.data.id
                if(value.data.Message === "Welcome"){
                    Navigation("/Data",{ state: {id:jsons}})
                }

            } catch (error) {
                console.log(error.response);
                if(error.response.status === 501){
                    Toast.fire({ icon: 'error', title: `${'Time Out'}` })
                }
                if(error.response.status === 401){
                    Toast.fire({ icon: 'error', title: `${'Incorrect OTP'}` })
                }
                if (error.response.status === 404) {
                    Toast.fire({ icon: 'error', title: `${'Please make a Register'}` })
                }
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

                        {/* OTP Validation */}
                        <div className="card fadeInDown">
                            <form id='formContent ' onSubmit={formik.handleSubmit}>
                                <div className="card-body fadeIn first">
                                    <div className="test-center">
                                        <h4 className='text-light text-center'><strong><i>Enter Your OTP</i></strong></h4>
                                        <hr />

                                        <div className="form-group g-3 fadeIn second d-flex justify-content-around m-5" >
                                            <input type="text" className="form-control me-2 text-white text-center" autoFocus="" maxLength={1} value={formik.values.userOTP.a} onChange={formik.handleChange} name="userOTP.a" />
                                            <input type="text" className="form-control me-2 text-white text-center" maxLength={1} value={formik.values.userOTP.b} onChange={formik.handleChange} name="userOTP.b"/>
                                            <input type="text" className="form-control me-2 text-white text-center" maxLength={1} value={formik.values.userOTP.c} onChange={formik.handleChange} name="userOTP.c"/>
                                            <input type="text" className="form-control me-2 text-white text-center" maxLength={1} value={formik.values.userOTP.d} onChange={formik.handleChange} name="userOTP.d"/>
                                            <input type="text" className="form-control me-2 text-white text-center" maxLength={1} value={formik.values.userOTP.e} onChange={formik.handleChange} name="userOTP.e"/>
                                            <input type="text" className="form-control me-2 text-white text-center" maxLength={1} value={formik.values.userOTP.f} onChange={formik.handleChange} name="userOTP.f"/>
                                        </div>

                                        <div className="fadeIn third">
                                            <h6 className="text-center text-danger mb-2">Your OTP is : <strong>{Verifiy.otp}</strong></h6>
                                            <h4 className='text-center text-white'>{minutes}:{seconds < 10 ? `0${seconds}` : seconds} minutes left</h4>
                                        </div>
                                        <div className="text-center mt-5 fadeIn fourth text-light">
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

export default OTP