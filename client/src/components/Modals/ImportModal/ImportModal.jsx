import React, {useState} from 'react';
import * as styled from './ImportModal.styled';
import axios from "axios";
import {Button, Form, message, Upload, DatePicker} from "antd";
import {Overlay} from "./ImportModal.styled";
import {CgClose} from "react-icons/cg";

const ImportModal = ({ isShowModal, setIsShowModal }) => {
    const [fileList1, setFileList1] = useState([]);
    const [fileList2, setFileList2] = useState([]);
    const [date, setDate] = useState('');
    const hiddenFileInput = React.useRef(null);

    const handleClick = (event) => {
        event.preventDefault();
        hiddenFileInput.current.click();
    };

    const handleDateChange = async (date, dateString) => {
        const dateFormat = new Date(dateString).toLocaleDateString(
            'fr-FR',
            { year: 'numeric', month: '2-digit', day: '2-digit' }
        ).replace(/[/]/g, '-');

        setDate(dateFormat);
    };

    const onFile1Change = ({ fileList }) => {
        setFileList1(fileList);
    };

    const onFile2Change = ({ fileList }) => {
        setFileList2(fileList);
    };

    const props1 = {
        onRemove: (file) => {
            setFileList1([]);
        },
        beforeUpload: (file) => {
            setFileList1([file]);
            return false;
        },
        fileList: fileList1,
        accept: '.xlsx, .xls',
    };

    const props2 = {
        onRemove: (file) => {
            setFileList2([]);
        },
        beforeUpload: (file) => {
            setFileList2([file]);
            return false;
        },
        fileList: fileList2,
        accept: '.xlsx, .xls',
    };

    const onFinish = (values) => {
        console.log('Form values:', values);

        const formData = new FormData();
        formData.append('file1', values.file1.file);
        formData.append('file2', values.file2.file);

        axios.post(`${import.meta.env.VITE_API_HOST}/api/train/?date=${date}`, formData)
            .then(response => {
                console.log('Fichiers téléchargés avec succès');
                message.success('Les fichiers ont été téléchargés avec succès');
            })
            .catch(error => {
                console.error('Une erreur s\'est produite lors du téléchargement des fichiers', error);
                message.error('Une erreur s\'est produite lors du téléchargement des fichiers');
            });
    }

    const onFinishFailed = (errorInfo) => {
        console.log('Failed:', errorInfo);
    };

    return (
        <>
            <styled.Modal isShowModal={isShowModal}>
                <div style={{ position: 'relative' }}>
                    <styled.CloseButton onClick={() => setIsShowModal(!isShowModal)}>
                        <CgClose size={20} />
                    </styled.CloseButton>
                    <h2>Importer les données</h2>
                    <Form
                        name="basic"
                        onFinish={onFinish}
                        onFinishFailed={onFinishFailed}
                        autoComplete="off"
                        layout={'vertical'}
                    >
                        <div style={{ display: 'flex', flexDirection: 'row', width: '100%' }}>
                            <Form.Item
                                label="Extraction OpenGOV"
                                name="file1"
                                rules={[
                                    {
                                        required: true,
                                        message: 'La date est requise',
                                    },
                                ]}
                                style={{
                                    margin: 0,
                                    padding: '15px'
                                }}
                            >
                                <Upload {...props1} name='file1' onChange={onFile1Change}>
                                    <Button>Importer le fichier</Button>
                                </Upload>
                            </Form.Item>
                            <Form.Item
                                label="Extraction OSE"
                                name="file2"
                                rules={[
                                    {
                                        required: true,
                                        message: 'La date est requise',
                                    },
                                ]}
                                style={{
                                    padding: '15px' ,
                                    margin: 0,
                                }}
                            >
                                <Upload {...props2} name='file2' onChange={onFile2Change}>
                                    <Button>Importer le fichier</Button>
                                </Upload>
                            </Form.Item>
                            <Form.Item
                                label="Date de l'import"
                                name="import_date"
                                rules={[
                                    {
                                        required: true,
                                        message: 'La date est requise',
                                    },
                                ]}
                                style={{
                                    padding: '15px' ,
                                    margin: 0,
                                }}
                            >
                                <DatePicker onChange={handleDateChange} />
                            </Form.Item>
                        </div>
                        <Form.Item
                            style={{
                                padding: '15px 15px 0 15px'
                            }}
                        >
                            <Button htmlType="submit">
                                Importer les données
                            </Button>
                        </Form.Item>
                    </Form>
                </div>
            </styled.Modal>
            <Overlay isShowModal={isShowModal} />
        </>
    );
};

export default ImportModal;
