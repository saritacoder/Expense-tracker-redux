// import { useHistory, Link } from 'react-router-dom';
// import { useSelector, useDispatch } from 'react-redux';
// import { logout } from '../../store/authSlice';
// import { setProMember } from '../../store/userSlice';
// import { MenuBarIcon, XmarkIcon } from '../../assets/Icons';

// export default function Navigation() {
//   const loggedIn = useSelector((state) => state.authState.loggedIn);
//   const dispatch = useDispatch();
//   const history = useHistory();

//   return (
//     <>
//       <nav className="flex justify-between items-center p-5 bg-gray-900 shadow-md fixed w-full top-0 text-white">
//         <span className="font-semibold text-2xl text-teal-400">Expense Tracker</span>

//         {loggedIn && (
//           <div className="flex gap-4">
//             <Link
//               className="hidden sm:block font-medium border border-gray-600 rounded px-2 py-[3px] hover:bg-gray-800"
//               to="/profile"
//             >
//               Profile
//             </Link>
//             <Link
//               className="hidden sm:block font-medium border border-gray-600 rounded px-2 py-[3px] hover:bg-gray-800"
//               to="/expenses"
//             >
//               Expenses
//             </Link>
//           </div>
//         )}

//         {loggedIn ? (
//           <button
//             className="hidden sm:block bg-purple-600 text-white py-1 px-2 rounded-md hover:bg-purple-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-teal-500"
//             onClick={() => {
//               dispatch(logout());
//               dispatch(setProMember());
//             }}
//           >
//             Logout
//           </button>
//         ) : (
//           <button
//             className="hidden sm:block bg-purple-600 text-white py-1 px-2 rounded-md hover:bg-purple-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-teal-500"
//             onClick={() => history.replace('/login')}
//           >
//             Login
//           </button>
//         )}

//         <button
//           className="sm:hidden"
//           onClick={() => {
//             document.getElementById('hidden').classList.toggle('hidden');
//           }}
//         >
//           <MenuBarIcon />
//         </button>
//       </nav>

//       {/* Navbar for mobile screens */}
//       <div
//         className="hidden sm:hidden fixed top-0 w-full bg-gray-900 p-5 shadow-md text-white"
//         id="hidden"
//       >
//         <div className="flex justify-between items-center">
//           <span className="font-semibold text-2xl text-teal-400">Expense Tracker</span>
//           <button
//             onClick={() => {
//               document.getElementById('hidden').classList.toggle('hidden');
//             }}
//           >
//             <XmarkIcon />
//           </button>
//         </div>

//         {loggedIn && (
//           <div className="flex flex-col gap-1 m-2">
//             <Link
//               className="font-medium rounded p-1 hover:bg-gray-800"
//               to="/profile"
//               onClick={() => {
//                 document.getElementById('hidden').classList.toggle('hidden');
//               }}
//             >
//               Profile
//             </Link>
//             <Link
//               className="font-medium rounded p-1 hover:bg-gray-800"
//               to="/expenses"
//               onClick={() => {
//                 document.getElementById('hidden').classList.toggle('hidden');
//               }}
//             >
//               Expenses
//             </Link>
//           </div>
//         )}

//         <div className="mt-2">
//           {loggedIn ? (
//             <button
//               className="bg-purple-600 py-1 px-2 rounded-md hover:bg-purple-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-teal-500"
//               onClick={() => {
//                 dispatch(logout());
//                 dispatch(setProMember());
//                 document.getElementById('hidden').classList.toggle('hidden');
//               }}
//             >
//               Logout
//             </button>
//           ) : (
//             <button
//               className="bg-purple-600 py-1 px-2 rounded-md hover:bg-purple-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-teal-500"
//               onClick={() => {
//                 history.replace('/login');
//                 document.getElementById('hidden').classList.toggle('hidden');
//               }}
//             >
//               Login
//             </button>
//           )}
//         </div>
//       </div>
//     </>
//   );
// }



import { useSelector, useDispatch } from 'react-redux';
import { logout } from '../../store/authSlice';
import { Link } from 'react-router-dom';
import { MenuBarIcon, XmarkIcon } from '../../assets/Icons';

export default function Navigation() {
  const dispatch = useDispatch();
  const loggedIn = useSelector((state) => state.authState.loggedIn);
  // const totalExpenses = useSelector((state) => state.expenses.items.length);
  const totalExpenses = useSelector((state) => state.expenseState?.totalExpenseCount || 0);





  const toggleMobileMenu = () => {
    document.getElementById('mobile-menu').classList.toggle('hidden');
  };

  return (
    <>
      <nav className="flex justify-between items-center p-5 bg-gray-900 shadow-md fixed w-full top-0 text-white">
        <span className="font-semibold text-2xl text-teal-400">Expense Tracker</span>

        {loggedIn && (
          <div className="flex gap-4 items-center">
            <Link
              className="hidden sm:block font-medium border border-gray-600 rounded px-2 py-[3px] hover:bg-gray-800"
              to="/profile"
            >
              Profile
            </Link>
            <Link
              className="hidden sm:block font-medium border border-gray-600 rounded px-2 py-[3px] hover:bg-gray-800"
              to="/expenses"
            >
              Expenses
            </Link>

            <button className="bg-green-500 text-white px-3 py-1 rounded-md flex items-center">
              My Cart <span className="ml-2 bg-white text-black px-2 rounded-full">{totalExpenses}</span>
            </button>

            <button className="bg-purple-600 text-white py-1 px-2 rounded-md" onClick={() => dispatch(logout())}>
              Logout
            </button>
          </div>
        )}

        <button className="sm:hidden" onClick={toggleMobileMenu}>
          <MenuBarIcon />
        </button>
      </nav>

      {/* Navbar for mobile screens */}
      <div className="hidden sm:hidden fixed top-0 w-full bg-gray-900 p-5 shadow-md text-white" id="mobile-menu">
        <div className="flex justify-between items-center">
          <span className="font-semibold text-2xl text-teal-400">Expense Tracker</span>
          <button onClick={toggleMobileMenu}>
            <XmarkIcon />
          </button>
        </div>

        {loggedIn && (
          <div className="flex flex-col gap-1 m-2">
            <Link className="font-medium rounded p-1 hover:bg-gray-800" to="/profile" onClick={toggleMobileMenu}>
              Profile
            </Link>
            <Link className="font-medium rounded p-1 hover:bg-gray-800" to="/expenses" onClick={toggleMobileMenu}>
              Expenses
            </Link>
          </div>
        )}

        <div className="mt-2">
          {loggedIn ? (
            <button
              className="bg-purple-600 py-1 px-2 rounded-md hover:bg-purple-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-teal-500"
              onClick={() => {
                dispatch(logout());
                toggleMobileMenu();
              }}
            >
              Logout
            </button>
          ) : (
            <Link
              className="bg-purple-600 py-1 px-2 rounded-md hover:bg-purple-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-teal-500"
              to="/login"
              onClick={toggleMobileMenu}
            >
              Login
            </Link>
          )}
        </div>
      </div>
    </>
  );
}
