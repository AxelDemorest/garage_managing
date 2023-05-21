import styled from "styled-components";
import {Input} from "antd";

export const Wrapper = styled.div`
  display: flex;
  flex-direction: row;
`;

export const FormContainer = styled.div`
  padding: 45px 25px;
  background-color: #fff;
  width: 50%;
  border-radius: 15px;
  box-shadow: rgba(0, 0, 0, 0.16) 0 1px 4px;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

export const Form = styled.form`
  display: flex;
  flex-direction: column;
  width: 60%;
`;

export const CustomInput = styled(Input)`
  margin-bottom: 20px;
  padding: 10px;
`;

export const SubmitButton = styled.button`
  width: 100%;
  background-color: #fad2af;
  color: black;
  padding: 15px;
  border: none;
  border-radius: 5px;
  margin-top: 15px;
  
    &:hover {
      background-color: #f8c18c;
    }
`;
