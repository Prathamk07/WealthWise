import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { UserPlus, User, Mail, Lock, Building } from 'lucide-react';

const SignUpPage: React.FC = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [businessName, setBusinessName] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle sign up logic here
    console.log('Sign up with:', name, email, password, businessName);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-500 to-indigo-600 flex items-center justify-center px-4">
      <div
        className="max-w-md w-full bg-white rounded-lg shadow-lg p-8"
        data-aos="zoom-in"
      >
        <h2 className="text-3xl font-bold text-center text-gray-800 mb-8">
          Create Your WealthWise Account
        </h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-4" data-aos="fade-up" data-aos-delay="200">
            <label
              htmlFor="name"
              className="block text-gray-700 text-sm font-bold mb-2"
            >
              Full Name
            </label>
            <div className="relative">
              <input
                type="text"
                id="name"
                className="w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
                onChange={handleChange}
                required
              />
              <User className="absolute left-3 top-2 text-gray-400" size={20} />
            </div>
          </div>
          <div className="mb-4" data-aos="fade-up" data-aos-delay="400">
            <label
              htmlFor="email"
              className="block text-gray-700 text-sm font-bold mb-2"
            >
              Email
            </label>
            <div className="relative">
              <input
                type="email"
                id="email"
                className="w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
                onChange={handleChange}
                required
              />
              <Mail className="absolute left-3 top-2 text-gray-400" size={20} />
            </div>
          </div>
          <div className="mb-4" data-aos="fade-up" data-aos-delay="600">
            <label
              htmlFor="password"
              className="block text-gray-700 text-sm font-bold mb-2"
            >
              Password
            </label>
            <div className="relative">
              <input
                type="password"
                id="password"
                className="w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
                onChange={handleChange}
                required
              />
              <Lock className="absolute left-3 top-2 text-gray-400" size={20} />
            </div>
          </div>
          <div className="mb-6" data-aos="fade-up" data-aos-delay="800">
            <label htmlFor="businessName" className="block text-gray-700 text-sm font-bold mb-2">Business Name</label>
            <div className="relative">
              <input
                type="text"
                id="businessName"
                className="w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
                onChange={handleChange}
                required
              />
              <Building
                className="absolute left-3 top-2 text-gray-400"
                size={20}
              />
            </div>
          </div> */}
          <button
            type="submit"
            className="w-full bg-indigo-500 text-white py-2 px-4 rounded-md hover:bg-indigo-600 transition duration-300 flex items-center justify-center"
            data-aos="fade-up"
            data-aos-delay="1000"
          >
            <UserPlus className="mr-2" /> Sign Up
          </button>
        </form>
        <p
          className="mt-4 text-center text-gray-600"
          data-aos="fade-up"
          data-aos-delay="1200"
        >
          Already have an account?{" "}
          <Link to="/signin" className="text-indigo-500 hover:underline">
            Sign In
          </Link>
        </p>
      </div>
    </div>
  );
};

export default SignUpPage;