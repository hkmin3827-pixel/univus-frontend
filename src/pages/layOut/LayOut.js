import {Outlet} from "react-router-dom";
import {useContext, useState} from "react";


const LayOut = () => {
  const [isActLogOpen, setIsActLogOpen] = useState(false);   // 활동로그 알림창 열기 / 닫기
  const context = useContext();   // 전역 상태 관리
  
  return (
    <>
      <header>

      </header>
      <main>
        <Outlet/>
      </main>
      <footer>

      </footer>
    </>
  );
}