import styled from "styled-components";

const StyledInput = styled.input`
  margin: 0 30px;
  margin-top: 10px;
  margin-bottom: 10px;
  width: 440px;
  height: auto;
  line-height: normal;
  padding: 1em;
  border: 1px solid #999;
  border-radius: 18px;
  outline-style: none;
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
