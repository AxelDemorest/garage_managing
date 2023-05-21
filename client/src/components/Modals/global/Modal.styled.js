import styled from 'styled-components';

export const Modal = styled.div`
  position: fixed;
  right: ${props => props.isShowModal ? 0 : '-20%'};
  top: 0;
  bottom: 0;
  width: 15%;
  background-color: #fff;
  padding: 30px;
  transition: all 0.35s ease-in-out;
  z-index: 1;
`;

export const Overlay = styled.div`
  visibility: ${props => props.isShowModal ? 'visible' : 'hidden'};
  opacity: ${props => props.isShowModal ? '1' : '0'};
  transition: all 0.35s ease-in-out;
  position: absolute;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  background-color: rgb(0,0,0,0.25);
  z-index: 0;
`;

export const CloseButton = styled.button`
  position: absolute;
  top: 0;
  right: 0;
  background-color: #f1f1f1;
  padding: 5px;
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 5px;
  border: none;
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
  margin-top: 25px;
`;
