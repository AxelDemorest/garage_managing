import styled from 'styled-components';

export const Modal = styled.div`
  position: fixed;
  right: ${props => props.isShowModal ? '30px' : '-30%'};
  top: 115px;
  width: 30%;
  background-color: #fff;
  border-radius: 15px;
  padding: 30px;
  transition: all 0.35s ease-in-out;
  box-shadow: rgba(50, 50, 93, 0.25) 0px 2px 5px -1px, rgba(0, 0, 0, 0.3) 0px 1px 3px -1px;
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
