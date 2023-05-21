import styled from "styled-components";

export const Banner = styled.div`
  display: flex;
  justify-content: flex-start;
  width: 95%;
  margin: 25px;
`;

export const Hr = styled.hr`
  border: none;
  height: 1px;
  margin: 25px;
  background-color: ${props => props.color || '#D3D3D3'};
`;

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

export const Statistics = styled.div`
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  margin-bottom: 30px;
`;

export const ItemStats = styled.div`
  border-radius: 10px;
  padding: 30px 30px 50px 30px;
  margin-right: 20px;
  color: #a1a1a1;
  background-color: #fff;
  box-shadow: rgba(0, 0, 0, 0.1) 0 1px 2px 0;
  width: 11.5%;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
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

export const PickerButton = styled.button`
  margin-top: 20px;
  background-color: black;
  color: #fff;
  border: none;
  border-radius: 5px;
  padding: 10px 20px;
  font-size: 17px;
  cursor: pointer;

  &:hover {
    background-color: #2a2a2a;
  }
`;

export const ImportButton = styled(PickerButton)`
    margin: 12px 0 25px 0;
    background-color: black;
    color: #fff;
    border: none;
    border-radius: 5px;
    padding: 10px 20px;
    font-size: 15px;
    cursor: pointer;
`;

export const Label = styled.label`
  font-weight: bold;
  display: block;
  line-height: 1.5;
`;

export const FileList = styled.ul`
  margin: 12px 0 0 0;
  padding: 0;
`;

export const DeleteButton = styled.button`
  border: none;
  background: none;
  color: #d02525;
  padding: 0;
  cursor: pointer;
  
  &:hover {
    text-decoration: underline;
  }
`;

export const Button = styled.button`
  &:hover {
    background-color: #294385;
  }

  font-size: 14px;
  color: #fff;
  background-color: #243c7a;
  padding: 13px 18px;
  border: none;
  border-radius: 5px;
  margin-right: 35px;
`;
