import React from 'react';
import styles from './App.module.scss'
import {BrowserRouter, Routes, Route, Navigate} from 'react-router-dom'
import {HomePage} from "./pages";


function App() {
  return (
    <div className={styles.App}>
      <BrowserRouter>
        <Routes>
          <Route index element={<HomePage/>}/>
          <Route path={'/login'} element={<h1>登录</h1>}/>
          <Route path="/404" element={<h1>404 Page Not Found</h1>}/>
          <Route path={'*'} element={<Navigate replace to="/404"/>}/>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
