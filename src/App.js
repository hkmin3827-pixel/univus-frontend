import { BrowserRouter, Routes, Route } from "react-router-dom";
import Layout from "./components/layout/Layout";
import SignUp from "./pages/SignUp";
import LogIn from "./pages/LogIn";
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
  );
}

export default App;
