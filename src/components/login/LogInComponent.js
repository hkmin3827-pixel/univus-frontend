// src/components/login/LogInComponent.js
import styled, { css } from "styled-components";

export const Container = styled.div`
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  background: #ffffff;
`;

// 상단 오른쪽 로그인/회원가입 탭
export const TopMenu = styled.header`
  height: 72px;
  padding: 0 80px;
  display: flex;
  justify-content: flex-end;
  align-items: center;
  gap: 8px;
`;

export const TabButton = styled.button`
  min-width: 90px;
  padding: 8px 18px;
  border-radius: 999px;
  border: 1px solid #5b5ef7;
  background: ${(props) => (props.active ? "#5b5ef7" : "#ffffff")};
  color: ${(props) => (props.active ? "#ffffff" : "#5b5ef7")};
  font-size: 13px;
  font-weight: 600;
  cursor: pointer;
`;

// 로그인 박스 전체 영역 (중앙 위쪽에 위치)
export const LoginBox = styled.main`
  flex: 1;
  display: flex;
  justify-content: center; /* 가로 가운데 */
  align-items: flex-start; /* 세로는 약간 위쪽 */
  padding-top: 70px; /* 제목과의 거리 */
`;

// 각 줄 컨테이너
export const Items = styled.div`
  margin: ${(props) => props.margin || "10px 0"};
  display: flex;
  justify-content: ${(props) => props.justify || "flex-start"};
  width: 100%;

  ${(props) =>
    props.variant === "title" &&
    css`
      justify-content: center;
      font-size: 28px;
      font-weight: 700;
      margin: 40px 0 32px;
    `}

  ${(props) =>
    props.variant === "hint" &&
    css`
      margin: 4px 30px 0;
      font-size: 12px;
      justify-content: flex-start;
    `}
`;
