import React from 'react';
import styles from './App.module.scss'
import {BrowserRouter, Routes, Route, Navigate} from 'react-router-dom'
import {HomePage, LoginPage, RegisterPage, DetailPage, SearchPage} from "./pages";


function App() {
  return (
    <div className={styles.App}>
      <BrowserRouter>
        <Routes>
          <Route index element={<HomePage/>}/>
          <Route path={'/login'} element={<LoginPage/>}/>
          <Route path={'/register'} element={<RegisterPage/>}/>
          <Route path={'/detail/:touristRouteId'} element={<DetailPage/>}/>
          <Route path={'/search/:keywords'} element={<SearchPage/>}/>
          <Route path="/404" element={<h1>404 Page Not Found</h1>}/>
          <Route path={'*'} element={<Navigate replace to="/404"/>}/>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
