
import { useState } from 'react';
import { Link } from 'react-router-dom';
import Modal from '../UI/Modal';
import Loader from '../UI/Loader';

export default function SignUpForm() {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    confirmPassword: '',
  });
  const [showModal, setShowModal] = useState(false);
  const [loader, setLoader] = useState(false);

  function handleChange(event) {
    setFormData({ ...formData, [event.target.name]: event.target.value });
  }

  function handleFormSubmit(event) {
    event.preventDefault();
    if (formData.password !== formData.confirmPassword) {
      setShowModal({
        title: 'Error',
        message: 'Passwords do not match!',
      });
      return;
    }

    (async function registerUser() {
      setLoader(true);
      try {
        const response = await fetch(
          'https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyAbUy5evKN-VSMQp6pan71s_ydy5W0gD_s',
          {
            method: 'POST',
            body: JSON.stringify({
              email: formData.email,
              password: formData.password,
              returnSecureToken: true,
            }),
          }
        );

        const data = await response.json();

        if (response.ok) {
          setShowModal({
            title: 'Success',
            message: 'Account created successfully! You can now log in.',
          });
        } else {
          throw new Error(data.error.message);
        }
      } catch (error) {
        setShowModal({
          title: 'Error',
          message: error.message,
        });
      }
      setLoader(false);
    })();
  }

  return (
    // <div className="flex flex-col justify-center min-h-screen py-12 sm:px-6 lg:px-8 bg-gradient-to-br from-indigo-900 via-purple-800 to-blue-900 text-white">
    <div className="flex flex-col items-center justify-center h-screen bg-gradient-to-br from-indigo-900 via-purple-800 to-blue-900 text-white">

      <div className="sm:mx-auto sm:w-full sm:max-w-md">
        <h2 className="mt-6 text-center text-3xl font-extrabold text-cyan-300">Sign Up</h2>
      </div>

      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
        <div className="bg-gray-900 py-8 px-4 shadow-lg rounded-lg sm:px-10 border border-cyan-600">
          <form className="space-y-6" onSubmit={handleFormSubmit}>
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-cyan-300">Email</label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                required
                className="appearance-none block w-full px-3 py-2 border border-gray-600 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-cyan-500 focus:border-cyan-500 sm:text-sm bg-gray-800 text-white"
                placeholder="example@email.com"
              />
            </div>

            <div>
              <label htmlFor="password" className="block text-sm font-medium text-cyan-300">Password</label>
              <input
                type="password"
                id="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                required
                className="appearance-none block w-full px-3 py-2 border border-gray-600 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-cyan-500 focus:border-cyan-500 sm:text-sm bg-gray-800 text-white"
                placeholder="Enter password"
              />
            </div>

            <div>
              <label htmlFor="confirmPassword" className="block text-sm font-medium text-cyan-300">Confirm Password</label>
              <input
                type="password"
                id="confirmPassword"
                name="confirmPassword"
                value={formData.confirmPassword}
                onChange={handleChange}
                required
                className="appearance-none block w-full px-3 py-2 border border-gray-600 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-cyan-500 focus:border-cyan-500 sm:text-sm bg-gray-800 text-white"
                placeholder="Confirm password"
              />
            </div>

            <div>
              <button
                type="submit"
                className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-md text-sm font-medium text-white bg-blue-600 hover:bg-blue-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-cyan-400 transition-all duration-300"
              >
                {loader ? <Loader /> : 'Sign Up'}
              </button>
            </div>
          </form>

          <p className="mt-2 text-center text-sm text-cyan-300">
            Already have an account?{' '}
            <Link to="/login" className="font-medium text-purple-400 hover:text-purple-300">
              Login here
            </Link>
          </p>
        </div>
      </div>

      {showModal && (
        <Modal
          title={showModal.title}
          message={showModal.message}
          onClick={() => setShowModal(false)}
        />
      )}
    </div>
  );
}









