// src/components/profile/ProfileComponent.js
import styled from "styled-components";

export const Container = styled.div`
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  background: #fafafa;
  padding: 40px 16px;
`;

export const Title = styled.h1`
  font-size: 28px;
  font-weight: 700;
  margin-bottom: 24px;
`;

export const FormBox = styled.form`
  width: 100%;
  max-width: 520px;
  background: #fff;
  border-radius: 18px;
  padding: 32px 28px 28px;
  box-shadow: 0 4px 16px rgba(0, 0, 0, 0.06);
`;

export const Row = styled.div`
  display: flex;
  flex-direction: column;
  margin-bottom: 16px;
  position: relative;
`;

export const Label = styled.label`
  font-size: 14px;
  margin-bottom: 6px;
  font-weight: 600;
`;

export const ErrorText = styled.span`
  position: absolute;
  right: 4px;
  bottom: -18px;
  font-size: 11px;
  color: #ff4d4f;
`;

export const ButtonRow = styled.div`
  display: flex;
  justify-content: flex-end;
  gap: 8px;
  margin-top: 16px;
`;
