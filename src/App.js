import { BrowserRouter, Routes, Route } from "react-router-dom";
import Layout from "./components/layout/Layout";
import SignUp from "./pages/SignUp";
import LogIn from "./pages/LogIn";
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
import CreatePostPage from "./pages/CreatePostPage";
import PostDetailPage from "./pages/PostDetailPage";
import NoticeWritePage from "./pages/Notice/NoticeCreatePage";
import NoticeDetailPage from "./pages/Notice/NoticeDetailPage";
import NoticeEditPage from "./pages/Notice/NoticeEditPage";
import NoticeListPage from "./pages/Notice/NoticeListPage";
import TodoPage from "./pages/TodoPage";
import { TodoProvider } from "./context/TodoContext";
import { UserProvider } from "./context/UserContext";
import BoardInsightPage from "./pages/BoardInsightPage";
import MemberInsightPage from "./pages/MemberInsightPage";

function App() {
  return (
    <UserProvider>
      <TeamProvider>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<LogIn />} />
            <Route path="/signup" element={<SignUp />} />

            <Route path="/admin/" element={<Members />} />
            <Route path="/admin/:email" element={<MemberDetails />} />

            <Route
              element={
                <TodoProvider>
                  <Layout />
                </TodoProvider>
              }
            >
              <Route path="/home" element={<Home />} />
              <Route path="/teams/new" element={<TeamCreate />} />

              <Route path="/teams/:teamId" element={<TeamDetail />} />
              <Route path="/teamentry/:token" element={<TeamEntry />} />
              <Route path="/team/invite" element={<TeamInvite />} />
              <Route path="/team/:teamId" element={<TeamPage />} />
              <Route path="/team/dashboard" element={<TeamDashboard />} />
              <Route path="/team/entry" element={<TeamLink />} />
              <Route path="/schedulepage" element={<SchedulePage />} />
              <Route path="/profiledetail" element={<ProfileDetail />} />
              <Route path="/profile" element={<Profile />} />
              <Route
                path="/team/:teamId/board/:boardId"
                element={<BoardPage />}
              />
              <Route path="notice" element={<NoticeListPage />} />
              <Route path="notice/create" element={<NoticeWritePage />} />
              <Route
                path="notice/detail/:noticeId"
                element={<NoticeDetailPage />}
              />
              <Route
                path="notice/edit/:noticeId"
                element={<NoticeEditPage />}
              />

              <Route
                path="/post/create/:boardId"
                element={<CreatePostPage />}
              />
              <Route path="/post/detail/:postId" element={<PostDetailPage />} />

              <Route path="/team/:teamId/todo" element={<TodoPage />} />
              <Route
                path="/boards/:boardId/insight"
                element={<BoardInsightPage />}
              />
              <Route
                path="/boards/:boardId/insight/member/:userId"
                element={<MemberInsightPage />}
              />
            </Route>
          </Routes>
        </BrowserRouter>
      </TeamProvider>
    </UserProvider>
  );
}

export default App;
