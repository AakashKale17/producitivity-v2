import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import './index.css';
import Home from "./pages/Home";
import Login from "./pages/Login.jsx"
import UploadInfo from "./pages/UploadInfo.jsx"
import Register from "./pages/Register.jsx"
import reportWebVitals from "./reportWebVitals.js"
import { AuthContextProvider } from './context/authContext';

export default function App() {
    return (
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path='/signin' element={<Login />} />
          <Route path='/info' element={<UploadInfo />} />
          <Route path='/register'element={<Register />} />
        </Routes>
      </BrowserRouter>
    );
  }


const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <AuthContextProvider>
    <App />
  </AuthContextProvider>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
