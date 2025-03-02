
// import { useRef, useState } from 'react';
// import { useHistory, Link } from 'react-router-dom';
// import { useDispatch } from 'react-redux';
// import { login } from '../../store/authSlice';
// import axios from 'axios';
// import Modal from '../UI/Modal';
// import Loader from '../UI/Loader';

// export default function LoginForm() {
//   const emailRef = useRef();
//   const passwordRef = useRef();
//   const dispatch = useDispatch();
//   const history = useHistory();
//   const [showModal, setShowModal] = useState(false);
//   const [loader, setLoader] = useState(false);

//   function handleFormSubmit(event) {
//     event.preventDefault();

//     const email = emailRef.current.value;
//     const password = passwordRef.current.value;

//     if (!email || !password) {
//       setShowModal({
//         title: 'Invalid input',
//         message: 'Please fill in the valid details.',
//       });
//       return;
//     }

//     setLoader(true);
//     axios
//       .post(
//         'https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyAbUy5evKN-VSMQp6pan71s_ydy5W0gD_s',
//         {
//           email: email,
//           password: password,
//           returnSecureToken: true,
//         }
//       )
//       .then((response) => {
//         dispatch(
//           login({
//             jwtToken: response.data.idToken,
//             userName: response.data.displayName,
//           })
//         );
//         history.replace('/profile');
//       })
//       .catch((error) => {
//         console.error(error);
//         setShowModal({
//           title: 'Login failed',
//           message: 'Invalid Credentials',
//         });
//         setLoader(false);
//       });
//   }

//   return (
//     <div className="flex flex-col justify-center min-h-screen py-12 px-6 lg:px-8 bg-gradient-to-r from-purple-800 via-gray-900 to-purple-950 text-white">
//       <div className="sm:mx-auto sm:w-full sm:max-w-md">
//         <h2 className="text-center text-4xl font-extrabold text-blue-400">Sign in to your account</h2>
//       </div>

//       <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-md">
//         <div className="bg-slate-800 p-8 shadow-xl rounded-lg border border-slate-700">
//           <form className="space-y-6" onSubmit={handleFormSubmit}>
//             <div>
//               <label htmlFor="email" className="block text-sm font-medium text-blue-300">Email</label>
//               <input
//                 type="email"
//                 id="email"
//                 ref={emailRef}
//                 required
//                 className="mt-2 block w-full px-4 py-3 rounded-lg shadow-sm border border-slate-700 placeholder-gray-400 bg-slate-700 text-white focus:ring-blue-500 focus:border-blue-500"
//                 placeholder="example@email.com"
//               />
//             </div>

//             <div>
//               <label htmlFor="password" className="block text-sm font-medium text-blue-300">Password</label>
//               <input
//                 type="password"
//                 id="password"
//                 ref={passwordRef}
//                 required
//                 className="mt-2 block w-full px-4 py-3 rounded-lg shadow-sm border border-slate-700 placeholder-gray-400 bg-slate-700 text-white focus:ring-blue-500 focus:border-blue-500"
//                 placeholder="******"
//               />
//             </div>

//             <div className="flex justify-between items-center">
//               <Link to="/forgot-password" className="text-sm text-blue-400 hover:text-blue-300">Forgot your password?</Link>
//             </div>

//             <div>
//               <button
//                 type="submit"
//                 className="w-full flex justify-center py-3 px-4 rounded-lg shadow-lg text-lg font-semibold text-white bg-blue-600 hover:bg-blue-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
//               >
//                 {loader ? <Loader /> : 'Sign in'}
//               </button>
//             </div>
//           </form>

//           <p className="mt-6 text-center text-sm text-blue-300">
//             Don't have an account?{' '}
//             <Link to="/signup" className="font-medium text-blue-400 hover:text-blue-300">Create here</Link>
//           </p>
//         </div>
//       </div>

//       {showModal && (
//         <Modal
//           title={showModal.title}
//           message={showModal.message}
//           onClick={() => setShowModal(false)}
//         />
//       )}
//     </div>
//   );
// }






import { useRef, useState } from 'react';
import { useHistory, Link } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { login } from '../../store/authSlice';
import axios from 'axios';
import Modal from '../UI/Modal';
import Loader from '../UI/Loader';

export default function LoginForm() {
  const emailRef = useRef();
  const passwordRef = useRef();
  const dispatch = useDispatch();
  const history = useHistory();
  const [showModal, setShowModal] = useState(false);
  const [loader, setLoader] = useState(false);

  function handleFormSubmit(event) {
    event.preventDefault();

    const email = emailRef.current.value;
    const password = passwordRef.current.value;

    if (!email || !password) {
      setShowModal({
        title: 'Invalid input',
        message: 'Please fill in the valid details.',
      });
      return;
    }

    setLoader(true);
    axios
      .post(
        'https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyAbUy5evKN-VSMQp6pan71s_ydy5W0gD_s',
        {
          email: email,
          password: password,
          returnSecureToken: true,
        }
      )
      .then((response) => {
        dispatch(
          login({
            jwtToken: response.data.idToken,
            userName: response.data.displayName,
          })
        );
        history.replace('/profile');
      })
      .catch((error) => {
        console.error(error);
        setShowModal({
          title: 'Login failed',
          message: 'Invalid Credentials',
        });
        setLoader(false);
      });
  }

  return (
    <div className="flex flex-col items-center justify-center h-screen bg-gradient-to-br from-indigo-900 via-purple-800 to-blue-900 text-white">
      <div className="sm:mx-auto sm:w-full sm:max-w-md">
        <h2 className="mt-6 text-center text-3xl font-extrabold text-cyan-300">Sign in to your account</h2>
      </div>

      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
        <div className="bg-gray-900 py-8 px-4 shadow-lg rounded-lg sm:px-10 border border-cyan-600">
          <form className="space-y-6" onSubmit={handleFormSubmit}>
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-cyan-300">Email</label>
              <input
                type="email"
                id="email"
                ref={emailRef}
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
                ref={passwordRef}
                required
                className="appearance-none block w-full px-3 py-2 border border-gray-600 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-cyan-500 focus:border-cyan-500 sm:text-sm bg-gray-800 text-white"
                placeholder="******"
              />
            </div>

            <div className="flex justify-between items-center">
              <Link to="/forgot-password" className="text-sm text-cyan-400 hover:text-cyan-300">Forgot your password?</Link>
            </div>

            <div>
              <button
                type="submit"
                className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-md text-sm font-medium text-white bg-blue-600 hover:bg-blue-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-cyan-400 transition-all duration-300"
              >
                {loader ? <Loader /> : 'Sign in'}
              </button>
            </div>
          </form>

          <p className="mt-2 text-center text-sm text-cyan-300">
            Don't have an account?{' '}
            <Link to="/signup" className="font-medium text-purple-400 hover:text-purple-300">Create here</Link>
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
