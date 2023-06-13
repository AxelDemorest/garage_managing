import styled from "styled-components";

export const Box = styled.div`
  h2 {
    padding-left: 30px;
  }

  margin: ${props => props.margin || '0'};
  height: auto;
  border-radius: 10px;
  padding: 30px 0;
  box-shadow: rgba(0, 0, 0, 0.1) 0 1px 2px 0;
  display: flex;
  flex-direction: column;
  background-color: #fff;
  width: ${props => props.width || 'auto'};
`;

export const ListStats = styled.ul`
  padding: 0 30px;
  margin: 0;
`;

export const FirstStats = styled.li`
  border-bottom: 1px solid #d3d3d3;
  color: #000;
  padding: 15px 0;
  list-style: none;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  
  p {
    margin: 0;
    font-size: 16px;
  }
`;

export const Point = styled.div`
  width: 10px;
  height: 10px;
  background-color: ${props => props.color || '#000'};
  border-radius: 50%;
  margin-right: 10px;
`;
