import { useNavigate } from "react-router-dom";
import "../../styles/NoticesList.css";

function NoticesList({ notices }) {
  const navigate = useNavigate();
  const formatDateTime = (dateTimeString) => {
    if (!dateTimeString) return "";
    const [datePart, timeWithMs] = dateTimeString.split("T");
    if (!timeWithMs) return datePart;
    const timePart = timeWithMs.split(".")[0];
    return `${datePart} ${timePart}`;
  };

  const handleClick = (noticeId) => {
    navigate(`/notice/detail/${noticeId}`);
  };

  return (
    <div className="notice-list-box">
      <h3>📢 공지사항</h3>
      {notices.length === 0 ? (
        <p className="empty">등록된 공지사항이 없습니다.</p>
      ) : (
        notices.map((item, index) => (
          <div
            key={item.id}
            className="notice-list-item"
            onClick={() => handleClick(item.id)}
            style={{ cursor: "pointer" }}
          >
            <p className={`title ${index === 0 ? "newest" : ""}`}>
              {item.title}
            </p>
            <p className="date">{formatDateTime(item.createTime)}</p>
          </div>
        ))
      )}
    </div>
  );
}

export default NoticesList;
