import { useState, useEffect } from "react";
import AxiosApi from "../../api/AxiosApi";
import { useNavigate } from "react-router-dom";

//관리자 권한 계정 수정 페이지

const Members = () => {
    const navigate = useNavigate();
    const [members, setMembers] = useState([]);
    const isLogin = localStorage.getItem("isLogin");
    
    if(isLogin !== "True") navigate("/"); //로그인 안되어있을 시 로그인 페이지로 전송

    useEffect(() => {
    const getMembers = async () => {
      try {
        const response = await AxiosApi.members();
        console.log(response.data);
        setMembers(response.data);
      } catch (e) {
        alert("서버가 응답하지 않습니다.");
      }
    };
    getMembers();
  }, []);

  //회원 상세 보기로 이동
  const onClickMember = (email) => {
    console.log("클릭된 회원 : " + email);
    
  }

    return(
        <>
        </>
    );
}
export default Members;