import { useContext, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import TeamApi from "../api/TeamApi";
import { TeamContext } from "../context/TeamContext";

export default function useTeamGuard() {
  const navigate = useNavigate();
  const { teamId } = useParams();
  const { myTeams, setSelectedTeam } = useContext(TeamContext);
  useEffect(() => {
    const validate = async () => {
      try {
        await TeamApi.getTeam(teamId); // 팀 조회 (백엔드 예외 발생 시 catch 이동)
      } catch (err) {
        const message =
          err.response?.data?.message ||
          err.response?.data ||
          "팀 정보 조회에 실패하였습니다.";

        alert(message);
        if (myTeams.length > 0) {
          setSelectedTeam(myTeams[0]);
          localStorage.setItem("recentTeamId", myTeams[0].id);
          navigate(`/team/${myTeams[0].id}`);
        } else {
          setSelectedTeam(null);
          navigate("/home");
        }
      }
    };

    validate();
  }, [teamId]);
}
