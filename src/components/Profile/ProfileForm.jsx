/* eslint-disable react/prop-types */
import { useRef } from 'react';

import { useSelector } from 'react-redux';

import axios from 'axios';

export default function ProfileForm(props) {
  const nameRef = useRef();
  const photoRef = useRef();

  const jwtToken = useSelector((state) => state.authState.jwtToken);

  function handleFormSubmit(event) {
    event.preventDefault();

    axios
      .post(
        'https://identitytoolkit.googleapis.com/v1/accounts:update?key=AIzaSyAbUy5evKN-VSMQp6pan71s_ydy5W0gD_s',
        {
          idToken: jwtToken,
          displayName: nameRef.current.value,
          photoUrl: photoRef.current.value,
        }
      )
      .then((response) => {
        props.onUpdateProfile(nameRef.current.value, photoRef.current.value);
      })
      .catch((error) => {
        console.log(error);
      });
  }

  return (
    <form
      className="w-full flex flex-col gap-4 p-4 bg-gray-900 text-white rounded-lg shadow-md"
      onSubmit={handleFormSubmit}
    >
      <div className="mb-2">
        <label
          className="block text-sm font-semibold"
          htmlFor="name"
        >
          Full Name
        </label>
        <input
          className="border rounded border-teal-500 p-2 mt-2 w-full bg-gray-800"
          type="text"
          id="name"
          defaultValue={props.name}
          ref={nameRef}
        />
      </div>

      <div className="mb-2">
        <label
          className="block text-sm font-semibold"
          htmlFor="photo"
        >
          Profile Photo URL
        </label>
        <input
          className="border rounded border-teal-500 p-2 mt-2 w-full bg-gray-800"
          type="url"
          id="photo"
          defaultValue={props.photo}
          ref={photoRef}
        />
      </div>

      <div className="flex justify-end gap-2">
        <button
          className="px-4 py-2 border rounded bg-teal-600 text-white hover:bg-teal-500"
          type="submit"
        >
          Update
        </button>

        <button
          className="px-4 py-2 border rounded bg-red-600 text-white hover:bg-red-500"
          type="button"
          onClick={() => {
            props.onCloseForm();
          }}
        >
          Cancel
        </button>
      </div>
    </form>
  );
}
