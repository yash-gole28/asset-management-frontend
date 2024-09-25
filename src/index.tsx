import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { Toaster } from 'react-hot-toast';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
  <React.StrictMode>
     <Toaster
        position="top-center"
        reverseOrder={false}
        gutter={8}
        containerClassName=""
        containerStyle={{}}
        toastOptions={{
          className: '',
          duration: 2000,
          style: {
            background: '#363636',
            color: '#fff',
          },
          // Default options for specific types
          success: {
            duration: 1000,
            style: {
              background: 'rgb(71, 192, 71)',
              color: 'white',
            },
          },
          error: {
            duration: 1000,
            style: {
              background: 'rgb(243, 93, 93)',
              color: 'white',
            },
          },
        }}
      />
    <App />
  </React.StrictMode>
);

reportWebVitals();
