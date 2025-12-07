import "../../styles/Modal.css";
import styled from "styled-components";

const Msg = styled.h6`
  font-weight: normal;
`;

const Button = styled.button`
  padding: 8px 16px;
  border: none;
  border-radius: 8px;
  cursor: pointer;
  font-weight: 600;
  color: white;
  background-color: ${(props) =>
    props.variant === "secondary" ? "#ccc" : "#5f52ff"};
  &:hover {
    background-color: ${(props) =>
      props.variant === "secondary" ? "#999" : "#4538d3"};
  }
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
        <input
          type="text"
          value={link}
          readOnly
          onClick={(e) => e.target.select()}
        />

        <div className="modal-actions">
          <Button onClick={copy}>복사</Button>
          <Button onClick={onClose} variant="secondary">
            닫기
          </Button>
        </div>
      </div>
    </div>
  );
};

export default InviteModal;
