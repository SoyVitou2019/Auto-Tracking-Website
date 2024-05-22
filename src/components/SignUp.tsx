// ./src/SignUp.tsx
import React from 'react';
import { GoogleOAuthProvider, GoogleLogin } from '@react-oauth/google';
import { useAuth } from './AuthContext';
import { useNavigate } from 'react-router-dom';


const SignUp: React.FC = () => {
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleGoogleSuccess = (response: any) => {
    const token = response.credential;
    login(token);
    navigate('/home');
  };

  const handleGoogleFailure = () => {
    console.log('Google Login Failed');
  };

  const clientId_code = import.meta.env.VITE_REACT_CLIENT_ID;

  return (
    <GoogleOAuthProvider clientId = {clientId_code}>
      <div className="min-h-screen flex items-center justify-center bg-gray-100">
        <div className="bg-white p-8 rounded shadow-md w-full max-w-md text-center">
          <h2 className="text-2xl font-bold mb-6">Sign Up with Google</h2>
          <div className="mt-6 flex justify-center">
            <GoogleLogin
              onSuccess={handleGoogleSuccess}
              onError={handleGoogleFailure}
            />
          </div>
        </div>
      </div>
    </GoogleOAuthProvider>
  );
};

export default SignUp;
