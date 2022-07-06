import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import 'antd/dist/antd.css'
import './lang'
import store from './redux/store'
import {Provider} from 'react-redux'
import axios from "axios";

axios.defaults.headers['x-icode'] = 'qKhDxI15yz'

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
  <React.StrictMode>
    <Provider store={store}>
      <App/>
    </Provider>
  </React.StrictMode>
);
