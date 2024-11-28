import React from 'react';
import { useNavigate } from 'react-router-dom';

const Home = () => {
  const navigate = useNavigate();
  const role = localStorage.getItem('role'); 

  const handleNavigation = (route) => {
    navigate(route);
  };

  return (
    <div className="flex justify-center items-center h-screen">
      <div className="space-x-4">
        {/* Admin Button */}
        <button
          onClick={() => handleNavigation('/admin-dashboard')}
          disabled={role !== 'Admin'}
          className={`px-6 py-3 rounded text-white font-bold ${
            role === 'Admin' ? 'bg-blue-500 hover:bg-blue-600' : 'bg-gray-300 cursor-not-allowed'
          }`}
        >
          Admin Dashboard
        </button>

        {/* Moderator Button */}
        <button
          onClick={() => handleNavigation('/moderator-dashboard')}
          disabled={role !== 'Moderator'}
          className={`px-6 py-3 rounded text-white font-bold ${
            role === 'Moderator' ? 'bg-green-500 hover:bg-green-600' : 'bg-gray-300 cursor-not-allowed'
          }`}
        >
          Moderator Dashboard
        </button>

        {/* User Button */}
        <button
          onClick={() => handleNavigation('/user-dashboard')}
          disabled={role !== 'User'}
          className={`px-6 py-3 rounded text-white font-bold ${
            role === 'User' ? 'bg-red-500 hover:bg-red-600' : 'bg-gray-300 cursor-not-allowed'
          }`}
        >
          User Dashboard
        </button>
      </div>
    </div>
  );
};

export default Home;
