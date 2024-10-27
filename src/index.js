import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import 'bootstrap/dist/css/bootstrap.min.css'; 
import $ from 'jquery'; 
import Popper from 'popper.js'; 
import 'bootstrap/dist/js/bootstrap.bundle.min';
import './index.css';
import { Provider } from 'react-redux'; 
import { store } from './redux/store'; 

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  
  //  متنساش يعم احمد Wrap  App in the Provider and pass the store 
  <Provider store={store}>
    <App />
  </Provider>
);

