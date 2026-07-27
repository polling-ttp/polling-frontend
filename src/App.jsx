import "./App.css";
import Home from "./pages/Home";
import { Routes, Route } from "react-router-dom";
import PollDetails from "./pages/PollDetails";
import Results from "./pages/Results";
import CreatePoll from "./components/CreatePoll";
import Navbar from "./components/NavBar";

function App() {
  return (
    // Fetch-file
    <div className="app-layout">
      <Navbar />
      <main className="app-content">
        <h1>Poll App</h1>
        <Routes>
          <Route path="/" element={<Home />}></Route>
          {/* <Route path="/create" element={<CreatePoll />} /> */}
          <Route path="/polls/:id" element={<PollDetails />}></Route>
          <Route path="/create" element={<CreatePoll />}></Route>
          <Route path="/polls/:id/results" element={<Results />}></Route>
        </Routes>
      </main>
    </div>
  );
}

export default App;
