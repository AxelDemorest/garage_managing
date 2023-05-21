import React, {useState} from 'react';
import styled from 'styled-components';
import Pagination from 'react-js-pagination';

const Table = ({ data, itemsPerPage }) => {
    const [activePage, setActivePage] = useState(1);

    const handlePageChange = (pageNumber) => {
        setActivePage(pageNumber);
    };

    const indexOfLastItem = activePage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    const currentItems = data?.slice(indexOfFirstItem, indexOfLastItem);

    const headers = [
        { name: 'Date' },
        { name: 'N° Train' },
        { name: 'Origine' },
        { name: 'Destination' },
        { name: 'Arrivé commerciale' },
        { name: 'Départ Garage' },
        { name: 'Retard Garage' },
        { name: 'Voie' },
        { name: 'Ré-Ut.' },
        { name: 'Retard Ré-Ut.' },
        { name: 'Temps sous gare' },
        { name: 'H. VAE Début Théorique' },
        { name: 'H. VAE Début Réelle' },
        { name: 'H. VAE Fin Théorique' },
        { name: 'H. VAE Fin Réelle' },
        { name: 'H. CRML/CRLO Fin Théorique' },
        { name: 'H. CRML/CRLO Fin Réelle' },
        { name: 'H. Désarmement Début Théorique' },
        { name: 'H. Désarmement Début Réelle' },
        { name: 'H. Désarmement Fin Théorique' },
        { name: 'H. Désarmement Fin Réelle' },
        { name: 'H. Nettoyage Début Théorique' },
        { name: 'H. Nettoyage Début Réelle' },
        { name: 'H. Nettoyage Fin Théorique' },
        { name: 'H. Nettoyage Fin Réelle' },
    ]

    function convertHourInMinutes(heure) {
        const [heures, minutes] = heure.split(':').map(Number);
        return heures * 60 + minutes;
    }

    return (
        <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'space-between', height: '100%' }}>
            <StyledTable>
                <thead>
                <tr>
                    {headers.map((header, index) => (
                        <th key={index}>{header.name}</th>
                    ))}
                </tr>
                </thead>
                <tbody>
                {currentItems?.map((item, index) => (
                    <tr key={index}>
                        <td>{item.date}</td>
                        <td>{item.numero_train}</td>
                        <td>{item.origine}</td>
                        <td>{item.destination}</td>
                        <td>{item.arrive}</td>
                        <td>{item.depart}</td>
                        <td>{item.retard_garage}</td>
                        <td>{item.voie}</td>
                        <td>{item.re_ut}</td>
                        <td>{item.retard_re_ut}</td>
                        <td>
                            <Button value={convertHourInMinutes(item.temps_sous_gare)}>{item.temps_sous_gare}</Button>
                        </td>
                        <td>{item.vae_heure_debut_theorique}</td>
                        <td>{item.vae_heure_debut_reelle}</td>
                        <td>{item.vae_heure_fin_theorique}</td>
                        <td>{item.vae_heure_fin_reelle}</td>
                        <td>{item.crml_heure_fin_theorique}</td>
                        <td>{item.crml_heure_fin_reelle}</td>
                        <td>{item.armement_heure_debut_theorique}</td>
                        <td>{item.armement_heure_debut_reelle}</td>
                        <td>{item.armement_heure_fin_theorique}</td>
                        <td>{item.armement_heure_fin_reelle}</td>
                        <td>{item.nettoyage_heure_debut_theorique}</td>
                        <td>{item.nettoyage_heure_debut_reelle}</td>
                        <td>{item.nettoyage_heure_fin_theorique}</td>
                        <td>{item.nettoyage_heure_fin_reelle}</td>
                    </tr>
                ))}
                </tbody>
            </StyledTable>
            <PaginationWrapper>
                <Pagination
                    activePage={activePage}
                    itemsCountPerPage={itemsPerPage}
                    totalItemsCount={data?.length || 0}
                    pageRangeDisplayed={5}
                    onChange={handlePageChange}
                />
            </PaginationWrapper>
        </div>
    );
};

const StyledTable = styled.table`
  font-family: 'AvenirBook', sans-serif;
  background-color: white;
  border-collapse: collapse;
  width: 100%;
  margin: 0;
  font-size: 14px;
  min-height: 200px;

  & thead {
    border-bottom: 1px solid #ececec;
    font-size: 14px;
  }

  & tr:nth-child(even) {
    background-color: #f9f9f9;
  }

  & th {
    padding: 16px;
  }

  & th, & td {
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
    padding: 16px;
    border-bottom: 1px solid #ececec;
  }

  & td {
    padding: 16px;
    color: black;
    text-align: center;
  }
`;

const Button = styled.button`
  background-color: ${props => props.value > 35 ? '#f14646' : 'none'};
  color: ${props => props.value > 35 ? '#fff' : 'black'};
  padding: 7px;
  border-radius: 4px;
  border: none;
  transition: transform .2s;
  box-shadow: rgba(0, 0, 0, 0.1) 0px 4px 12px;
  
  &:hover {
    transform: scale(1.1);
  }
`;

const PaginationWrapper = styled.div`
    display: flex;
    flex-direction: row;
    margin-top: 16px;
    margin-left: 16px;
  
  .pagination {
    display: flex; 
    list-style-type: none;
    padding-inline-start: 0;
  }

  .pagination li {
    padding: 4px 8px; // Ajout d'un petit padding
    margin: 0 3px;
    border: 1px solid #ccc;
    border-radius: 4px;
    cursor: pointer;
  }

  .pagination li a {
    color: #333; // Couleur personnalisée pour le texte des boutons
    text-decoration: none;
  }

  .pagination li.active {
    border: 1px solid blue; // Couleur personnalisée pour l'arrière-plan des boutons actifs ou survolés
  }

  .pagination li.disabled {
    cursor: not-allowed;
    opacity: 0.6;
  }
`;

export default Table;
