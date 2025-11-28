// src/components/profile/ProfileComponent.js
import styled from "styled-components";

export const Container = styled.div`
  width: 100%;
  height: 100%;
  padding: 32px 40px;
  box-sizing: border-box;
  background: #f5f7ff; /* 메인 배경색 (필요하면 레이아웃 배경에 맞춰 조정) */
`;

// 카드 전체를 감싸는 박스
export const FormBox = styled.form`
  /* 🔥 프로필 조회에서도 쓰고, 수정에서도 같은 카드 사용 */
  max-width: 800px; // 720 → 880 처럼 넓게 (원하는 값으로 조절)
  width: 100%;
  margin: 0 auto;
  background: #ffffff;
  border-radius: 24px;
  padding: 32px 40px 28px;
  box-shadow: 0 18px 60px rgba(15, 23, 42, 0.06);
  display: flex;
  flex-direction: column;
  gap: 12px;
  box-sizing: border-box;
`;

// 상단 "회원 정보" 타이틀
export const Title = styled.h2`
  font-size: 24px;
  font-weight: 700;
  text-align: center;
  margin: 4px 0 20px;
  color: #111827;
`;

// 섹션 제목 (기본 정보 / 학생 정보 / 교수 정보)
export const SectionTitle = styled.h3`
  font-size: 15px;
  font-weight: 600;
  margin: 8px 0 4px;
  color: #4b5563;
`;

// 한 줄: 라벨 + 값
// 라벨: 항상 한 줄, 고정 너비
export const Label = styled.span`
  width: 70px; /* 라벨 가로폭 (원하면 80~90으로 조절 가능) */
  font-size: 14px;
  color: #6b7280;
  flex-shrink: 0;
  white-space: nowrap; /* 🔥 "이메일"이 줄바꿈 안 되도록 */
`;

// 한 줄: 라벨 + 값(또는 인풋)
export const Row = styled.div`
  display: flex;
  align-items: center;
  gap: 16px;
  padding: 10px 0;
  border-bottom: 1px solid #f3f4f6;

  &:last-child {
    border-bottom: none;
  }

  /* 🔥 두 번째 요소(값/인풋)를 가로로 꽉 차게 */
  & > :nth-child(2) {
    flex: 1;
  }
`;

export const Value = styled.span`
  font-size: 14px;
  font-weight: 500;
  color: #111827;
`;

// 에러 문구
export const ErrorText = styled.p`
  margin-top: 8px;
  font-size: 13px;
  color: #ef4444;
  text-align: center;
`;

// 버튼 영역 (오른쪽 정렬)
export const ButtonRow = styled.div`
  margin-top: 20px;
  display: flex;
  justify-content: flex-end;
`;
