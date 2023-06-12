import React, {useEffect, useState} from 'react';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import ChartDataLabels from 'chartjs-plugin-datalabels';
import {Alert, DatePicker, message} from "antd";
import {Doughnut} from "react-chartjs-2";
import axios from "axios";

ChartJS.register(ArcElement, Tooltip, Legend, ChartDataLabels);

import ImportModal from "../../components/Modals/ImportModal/ImportModal";
import Container from "../../components/Container/Container";
import Table from './components/Table/Table';
import * as styled from './Dashboard.styled';

const { RangePicker } = DatePicker;

const Dashboard = () => {
    const [statsData, setStatsData] = useState({
        trains: [],
        stats: {
            tsg_H00: 0,
            tsg_H05: 0,
        }
    });
    const [dayStatsData, setDayStatsData] = useState({
        trains: [],

        stats: {
            tsg_H00: 0,
            tsg_H05: 0,
        }
    });
    const [dates, setDates] = useState([]);
    const [isShowModal, setIsShowModal] = useState(false);

    useEffect(() => {
       const fetchData = async () => {
           const result = await axios.get(`${import.meta.env.VITE_API_HOST}/api/train/generate/day`, {
                params: {
                    date: '31/03/2023'
                }
           });
           setDayStatsData(result.data);
       }

       fetchData();
    }, []);

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

        setDayStatsData(result.data);
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

        setStatsData(result.data);
    }

    const statsDataArrayH00 = [
        { label: "Taux de ponctu garage H00", key: "tsg_H00", color: '#D5D5D5' },
        { label: "Taux de conformité VAE H00", key: "vae_H00", color: '#E7A982' },
        { label: "Taux de conformité CRML H00", key: "crml_H00", color: '#82B6E7' },
        { label: "Taux de conformité Nettoyage H00", key: "nett_H00", color: '#9C82E7' },
        { label: "Taux de conformité Désarmement H00", key: "arm_H00", color: '#5AC25D' },
        { label: "Régularité arrivée H00", key: "ra_H00", color: '#F05353' },
    ];
    const statsDataArrayH05 = [
        { label: "Taux de ponctu garage H05", key: "tsg_H05", color: '#D5D5D5' },
        { label: "Taux de conformité VAE H05", key: "vae_H05", color: '#E7A982' },
        { label: "Taux de conformité CRML H05", key: "crml_H05", color: '#82B6E7' },
        { label: "Taux de conformité Nettoyage H05", key: "nett_H05", color: '#9C82E7' },
        { label: "Régularité arrivée H05", key: "ra_H05", color: '#F05353' },
    ];


    const dayData = {
        labels: ['Cause CRML/CRLO', 'Cause VAE', 'Cause Nettoyage', 'Cause Désarmement', 'Cause Retard arrivée'],
        datasets: [
            {
                label: '% des causes',
                data: [
                    dayStatsData.stats.err_crml,
                    dayStatsData.stats.err_vae,
                    dayStatsData.stats.err_nett,
                    dayStatsData.stats.err_arm,
                    dayStatsData.stats.err_ra,
                ],
                backgroundColor: ['#efd1d1', '#c2e5c0', '#b6e0db', '#edcdef', '#dedbf1'],
                borderColor: ['#c07f7f', '#639361', '#72a29d', '#a277a4', '#9791b9'],
                borderWidth: 1,
            },
        ],
    };

    const monthlyData = {
        labels: ['Cause CRML/CRLO', 'Cause VAE', 'Cause Nettoyage', 'Cause Désarmement', 'Cause Retard arrivée'],
        datasets: [
            {
                label: '% des causes',
                data: [
                    statsData.stats.err_crml,
                    statsData.stats.err_vae,
                    statsData.stats.err_nett,
                    statsData.stats.err_arm,
                    statsData.stats.err_ra,
                ],
                backgroundColor: ['#efd1d1', '#c2e5c0', '#b6e0db', '#edcdef', '#dedbf1'],
                borderColor: ['#c07f7f', '#639361', '#72a29d', '#a277a4', '#9791b9'],
                borderWidth: 1,
            },
        ],
    };

    const options = {
        plugins: {
            datalabels: {
                display: true,
                color: 'black',
                anchor: 'center',
                align: 'center',
                offset: 0,
                font: {
                    size: 14,
                },
                formatter: (value) => {
                    return value + '%';
                },
            },
            legend: {
                display: true,
                position: 'bottom',
                align: 'start',
                labels: {
                    boxWidth: 12,
                    padding: 20,
                },
            },
        },
    };

    return (
        <div style={{ display: 'flex', flexDirection: 'row', width: '100vw' }}>
            <Container title={'Tableau de bord'}>
                    <styled.Banner>
                        <styled.Button onClick={handleShowModal}>Importer des données</styled.Button>
                        <styled.Button onClick={handleShowModal}>Afficher les statistiques journalières</styled.Button>
                        <DatePicker onChange={handleDateChange} style={{ width: '200px' }} />
                    </styled.Banner>
                    <div style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between', margin: '25px' }}>
                        <div style={{ width: '39%' }}>
                            <styled.Box margin={'0 0 20px 0'}>
                                <h2>Garage H05 - (Régularité)</h2>
                                <styled.ListStats>
                                    <>
                                        {statsDataArrayH05.map((item, index) => (
                                            <styled.FirstStats key={index}>
                                                <div style={{ display: 'flex', flexDirection: 'row', alignItems: 'center' }}>
                                                    <styled.Point color={item.color} />
                                                    <p>{item.label}</p>
                                                </div>
                                                <p>{dayStatsData.stats[item.key]}%</p>
                                            </styled.FirstStats>
                                        ))}
                                    </>
                                </styled.ListStats>
                            </styled.Box>
                            <styled.Box>
                                <h2>Garage H00 - (Régularité)</h2>
                                <styled.ListStats>
                                    <>
                                        {statsDataArrayH00.map((item, index) => (
                                            <styled.FirstStats key={index}>
                                                <div style={{ display: 'flex', flexDirection: 'row', alignItems: 'center' }}>
                                                    <styled.Point color={item.color} />
                                                    <p>{item.label}</p>
                                                </div>
                                                <p>{dayStatsData.stats[item.key]}%</p>
                                            </styled.FirstStats>
                                        ))}
                                    </>
                                </styled.ListStats>
                            </styled.Box>
                            <styled.Box margin={'30px 0 0 0'}>
                                <h2 style={{ marginBottom: '30px' }}>Pourcentage des causes</h2>
                                <Alert style={{ margin: '0 30px' }} message="Encore en développement" type="error" />
                                <Doughnut height={200} data={dayData} options={options} />
                            </styled.Box>
                        </div>
                        <styled.Box width={'60%'}>
                            <h2>Récapitulatif journalier ({ dayStatsData.trains.length } trains)</h2>
                            <div style={{ overflowX: 'scroll', height: '100%' }}>
                                <Table data={dayStatsData.trains} itemsPerPage={17} />
                            </div>
                        </styled.Box>
                    </div>
                    <styled.Hr />
                    <styled.Banner>
                        <styled.Button onClick={handleGenerateStats}>Générer des statistiques</styled.Button>
                        <RangePicker onChange={handleRangeDateChange} style={{ width: '250px', padding: '10px' }} />
                    </styled.Banner>
                    <div style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between', margin: '25px' }}>
                        <div style={{ width: '39%' }}>
                            <styled.Box margin={'0 0 20px 0'}>
                                <h2>Garage H05 - (Régularité)</h2>
                                <styled.ListStats>
                                    <>
                                        {statsDataArrayH05.map((item, index) => (
                                            <styled.FirstStats key={index}>
                                                <div style={{ display: 'flex', flexDirection: 'row', alignItems: 'center' }}>
                                                    <styled.Point color={item.color} />
                                                    <p>{item.label}</p>
                                                </div>
                                                <p>{statsData.stats[item.key]}%</p>
                                            </styled.FirstStats>
                                        ))}
                                    </>
                                </styled.ListStats>
                            </styled.Box>
                            <styled.Box>
                                <h2>Garage H00 - (Régularité)</h2>
                                <styled.ListStats>
                                    <>
                                        {statsDataArrayH00.map((item, index) => (
                                            <styled.FirstStats key={index}>
                                                <div style={{ display: 'flex', flexDirection: 'row', alignItems: 'center' }}>
                                                    <styled.Point color={item.color} />
                                                    <p>{item.label}</p>
                                                </div>
                                                <p>{statsData.stats[item.key]}%</p>
                                            </styled.FirstStats>
                                        ))}
                                    </>
                                </styled.ListStats>
                            </styled.Box>
                            <styled.Box margin={'30px 0 0 0'}>
                                <h2 style={{ marginBottom: '30px' }}>Pourcentage des causes</h2>
                                <Alert style={{ margin: '0 30px' }} message="Encore en développement" type="error" />
                                <Doughnut data={monthlyData} options={options} />
                            </styled.Box>
                        </div>
                        <styled.Box width={'60%'}>
                            <h2>Récapitulatif sur une durée déterminée ({ statsData.trains.length } trains)</h2>
                            <div style={{ overflowX: 'scroll', height: '100%' }}>
                                <Table data={statsData.trains} itemsPerPage={17} />
                            </div>
                        </styled.Box>
                    </div>
            </Container>
            <ImportModal isShowModal={isShowModal} setIsShowModal={setIsShowModal} />
        </div>
    );
};

export default Dashboard;
