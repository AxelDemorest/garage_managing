import React from 'react';
import * as styled from './Banner.styled';
import {DatePicker, Input, Select} from "antd";
import {SearchOutlined} from "@ant-design/icons";

const { RangePicker } = DatePicker;

const Banner = ({
        inputHandler,
        handleShowModal,
        handleDateChange,
        handleRangeDateChange,
        handleGenerateStats,
        onCategoryChange,
        isDayRange
    }) => {

    return (
        <div>
            <styled.Banner>
                <div>
                    <styled.Button onClick={handleShowModal}>Importer des données</styled.Button>
                    {
                        isDayRange ? (
                            <DatePicker onChange={handleDateChange} style={{ width: '200px' }} />
                        ) : (
                            <>
                                <styled.Button onClick={handleGenerateStats}>Générer des statistiques</styled.Button>
                                <RangePicker onChange={handleRangeDateChange} style={{ width: '250px', padding: '10px' }} />
                            </>
                        )
                    }
                </div>
                <Input
                    onChange={inputHandler}
                    style={{ marginRight: '35px', borderRadius: '6px', width: '35%', fontSize: '17px' }}
                    placeholder="Rechercher par numéro de train"
                    prefix={<SearchOutlined />}
                />
                <div style={{ width: '18%', display: 'flex', flexDirection: 'row'}}>
                    <Select
                        size={'large'}
                        defaultValue="all"
                        style={{ width: 180, marginRight: '35px' }}
                        options={[
                            { value: 'all', label: 'Composition: Tout' },
                            { value: 'us', label: 'Composition: US' },
                            { value: 'um', label: 'Composition: UM' }
                        ]}
                    />
                    <Select
                        size={'large'}
                        onChange={onCategoryChange}
                        defaultValue="day"
                        style={{ width: 250 }}
                        options={[
                            { value: 'day', label: 'Statistiques sur une journée' },
                            { value: 'range', label: 'Statistiques sur une période' },
                        ]}
                    />
                </div>
            </styled.Banner>
        </div>
    );
};

export default Banner;
