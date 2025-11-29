// src/components/common/ButtonComponent.js
import styled, { css } from "styled-components";

const StyledButton = styled.button`
  width: 100%;
  padding: 14px 16px;
  border-radius: 999px;
  border: none;
  font-size: 15px;
  font-weight: 600;
  color: #ffffff;
  cursor: pointer;
  transition: all 0.2s ease;
  margin-top: 10px;

  ${(props) =>
    props.disabled &&
    css`
      background: #d1d5db;
      cursor: not-allowed;
      box-shadow: none;
    `}

  ${(props) =>
    props.enabled &&
    css`
      background: #5f5fff;
      box-shadow: 0 12px 30px rgba(95, 95, 255, 0.35);

      &:hover {
        transform: translateY(-1px);
        box-shadow: 0 16px 36px rgba(95, 95, 255, 0.45);
      }
    `}
`;

const ButtonComponent = ({ children, enabled, disabled, ...rest }) => {
  return (
    <StyledButton enabled={enabled} disabled={disabled} {...rest}>
      {children}
    </StyledButton>
  );
};

export default ButtonComponent;
