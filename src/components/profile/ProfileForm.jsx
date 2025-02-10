import React, { useContext, useEffect, useState } from 'react';
import './ProfileForm.css';
import AuthContext from '../../context/AuthContext';

const ProfileForm = ({ closeForm }) => {

  const [fullName, setFullName] = useState('');
  const [profilePhotoUrl, setProfilePhotoUrl] = useState('');
  const authCtx = useContext(AuthContext); // Accessing the auth context to get the logged in user token id

  // Fetching existing user data when the component mounts
  useEffect(() => {
    if (authCtx.token) {
      // Optionally fetching user data from Firebase if needed
      setFullName(authCtx.fullName || ''); // Using authCtx data if available
      setProfilePhotoUrl(authCtx.profilePhotoUrl || '');
    }
  }, [authCtx.token]);

  const handleCancel = () => {
    alert('Cancelled');  // Show the alert message
    closeForm();         // Close the form
  };

  const handleUpdate = (e) => {
    e.preventDefault();

    // Handling the update logic here
    if (!authCtx.token) {
      alert('No valid token found. Please log in again.');
      return;
    }

    //sending the updated data to the firebase database
    fetch('https://identitytoolkit.googleapis.com/v1/accounts:update?key=AIzaSyAbUy5evKN-VSMQp6pan71s_ydy5W0gD_s', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        idToken: authCtx.token, // Using the logged in user token
        displayName: fullName, // Sending the fullName to update
        photoURL: profilePhotoUrl, // Sending the profilePhotoUrl to update
      }),
    })

    .then((res) => res.json())
    .then((data) => {
      if(data.error){
        alert(data.error.message);
      }
      else{
        console.log('Profile updated successfully:', data);
        alert('Profile Updated Successfully'); // Shows the success message
      }
    })
    .catch((error) => {
      console.error('Error updating profile:', error);
      alert('Error updating profile');
    });
  };

  return (
    <div className="profile-form">
      <div className="form-header">
        <h1>Contact Details</h1>
        <button className="cancel" type="button" onClick={(handleCancel)}>Cancel</button>
      </div>
      <form onSubmit={handleUpdate}>
        <div className="form-row">
          <label htmlFor="fullName">Full Name:</label>
          <input type="text" id="fullName" placeholder="Enter your name"  value={fullName}
            onChange={(e) => setFullName(e.target.value)} required/>
        </div>

        <div className="form-row">
          <label htmlFor="profilePhotoUrl">Profile Photo URL:</label>
          <input type="url" id="profilePhotoUrl" placeholder="Enter your profile photo URL" value={profilePhotoUrl}
            onChange={(e) => setProfilePhotoUrl(e.target.value)} />
        </div>

        <button className='submit' type="submit">Update</button>
      </form>
    </div>
  );
};

export default ProfileForm;