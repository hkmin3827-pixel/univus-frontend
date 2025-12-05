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

                  <Route
                    path="/teams/:teamId"
                    element={
                      <TeamGuard>
                        <TeamDetail />
                      </TeamGuard>
                    }
                  />
                  <Route path="/teamentry/:token" element={<TeamEntry />} />
                  <Route
                    path="/team/:teamId"
                    element={
                      <TeamGuard>
                        <TeamPage />
                      </TeamGuard>
                    }
                  />
                  <Route path="/team/entry" element={<TeamLink />} />
                  <Route
                    path="/team/:teamId/info"
                    element={
                      <TeamGuard>
                        <TeamInfo />
                      </TeamGuard>
                    }
                  />
                  <Route
                    path="/teams/:teamId/edit"
                    element={
                      <TeamGuard>
                        <TeamEdit />
                      </TeamGuard>
                    }
                  />
                  <Route path="/schedulepage" element={<SchedulePage />} />
                  <Route path="/profiledetail" element={<ProfileDetail />} />
                  <Route
                    path="/userprofile/:userId"
                    element={<UserProfile />}
                  />
                  <Route path="/profile" element={<Profile />} />
                  <Route
                    path="/team/:teamId/board/:boardId"
                    element={
                      <TeamGuard>
                        <BoardGuard>
                          <BoardPage />
                        </BoardGuard>
                      </TeamGuard>
                    }
                  />
                  <Route
                    path="/team/:teamId/board/:boardId/post/create"
                    element={
                      <TeamGuard>
                        <BoardGuard>
                          <CreatePostPage />
                        </BoardGuard>
                      </TeamGuard>
                    }
                  />
                  <Route
                    path="/team/:teamId/board/:boardId/post/detail/:postId"
                    element={
                      <TeamGuard>
                        <BoardGuard>
                          <PostGuard>
                            <PostDetailPage />
                          </PostGuard>
                        </BoardGuard>
                      </TeamGuard>
                    }
                  />
                  <Route
                    path="/team/:teamId/board/:boardId/posts/:postId/edit"
                    element={
                      <TeamGuard>
                        <BoardGuard>
                          <PostGuard>
                            <EditPostPage />
                          </PostGuard>
                        </BoardGuard>
                      </TeamGuard>
                    }
                  />
                  <Route
                    path="/team/:teamId/notice"
                    element={
                      <TeamGuard>
                        <NoticeListPage />
                      </TeamGuard>
                    }
                  />
                  <Route
                    path="/team/:teamId/notice/create"
                    element={
                      <TeamGuard>
                        <NoticeWritePage />
                      </TeamGuard>
                    }
                  />
                  <Route
                    path="/team/:teamId/notice/detail/:noticeId"
                    element={
                      <TeamGuard>
                        <NoticeGuard>
                          <NoticeDetailPage />
                        </NoticeGuard>
                      </TeamGuard>
                    }
                  />
                  <Route
                    path="/team/:teamId/notice/edit/:noticeId"
                    element={
                      <TeamGuard>
                        <NoticeGuard>
                          <NoticeEditPage />
                        </NoticeGuard>
                      </TeamGuard>
                    }
                  />

                  <Route
                    path="/team/:teamId/board/:boardId/todo"
                    element={
                      <TeamGuard>
                        <BoardGuard>
                          <TodoPage />
                        </BoardGuard>
                      </TeamGuard>
                    }
                  />

                  <Route
                    path="/team/:teamId/boards/:boardId/insight"
                    element={
                      <TeamGuard>
                        <BoardGuard>
                          <BoardInsightPage />
                        </BoardGuard>
                      </TeamGuard>
                    }
                  />
                  <Route
                    path="/team/:teamId/boards/:boardId/insight/member/:userId"
                    element={
                      <TeamGuard>
                        <BoardGuard>
                          <MemberInsightPage />
                        </BoardGuard>
                      </TeamGuard>
                    }
                  />
                  <Route path="/search" element={<SearchResultsPage />} />
                  <Route
                    path="/team/:teamId/activity"
                    element={
                      <TeamGuard>
                        <ActivityLog />
                      </TeamGuard>
                    }
                  />
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
