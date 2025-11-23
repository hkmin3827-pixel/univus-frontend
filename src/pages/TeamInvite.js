import { useEffect, useState } from "react";
import TeamApi from "../api/TeamApi";
import TeamInvitePopup from "./TeamInvitePopup";

const TeamInvite = () => {
  const [invites, setInvites] = useState([]);

  const email = "test@example.com"; // 기본 이메일 (로그인 구현 전용)

  const fetchInvites = async () => {
    try {
      const res = await TeamApi.getInvites(email);
      setInvites(res.data);
    } catch (err) {
      console.log("초대 목록 불러오기 실패", err);
    }
  };

  const handleAccept = async (id) => {
    await TeamApi.acceptInvite(id);
    setInvites((prev) => prev.filter((inv) => inv.inviteId !== id));
  };

  const handleDecline = async (id) => {
    await TeamApi.declineInvite(id);
    setInvites((prev) => prev.filter((inv) => inv.inviteId !== id));
  };

  useEffect(() => {
    fetchInvites();
  }, []);

  return (
    <>
      {invites.map((invite) => (
        <TeamInvitePopup
          key={invite.inviteId}
          invite={invite}
          onAccept={handleAccept}
          onDecline={handleDecline}
        />
      ))}
    </>
  );
};

export default TeamInvite;
