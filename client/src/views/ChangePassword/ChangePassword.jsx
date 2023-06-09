import React, {useContext, useState} from 'react';
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { AuthContext } from '../../context/AuthContext';
import * as styled from "./ChangePassword.styled";
import {message} from "antd";
import jwt_decode from "jwt-decode";

const ChangePassword = () => {
    const navigate = useNavigate();
    const { token, dispatch } = useContext(AuthContext);
    const [password, setPassword] = useState('');

    const handleSubmit = async (event) => {
        event.preventDefault();
        const decodedToken = jwt_decode(token);
        const userId = decodedToken.sub;

        try {
            await axios.post(`${import.meta.env.VITE_API_HOST}/api/users/${userId}/change-password`, { token, password });
            const userResponse = await axios.post(`${import.meta.env.VITE_API_HOST}/api/auth/login`, { mail: decodedToken.email, password: password });
            dispatch({ type: 'LOGIN_SUCCESS', payload: userResponse?.data?.access_token });
            navigate("/");
        } catch (err) {
            message.error("Une erreur est survenue")
            console.log(err);
        }
    };

    const handleChange = (event) => {
        setPassword(event.target.value);
    };

    return (
        <styled.Container>
            <styled.Box>
                <styled.Header>
                    <styled.Title>Changez votre mot de passe</styled.Title>
                    <styled.Description>Afin d'accéder au panel d'administration, changez votre mot de passe.</styled.Description>
                </styled.Header>
                <styled.Form onSubmit={handleSubmit}>
                    <input type="text" name={"password"} value={password} onChange={handleChange} placeholder={'Nouveau mot de passe'} required />
                    <styled.Button>Valider le changement</styled.Button>
                </styled.Form>
            </styled.Box>
        </styled.Container>
    );
};

export default ChangePassword;
