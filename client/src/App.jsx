
import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import {Dashboard, Forum, Explore, Inventory} from '.';

// import Login from "./components/auth/login/index";
// import Register from "./components/auth/register/index";
// import Home from "./pages/home";
// import CreateProject from "./pages/createProject";
// import ProjectDetails from "./pages/projectDetails";
// import DiscussionForum from "./pages/discussionForum";
// import ProjectProgress from "./components/Project/projectProgress";
// import Tasks from "./components/tasks/addTasks";
// import AllTasks from "./components/tasks/allTasks";
// import MapMain from "./pages/map";


function App() {
  return (
      <Router>
        <div className="w-full h-screen flex flex-col">
          <Routes>
            <Route path="/" element={<Dashboard />} />
            <Route path="/inventory" element={<Inventory />} />
            <Route path="/forum" element={<Forum />} />
            <Route path="/explore" element={<Explore />} />
          </Routes>
        </div>
      </Router>
  );
}

export default App;
