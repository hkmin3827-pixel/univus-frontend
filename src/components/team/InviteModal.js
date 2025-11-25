import "../../styles/Modal.css";
import styled from "styled-components";

const Msg = styled.h6`
  font-weight: normal;
`;

const InviteModal = ({ link, onClose, isOpen }) => {
  if (!isOpen || !link) return null;

  const copy = () => {
    navigator.clipboard.writeText(link);
    alert("초대 링크가 복사되었습니다.");
  };

  return (
    <div className="modal-overlay">
      <div className="modal-box">
        <h2>초대 링크</h2>
        <Msg>현재 발급된 링크는 3일 뒤에 만료됩니다.</Msg>
        <input type="text" value={link} readOnly />

        <div className="modal-actions">
          <button onClick={copy}>복사</button>
          <button onClick={onClose}>닫기</button>
        </div>
      </div>
    </div>
  );
};

export default InviteModal;
