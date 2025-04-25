"use client"

import { useContext, useState } from "react"
import "./ProfileForm.css"
import AuthContext from "../../context/AuthContext"

const ProfileForm = ({ closeForm, initialData, updateProfileData }) => {
  const [fullName, setFullName] = useState(initialData?.fullName || "")
  const [profilePhotoUrl, setProfilePhotoUrl] = useState(initialData?.profilePhotoUrl || "")
  const [isSubmitting, setIsSubmitting] = useState(false)
  const authCtx = useContext(AuthContext)

  const handleSubmit = async (e) => {
    e.preventDefault()
    setIsSubmitting(true)

    try {
      const response = await fetch(
        "https://identitytoolkit.googleapis.com/v1/accounts:update?key=AIzaSyBx_2sgp49gkpcY_Tn1spEFAw3TbjqZHi4",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            idToken: authCtx.token,
            displayName: fullName,
            photoUrl: profilePhotoUrl,
            returnSecureToken: true,
          }),
        },
      )

      const data = await response.json()

      if (response.ok) {
        alert("Profile updated successfully!")

        // Update the parent component's state directly
        updateProfileData(fullName, profilePhotoUrl)

        closeForm()
      } else {
        throw new Error(data.error.message || "Failed to update profile")
      }
    } catch (error) {
      console.error("Error updating profile:", error)
      alert(`Error: ${error.message}`)
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <div className="profile-card">
      <div className="profile-card-header">Your Profile</div>
      <div className="profile-card-content">
        {initialData?.profilePhotoUrl && (
          <img src={initialData.profilePhotoUrl || "/placeholder.svg"} alt="Profile" className="profile-image" />
        )}
        {initialData?.fullName && <div className="profile-name">{initialData.fullName}</div>}

        <form className="profile-form" onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="fullName">Full Name</label>
            <input
              type="text"
              id="fullName"
              className="form-control"
              value={fullName}
              onChange={(e) => setFullName(e.target.value)}
              placeholder="Enter your full name"
            />
          </div>

          <div className="form-group">
            <label htmlFor="profilePhotoUrl">Profile Photo URL</label>
            <input
              type="url"
              id="profilePhotoUrl"
              className="form-control"
              value={profilePhotoUrl}
              onChange={(e) => setProfilePhotoUrl(e.target.value)}
              placeholder="https://example.com/photo.jpg"
            />
          </div>

          <div className="form-buttons">
            <button type="button" className="cancel-btn" onClick={closeForm}>
              Cancel
            </button>
            <button type="submit" className="update-btn" disabled={isSubmitting}>
              {isSubmitting ? "Updating..." : "Update"}
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}

export default ProfileForm







// import React, { useContext, useEffect, useState } from 'react';
// import './ProfileForm.css';
// import AuthContext from '../../context/AuthContext';

// const ProfileForm = ({ closeForm }) => {

//   const [fullName, setFullName] = useState('');
//   const [profilePhotoUrl, setProfilePhotoUrl] = useState('');
//   const authCtx = useContext(AuthContext); // Accessing the auth context to get the logged in user token id

//   // Fetching existing user data when the component mounts
//   useEffect(() => {
//     if (authCtx.token) {
//       // Optionally fetching user data from Firebase if needed
//       setFullName(authCtx.fullName || ''); // Using authCtx data if available
//       setProfilePhotoUrl(authCtx.profilePhotoUrl || '');
//     }
//   }, [authCtx.token]);

//   const handleCancel = () => {
//     alert('Cancelled');  // Show the alert message
//     closeForm();         // Close the form
//   };

//   const handleUpdate = (e) => {
//     e.preventDefault();

//     // Handling the update logic here
//     if (!authCtx.token) {
//       alert('No valid token found. Please log in again.');
//       return;
//     }

//     //sending the updated data to the firebase database
//     fetch('https://identitytoolkit.googleapis.com/v1/accounts:update?key=AIzaSyBTuARjfplXy5aA6LBws6I4kTS42MpEa-A', {
//       method: 'POST',
//       headers: {
//         'Content-Type': 'application/json',
//       },
//       body: JSON.stringify({
//         idToken: authCtx.token, // Using the logged in user token
//         displayName: fullName, // Sending the fullName to update
//         photoURL: profilePhotoUrl, // Sending the profilePhotoUrl to update
//       }),
//     })

//     .then((res) => res.json())
//     .then((data) => {
//       if(data.error){
//         alert(data.error.message);
//       }
//       else{
//         console.log('Profile updated successfully:', data);
//         alert('Profile Updated Successfully'); // Shows the success message
//       }
//     })
//     .catch((error) => {
//       console.error('Error updating profile:', error);
//       alert('Error updating profile');
//     });
//   };

//   return (
//     <div className="profile-form">
//       <div className="form-header">
//         <h1>Contact Details</h1>
//         <button className="cancel" type="button" onClick={(handleCancel)}>Cancel</button>
//       </div>
//       <form onSubmit={handleUpdate}>
//         <div className="form-row">
//           <label htmlFor="fullName">Full Name:</label>
//           <input type="text" id="fullName" placeholder="Enter your name"  value={fullName}
//             onChange={(e) => setFullName(e.target.value)} required/>
//         </div>

//         <div className="form-row">
//           <label htmlFor="profilePhotoUrl">Profile Photo URL:</label>
//           <input type="url" id="profilePhotoUrl" placeholder="Enter your profile photo URL" value={profilePhotoUrl}
//             onChange={(e) => setProfilePhotoUrl(e.target.value)} />
//         </div>

//         <button className='submit' type="submit">Update</button>
//       </form>
//     </div>
//   );
// };

// export default ProfileForm;
