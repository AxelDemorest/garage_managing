import React, {useContext, useState} from 'react';
import axios from "axios";
import {Alert} from "antd";
import jwt_decode from 'jwt-decode';
import { useNavigate, useLocation } from "react-router-dom";
import { AuthContext } from '../../context/AuthContext';
import * as styled from "./Login.styled";

const Login = () => {
    const navigate = useNavigate();
    const { state } = useLocation();
    const { dispatch } = useContext(AuthContext)
    const [isError, setIsError] = useState(false);
    const [values, setValues] = useState({
        mail: '',
        password: ''
    });

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post(`${import.meta.env.VITE_API_HOST}/api/auth/login`, values);
            const user = jwt_decode(response?.data?.access_token);

            if (!user.confirmed) {
                dispatch({ type: "LOGIN_PENDING", payload: response?.data?.access_token });
                navigate('/change-password');
            } else {
                dispatch({ type: "LOGIN_SUCCESS", payload: response?.data?.access_token });
                navigate(state?.path || "/", { replace: true });
            }

        } catch (err) {
            setIsError(true);
            dispatch({ type: "LOGIN_FAILURE", payload: err.response.data });
        }
    };

    const onChange = (e) => {
        setValues({ ...values, [e.target.name]: e.target.value });
    };

    return (
        <styled.Container>
            <styled.Box>
                <styled.Header>
                    <styled.Title>Se connecter</styled.Title>
                    <styled.Description>Hey, bienvenue sur Garageo, entrez vos identifiants de connexion pour accéder au panel</styled.Description>
                </styled.Header>
                <styled.Form onSubmit={handleSubmit}>
                    {isError && <Alert style={{ marginBottom: '15px', width: '100%' }} message="Email ou mot de passe incorrect" type="error" />}
                    <input type="text" name={"mail"} placeholder={'Votre adresse email'} onChange={onChange} />
                    <input type="password" name={"password"} placeholder={'Votre mot de passe'} onChange={onChange} />
                    <styled.Button>Se connecter</styled.Button>
                </styled.Form>
            </styled.Box>
        </styled.Container>
    );
};

export default Login;
