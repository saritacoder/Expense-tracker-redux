"use client"

import { useContext, useEffect, useState } from "react"
import "./Profile.css"
import ProfileForm from "./ProfileForm"
import AuthContext from "../../context/AuthContext"

const Profile = () => {
  const [updateProfile, setUpdateProfile] = useState(false)
  const [isEmailVerified, setIsEmailVerified] = useState(false)
  const [profileData, setProfileData] = useState({
    fullName: "",
    profilePhotoUrl: "",
  })
  const authCtx = useContext(AuthContext)

  // Fetch user profile data when component mounts
  useEffect(() => {
    if (authCtx.token) {
      fetchUserProfile()
    }
  }, [authCtx.token])

  const fetchUserProfile = async () => {
    try {
      const response = await fetch(
        "https://identitytoolkit.googleapis.com/v1/accounts:lookup?key=AIzaSyBx_2sgp49gkpcY_Tn1spEFAw3TbjqZHi4",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            idToken: authCtx.token,
          }),
        },
      )

      const data = await response.json()

      if (response.ok && data.users && data.users[0]) {
        const user = data.users[0]
        console.log("Profile data fetched:", user) // Debug log
        setProfileData({
          fullName: user.displayName || "",
          profilePhotoUrl: user.photoUrl || "",
        })
        setIsEmailVerified(user.emailVerified || false)
      } else {
        console.error("Error in profile data:", data.error)
        if (data.error && data.error.message === "INVALID_ID_TOKEN") {
          alert("Your session has expired. Please log in again.")
          authCtx.logout()
        }
      }
    } catch (error) {
      console.error("Error fetching user profile:", error)
    }
  }

  const handleCompleteProfile = () => {
    setUpdateProfile(true)
  }

  // Function to update profile data directly from the form
  const updateProfileData = (name, photoUrl) => {
    setProfileData({
      fullName: name,
      profilePhotoUrl: photoUrl,
    })
  }

  const closeForm = () => {
    setUpdateProfile(false)
    // We don't need to fetch profile data again since we're updating it directly
  }

  const sendVerificationEmail = async () => {
    try {
      if (!authCtx.token) {
        alert("You need to be logged in to verify your email. Please log in again.")
        authCtx.logout()
        return
      }

      try {
        await refreshUserToken()
      } catch (refreshError) {
        console.log("Token refresh failed, will try with existing token")
      }

      const response = await fetch(
        "https://identitytoolkit.googleapis.com/v1/accounts:sendOobCode?key=AIzaSyBx_2sgp49gkpcY_Tn1spEFAw3TbjqZHi4",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            requestType: "VERIFY_EMAIL",
            idToken: authCtx.token,
          }),
        },
      )

      const data = await response.json()

      if (response.ok) {
        alert("Verification email sent! Please check your inbox.")
      } else {
        if (data.error && data.error.message === "INVALID_ID_TOKEN") {
          alert("Your session has expired. Please log in again.")
          authCtx.logout()
        } else {
          throw new Error(data.error.message || "Failed to send verification email")
        }
      }
    } catch (error) {
      console.error("Error sending email verification:", error.message)
      alert(`Error: ${error.message}`)
    }
  }

  const refreshUserToken = async () => {
    try {
      const userEmail = localStorage.getItem("userEmail")
      const userPassword = localStorage.getItem("userPassword")

      if (!userEmail || !userPassword) {
        throw new Error("No stored credentials")
      }

      const response = await fetch(
        "https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyBx_2sgp49gkpcY_Tn1spEFAw3TbjqZHi4",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            email: userEmail,
            password: userPassword,
            returnSecureToken: true,
          }),
        },
      )

      const data = await response.json()

      if (response.ok && data.idToken) {
        authCtx.login(data.idToken)
        return data.idToken
      } else {
        throw new Error(data.error?.message || "Failed to refresh token")
      }
    } catch (error) {
      console.error("Error refreshing token:", error)
      throw error
    }
  }

  const defaultProfileImage = "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png"

  return (
    <div className="profile-container">
      <div className="profile-header">
        <div className="profile-welcome">Welcome {profileData.fullName ? profileData.fullName : ""}</div>
        <div className="profile-update">
          Your profile is incomplete!
          <a onClick={handleCompleteProfile}>Complete now...</a>
        </div>
      </div>

      <div className="verify-email-container">
        <button className="email-verification" onClick={sendVerificationEmail}>
          Verify Email
        </button>
      </div>

      {updateProfile ? (
        <ProfileForm closeForm={closeForm} initialData={profileData} updateProfileData={updateProfileData} />
      ) : (
        <div className="profile-card">
          <div className="profile-card-header">Your Profile</div>
          <div className="profile-card-content">
            <img
              src={profileData.profilePhotoUrl || defaultProfileImage}
              alt="Profile"
              className="profile-image"
              onError={(e) => {
                e.target.onerror = null
                e.target.src = defaultProfileImage
              }}
            />
            {profileData.fullName && <div className="profile-name">{profileData.fullName}</div>}
            <button className="edit-profile-btn" onClick={handleCompleteProfile}>
              Edit Profile
            </button>
          </div>
        </div>
      )}
    </div>
  )
}

export default Profile







// import React, { useContext, useEffect, useState } from 'react';
// import './Profile.css';
// import ProfileForm from './ProfileForm';
// import AuthContext from '../../context/AuthContext';

// const Profile = () => {
//   const [updateProfile, setUpdateProfile] = useState(false); // for handling profile form visibility when complete now button is clicked
//   const [isEmailVerified, setIsEmailVerified] = useState(false); // for handling email verification status
//   const authCtx = useContext(AuthContext); // for accessing auth context

//   //handling email id verification
//   useEffect(() => {
    
//     //Checking if email is verified or not
//     if (authCtx.emailVerified) {
//       setIsEmailVerified(true);
//     }
//     else{
//       setIsEmailVerified(false);
//     }
//   }, [authCtx.emailVerified]);

//   const handleCompleteProfile = () => {
//     setUpdateProfile(true);  // Showing the form when "Complete Now" is clicked
//   };

//   const closeForm = () => {
//     setUpdateProfile(false);  // Hiding the form when "Cancel" button is clicked
//   };


//   //handling sending of verification message to user's email
//   const sendVerificationEmail = async () => {
//     try {
//       const response = await fetch(
//         'https://identitytoolkit.googleapis.com/v1/accounts:sendOobCode?key=AIzaSyBTuARjfplXy5aA6LBws6I4kTS42MpEa-A',
//         {
//           method: 'POST',
//           headers: {
//             'Content-Type': 'application/json',
//           },
//           body: JSON.stringify({
//             requestType: 'VERIFY_EMAIL',
//             idToken: authCtx.token, // token is obtained from auth context
//           }),
//         }
//       );

//       const data = await response.json();

//       if(response.ok){
//         alert('Verification email sent! Please check your inbox.');
//       }
//       else{
//         throw new Error(data.error.message || 'Failed to send verification email');
//       }
//     } 
//     catch (error) {
//       console.error('Error sending email verification:', error.message);
//       alert(`Error: ${error.message}`);
//     }
//   };

//   return (
//     <div>
//       <div className="profile-header">
//         <div className="profile-container">
//           <h1 className="profile-head">
//             {updateProfile ? "Winners never quit, Quitters never win." : "Welcome to Expense Tracker !!!"}
//           </h1>
//           <div className="profile-update">
//             {updateProfile 
//               ? (
//                 <span>
//                   Your profile is <span className="bold-text">64%</span> complete. A complete Profile has higher chances of landing a job.
//                 </span>
//               )
//               : "Your Profile is incomplete."}
//              <a onClick={handleCompleteProfile}>Complete Now</a>
//           </div>
//         </div>
//       </div>

//       {/* Email verification section */}
//       {!isEmailVerified && (
//         <button className='email-verification' onClick={sendVerificationEmail}>Verify Email</button>
//       )}

//       {/* Conditionally rendering ProfileForm */}
//       {updateProfile && <ProfileForm closeForm = {closeForm} />}
//     </div>
//   );
// };

// export default Profile;

