// ./src/Home.tsx
import React from 'react';
import { useAuth } from './AuthContext';
import { useNavigate } from 'react-router-dom';
import DefaultLayout from '../layout/DefaultLayout';

const Home: React.FC = () => {
  const { logout } = useAuth(); 
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  return (
    <DefaultLayout>
        <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100">
            <div className="bg-white p-8 rounded shadow-md w-full max-w-md text-center">
                <h1 className="text-3xl font-bold mb-4">Welcome to Auto Tracking</h1>
                <button
                onClick={handleLogout}
                className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                >
                Logout
                </button>
            </div>
        </div>
    </DefaultLayout>
    
  );
};

export default Home;
