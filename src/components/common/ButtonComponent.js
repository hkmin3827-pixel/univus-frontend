import styled, { css } from "styled-components";

const StyledButton = styled.button`
  margin: 100px 30px 0;
  font-weight: bold;
  width: 400px;
  height: 52px;
  color: white;
  background-color: #999;
  font-size: 15px;
  border-radius: 18px;
  border: orange;
  font-weight: 700;
  cursor: pointer;

  ${(props) =>
    props.enabled &&
    css`
      background-color: #5b4bff;
    `}

  &:active {
    border: #999;
    font-weight: 700px;
    background-color: #999;
  }
`;

const ButtonComponent = ({ enabled, onClick, children }) => {
  return (
    <StyledButton enabled={enabled} onClick={onClick}>
      {children}
    </StyledButton>
  );
};

export default ButtonComponent;
