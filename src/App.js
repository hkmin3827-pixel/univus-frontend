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
          <Route path="/signup" element={<SignUp />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
