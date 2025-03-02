/* eslint-disable react/prop-types */
import styles from './Style.module.css';
import { createPortal } from 'react-dom';

export default function Modal(props) {
  return (
    <>
      {createPortal(
        <div
          className="h-screen w-screen fixed bg-black bg-opacity-40 z-[100] transition-opacity"
          onClick={() => props.onClick()}
        ></div>,
        document.getElementById('overlay')
      )}
      {createPortal(
        <div
          className={`${styles['custom-style']} p-6 bg-gray-900 rounded-lg w-[80%] sm:w-[25rem] fixed z-[1000] left-2/4 top-1/4 -translate-x-2/4 overflow-hidden dark:bg-slate-800`}
        >
          <header className="font-semibold">
            <h1 className="text-base text-teal-400">
              {props.title}
            </h1>
          </header>
          <section className="mt-4">
            <p className="text-sm text-gray-300">
              {props.message}
            </p>
          </section>
          <footer className="mt-4 text-right">
            <button
              className="px-3 py-1 text-white font-semibold rounded-md bg-red-600 hover:bg-red-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
              onClick={() => props.onClick()}
            >
              Close
            </button>
          </footer>
        </div>,
        document.getElementById('overlay')
      )}
    </>
  );
}
