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

  return (
    <GoogleOAuthProvider clientId="615818055484-tjk8q5alal4a91vovl5f90dfahebn2i3.apps.googleusercontent.com">
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
