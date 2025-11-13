import React, { useState } from 'react'
import AuthLayout from '../../components/Layout/AuthLayout'
import { useNavigate, Link } from 'react-router-dom';
import Input from '../../components/inputs/Input';
import { validateEmail } from '../../utils/helper';
import { API_PATHS } from '../../utils/apiPaths';
import axiosInstance from '../../utils/axiosInstance';
import {UserContext} from '../../context/UserContext';
import { useContext } from 'react';

const Login = () => {
  const [email,setEmail]=useState("");
  const[password,setPassword]=useState("");
  const [error,setError]=useState(null);
  
  const {updateUser}=useContext(UserContext);
  const navigate=useNavigate();
  
  // Debug: Log when error changes
  React.useEffect(() => {
    if (error) {
      console.log('Login error set:', error);
    }
  }, [error]);
  
  const handleLogin=async ()=>{
    console.log('Login button clicked');

    if(!validateEmail(email)){
      console.log('Email validation failed');
      setError("Please enter a valid email address");
      return;
    }
    if(!password){
      console.log('Password validation failed');
      setError("Please enter the password");
      return;
    }
    
    console.log('Validation passed, attempting login');
    setError("");
    
    try {
      const response = await axiosInstance.post(API_PATHS.AUTH.LOGIN, {
        email,
        password,
      });
      const {token,user } = response.data;
      if (token) {
        console.log('Login successful, navigating to dashboard');
        localStorage.setItem("token", token);
        updateUser(user);
        navigate("/dashboard");
      }
    } catch (error) {
      console.log('Login failed:', error);
      if (error.response && error.response.data) {
        setError(error.response.data.message);
      } else {
        setError("Something went wrong. Please try again later.");
      }
    }
  }
  return (
    <AuthLayout>
      <div className='lg:w-[70%] h-3/4 md:h-full flex flex-col justify-center'>
        <h3 className='text-xl font-semibold text-black'>Welcome Back</h3>
        <p className='text-xs text-slate-700 mt-[5px] mb-6'>
          Please enter your details to log in
        </p>
        <div>
          <Input
          value={email}
          onChange={({target})=> setEmail(target.value)}
          label="Email Address"
          placeholder="example@gmail.com"
          type="text"
          />

          <Input
          value={password}
          onChange={({target})=> setPassword(target.value)}
          label="Password"
          placeholder="Min 8 Characters"
          type="password"
          onKeyDown={(e) => e.key === 'Enter' && handleLogin()}
          />

          {error && <p className='text-red-500 text-xs pb-2.5'>{error}</p>}

          <button type="button" onClick={handleLogin} className='btn-primary'>
            LOGIN
          </button>

          <p className='text-[13px] text-slate-800 mt-3'>
            Don't have an account? {""}
            <Link className="font-medium text-primary underline" to="/signup">
              SignUp
            </Link>
          </p>
        </div>

      </div>
    </AuthLayout>
  )
}

export default Login
