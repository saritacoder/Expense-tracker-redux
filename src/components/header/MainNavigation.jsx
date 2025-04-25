"use client"

import { Link, useNavigate, useLocation } from "react-router-dom"

import "./MainNavigation.css"
import { useContext, useState, useEffect } from "react"
import AuthContext from "../../context/AuthContext"

const MainNavigation = () => {
  const authCtx = useContext(AuthContext)
  const isLoggedIn = authCtx.isLoggedIn
  const navigate = useNavigate()
  const location = useLocation()
  const [cartCount, setCartCount] = useState(0)

  // Force re-render when location changes
  const [, setForceUpdate] = useState(0)

  useEffect(() => {
    // Force component to re-render when location changes
    setForceUpdate((prev) => prev + 1)
  }, [location.pathname])

  // Update cart count from localStorage
  useEffect(() => {
    const updateCartCount = () => {
      const count = Number.parseInt(localStorage.getItem("cartCount") || "0")
      setCartCount(count)
    }

    // Initial update
    updateCartCount()

    // Set up event listener for storage changes
    window.addEventListener("storage", updateCartCount)

    // Check every second for changes (as a fallback)
    const interval = setInterval(updateCartCount, 1000)

    return () => {
      window.removeEventListener("storage", updateCartCount)
      clearInterval(interval)
    }
  }, [])

  // Check if we're on an auth page (login, signup, forgot password)
  const isAuthPage =
    location.pathname === "/" || location.pathname === "/login" || location.pathname === "/forgot-password"

  // Check if we're on the profile page
  const isProfilePage = location.pathname === "/profile"

  const logoutHandler = () => {
    authCtx.logout()
    navigate("/login")
  }

  return (
    <header className="header">
      <Link to={isLoggedIn ? "/profile" : "/"}>
        <div className="logo">Expense Tracker</div>
      </Link>
      <nav>
        <ul>
          {/* Show Login button if not logged in AND not on an auth page */}
          {!isLoggedIn && !isAuthPage && (
            <li>
              <Link to="/">
                <button>Login</button>
              </Link>
            </li>
          )}

          {/* Always show navigation buttons if logged in */}
          {isLoggedIn && (
            <div className="headerList">
              {/* Only show Profile button if NOT on the profile page */}
              {!isProfilePage && (
                <Link to="/profile">
                  <button className="nav-button">Profile</button>
                </Link>
              )}
              <Link to="/expense">
                <button className="nav-button">Expenses</button>
              </Link>
              <Link to="/expense">
                <button className="cart-button">
                  My Cart <span className="cart-count">{cartCount}</span>
                </button>
              </Link>
              <button onClick={logoutHandler} className="logout">
                Logout
              </button>
            </div>
          )}
        </ul>
      </nav>
    </header>
  )
}

export default MainNavigation




// "use client"

// import { Link, useNavigate, useLocation } from "react-router-dom"

// import "./MainNavigation.css"
// import { useContext } from "react"
// import AuthContext from "../../context/AuthContext"

// const MainNavigation = () => {
//   const authCtx = useContext(AuthContext) // Using the context to get logged-in status
//   const isLoggedIn = authCtx.isLoggedIn // Getting the logged-in status from the context
//   const navigate = useNavigate() // Using the navigate function from react-router-dom to navigate between routes
//   const location = useLocation() // Get current location to check which page we're on

//   // Check if we're on an auth page (login, signup, forgot password)
//   const isAuthPage =
//     location.pathname === "/" || location.pathname === "/login" || location.pathname === "/forgot-password"

//   //Function to handle logout of the user
//   const logoutHandler = () => {
//     authCtx.logout() // Calling the logout function from AuthContext
//     navigate("/login") // Navigating to the root route after logging out to login page
//   }

//   return (
//     <header className="header">
//       <Link to="/">
//         <div className="logo">Expense Tracker</div>
//       </Link>
//       <nav>
//         <ul>
//           {/* Only show Login button if not logged in AND not on an auth page */}
//           {!isLoggedIn && !isAuthPage && (
//             <li>
//               <Link to="/">
//                 <button>Login</button>
//               </Link>
//             </li>
//           )}

//           {/* Only show Expense and Profile buttons if logged in AND not on an auth page */}
//           {isLoggedIn && !isAuthPage && (
//             <div className="headerList">
//               <button>
//                 <Link to="/expense">Expense</Link>
//               </button>
//               <button>
//                 <Link to="/profile">Profile</Link>
//               </button>
//             </div>
//           )}

//           {/* Only show Logout button if logged in AND not on an auth page */}
//           {isLoggedIn && !isAuthPage && (
//             <li>
//               <button onClick={logoutHandler} className="logout">
//                 Logout
//               </button>
//             </li>
//           )}
//         </ul>
//       </nav>
//     </header>
//   )
// }

// export default MainNavigation






// import { Link, useNavigate } from 'react-router-dom';

// import './MainNavigation.css';
// import { useContext } from 'react';
// import AuthContext from '../../context/AuthContext';

// const MainNavigation = () => {

//   const authCtx = useContext(AuthContext); // Using the context to get logged-in status
  
//   const isLoggedIn = authCtx.isLoggedIn; // Getting the logged-in status from the context 

//   const navigate = useNavigate(); // Using the navigate function from react-router-dom to navigate between routes

//   //Function to handle logout of the user
//   const logoutHandler = () => {
//     authCtx.logout(); // Calling the logout function from AuthContext
//     navigate('/login'); // Navigating to the root route after logging out to login page
//   }
  
//   return (
//     <header className='header'>
//       <Link to='/'>
//         <div className='logo'>Expense Tracker</div>
//       </Link>
//       <nav>
//         <ul>

//           {!isLoggedIn && (
//             <li>
//               <Link to='/'>
//                 <button>Login</button>
//               </Link>
//             </li>
//           )}

//           {isLoggedIn && (
//           <div className='headerList'>
//             <button>
//               <Link to='/expense'>Expense</Link>
//             </button>
//           {/* )}

//           {isLoggedIn && ( */}
//             <button>
//               <Link to='/profile'>Profile</Link>
//             </button>
//           </div>
//           )}

//           {isLoggedIn &&(
//             <li>
//               <button onClick={logoutHandler} className='logout'>Logout</button>
//             </li>
//           )}
          
//         </ul>
//       </nav>
//     </header>
//   );
// };

// export default MainNavigation;