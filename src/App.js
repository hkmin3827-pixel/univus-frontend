import { BrowserRouter, Routes, Route } from "react-router-dom";
import Layout from "./components/layout/Layout";
import SignUp from "./pages/SignUp";
import LogIn from "./pages/LogIn";
import Post from "./pages/Post";
import PostWrite from "./components/post/PostWrite";
import BoardPage from "./pages/BoardPage";
import { TeamProvider } from "./context/TeamContext";
import Home from "./pages/Home";
import Members from "./pages/Admin/Members";
import TeamCreate from "./pages/TeamCreate";
import TeamInvite from "./pages/TeamInvite";
import TeamDashboard from "./pages/TeamDashboard";
import MemberDetails from "./pages/Admin/MembersDetail";
import Profile from "./pages/Profile";
import SchedulePage from "./pages/SchedulePage";

function App() {
  return (
    <TeamProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<LogIn />} />
          <Route path="/signup" element={<SignUp />} />

          <Route path="/admin/members" element={<Members />} />
          <Route path="/admin/members/:email" element={<MemberDetails />} />

          <Route element={<Layout />}>
            <Route path="/home" element={<Home />} />
            <Route path="/team/create" element={<TeamCreate />} />
            <Route path="/team/invite" element={<TeamInvite />} />
            <Route path="/team/dashboard" element={<TeamDashboard />} />
            <Route path="/schedule" element={<SchedulePage />} />

            <Route path="/profile" element={<Profile />} />
            <Route
              path="/team/:teamId/board/:boardId"
              element={<BoardPage />}
            />
            <Route path="/post" element={<Post />} />
            <Route path="/post/create" element={<PostWrite />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </TeamProvider>
  );
}

export default App;
