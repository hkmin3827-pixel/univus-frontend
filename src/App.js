import { BrowserRouter, Routes, Route } from "react-router-dom";
import Layout from "./components/layout/Layout";
import SignUp from "./pages/SignUp";
import LogIn from "./pages/LogIn";

function App() {
  return (
    // <Router>
    //   <Routes>
    //     <Route path="/" element={<LogIn />} />
    //     <Route path="/signup" element={<SignUp />} />
    //     {/* <Route path="/team/create" element={<TeamCreate/>}/> */}
    //     {/* <Route path="/team/entry" element={<TeamEntry/>}/> */}
    //   </Routes>
    // </Router>

    <BrowserRouter>
      <Routes>
        <Route element={<Layout />}>
          <Route path="/" element={<LogIn />} />
          {/* 레이아웃 확인하시라고 로그인+회원가입 창 Outlet에 넣어두었습니다. 추후 로그인/회원가입은 따로 뺄 예정 */}
          <Route path="/signup" element={<SignUp />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
