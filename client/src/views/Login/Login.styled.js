import styled from "styled-components";

export const Container = styled.div`
  width: 100vw;
  height: 100vh;
  background-color: #E8E5DD;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

export const Box = styled.div`
  background-color: #fff;
  border-radius: 15px;
  padding: 60px 30px;
  width: 23%;
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  box-shadow: rgba(99, 99, 99, 0.2) 0px 2px 8px 0px;
`;

export const Header = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 80%;
  font-size: 18px;
`;

export const Title = styled.h1`
    font-weight: 800;
`;

export const Description = styled.p`
    line-height: 1.5;
`;

export const Form = styled.form`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 80%;
  margin-top: 25px;

  input {
    width: 100%;
    border: 1px solid #bebebe;
    border-radius: 5px;
    padding: 15px;
    margin-bottom: 20px;
  }
`;

export const Button = styled.button`
  width: 100%;
  background-color: #fad2af;
  color: black;
  padding: 15px;
  border: none;
  border-radius: 5px;
  margin-top: 15px;
`;
