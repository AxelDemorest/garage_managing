import React from 'react';
import * as styled from "./Stats.styled";
import Table from "../Table/Table";
import PieChart from "../../../../components/Charts/PieChart";

import {Chart as ChartJS, ArcElement, Legend, Tooltip} from "chart.js";
import ChartDataLabels from "chartjs-plugin-datalabels";

ChartJS.register(ArcElement, Tooltip, Legend, ChartDataLabels);

const Stats = ({ data, filteredData }) => {

    const models = {
        h0: [
            { label: "Taux de ponctu garage H00", key: "tsg_H00", color: '#D5D5D5' },
            { label: "Taux de conformité VAE H00", key: "vae_H00", color: '#E7A982' },
            { label: "Taux de conformité CRML H00", key: "crml_H00", color: '#82B6E7' },
            { label: "Taux de conformité Nettoyage H00", key: "nett_H00", color: '#9C82E7' },
            { label: "Taux de conformité Désarmement H00", key: "arm_H00", color: '#5AC25D' },
            { label: "Régularité arrivée H00", key: "ra_H00", color: '#F05353' },
        ],
        h5: [
            { label: "Taux de ponctu garage H05", key: "tsg_H05", color: '#D5D5D5' },
            { label: "Taux de conformité VAE H05", key: "vae_H05", color: '#E7A982' },
            { label: "Taux de conformité CRML H05", key: "crml_H05", color: '#82B6E7' },
            { label: "Taux de conformité Nettoyage H05", key: "nett_H05", color: '#9C82E7' },
            { label: "Régularité arrivée H05", key: "ra_H05", color: '#F05353' },
        ]
    }

    const chartData = {
        labels: ['Cause CRML/CRLO', 'Cause VAE', 'Cause Nettoyage', 'Cause Désarmement', 'Cause Retard arrivée'],
        datasets: [
            {
                label: '% des causes',
                data: [
                    data?.stats.err_crml,
                    data?.stats.err_vae,
                    data?.stats.err_nett,
                    data?.stats.err_arm,
                    data?.stats.err_ra,
                ],
                backgroundColor: ['#efd1d1', '#c2e5c0', '#b6e0db', '#edcdef', '#dedbf1'],
                borderColor: ['#c07f7f', '#639361', '#72a29d', '#a277a4', '#9791b9'],
                borderWidth: 1,
            },
        ],
    };

    return (
        <div style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between', margin: '25px' }}>
            <div style={{ width: '25%' }}>
                <styled.Box margin={'0 0 20px 0'}>
                    <h2>Garage H05 - (Régularité)</h2>
                    <styled.ListStats>
                        <>
                            {models.h5.map((item, index) => (
                                <styled.FirstStats key={index}>
                                    <div style={{ display: 'flex', flexDirection: 'row', alignItems: 'center' }}>
                                        <styled.Point color={item.color} />
                                        <p>{item.label}</p>
                                    </div>
                                    <p>{data.stats[item.key]}%</p>
                                </styled.FirstStats>
                            ))}
                        </>
                    </styled.ListStats>
                </styled.Box>
                <styled.Box>
                    <h2>Garage H00 - (Régularité)</h2>
                    <styled.ListStats>
                        <>
                            {models.h0.map((item, index) => (
                                <styled.FirstStats key={index}>
                                    <div style={{ display: 'flex', flexDirection: 'row', alignItems: 'center' }}>
                                        <styled.Point color={item.color} />
                                        <p>{item.label}</p>
                                    </div>
                                    <p>{data.stats[item.key]}%</p>
                                </styled.FirstStats>
                            ))}
                        </>
                    </styled.ListStats>
                </styled.Box>
                <styled.Box margin={'30px 0 0 0'}>
                    <h2 style={{ marginBottom: '30px' }}>Pourcentage des causes</h2>
                    <div style={{ width: '100%', display: 'flex', justifyContent: 'center', padding: '0 100px' }}>
                        <PieChart chartData={chartData} />
                    </div>
                </styled.Box>
            </div>
            <styled.Box width={'74%'}>
                <h2>Récapitulatif journalier ({ data.trains.length } trains)</h2>
                <div style={{ overflowX: 'scroll', height: '100%' }}>
                    <Table data={filteredData.length > 0 ? filteredData : data.trains} itemsPerPage={17} />
                </div>
            </styled.Box>
        </div>
    );
};

export default Stats;
