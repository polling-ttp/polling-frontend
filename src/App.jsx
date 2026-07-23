import "./App.css";
import Home from "./pages/Home";
import { Routes, Route } from "react-router-dom";
import PollDetails from "./pages/PollDetails";
import NavBar from "./components/Navbar"

function App() {
  return (
    <div>
      <NavBar />
      <h1>Poll App</h1>
      <Routes>
        <Route path="/" element={<Home />}></Route>
        {/* <Route path="/create" element={<CreatePoll />} /> */}
        <Route path="/polls/:id" element={<PollDetails />}></Route>
      </Routes>
    </div>
  );
}

export default App;
