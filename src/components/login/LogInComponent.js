import styled, { css } from "styled-components";

export const Container = styled.div`
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  background: #ffffff;
`;

export const TopMenu = styled.header`
  display: flex;
  justify-content: flex-end;
  padding: 24px 40px;
  gap: 8px;
`;

export const TabButton = styled.button`
  min-width: 80px;
  padding: 6px 14px;
  border-radius: 6px;
  border: 1px solid #dddddd;
  background: #ffffff;
  font-size: 13px;
  cursor: pointer;

  ${({ active }) =>
    active &&
    css`
      background: #5b4bff;
      color: #ffffff;
      border-color: #5b4bff;
    `}
`;

export const LoginBox = styled.div`
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: center;
`;

export const Items = styled.div`
  width: 420px;
  display: flex;
  align-items: center;
  margin: ${(props) => props.margin || "10px 0"};
  justify-content: ${(props) => props.justify || "flex-start"};
  font-size: ${(props) => props.fontSize || "inherit"};
  color: ${(props) => props.color || "inherit"};

  ${(props) =>
    props.variant === "title" &&
    css`
      font-size: 28px;
      margin-bottom: 24px;
      justify-content: center;
      font-weight: 700;
    `}

  ${(props) =>
    props.variant === "hint" &&
    css`
      margin-top: -6px;
      justify-content: flex-end;
      font-size: 12px;
      color: #999999;
    `}
`;
