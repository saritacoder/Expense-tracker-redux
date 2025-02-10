// import { useState, useRef } from 'react';

// import './ForgotPassword.css';
// import { Link } from 'react-router-dom';

// const ForgotPassword = () => {
//   const [email, setEmail] = useState('');
//   const [isLoading, setIsLoading] = useState(false);
//   const [message, setMessage] = useState('');
//   const [showMessage, setShowMessage] = useState(false); // State for controling visibility of the message box
//   const emailRef = useRef();

//   const handlePasswordReset = (e) => {
//     e.preventDefault();
//     setIsLoading(true); // Start loading state

//     fetch(
//         'https://identitytoolkit.googleapis.com/v1/accounts:sendOobCode?key=AIzaSyBTuARjfplXy5aA6LBws6I4kTS42MpEa-A',
//         {
//             method: 'POST',
//             headers: {
//                 'Content-Type': 'application/json',
//             },
//             body: JSON.stringify({
//                 requestType: 'PASSWORD_RESET',
//                 email: emailRef.current.value
//             }),
//         }
//     )
//     .then((res) => {
//         if (!res.ok) {
//           return res.json().then((errorData) => {
//             throw new Error(errorData.error.message || 'Failed to send reset email');
//           });
//         }
//         return res.json();
//       })
//       .then((data) => {
//         setMessage('Password reset email sent!'); // Setting success message
//         setShowMessage(true); // Showing message box
//         setIsLoading(false); // Stop loading
//       })
//       .catch((error) => {
//         setMessage(`Error: ${error.message}`); // Setting error message
//         setShowMessage(true); // Showing message box
//         setIsLoading(false); // Stop loading
//       });
//   };

//   //function for closing message box
//   const closeMessage = () => {
//     setShowMessage(false); // Closing the flash message
//   };

//   return (
//     <div className="forgot-password-container">

//     {/* Handling Flash message */}
//         {showMessage && (
//           <>
//             <div className="overlay" onClick={closeMessage} />
//             <div className="flash-message">
//               <h2 className={`flash-heading ${message.toLowerCase().includes('error') ? 'failure' : 'success'}`}>
//                 {message.toLowerCase().includes('error') ? 'Failure' : 'Success'}
//               </h2>
//               <p>{message}</p>
//               <button className="close-button" onClick={closeMessage}>Close</button>
//             </div>
//           </>
//         )}

//       <div className="forgot-password-header">
//         <h2>Forgot Password</h2>
//       </div>
//       <div className="forgot-password-form-container">
//         <form className="forgot-password-form" onSubmit={handlePasswordReset}>
//           <div className="form-group">
//             <label htmlFor="email">Enter your email address:</label>
//             <input type="email" id="email" value={email}
//               onChange={(e) => setEmail(e.target.value)} // Updates email state
//               required ref={emailRef}
//               className="input-field"
//             />
//           </div>

//           <button type="submit" className="submit-button" disabled={isLoading}>
//             {isLoading ? 'Sending...' : 'Send Link'}
//           </button>

//         </form>
        
//         <div className="form-footer">
//           <p>
//             Know your password?{' '}
//             <Link to="/login" className="login-link">
//               Login here
//             </Link>
//           </p>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default ForgotPassword;








import { useState, useRef } from 'react';
import { Link } from 'react-router-dom';
import './ForgotPassword.css';

const ForgotPassword = () => {
  const [email, setEmail] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [message, setMessage] = useState('');
  const [showMessage, setShowMessage] = useState(false);
  const emailRef = useRef();

  const handlePasswordReset = (e) => {
    e.preventDefault();
    setIsLoading(true);

    fetch(
      'https://identitytoolkit.googleapis.com/v1/accounts:sendOobCode?key=AIzaSyBTuARjfplXy5aA6LBws6I4kTS42MpEa-A',
      {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          requestType: 'PASSWORD_RESET',
          email: emailRef.current.value,
        }),
      }
    )
      .then((res) => {
        if (!res.ok) {
          return res.json().then((errorData) => {
            throw new Error(errorData.error.message || 'Failed to send reset email');
          });
        }
        return res.json();
      })
      .then((data) => {
        setMessage('Password reset email sent!');
        setShowMessage(true);
        setIsLoading(false);
      })
      .catch((error) => {
        setMessage(`Error: ${error.message}`);
        setShowMessage(true);
        setIsLoading(false);
      });
  };

  const closeMessage = () => {
    setShowMessage(false);
  };

  return (
    <div className="forgot-password-container">
      {/* Flash Message */}
      {showMessage && (
        <>
          <div className="overlay" onClick={closeMessage} />
          <div className="flash-message">
            <h2 className={`flash-heading ${message.toLowerCase().includes('error') ? 'failure' : 'success'}`}>
              {message.toLowerCase().includes('error') ? 'Failure' : 'Success'}
            </h2>
            <p>{message}</p>
            <button className="close-button" onClick={closeMessage}>
              Close
            </button>
          </div>
        </>
      )}

      {/* Bordered Card Container */}
      <div className="forgot-password-card">
        <div className="forgot-password-header">
          <h2>Forgot Password</h2>
        </div>
        <div className="forgot-password-form-container">
          <form className="forgot-password-form" onSubmit={handlePasswordReset}>
            <div className="form-group">
              <label htmlFor="email">Enter your email address:</label>
              <input
                type="email"
                id="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                ref={emailRef}
                className="input-field"
              />
            </div>
            <button type="submit" className="submit-button" disabled={isLoading}>
              {isLoading ? 'Sending...' : 'Send Link'}
            </button>
          </form>
          <div className="form-footer">
            <p>
              Know your password?{' '}
              <Link to="/login" className="login-link">
                Login here
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ForgotPassword;
