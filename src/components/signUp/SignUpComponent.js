import styled, { css } from "styled-components";

export const Container = styled.div`
  display: flex;
  flex-wrap: wrap;
  flex-direction: column;
  max-width: 700px;
  margin: auto;

  .footer {
    display: flex;
    position: absolute;
    background-color: blue;
    bottom: 0;
    left: 0;
    right: 0;
    height: 30px;
    color: #222;
    font-size: 0.8em;
    justify-content: center;
    align-items: center;
  }
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

export const RoleBox = styled.div`
  display: flex;
  align-items: center;
  gap: 20px;

  margin: 0 30px;
  margin-top: 10px;
  margin-bottom: 10px;
  width: 400px;

  padding: 1em; /* InputComponent와 동일 */

  border: 1px solid #999;
  border-radius: 18px;
  box-sizing: border-box;
`;

export const RoleOption = styled.label`
  display: flex;
  align-items: center;
  gap: 6px;
  font-size: 16px;
`;

export const Items = styled.div`
  display: flex;
  align-items: center;
  margin: ${(props) => props.margin || "10px"};
  justify-content: ${(props) => props.justify || "flex-start"};
  font-size: ${(props) => props.fontSize || "inherit"};
  color: ${(props) => props.color || "inherit"};

  ${(props) =>
    props.variant === "title" &&
    css`
      font-size: 30px;
      margin-top: 100px;
      margin-bottom: 40px;
      justify-content: center;
    `}

  ${(props) =>
    props.variant === "hint" &&
    css`
      margin-top: -5px;
      margin-bottom: 10px;
      justify-content: flex-end;
      font-size: 12px;
      color: #999;
    `}

  ${(props) =>
    props.variant === "signup" &&
    css`
      justify-content: flex-end;
      color: orange;
      font-weight: 700;
      margin-top: 10px;
      margin-right: 40px;
      font-size: 14px;

      .link_style {
        color: orange;
        text-decoration: none;
      }
    `}
`;
