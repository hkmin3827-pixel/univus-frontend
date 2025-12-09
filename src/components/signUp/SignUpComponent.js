import styled, { css } from "styled-components";

export const Container = styled.div`
  height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  background: rgba(245, 247, 255, 1);
  padding: 20px;
  overflow-y: auto;

  scrollbar-width: thin;
  scrollbar-color: #b0b5ff #f1f1f1;
`;

export const TopMenu = styled.header`
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
  box-sizing: border-box;
  /* margin-bottom: 20px; */
  .auth-buttons {
    display: flex;
    gap: 14px;
  }
  @media (max-width: 939px) {
    .logo {
      width: 140px;
    }
  }
`;

export const TabButton = styled.button`
  min-width: 90px;
  padding: 8px 10px;
  border-radius: 999px;
  border: 1px solid #5f5fff;
  background: ${(props) => (props.active ? "#5f5fff" : "#ffffff")};
  color: ${(props) => (props.active ? "#ffffff" : "#5f5fff")};
  font-size: 14px;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.2s ease;

  &:hover {
    box-shadow: 0 0 0 3px rgba(95, 95, 255, 0.18);
    transform: translateY(-1px);
  }
`;

export const FormWrapper = styled.main`
  flex: 1;
  width: 100%;
  display: flex;
  justify-content: center;
  /* 🔥 중앙 기준으로 조금 아래로 배치 */
  align-items: center;
  /* margin-top: 50px; */
  /* 10 → 80 (정확히 가운데~조금 아래로) */
  @media screen and (max-width: 939px) {
    & {
      margin-top: 10px;
    }
  }
`;

export const FormCard = styled.div`
  width: 100%;
  max-width: 520px; /* 살짝 넓게 */
  background: #ffffff;
  padding: 40px 46px 32px;
  border-radius: 28px;
  box-shadow: 0 20px 60px rgba(15, 23, 42, 0.08);
  display: flex;
  flex-direction: column;
  gap: 12px;
`;

export const Items = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;

  ${(props) =>
    props.variant === "title" &&
    css`
      align-items: center;
      margin-bottom: 16px;

      span {
        font-size: 30px;
        font-weight: 500;
        color: #322f2fff;
      }
      @media screen and (max-width: 939px) {
         span{
          font-size: 20px;
      }
    `}

  ${(props) =>
    props.variant === "item2" &&
    css`
      margin-bottom: 6px;
      @media screen and (max-width: 939px) {
        margin-bottom: 1px;
      }
    `}
    

  ${(props) =>
    props.variant === "hint" &&
    css`
      margin-top: -2px;
      margin-bottom: 4px;
      text-align: right;

      p {
        margin: 0;
        font-size: 12px;
        color: #ef4444;
        line-height: 1.3;
      }
    `}
`;

export const RoleBox = styled.div`
  display: flex;
  align-items: center;
  gap: 20px;
  padding: 10px 14px;
  border-radius: 999px;
  background: #f9fafb;
  border: 1px solid #e5e7eb;
`;

export const RoleOption = styled.label`
  display: flex;
  align-items: center;
  gap: 6px;
  font-size: 14px;
  color: #374151;
  cursor: pointer;

  input {
    accent-color: #5f5fff;
    cursor: pointer;
  }
`;
