import React, {useState} from 'react';
import * as styled from './CustomTable.styled';
import Pagination from 'react-js-pagination';

const CustomTable = ({
     data,
     itemsPerPage,
     headers
 }) => {
    const [activePage, setActivePage] = useState(1);

    const handlePageChange = (pageNumber) => {
        setActivePage(pageNumber);
    };

    const indexOfLastItem = activePage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    const currentItems = data?.slice(indexOfFirstItem, indexOfLastItem);

    return (
        <>
            <styled.StyledTable>
                <thead>
                <tr>
                    {headers.map((header, index) => (
                        <th key={index}>{header.name}</th>
                    ))}
                </tr>
                </thead>
                <tbody>
                {currentItems?.map((a) => {
                    return (
                        <tr key={a.id}>
                            {Object.entries(a)
                                .filter(([key, _]) => key !== 'id')
                                .map(([_, value], index) => (
                                    <td key={index}>{value}</td>
                                ))}
                        </tr>
                    );
                })}
                </tbody>
            </styled.StyledTable>
            <styled.PaginationWrapper>
                <Pagination
                    activePage={activePage}
                    itemsCountPerPage={itemsPerPage}
                    totalItemsCount={data ? data.length : 0}
                    pageRangeDisplayed={5}
                    onChange={handlePageChange}
                />
            </styled.PaginationWrapper>
        </>
    );
};

export default CustomTable;
