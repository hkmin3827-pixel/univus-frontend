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
import ProfileDetail from "./pages/ProfileDetail";
import SchedulePage from "./pages/SchedulePage";
import TeamEntry from "./pages/TeamEntry";
import TeamDetail from "./pages/TeamDetail";
import TeamPage from "./pages/TeamPage";
import TeamLink from "./pages/TeamLink";

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
            <Route path="/teams/new" element={<TeamCreate />} />

            <Route path="/teams/:teamId" element={<TeamDetail />} />
            <Route path="/teamentry/:token" element={<TeamEntry />} />
            <Route path="/team/invite" element={<TeamInvite />} />
            <Route path="/team/dashboard" element={<TeamDashboard />} />
            <Route path="/team/entry" element={<TeamLink />} />
            <Route path="/schedulepage" element={<SchedulePage />} />
            <Route path="/profiledetail" element={<ProfileDetail />} />
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
