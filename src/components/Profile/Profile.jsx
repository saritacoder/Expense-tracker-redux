import { useEffect, useCallback, useState } from 'react';

import { useSelector } from 'react-redux';

import axios from 'axios';

import ProfileForm from './ProfileForm';
import Modal from '../UI/Modal';
import DataLoader from '../UI/DataLoader';

export default function Profile() {
  const [name, setName] = useState();
  const [photo, setPhoto] = useState();

  const jwtToken = useSelector((state) => state.authState.jwtToken);

  const [editProfile, setEditProfile] = useState(false);
  const [emailVerified, setEmailVerified] = useState(true);

  const [dataLoader, setDataLoader] = useState(false);
  const [showModal, setShowModal] = useState(false);

  const fetchData = useCallback(async () => {
    setDataLoader(true);
    try {
      const response = await fetch(
        'https://identitytoolkit.googleapis.com/v1/accounts:lookup?key=AIzaSyAbUy5evKN-VSMQp6pan71s_ydy5W0gD_s',
        {
          method: 'POST',
          body: JSON.stringify({ idToken: jwtToken }),
          headers: {
            'Content-Type': 'application/json',
          },
        }
      );

      const data = await response.json();

      if (response.ok) {
        setEmailVerified(data.users[0].emailVerified);

        if (data.users[0].displayName) {
          setName(data.users[0].displayName);
        }

        if (data.users[0].photoUrl) {
          setPhoto(data.users[0].photoUrl);
        }
      } else {
        throw new Error(data.error.message);
      }
    } catch (error) {
      console.log(error.message);
    }
    setDataLoader(false);
  }, [jwtToken]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  function handleUpdateProfile(newName, newPhoto) {
    setName(newName);
    setPhoto(newPhoto);
    setEditProfile(false);
  }

  return (
    <section className="mt-16">
      {!dataLoader && (
        <>
          <div>
            <div className="flex justify-between items-center gap-4 bg-gray-800 text-white p-4 rounded-lg shadow-md">
              <h1 className="font-semibold text-lg">Welcome {name}</h1>
              {(!name || !photo) && (
                <div className="text-sm border border-teal-500 rounded-3xl px-4 py-1 text-center">
                  <p>Your profile is incomplete! Complete now...</p>
                </div>
              )}
            </div>
          </div>
          <div className="mt-4">
            {!emailVerified && (
              <div className="text-center">
                <button
                  className="text-white rounded bg-teal-600 hover:bg-teal-500 px-4 py-2"
                  onClick={() => {
                    axios.post(
                      'https://identitytoolkit.googleapis.com/v1/accounts:sendOobCode?key=AIzaSyAbUy5evKN-VSMQp6pan71s_ydy5W0gD_s',
                      {
                        requestType: 'VERIFY_EMAIL',
                        idToken: jwtToken,
                      }
                    );
                    setShowModal(true);
                  }}
                >
                  Verify Email
                </button>
              </div>
            )}

            <div className="flex flex-col items-center gap-4 mt-4 w-11/12 m-auto border border-teal-500 rounded-lg p-4 shadow-lg sm:w-96">
              <h1 className="text-xl p-2 w-full bg-teal-700 text-white text-center font-semibold rounded-lg">
                Your Profile
              </h1>
              <div className="w-48">
                {photo ? (
                  <img className="rounded-full shadow-md" src={photo} alt="Profile pic" />
                ) : (
                  <img
                    className="rounded-full shadow-md"
                    src="https://cdn-icons-png.flaticon.com/512/149/149071.png"
                    alt="Profile pic"
                  />
                )}
              </div>
              <h1 className="ml-2 text-3xl font-medium text-teal-200">
                {name}
              </h1>

              {!editProfile ? (
                <button
                  className="bg-teal-600 w-full text-white py-2 hover:bg-teal-500 rounded-lg"
                  type="button"
                  onClick={() => setEditProfile(true)}
                >
                  Edit Profile
                </button>
              ) : (
                <ProfileForm
                  name={name}
                  photo={photo}
                  onUpdateProfile={handleUpdateProfile}
                  onCloseForm={() => setEditProfile(false)}
                />
              )}
            </div>
          </div>
        </>
      )}
      {showModal && (
        <Modal
          title="Success"
          message="Verification link has been sent to your email."
          onClick={() => setShowModal(false)}
        />
      )}
      {dataLoader && (
        <div className="flex justify-center mt-40">
          <DataLoader />
        </div>
      )}
    </section>
  );
}
