import React, {useEffect} from 'react';
import Container from "../../components/Container/Container";
import Table from '../Dashboard/components/Table/Table';
import * as styled from "./Sandbox.styled";
import axios from "axios";
import { saveAs } from 'file-saver';
import Modal from "../../components/Modals/global/Modal";

const Sandbox = () => {
    const [data, setData] = React.useState([]);
    const [isShowModal, setIsShowModal] = React.useState(false);

    useEffect(() => {
        const fetchData = async () => {
            const result = await axios.get(`${import.meta.env.VITE_API_HOST}/train/`);
            setData(result.data);
        }

        fetchData();
    }, []);

    const handleShowModal = () => {
        setIsShowModal(!isShowModal);
    }

    return (
        <>
            <Container title={'Toutes les données'}>
                <styled.Banner>
                    <styled.Button onClick={handleShowModal}>Télécharger des données</styled.Button>
                </styled.Banner>
                <styled.DailyBox>
                    <div style={{ overflowX: 'scroll', height: '100%' }}>
                        <Table data={data} itemsPerPage={20} />
                    </div>
                </styled.DailyBox>
            </Container>
            <Modal setIsShowModal={setIsShowModal} isShowModal={isShowModal} tableData={data}  />
        </>
    );
};

export default Sandbox;
