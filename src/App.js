import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import SignUp from "./pages/SignUp";
import LogIn from "./pages/LogIn";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LogIn />} />
        <Route path="/signup" element={<SignUp />} />
        {/* <Route path="/team/create" element={<TeamCreate/>}/> */}
        {/* <Route path="/team/entry" element={<TeamEntry/>}/> */}
      </Routes>
    </Router>
  );
}

export default App;
