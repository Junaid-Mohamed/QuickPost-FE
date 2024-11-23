import { GoogleLogin } from '@react-oauth/google';
import axios from 'axios';
import { useFormik } from 'formik';
import React from 'react';
import toast from 'react-hot-toast';
import { Link, useNavigate } from 'react-router-dom';
import * as Yup from 'yup';
import { baseURL } from '../config/constants';

interface SigninResponse {
  token: string
}

const LoginPage: React.FC = () => {

  const navigate = useNavigate();

  const handleSignInWithGoogle = async (token: string | undefined) =>{
    try{
      const response = await axios.post<SigninResponse>(`${baseURL}/api/auth/signin`, {token});
      if(response.status === 200) {
        toast.success("LogIn Success")
        window.localStorage.setItem('QP-authToken', response.data.token);
        setTimeout(()=>{
            navigate('/home');
        },1500)
      }
    }catch(error: unknown){
      if(error instanceof Error){
        toast.error(error.message)
      }
      
    }
  }

  const handleSignInWithEmailPassword = async(formData: object) => {
    try{
      const response = await axios.post<SigninResponse>(`${baseURL}/api/auth/signin`, formData);
      if(response.status === 200) {
        toast.success("LogIn Success")
        window.localStorage.setItem('QP-authToken', response.data.token);
        setTimeout(()=>{
          navigate('/home');
      },1500)
      }
    }catch(error: unknown){
      if(error instanceof Error){
        toast.error(error.message)
      }
    }
  }

  const formik = useFormik({
    initialValues: {
      email: '',
      password: '',
    },
    validationSchema: Yup.object({
      email: Yup.string().email('Invalid email address').required('Email is required'),
      password: Yup.string().min(6, 'Password should be at least 6 characters').required('Password is required'),
    }),
    onSubmit: async (values) => {
      try {
        // const response = await axios.post('https://your-api-url.com/login', values);
        handleSignInWithEmailPassword(values);
      } catch (error) {
        console.error('Login error:', error);
      }
    },
  });

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="bg-white p-6 rounded-lg shadow-lg transform transition hover:scale-105 max-w-md w-full">
        <h2 className="text-2xl font-semibold text-center mb-6">Log In</h2>
        <form onSubmit={formik.handleSubmit} className="space-y-4">
          <input
            type="email"
            name="email"
            placeholder="Email"
            value={formik.values.email}
            onChange={formik.handleChange}
            className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          {formik.touched.email && formik.errors.email && (
            <div className="text-red-500 text-sm">{formik.errors.email}</div>
          )}

          <input
            type="password"
            name="password"
            placeholder="Password"
            value={formik.values.password}
            onChange={formik.handleChange}
            className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          {formik.touched.password && formik.errors.password && (
            <div className="text-red-500 text-sm">{formik.errors.password}</div>
          )}

          <button
            type="submit"
            className="w-full p-3 bg-blue-500 text-white rounded-lg hover:bg-blue-600"
          >
            Log In
          </button>
          <GoogleLogin
        onSuccess={(cred)=>handleSignInWithGoogle(cred.credential)}
        shape="pill"
      /> 
          <p className='flex justify-center gap-2' >Don't have an account? <Link className='underline text-blue-400' to={"/signup"}>Signup</Link></p>    
        </form>
      </div>
    </div>
  );
};

export default LoginPage;


// https://upload.wikimedia.org/wikipedia/commons/thumb/c/c1/Google_%22G%22_logo.svg/1024px-Google_%22G%22_logo.svg.png
