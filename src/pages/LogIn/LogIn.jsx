import React, { useState } from 'react';
import { FcGoogle } from 'react-icons/fc';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import useAuth from '../../hooks/useAuth';
import toast from 'react-hot-toast';
import { TbFidgetSpinner } from 'react-icons/tb';
import { getToken } from '../../api/auth';

const LogIn = () => {
    const [email,setEmail]=useState();
    const {loading,signIn,signInWithGoogle,updateUserProfile,user}=useAuth();
    const navigate = useNavigate();
    const location=useLocation();
    console.log(location?.state?.from?.pathname)
   
    const from = location.state?.from?.pathname || "/";
    // const from1 = location.state?.from?.pathname || "/";
    const handleSubmit=async(e)=>{
        e.preventDefault()
        const form=e.target;
        const email=form.email.value;
        const password=form.password.value;
        console.log(email,password);
        try{
          //2  user logIn
          const result=await signIn(email,password);
        
           // get token
      await getToken(result?.user?.email);
      navigate(from, { replace: true });
      toast.success('logIn successfully')
             }
             catch(err){
               console.error(err.message)
               toast.error(err.message)
             }
    };
    const handleGoogleSignIn=async()=>{
  
      try{
        // user registration in google
        await signInWithGoogle();
        // ssave user data in database
        const dbResponse=await saveUser(result?.user);
        console.log(dbResponse);
        // get Toke
        await getToken(result?.user?.email);
        navigate(from, { replace: true });
        toast.success('signUp succesfully')

      }
      catch(error){
        toast.error(error.message)
      }
    }
    return (
        <div className='flex justify-center items-center min-h-screen'>
        <div className='flex flex-col max-w-md p-6 rounded-md sm:p-10 bg-gray-100 text-gray-900'>
          <div className='mb-8 text-center'>
            <h1 className='my-3 text-4xl font-bold'>Log In</h1>
            <p className='text-sm text-gray-400'>
              Sign in to access your account
            </p>
          </div>
          <form
            onSubmit={handleSubmit}
            className='space-y-6 ng-untouched ng-pristine ng-valid'
          >
            <div className='space-y-4'>
              <div>
                <label htmlFor='email' className='block mb-2 text-sm'>
                  Email address
                </label>
                <input
                  type='email'
                  name='email'
                  onBlur={e => setEmail(e.target.value)}
                  id='email'
                  required
                  placeholder='Enter Your Email Here'
                  className='w-full px-3 py-2 border rounded-md border-gray-300 focus:outline-rose-500 bg-gray-200 text-gray-900'
                  data-temp-mail-org='0'
                />
              </div>
              <div>
                <div className='flex justify-between'>
                  <label htmlFor='password' className='text-sm mb-2'>
                    Password
                  </label>
                </div>
                <input
                  type='password'
                  name='password'
                  autoComplete='current-password'
                  id='password'
                  required
                  placeholder='*******'
                  className='w-full px-3 py-2 border rounded-md border-gray-300 focus:outline-rose-500 bg-gray-200 text-gray-900'
                />
              </div>
              <p className='text-sm'>
              <span className='text-center block'> demo UserName:alihyder@gmail.com</span>
              <span className='text-center'> demo Password:Asdfgh</span>
            </p>
            </div>
  
            <div>
              <button
                type='submit'
                className='bg-rose-500 w-full rounded-md py-3 text-white'
        
              >
       {loading? <TbFidgetSpinner className='animate-spin m-auto'/>:'signIn'}
              </button>
            </div>
          </form>
          <div className='space-y-1'>
            <button
              
              className='text-xs hover:underline hover:text-rose-500 text-gray-400'
            >
              Forgot password?
            </button>
          </div>
          <div className='flex items-center pt-4 space-x-1'>
            <div className='flex-1 h-px sm:w-16 dark:bg-gray-700'></div>

  

            <p className='px-3 text-sm dark:text-gray-400'>
              Login with social accounts
            </p>

            <div className='flex-1 h-px sm:w-16 dark:bg-gray-700'></div>
          </div>
  
          <button
        
            className='disabled:cursor-not-allowed flex justify-center items-center space-x-2 border m-3 p-2 border-gray-300 border-rounded cursor-pointer'
         onClick={handleGoogleSignIn}
         >
            <FcGoogle size={32} />
  
            <p>Continue with Google</p>
          </button>
  
          <p className='px-6 text-sm text-center text-gray-400'>
            Don&apos;t have an account yet?{' '}
            <Link
              to='/signup'
              className='hover:underline hover:text-rose-500 text-gray-600'
            >
              Sign up
            </Link>
            .
          </p>
        </div>
      </div>
    );
};

export default LogIn;