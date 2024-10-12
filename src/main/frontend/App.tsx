import React from 'react';
import { Routes, Route } from 'react-router-dom';
import CameraView from './views/CameraView';
import "./main.css";
import LoginView from "Frontend/views/Login";
import RegisterView from "Frontend/views/Register";
import HomeView from "Frontend/views/Home";
import CartView from "Frontend/views/CartView";
// Import other views as needed

const App: React.FC = () => {
    return (
        <Routes>
            <Route path="/" element={<HomeView />} />
            <Route path="/product" element={<CameraView />} />
            {/* Add other routes as needed */}
            <Route path="/login" element={<LoginView />} />
            <Route path="/register" element={<RegisterView />} />
            <Route path="/cart" element={<CartView />} />
        </Routes>
    );
};

export default App;