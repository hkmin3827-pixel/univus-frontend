import { useState, useEffect } from "react";
import AxiosApi from "../../api/AxiosApi";
import { useNavigate } from "react-router-dom";

const Members = () => {
  const navigate = useNavigate();
  const [members, setMembers] = useState([]);

  useEffect(() => {
    const isLogin = localStorage.getItem("isLogin");
    const role = localStorage.getItem("role"); // "ADMIN" / "STUDENT" / "PROFESSOR"

    // 로그인 안 했거나 ADMIN이 아니면 접근 차단
    if (isLogin !== "TRUE" || role !== "ADMIN") {
      alert("관리자만 접근 가능합니다.");
      navigate("/home", { replace: true }); // 메인 또는 로그인 등으로 보내기 (replace: true는 사용자가 뒤로가기로 다시 돌아오는걸 막기 위해)
      return;
    }

    const getMembers = async () => {
      try {
        const response = await AxiosApi.members();
        setMembers(response.data);
      } catch (e) {
        alert("서버가 응답하지 않습니다.");
      }
    };

    getMembers();
  }, []);

  return (
    <>
      {/* members 렌더링 영역 */}
    </>
  );
};

export default Members;
