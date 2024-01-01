'use client'
import React, { useState } from 'react';

const Forgot = () => {
    const [email, setEmail] = useState('');
    const [otpSent, setOtpSent] = useState(false);
    const [otp, setOtp] = useState('');
    const [errorMessage, setErrorMessage] = useState('');
    const handleLogin = () => {

        const emailRegex = /@sjec\.ac\.in/;

        if (email.trim() === '') {
            setErrorMessage('Invalid Credentials: Email and password cannot be empty.');
        } else if (!emailRegex.test(email)) {
            setErrorMessage('Invalid Credentials: Entered email is incorrect.');
        } else {
            // Perform login logic here
            setErrorMessage(''); // Clear error message if login is successful
            console.log(`Logging in with username: ${email}`);
        }
    };

    const handleSendOtp = () => {

        setOtpSent(true);
    };
    const handleKeyPress = (e) => {
        if (e.key === 'Enter') {
            handleLogin();
        }
    };

    return (
        <div className="flex items-center justify-center font-sans h-screen bg-[#222222]">
            <div className="bg-white p-8 rounded shadow-md max-w-md w-full">
                <h2 className="text-2xl font-semibold mb-6 text-center text-black">Account Details</h2>

                {/* Email Input */}
                <div className="mb-4">
                    <label htmlFor="email" className="block text-gray-600 text-sm font-bold mb-2">Email</label>
                    <input
                        type="email"
                        id="email"
                        className="w-full border-2 text-black border-gray-300 rounded py-2 px-3 text-sm"
                        value={email}
                        onKeyPress={handleKeyPress}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="Enter Your Email"
                    />
                </div>
                {errorMessage && <p className="text-red-500 mb-4 text-center">{errorMessage}</p>}



                <button
                    type="button"
                    className={`bg-green-700 text-white py-2 px-4 rounded w-full mb-4 hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-opacity-50 ${otpSent ? 'cursor-not-allowed opacity-50' : ''
                        }`}
                    onClick={handleSendOtp}
                    disabled={otpSent}
                >
                    {otpSent ? 'OTP Sent' : 'Send OTP'}
                </button>
                {otpSent && (
                    <div className="mb-4">
                        <label htmlFor="otp" className="block text-gray-600 text-sm font-bold mb-2">Enter 6-Digit OTP Sent To Your Email</label>
                        <input
                            type="text"
                            id="otp"
                            className=" w-5/12 border-2 border-gray-300 rounded py-2 px-3 text-sm text-black"
                            value={otp}
                            onChange={(e) => setOtp(e.target.value)}

                        />
                    </div>
                )}


                {otpSent && (
                    <button
                        type="button"
                        className="bg-green-700 text-white py-2 px-4 rounded w-full mb-4 hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-opacity-50"
                        onClick={handleSendOtp || handleKeyPress}



                    >
                        Verify OTP
                    </button>
                )}
            </div>
        </div>
    );
};

export default Forgot;
