'use client'
import React, { useState } from "react";
import Link from 'next/link'

const login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [isValidCredentials, setIsValidCredentials] = useState(true);

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
    setIsValidCredentials(true); // Reset validation message on input change
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
    setIsValidCredentials(true); // Reset validation message on input change
  };

  const validateCredentials = () => {
    // Basic email validation using regex
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    // Password must be at least 6 characters
    const passwordRegex = /^.{6,}$/;

    const isValidEmail = emailRegex.test(email);
    const isValidPassword = passwordRegex.test(password);

    return isValidEmail && isValidPassword;
  };

  const handleLogin = () => {
    const isValid = validateCredentials();

    if (email.trim() === '' || password.trim() === '') {
      setIsValidCredentials(false);
      return;
    }

    if (isValid) {
      // Perform login logic here
      console.log('Login successful!');
      // You can redirect to another page or perform other actions upon successful login
    } else {
      setIsValidCredentials(false);
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      console.log('Email:', email);
      console.log('Password:', password);
    }
  };

  // Add your authentication logic here (e.g., connecting to a backend)
  //   console.log('Logging in with:', { email, password });
  // };




  return (
    <>










      <div className="flex items-center justify-center h-screen font-sans bg-gradient-to-r from-[#199252]  to-[#199252] ">
        <div className="bg-white p-10 rounded shadow-md w-96 hover-shadow">
          <h2 className="text-2xl font-semibold mb-6  text-black text-center">Login to your account</h2>


          <div className="mb-4">
            <label htmlFor="email" className="block text-gray-600 text-sm font-bold mb-2">Email</label>
            <input type="email" id="email" className="w-full border-2 border-black rounded py-2 px-3 text-sm text-black " onKeyPress={handleKeyPress} value={email} onChange={handleEmailChange} placeholder="Enter your email" />
          </div>

          <div className="mb-4 relative">
            <label htmlFor="password" className="block text-gray-600 text-sm font-bold mb-2">Password</label>
            <input type="password" id="password" className="w-full  border-2 border-black rounded py-2 px-3 text-sm text-black" onKeyPress={handleKeyPress} value={password} onChange={handlePasswordChange} placeholder="Enter your password" />
            <Link href="/forgot" className="text-green-500 text-sm absolute top-0 right-0 mt-1 mr-1 font-bold  ">Forgot Password?</Link>
          </div>

          <button type="submit" className=" text-white py-2 px-4 rounded w-full mb-4 bg-gradient-to-r from-[#199252] to-[#199252] " onClick={handleLogin}>Login</button>
          {error && <p className="text-red-500 mb-4">{error}</p>}



        </div>
      </div>





    </>
  );
};

export default login;
