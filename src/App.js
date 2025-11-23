import { BrowserRouter, Routes, Route } from "react-router-dom";
import Layout from "./components/layout/Layout";
import SignUp from "./pages/SignUp";
import LogIn from "./pages/LogIn";
<<<<<<< HEAD
import Post from "./pages/Post";
import PostWrite from "./components/post/PostWrite";
import BoardPage from "./pages/BoardPage";
import { TeamProvider } from "./context/TeamContext";

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
    <TeamProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<LogIn />} />
          <Route path="/signup" element={<SignUp />} />
          <Route element={<Layout />}>
            <Route path="team/:teamId/board/:boardId" element={<BoardPage />} />
            <Route path="/post" element={<Post />} />
            <Route path="/post/create" element={<PostWrite />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </TeamProvider>
=======
import Home from "./pages/Home";
import Members from "./pages/Admin/Members";
import TeamCreate from "./pages/TeamCreate";
import TeamInvite from "./pages/TeamInvite";
import TeamDashboard from "./pages/TeamDashboard";
import MemberDetails from "./pages/Admin/MembersDetail";
import Profile from "./pages/Profile";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<LogIn />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/admin/members" element={<Members />} />
        <Route path="/admin/members/:email" element={<MemberDetails />} />

        <Route element={<Layout />}>
          {/* 레이아웃 확인하시라고 로그인+회원가입 창 Outlet에 넣어두었습니다. 추후 로그인/회원가입은 따로 뺄 예정 */}
          <Route path="/home" element={<Home />} />
          <Route path="/team/create" element={<TeamCreate />} />
          <Route path="/team/invite" element={<TeamInvite />} />
          <Route path="/team/dashboard" element={<TeamDashboard />} />
          <Route path="/profile" element={<Profile />} />
        </Route>
      </Routes>
    </BrowserRouter>
>>>>>>> 501c3610a796c4669db0cd3b6926c3a782c0ff6c
  );
}

export default App;
