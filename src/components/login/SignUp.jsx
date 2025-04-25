"use client"

import { useState, useRef, useContext, useEffect } from "react"

import "./SignUp.css"
import { useNavigate } from "react-router-dom"
import AuthContext from "../../context/AuthContext"

const SignUp = () => {
  const emailInputRef = useRef()
  const passwordInputRef = useRef()
  const confirmPasswordInputRef = useRef()

  const authCtx = useContext(AuthContext)
  const navigate = useNavigate()

  const [isLogin, setIsLogin] = useState(true)
  const [isLoading, setIsLoading] = useState(false)
  const [errorMessage, setErrorMessage] = useState("")
  const [justSignedUp, setJustSignedUp] = useState(false)
  const [signupCredentials, setSignupCredentials] = useState({ email: "", password: "" })

  // Clear form fields when component mounts (but not after signup)
  useEffect(() => {
    if (!justSignedUp) {
      // Only clear if not just signed up
      if (emailInputRef.current) emailInputRef.current.value = ""
      if (passwordInputRef.current) passwordInputRef.current.value = ""
      if (confirmPasswordInputRef.current) confirmPasswordInputRef.current.value = ""
    }
  }, [])

  // Fill in credentials after successful signup
  useEffect(() => {
    if (justSignedUp && isLogin) {
      if (emailInputRef.current) emailInputRef.current.value = signupCredentials.email
      if (passwordInputRef.current) passwordInputRef.current.value = signupCredentials.password
      setJustSignedUp(false) // Reset the flag after filling in
    }
  }, [justSignedUp, isLogin, signupCredentials])

  // Clear form fields when switching between login and signup (except after signup)
  useEffect(() => {
    if (!justSignedUp) {
      if (emailInputRef.current) emailInputRef.current.value = ""
      if (passwordInputRef.current) passwordInputRef.current.value = ""
      if (confirmPasswordInputRef.current && confirmPasswordInputRef.current.value) {
        confirmPasswordInputRef.current.value = ""
      }
    }
  }, [isLogin])

  const switchAuthModeHandler = () => {
    setIsLogin((prevState) => !prevState)
  }

  const submitHandler = (e) => {
    e.preventDefault()

    const enteredEmail = emailInputRef.current.value
    const enteredPassword = passwordInputRef.current.value
    const enteredConfirmPassword = confirmPasswordInputRef.current?.value

    if (!isLogin && enteredPassword !== enteredConfirmPassword) {
      alert("Passwords do not match!")
      return
    }

    setIsLoading(true)
    setErrorMessage("")

    let url
    if (isLogin) {
      url =
        "https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyBx_2sgp49gkpcY_Tn1spEFAw3TbjqZHi4"
    } else {
      url = "https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyBx_2sgp49gkpcY_Tn1spEFAw3TbjqZHi4"
    }
    fetch(url, {
      method: "POST",
      body: JSON.stringify({
        email: enteredEmail,
        password: enteredPassword,
        returnSecureToken: true,
      }),
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((res) => {
        setIsLoading(false)
        if (res.ok) {
          return res.json().then((data) => {
            if (isLogin) {
              // If it's a login, store token and navigate to profile
              authCtx.login(data.idToken)

              // Store email and password for token refresh (in a real app, use a more secure approach)
              localStorage.setItem("userEmail", enteredEmail)
              localStorage.setItem("userPassword", enteredPassword)

              navigate("/profile")
            } else {
              // If it's a signup, switch to login mode and save credentials
              alert("Account created successfully! Please login.")

              // Store the credentials for auto-fill
              setSignupCredentials({
                email: enteredEmail,
                password: enteredPassword,
              })

              // Set flag to indicate just signed up
              setJustSignedUp(true)

              // Switch to login mode
              setIsLogin(true)
            }
          })
        } else {
          return res.json().then((data) => {
            let errorMesssage = "Authentication Failed!"
            if (data && data.error && data.error.message) {
              errorMesssage = data.error.message
            }
            setErrorMessage(errorMessage)
            alert(errorMesssage)
          })
        }
      })
      .catch((error) => {
        setIsLoading(false)
        setErrorMessage("Something went wrong!")
        alert("Something went wrong!")
      })
  }

  return (
    <section>
      <form onSubmit={submitHandler}>
        <div className="auth">
          <h1>{isLogin ? "Sign in to your account" : "Create an Account"}</h1>
          <div className="control">
            <label htmlFor="email">Email</label>
            <input
              type="email"
              id="email"
              placeholder="m@example.com"
              required
              ref={emailInputRef}
              autoComplete="off" // Prevent browser from auto-filling
            />
          </div>
          <div className="control">
            <label htmlFor="password">Password</label>
            <input
              type="password"
              id="password"
              placeholder="••••••••"
              required
              ref={passwordInputRef}
              autoComplete="new-password" // Prevent browser from auto-filling
            />
          </div>

          {!isLogin && ( // Added Confirm Password field only for Sign Up
            <div className="control">
              <label htmlFor="confirmPassword">Confirm Password</label>
              <input
                type="password"
                id="confirmPassword"
                placeholder="••••••••"
                required
                ref={confirmPasswordInputRef} // Added ref for confirm password
                autoComplete="new-password" // Prevent browser from auto-filling
              />
            </div>
          )}

          {isLogin && (
            <div className="forgot-password">
              <a onClick={() => navigate("/forgot-password")}>Forgot your password?</a>
            </div>
          )}

          <div className="actions">
            {!isLoading && <button>{isLogin ? "Sign In" : "Sign Up"}</button>}
            {isLoading && <p>Sending Request...</p>}

            {/* Toggle text moved here, directly below the button */}
            <div className="toggle-text">
              {isLogin ? (
                <p>
                  Don't have an account?{" "}
                  <span type="button" className="toggle" onClick={switchAuthModeHandler}>
                    Create here
                  </span>
                </p>
              ) : (
                <p>
                  Already have an account?{" "}
                  <span type="button" className="toggle" onClick={switchAuthModeHandler}>
                    Sign in here
                  </span>
                </p>
              )}
            </div>
          </div>
        </div>
      </form>
    </section>
  )
}

export default SignUp









// import { useState, useRef, useContext } from 'react';

// import './SignUp.css';
// import { useNavigate } from 'react-router-dom';
// import AuthContext from '../../context/AuthContext';

// const SignUp = () => {
//   const emailInputRef = useRef();
//   const passwordInputRef = useRef();
//   const confirmPasswordInputRef = useRef();

//   const authCtx = useContext(AuthContext);
//   const navigate = useNavigate(); // Initialized useNavigate

//   const [isLogin, setIsLogin] = useState(true);
//   const [isLoading, setIsLoading] = useState(false);
//   const [errorMessage, setErrorMessage] = useState('');
  

//   const switchAuthModeHandler = () => {
//     setIsLogin((prevState) => !prevState); // Toggle between Login and signUp state
//   };

//   const submitHandler = (e) => {
//     e.preventDefault();

//     const enteredEmail = emailInputRef.current.value;
//     const enteredPassword = passwordInputRef.current.value;
//     const enteredConfirmPassword = confirmPasswordInputRef.current?.value; // Retrieving confirm password value

//     if (!isLogin && enteredPassword !== enteredConfirmPassword) {
//       alert('Passwords do not match!'); // Alert for mismatched passwords
//       return;
//     }

//     setIsLoading(true);
//     setErrorMessage('');
//     //optional: Add Validation

//     let url;
//     if(isLogin){
//       url = 'https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyBTuARjfplXy5aA6LBws6I4kTS42MpEa-A';
//     }
//     else{
//       url = 'https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyBTuARjfplXy5aA6LBws6I4kTS42MpEa-A';
//     }
//       fetch(url,
//         {
//           method: 'POST',
//           body: JSON.stringify({
//             email: enteredEmail,
//             password: enteredPassword,
//             returnSecureToken: true,
//           }),
//           headers: {
//             'Content-Type': 'application/json',
//           },
//         }
//       )
//       .then((res) => {
//         setIsLoading(false);
//         if(res.ok){
//           //...
//           return res.json().then((data) =>{
//             // After successful login/signup, calling the login function from context
//             authCtx.login(data.idToken); // Stored the token in AuthContext
//             navigate('/profile') // Redirected to profile page after successful login/signup
//           })
//         }
//         else{
//           return res.json() .then(data => {
//             // //show an error modal
//             // console.log(data);
//             let errorMesssage = 'Authentication Failed!';
//             if(data && data.error && data.error.message){
//               errorMesssage = data.error.message
//             }
//             setErrorMessage(errorMessage);
//             alert(errorMesssage);
//           })
//         }
//       })
//       .catch((error) => {
//         setIsLoading(false);
//         setErrorMessage('Something went wrong!'); // Handled network errors
//         alert('Something went wrong!'); // Alert for network errors
//     });
//   };

//   return (

//     <section >
//       <form onSubmit={submitHandler}>
//       <div className= 'auth'>
//       <h1>{isLogin ? 'Login' : 'Sign Up'}</h1>
//         <div className='control'>
//           <label htmlFor='email'>Your Email</label>
//           <input type='email' id='email' required ref={emailInputRef}/>
//         </div>
//         <div className='control'>
//           <label htmlFor='password'>Your Password</label>
//           <input type='password' id='password' required ref={passwordInputRef}/>
//         </div>
        
//         {!isLogin && ( // Added Confirm Password field only for Sign Up
//           <div className="control">
//             <label htmlFor="confirmPassword">Confirm Password</label>
//             <input
//               type="password"
//               id="confirmPassword"
//               required
//               ref={confirmPasswordInputRef} // Added ref for confirm password
//             />
//           </div>
//         )}

//         {/* Forgot Password Link added */}
//         {isLogin && (
//           <div className="forgot-password">
//               <a 
//                 onClick={() => navigate('/forgot-password')} // Navigating to Forgot Password page on click
//               >
//                 Forgot Password?
//               </a>
//           </div>
//         )}
        
    
//         <div className='actions'>
//           {!isLoading && <button>{isLogin ? 'Login' : 'Create Account'}</button>}
//           {isLoading && <p>Sending Request...</p>}
//           <button
//             type='button'
//             className='toggle'
//             onClick={switchAuthModeHandler}
//           />
//         </div>
//         </div>

//         <div className="submit">
//           <p>
//             {isLogin ? (
//               <>
//                 Don’t have an account?{' '}
//                 <button type="button" className="toggle" onClick={switchAuthModeHandler}>
//                   Create Here
//                 </button>
//               </>
//             ) : (
//               <>
//                 Already have an account?{' '}
//                 <button type="button" className="toggle" onClick={switchAuthModeHandler}>
//                   Login Here
//                 </button>
//               </>
//             )}
//           </p>
//         </div>

//       </form>
//     </section>
//   );
// };

// export default SignUp;