import { BrowserRouter, Routes, Route } from "react-router-dom";
import Layout from "./components/layout/Layout";
import SignUp from "./pages/SignUp";
import LogIn from "./pages/LogIn";
import BoardPage from "./pages/BoardPage";
import { TeamProvider } from "./context/TeamContext";
import Home from "./pages/Home";
import Members from "./pages/Admin/Members";
import TeamCreate from "./pages/TeamCreate";
import MemberDetails from "./pages/Admin/MembersDetail";
import Profile from "./pages/Profile";
import ProfileDetail from "./pages/ProfileDetail";
import SchedulePage from "./pages/SchedulePage";
import TeamEntry from "./pages/TeamEntry";
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
import EditPostPage from "./pages/EditPostPage";
import MemberInsightPage from "./pages/MemberInsightPage";
import TeamInfo from "./pages/TeamInfo";
import UserProfile from "./pages/UserProfile";
import TeamEdit from "./pages/TeamEdit";
import SearchResultsPage from "./pages/SearchResultsPage";
import { ActivityLogProvider } from "./context/ActivityLogContext";
import ActivityLog from "./pages/ActivityLog";
import TeamGuard from "./guards/TeamGuards";
import BoardGuard from "./guards/BoardGuards";
import PostGuard from "./guards/PostGuard";
import NoticeGuard from "./guards/NoticeGuards";

function App() {
  return (
    <BrowserRouter>
      <UserProvider>
        <TeamProvider>
          <ActivityLogProvider>
            <TodoProvider>
              <Routes>
                <Route path="/" element={<LogIn />} />
                <Route path="/signup" element={<SignUp />} />

                <Route path="/admin/" element={<Members />} />
                <Route path="/admin/:email" element={<MemberDetails />} />

                <Route element={<Layout />}>
                  <Route path="/home" element={<Home />} />
                  <Route path="/teams/new" element={<TeamCreate />} />
                  <Route path="/teamentry/:token" element={<TeamEntry />} />
                  <Route path="/team/entry" element={<TeamLink />} />
                  <Route path="/profile" element={<Profile />} />

                  <Route element={<TeamGuard />}>
                    <Route path="/team/:teamId" element={<TeamPage />} />
                    <Route path="/team/:teamId/info" element={<TeamInfo />} />
                    <Route path="/team/:teamId/edit" element={<TeamEdit />} />
                    <Route
                      path="/team/:teamId/userprofile/:userId"
                      element={<UserProfile />}
                    />
                    <Route
                      path="/team/:teamId/activity"
                      element={<ActivityLog />}
                    />
                    <Route
                      path="/team/:teamId/notice"
                      element={<NoticeListPage />}
                    />
                    <Route
                      path="/team/:teamId/notice/create"
                      element={<NoticeWritePage />}
                    />

                    {/* NoticeGuard */}
                    <Route element={<NoticeGuard />}>
                      <Route
                        path="/team/:teamId/notice/detail/:noticeId"
                        element={<NoticeDetailPage />}
                      />
                      <Route
                        path="/team/:teamId/notice/edit/:noticeId"
                        element={<NoticeEditPage />}
                      />
                    </Route>

                    {/* BoardGuard */}
                    <Route element={<BoardGuard />}>
                      <Route
                        path="/team/:teamId/board/:boardId"
                        element={<BoardPage />}
                      />
                      <Route
                        path="/team/:teamId/board/:boardId/todo"
                        element={<TodoPage />}
                      />
                      <Route
                        path="/team/:teamId/boards/:boardId/insight"
                        element={<BoardInsightPage />}
                      />
                      <Route
                        path="/team/:teamId/boards/:boardId/insight/member/:userId"
                        element={<MemberInsightPage />}
                      />
                      <Route
                        path="/team/:teamId/board/:boardId/post/create"
                        element={<CreatePostPage />}
                      />
                      {/* PostGuard */}
                      <Route element={<PostGuard />}>
                        <Route
                          path="/team/:teamId/board/:boardId/post/detail/:postId"
                          element={<PostDetailPage />}
                        />
                        <Route
                          path="/team/:teamId/board/:boardId/posts/:postId/edit"
                          element={<EditPostPage />}
                        />
                      </Route>
                    </Route>
                  </Route>

                  <Route path="/search" element={<SearchResultsPage />} />
                  <Route path="/schedulepage" element={<SchedulePage />} />
                  <Route path="/profiledetail" element={<ProfileDetail />} />
                </Route>
              </Routes>
            </TodoProvider>
          </ActivityLogProvider>
        </TeamProvider>
      </UserProvider>
    </BrowserRouter>
  );
}

export default App;
