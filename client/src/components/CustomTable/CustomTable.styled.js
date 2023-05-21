import styled from "styled-components";

export const StyledTable = styled.table`
  font-family: 'AvenirBook', sans-serif;
  background-color: white;
  border-collapse: collapse;
  margin: 0;
  font-size: 14px;
  width: 100%;

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
    padding: 35px 10px;
    color: black;
    text-align: center;
  }
`;

export const Button = styled.button`
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

export const PaginationWrapper = styled.div`
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
