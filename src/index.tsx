import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { Toaster } from 'react-hot-toast';
import { MyProvider } from './Context/AuthContext';
import { BrowserRouter } from 'react-router-dom';


const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
  <React.StrictMode>
    <BrowserRouter>

      <Toaster
        position="bottom-right"
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
      <MyProvider>

        <App />
      </MyProvider>
    </BrowserRouter>
  </React.StrictMode>
);

reportWebVitals();