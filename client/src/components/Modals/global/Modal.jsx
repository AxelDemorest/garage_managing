import React, {useState} from 'react';
import * as styled from "./Modal.styled";
import {DatePicker} from "antd";
import {CgClose} from "react-icons/cg";
import axios from "axios";

const { RangePicker } = DatePicker;

const Modal = ({ setIsShowModal, isShowModal, tableData }) => {
    const [filteredData, setFilteredData] = useState(tableData);

    const formatDate = (dateString) => {
        return new Date(dateString).toLocaleDateString(
            'fr-FR',
            { year: 'numeric', month: '2-digit', day: '2-digit' }
        );
    };

    const handleDateChange = (dates, dateStrings) => {
        const [startDate, endDate] = dateStrings.map(formatDate);

        const parseDateString = (dateString) => {
            const [day, month, year] = dateString.split('/');
            return new Date(year, month - 1, day).toLocaleDateString(
                'fr-FR',
                { year: 'numeric', month: '2-digit', day: '2-digit' }
            );
        };

        const filtered = tableData.filter((item) => {
            const itemDate = parseDateString(item.date);
            return (
                itemDate >= parseDateString(startDate) && itemDate <= parseDateString(endDate)
            );
        });
        setFilteredData(filtered);
    };

    const exportToExcel = async () => {
        try {
            const response = await axios.post(`${import.meta.env.VITE_API_HOST}/excel/export`, {
                tableData: JSON.stringify(filteredData),
            }, {
                responseType: 'blob',
            });
            const blob = new Blob([response.data], {
                type:
                    'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
            });
            saveAs(blob, 'myfile.xlsx');
        } catch (error) {
            console.error(error);
        }
    };

    return (
        <>
            <styled.Modal isShowModal={isShowModal}>
                <div style={{ position: 'relative' }}>
                    <styled.CloseButton onClick={() => setIsShowModal(!isShowModal)}>
                        <CgClose size={20} />
                    </styled.CloseButton>
                    <div style={{ display: 'flex', flexDirection: 'column', width: '50%' }}>
                        <RangePicker onChange={handleDateChange} />
                        <styled.Button onClick={exportToExcel}>Télécharger</styled.Button>
                    </div>
                </div>
            </styled.Modal>
            <styled.Overlay isShowModal={isShowModal} />
        </>
    );
};

export default Modal;
