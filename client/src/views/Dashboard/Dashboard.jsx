import React, {useEffect, useState} from 'react';
import {message} from "antd";
import axios from "axios";

import ImportModal from "../../components/Modals/ImportModal/ImportModal";
import Container from "../../components/Container/Container";
import Banner from "./components/Banner/Banner";
import Stats from "./components/Stats/Stats";


const Dashboard = () => {
    const [dates, setDates] = useState([]);
    const [isShowModal, setIsShowModal] = useState(false);
    const [filteredData, setFilteredData] = useState([]);
    const [isDayRange, setIsDayRange] = useState(true);
    const [composition, setComposition] = useState('all');
    const [data, setData] = useState({
        trains: [],
        stats: {
            tsg_H00: 0,
            tsg_H05: 0,
        }
    });

    useEffect(() => {
       axios.get(`${import.meta.env.VITE_API_HOST}/api/train/generate/day`, {
           params: {
               date: '31/03/2023'
           }
       }).then((response) => {
           setData(response.data)
       }).catch((err) => {
           console.error(err);
       })
    }, []);

    const onCategoryChange = (value) => {
        if (value === 'day') setIsDayRange(true);
        else setIsDayRange(false);
    };

    const handleDateChange = async (date, dateString) => {
        const dateFormat = new Date(dateString).toLocaleDateString(
            'fr-FR',
            { year: 'numeric', month: '2-digit', day: '2-digit' }
        )

        const result = await axios.get(`${import.meta.env.VITE_API_HOST}/api/train/generate/day`, {
            params: {
                date: dateFormat
            }
        });

        setData(result.data);
    };

    const formatDate = (dateString) => {
        return new Date(dateString).toLocaleDateString(
            'fr-FR',
            { year: 'numeric', month: '2-digit', day: '2-digit' }
        ).replace(new RegExp('/', 'g'), '-');
    };

    const handleRangeDateChange = async (date, dateStrings) => {
        setDates(dateStrings.map(formatDate));
    }

    const handleShowModal = () => {
        setIsShowModal(!isShowModal);
    }

    const handleGenerateStats = async () => {
        if (dates.length === 0) {
            return message.error('Veuillez sélectionner une période');
        }

        const result = await axios.get(`${import.meta.env.VITE_API_HOST}/api/train/monthly/stats`, {
            params: {
                start_date: dates[0],
                end_date: dates[1]
            }
        });

        setData(result.data);
    }

    const inputHandler = (e) => {
        const lowerCase = e.target.value.toLowerCase();

        const filteredByTrainNumber = data.trains.filter(obj => obj.numero_train.startsWith(lowerCase));
        setFilteredData(filteredByTrainNumber)
    };

    return (
        <div style={{ display: 'flex', flexDirection: 'row', width: '100vw' }}>
            <Container title={'Tableau de bord'}>
                <Banner
                    inputHandler={inputHandler}
                    handleShowModal={handleShowModal}
                    handleDateChange={handleDateChange}
                    handleRangeDateChange={handleRangeDateChange}
                    handleGenerateStats={handleGenerateStats}
                    onCategoryChange={onCategoryChange}
                    isDayRange={isDayRange}
                />
                <Stats data={data} filteredData={filteredData} />
            </Container>
            <ImportModal isShowModal={isShowModal} setIsShowModal={setIsShowModal} />
        </div>
    );
};

export default Dashboard;
