import React, {useEffect, useState} from 'react';
import * as styled from './UsersList.styled';
import Container from "../../../components/Container/Container";
import CustomTable from "../../../components/CustomTable/CustomTable";
import axios from "axios";
import {Input, message, Select} from "antd";

const UsersList = () => {
    const [data, setData] = useState([]);
    const [form, setForm] = useState({
        cp: '',
        firstName: '',
        lastName: '',
        mail: '',
        password: '',
        type: 'Utilisateur',
    });

    const headers = [
        { name: 'CP' },
        { name: 'Prénom' },
        { name: 'Nom' },
        { name: 'Adresse mail' },
    ];

    useEffect(() => {
        const fetchData = async () => {
            const result = await axios.get(`${import.meta.env.VITE_API_HOST}/users/`);
            setData(result.data.map((user) =>{
                return {
                    cp: user.cp,
                    firstName: user.firstName,
                    lastName: user.lastName,
                    mail: user.mail,
                }
            }));
        }

        fetchData();
    }, []);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setForm(prevState => ({ ...prevState, [name]: value }));
    };

    const handleSelectChange = (value) => {
        setForm(prevState => ({ ...prevState, type: value }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            await axios.post(`${import.meta.env.VITE_API_HOST}/users/`, form);
            message.success('Utilisateur créé avec succès !');
        } catch (error) {
            console.error(error);
            // Handle error here
        }
    };


    return (
        <Container>
            <styled.Wrapper>
                <div style={{ padding: '25px', width: '50%' }}>
                    <CustomTable data={data} itemsPerPage={17} headers={headers} />
                </div>
                <div style={{ display: 'flex', justifyContent: 'flex-start', width: '50%', padding: '25px' }}>
                    <styled.FormContainer>
                        <div style={{ textAlign: 'center', marginBottom: '15px' }}>
                            <h2>Créer un utilisateur</h2>
                            <p>Ajouter un utilisateur pour donner des accès au panel d'administration.</p>
                        </div>
                        <styled.Form onSubmit={handleSubmit}>
                            <styled.CustomInput type="text" name={'cp'} placeholder={'CP'} onChange={handleChange}/>
                            <styled.CustomInput type="text" name={'firstName'} placeholder={'Prénom'} onChange={handleChange}/>
                            <styled.CustomInput type="text" name={'lastName'} placeholder={'Nom de famille'} onChange={handleChange}/>
                            <styled.CustomInput type="text" name={'mail'} placeholder={'Adresse email'} onChange={handleChange}/>
                            <styled.CustomInput type="password" name={'password'} placeholder={'Mot de passe'} onChange={handleChange}/>
                            <Select
                                defaultValue="Utilisateur"
                                onChange={handleSelectChange}
                                options={[
                                    { value: 'Administrateur', label: 'Administrateur' },
                                    { value: 'Utilisateur', label: 'Utilisateur' },
                                ]}
                            />
                            <styled.SubmitButton type="submit" value="Créer">Créer</styled.SubmitButton>
                        </styled.Form>
                    </styled.FormContainer>
                </div>
            </styled.Wrapper>
        </Container>
    );
};

export default UsersList;
