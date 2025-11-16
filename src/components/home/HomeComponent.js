import styled, { css } from "styled-components";

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100vh;
  background-color: #fff;
  /* font-family:  */
`;

export const Button = styled.div`
  width: 200px;
  height: 200px;
  border-radius: 50px;
  background-color: #999;
  color: white;
  border: none;
  cursor: pointer;
  font-size: 20px;
  font-weight: 600;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 8px;
  transition: transform 0.2s ease, box-shadow 02s ease;

  &:hover {
    box-shadow: 0 6px 18px rgba(9, 14, 52, 0.3);
  }

  &:active {
    background-color: #666;
  }
`;
