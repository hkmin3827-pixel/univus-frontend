import { useState } from "react";
import { useNavigate } from "react-router-dom";
import TeamApi from "../api/TeamApi";
import "../styles/TeamCreate.css"; // UI 통일
const extractToken = (value) => {
  if (!value) return "";
  return value.includes("/")
    ? value.substring(value.lastIndexOf("/") + 1)
    : value;
};

function TeamLink() {
  const [token, setToken] = useState("");
  const [inviteInfo, setInviteInfo] = useState(null);
  const [errorMsg, setErrorMsg] = useState("");

  const navigate = useNavigate();

  // 초대 정보 조회
  const handleCheckInvite = async () => {
    setInviteInfo(null);
    setErrorMsg("");

    if (!token || token.trim() === "") {
      setErrorMsg("초대 링크를 입력해주세요.");
      return;
    }

    try {
      const res = await TeamApi.getInviteInfo(token);
      setInviteInfo(res.data);
    } catch (err) {
      console.error(err);

      const message =
        err.response?.data?.message ||
        err.response?.data ||
        "유효하지 않은 초대 링크입니다.";

      setErrorMsg(message);
    }
  };

  // 초대 수락 / 팀 가입
  const handleAccept = async () => {
    try {
      await TeamApi.acceptInvite(token);
      alert("🎉 가입이 완료되었습니다!");
      navigate("/home"); // 🔥 요청한대로 가입 성공 시 홈 이동
    } catch (err) {
      console.error(err);

      const message =
        err.response?.data?.message ||
        err.response?.data ||
        "가입 처리 중 오류가 발생했습니다.";

      setErrorMsg(message);
    }
  };

  return (
    <div className="team-create-container">
      <h2 className="team-title">팀 가입</h2>
      <div className="team-content-wrapper">
        <form
          className="team-form"
          onSubmit={(e) => {
            e.preventDefault(); // 새로고침 방지
            handleCheckInvite();
          }}
        >
          <div className="form-control">
            <label>초대 링크 코드 : </label>

            <input
              type="text"
              placeholder="초대 링크 입력"
              value={token}
              onChange={(e) => setToken(extractToken(e.target.value))}
              className="invite-input"
            />
          </div>
          <button
            type="submit"
            className="primary-btn"
            onClick={handleCheckInvite}
          >
            조회
          </button>

          {/* 에러 메시지 고정 위치 */}
          <p className="error-text">{errorMsg}</p>
        </form>

        {/* 초대 정보 보여주기 (조회 성공 시만 표시) */}
        {inviteInfo && (
          <div className="invite-info-box">
            <p>
              <strong>팀 이름 :</strong> {inviteInfo.teamName}
            </p>
            <p>
              <strong>Leader :</strong> {inviteInfo.inviterName} (
              {inviteInfo.inviterEmail})
            </p>

            {!inviteInfo.expired && (
              <button className="primary-btn" onClick={handleAccept}>
                팀 가입하기
              </button>
            )}
          </div>
        )}
      </div>
    </div>
  );
}

export default TeamLink;
