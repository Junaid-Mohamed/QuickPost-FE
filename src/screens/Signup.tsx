import { GoogleLogin } from '@react-oauth/google';
import axios from 'axios';
import { useFormik } from 'formik';
import React from 'react';
import toast from 'react-hot-toast';
import { Link, useNavigate } from 'react-router-dom';
import * as Yup from 'yup';
import { baseURL } from '../config/constants';

interface SignupResponse {
  message: string
}

const Signup: React.FC = () => {

  const navigate = useNavigate();

  const handleSignUpWithGoogle = async (token : string | undefined) => {
    try{
      const response = await axios.post<SignupResponse>(`${baseURL}/api/auth/signup`, {token});
      toast.success(response.data.message);
      setTimeout(()=>{
        navigate("/login")
      },2000)
    }catch(error: unknown){
      if(error instanceof Error){
        toast.error(error.message)
      }
    }
  }

  const handleSignUpWithEmailPassword = async(formData: object) => {
    try{
      const response = await axios.post<SignupResponse>(`${baseURL}/api/auth/signup`, formData);
      toast.success(response.data.message);
      setTimeout(()=>{
        navigate("/login")
      },2000)
    }catch(error: unknown){
      if(error instanceof Error){
        toast.error(error.message)
      }
    }
  }

  const formik = useFormik({
    initialValues: {
      firstName: '',
      lastName: '',
      email: '',
      password: ''
    },
    validationSchema: Yup.object({
      firstName: Yup.string().required('First name is required'),
      lastName: Yup.string(),
      email: Yup.string().email('Invalid email address').required('Email is required'),
      password: Yup.string().min(6, 'Password should be at least 6 characters').required('Password is required')
    }),
    onSubmit: values => {
      handleSignUpWithEmailPassword(values);
    }
  });

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-300">
      <div className="bg-white p-6 rounded-lg shadow-lg transform transition hover:scale-105 max-w-md w-full">
        <h2 className="text-2xl font-semibold text-center mb-6">Sign Up</h2>
        <form onSubmit={formik.handleSubmit} className="space-y-4">
          <input
            type="text"
            name="firstName"
            placeholder="First Name"
            value={formik.values.firstName}
            onChange={formik.handleChange}
            className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          {formik.touched.firstName && formik.errors.firstName ? (
            <div className="text-red-500 text-sm">{formik.errors.firstName}</div>
          ) : null}
          
          <input
            type="text"
            name="lastName"
            placeholder="Last Name"
            value={formik.values.lastName}
            onChange={formik.handleChange}
            className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />

          <input
            type="email"
            name="email"
            placeholder="Email"
            value={formik.values.email}
            onChange={formik.handleChange}
            className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          {formik.touched.email && formik.errors.email ? (
            <div className="text-red-500 text-sm">{formik.errors.email}</div>
          ) : null}

          <input
            type="password"
            name="password"
            placeholder="Password"
            value={formik.values.password}
            onChange={formik.handleChange}
            className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          {formik.touched.password && formik.errors.password ? (
            <div className="text-red-500 text-sm">{formik.errors.password}</div>
          ) : null}

          <button type="submit" className="w-full p-3 bg-blue-500 text-white rounded-lg hover:bg-blue-600">Sign Up</button>
          <p className='flex justify-center' >or</p>     
      <GoogleLogin
        onSuccess={(cred)=>handleSignUpWithGoogle(cred.credential)}
        shape="pill"
      />   
    <p className='flex justify-center gap-2' >Already have an account? <Link className='underline text-blue-400' to={"/login"}>Login</Link></p>    
        </form>
      </div>
    </div>
  );
};

export default Signup;
