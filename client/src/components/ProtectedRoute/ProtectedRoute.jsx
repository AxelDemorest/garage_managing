import React, {useContext} from "react";
import {Navigate} from "react-router-dom";
import jwt_decode from "jwt-decode";
import {AuthContext} from "../../context/AuthContext";

const ProtectedRoute = ({ component: Component, ...props }) => {
    const { token } = useContext(AuthContext);
    let isAuthenticated = false;

    if (token) {
        try {
            const decodedToken = jwt_decode(token);
            isAuthenticated = decodedToken?.exp > new Date().getTime() / 1000;
        } catch (error) {
            console.error('Failed to decode token: ', error);
        }
    }

    return isAuthenticated ? <Component {...props} /> : <Navigate to="/login" replace />;
};

export default ProtectedRoute;
