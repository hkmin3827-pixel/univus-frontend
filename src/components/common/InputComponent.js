import styled from "styled-components";

const StyledInput = styled.input`
  width: 100%; /* 부모(Items)가 준 너비만큼 꽉 채움 */
  padding: 14px 18px; /* 안쪽 여백 */
  border: 1px solid #d1d5db;
  border-radius: 18px;
  outline: none;
  font-size: 15px;
  box-sizing: border-box; /* padding 포함하여 width 계산 */

  &:focus {
    border-color: #5f5fff;
    box-shadow: 0 0 0 3px rgba(95, 95, 255, 0.2);
  }
`;

const InputComponent = ({ type, value, onChange, placeholder }) => {
  return (
    <StyledInput
      type={type}
      placeholder={placeholder}
      value={value}
      onChange={onChange}
    />
  );
};

export default InputComponent;
