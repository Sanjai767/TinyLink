// src/App.js
import { Routes, Route } from "react-router-dom";
import Dashboard from "./pages/Dashboard";
import Stats from "./pages/Stats";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Dashboard />} />
      <Route path="/code/:code" element={<Stats />} />
    </Routes>
  );
}

export default App;
