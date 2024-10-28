import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Ats from "./pages/Ats";
import Jobs from "./pages/Jobs";

const App = () => {
  return (
    <Router>

      

      {/* Define routes for different pages */}
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/ats" element={<Ats/>} />
        <Route path="/jobs" element={<Jobs />} />
      </Routes>
    </Router>
  );
};

export default App;
