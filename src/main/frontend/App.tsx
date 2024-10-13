import React from "react";
import { Route, Routes } from "react-router-dom";
import CameraManagement from "./views/CameraManagement";
import "./main.css";
import LoginView from "Frontend/views/Login";
import RegisterView from "Frontend/views/Register";
import HomeView from "Frontend/views/Home";
import CartDetailView from "Frontend/views/CartDetailView";
import { ToastContainer } from "react-toastify";
import ProtectedRoute from "./components/ProtectedRoute";
import Logout from "./views/Logout";
// Import other views as needed

const App: React.FC = () => {
    return (
        <Routes>
            <Route path="/" element={<HomeView />} />
            {/* Add other routes as needed */}
            <Route path="/login" element={<LoginView />} />
            <Route path="/register" element={<RegisterView />} />
            <Route path="/cart" element={<CameraManagement />} />
            <Route path="/cart/:id" element={<CartDetailView />} />
            <Route element={<ProtectedRoute/>}>
              <Route path="/camera_management" element={<CameraManagement />} />
              <Route path="/logout" element={<Logout />} />
            </Route>

            <ToastContainer />
        </Routes>
    );
};

export default App;
