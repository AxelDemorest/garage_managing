import styled from "styled-components";

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

export const Banner = styled.div`
  display: flex;
  justify-content: flex-start;
  width: 95%;
  margin: 25px;
`;

export const DailyBox = styled.div`
  h2 {
    padding-left: 30px;
  }
  
  height: auto;
  border-radius: 10px;
  padding: 30px 0;
  margin: 25px;
  box-shadow: rgba(0, 0, 0, 0.1) 0px 1px 2px 0px;
  display: flex;
  flex-direction: column;
  background-color: #fff;
`;
