// import { defineConfig } from 'vite'
// import react from '@vitejs/plugin-react'

// // https://vite.dev/config/
// export default defineConfig({
//   plugins: [react()],
// })


import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  test: {
    globals: true,          // Enable global test functions like 'describe' and 'it'
    environment: 'jsdom',   // Simulate a browser environment for testing
    setupFiles: './src/setupTests.js', // Path to the setup file
  },
});