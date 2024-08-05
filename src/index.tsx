import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import ReactDOM from 'react-dom/client';
import App from './app/app';
import { store } from './store';
import { fetchGoodsAction } from './store/api-actions';
import ErrorMessage from './components/error-message/error-message';
import { Provider } from 'react-redux';
import {ToastContainer} from 'react-toastify';

store.dispatch(fetchGoodsAction());

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);

root.render(
  <React.StrictMode>
    <Provider store={store}>
      <BrowserRouter>
        <ToastContainer autoClose = {2000}/>
        <ErrorMessage />
        <App />
      </BrowserRouter>
    </Provider>
  </React.StrictMode>
);
