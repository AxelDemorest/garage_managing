import React from 'react';
import {BrowserRouter, Route, Routes} from "react-router-dom";
import Dashboard from "../views/Dashboard/Dashboard";
import Sandbox from "../views/Sandbox/Sandbox";
import UsersList from "../views/Users/UsersList/UsersList";
import Login from "../views/Login/Login";
import ProtectedRoute from "../components/ProtectedRoute/ProtectedRoute";
import ChangePassword from "../views/ChangePassword/ChangePassword";
import Home from "../views/Home/Home";

const Router = () => {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<ProtectedRoute component={Home} />} />
                <Route path="/dashboard" element={<ProtectedRoute component={Dashboard} />} />
                <Route path="/sandbox" element={<ProtectedRoute component={Sandbox} />} />
                <Route path="/users" element={<ProtectedRoute component={UsersList} />} />
                <Route path="/change-password" element={<ChangePassword/>} />
                <Route path="/login" element={<Login />} />
            </Routes>
        </BrowserRouter>
    );
};

export default Router;
