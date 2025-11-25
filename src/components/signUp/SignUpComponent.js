import styled, { css } from "styled-components";

export const Container = styled.div`
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  background: #ffffff;

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

// export const TabButton = styled.button`
//   min-width: 80px;
//   padding: 6px 14px;
//   border-radius: 6px;
//   border: 1px solid #dddddd;
//   background: #ffffff;
//   font-size: 13px;
//   cursor: pointer;

//   ${({ active }) =>
//     active &&
//     css`
//       background: #5b4bff;
//       color: #ffffff;
//       border-color: #5b4bff;
//     `}
// `;

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
  &:hover {
    color: white;
  }
`;
export const LoginBox = styled.div`
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: center;
`;
export const FormWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 500px; /* 폼 폭 */
  margin: 0 auto; /* 가운데 배치 */
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
  margin: ${(props) => props.margin || "4px"};
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
      width: 400px; /* 입력창과 동일한 폭 */
      margin: 2px auto 8px; /* 🔥 입력창 아래 간격 좁게 */
      display: flex;
      justify-content: flex-end; /* 오른쪽 정렬 */
      font-size: 12px;
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
