"use client"

import { useState, useRef, useEffect } from "react"
import { Link, useNavigate } from "react-router-dom"
import "./ForgotPassword.css"

const ForgotPassword = () => {
  const [email, setEmail] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const [message, setMessage] = useState("")
  const [showMessage, setShowMessage] = useState(false)
  const emailRef = useRef()
  const navigate = useNavigate()

  // Clear any pre-filled values when component mounts
  useEffect(() => {
    setEmail("")
    if (emailRef.current) emailRef.current.value = ""
  }, [])

  const handlePasswordReset = (e) => {
    e.preventDefault()
    setIsLoading(true)

    fetch(
      "https://identitytoolkit.googleapis.com/v1/accounts:sendOobCode?key=AIzaSyBx_2sgp49gkpcY_Tn1spEFAw3TbjqZHi4",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          requestType: "PASSWORD_RESET",
          email: emailRef.current.value,
        }),
      },
    )
      .then((res) => {
        if (!res.ok) {
          return res.json().then((errorData) => {
            throw new Error(errorData.error.message || "Failed to send reset email")
          })
        }
        return res.json()
      })
      .then((data) => {
        setMessage("Password recovery link has been sent to your email.")
        setShowMessage(true)
        setIsLoading(false)
      })
      .catch((error) => {
        setMessage(`Error: ${error.message}`)
        setShowMessage(true)
        setIsLoading(false)
      })
  }

  const closeMessage = () => {
    setShowMessage(false)
  }

  return (
    <div className="forgot-password-container">
      {/* Flash message */}
      {showMessage && (
        <>
          <div className="overlay" onClick={closeMessage} />
          <div className="flash-message">
            <h2 className="flash-heading success">Success</h2>
            <p>{message}</p>
            <button className="close-button" onClick={closeMessage}>
              Close
            </button>
          </div>
        </>
      )}

      <div className="forgot-password-form-container">
        <div className="forgot-password-header">
          <h2>Forgot Password</h2>
        </div>
        <form className="forgot-password-form" onSubmit={handlePasswordReset}>
          <div className="form-group">
            <label htmlFor="email">Email</label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              ref={emailRef}
              className="input-field"
              placeholder="user@gmail.com"
              autoComplete="off" // Prevent browser from auto-filling
            />
          </div>

          <button type="submit" className="submit-button" disabled={isLoading}>
            {isLoading ? "Sending..." : "Send Verification Link"}
          </button>

          <div className="form-footer">
            <p>
              Remembered your password?{" "}
              <Link to="/login" className="login-link">
                Login here
              </Link>
            </p>
          </div>
        </form>
      </div>
    </div>
  )
}

export default ForgotPassword

