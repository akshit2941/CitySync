import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import {
  Dashboard,
  Forum,
  Explore,
  Inventory,
  Home,
  Login,
  Register,
  AddTasks,
  CreateProject,
  ProjectProgress,
} from ".";

import { AuthProvider } from "../src/components/context/authContext/page";
function App() {
  return (
    <AuthProvider>
      <Router>
        <div className="w-full h-screen flex flex-col">
          <Routes>
            <Route path="/home" element={<Home />} />
            <Route path="/" element={<Home />} />
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/inventory" element={<Inventory />} />
            <Route path="/forum" element={<Forum />} />
            <Route path="/explore" element={<Explore />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/addTasks" element={<AddTasks />} />
            <Route path="/createProject" element={<CreateProject />} />
            <Route path="/projectProgress" element={<ProjectProgress />} />
          </Routes>
        </div>
      </Router>
    </AuthProvider>
  );
}

export default App;
