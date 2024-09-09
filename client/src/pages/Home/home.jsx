import React from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "../../components/Navbar/Navbar";
import ProjectNavigator from "../../components/Project/projectNavigator";
import TaskProgress from "../../components/tasks/TaskProgress";

function Home() {
  const navigate = useNavigate();

  const handleAddTasks = () => {
    navigate("/addTasks");
  };

  const handleViewAllTasks = () => {
    navigate("/allTasks");
  };

  const handleNavigationProjectDetails = () => {
    navigate("/projectDetails");
  };

  const handleNavigationCreateProject = () => {
    navigate("/createProject");
  };

  const handleProgress = () => {
    navigate("/projectProgress");
  };

  return (
    <div className="min-h-screen bg-gray-100">
      <header>
        <Navbar />
      </header>

      <main className="container mx-auto px-6 py-12">
        <section className="flex flex-col md:flex-row justify-between items-start space-y-6 md:space-y-0 md:space-x-6">
          <div className="flex-1">
            <div className="bg-white p-6 rounded-lg shadow-md">
              <h2 className="text-xl font-semibold text-gray-800 mb-4">
                Project Navigator
              </h2>
              <ProjectNavigator />
              <div></div>
              <div className="mt-4 space-y-4">
                <button
                  onClick={handleAddTasks}
                  className="bg-blue-600 text-white py-2 px-6 rounded-lg shadow-md transform hover:scale-105 transition-transform duration-300 ease-in-out"
                >
                  Add Tasks
                </button>
                <button
                  onClick={handleViewAllTasks}
                  className="bg-gray-600 text-white py-2 ml-6 px-6 rounded-lg shadow-md transform hover:scale-105 transition-transform duration-300 ease-in-out"
                >
                  View All Tasks
                </button>
              </div>
            </div>
          </div>

          <div className="flex-1 bg-white p-6 rounded-lg shadow-md flex flex-col justify-center items-center space-y-4">
            <button
              onClick={handleNavigationCreateProject}
              className="bg-blue-600 text-white py-3 px-8 rounded-lg shadow-lg transform hover:scale-105 transition-transform duration-300 ease-in-out w-full md:w-1/2 text-center"
            >
              Create Project
            </button>
            <button
              onClick={handleNavigationProjectDetails}
              className="bg-green-600 text-white py-3 px-8 rounded-lg shadow-lg transform hover:scale-105 transition-transform duration-300 ease-in-out w-full md:w-1/2 text-center"
            >
              See Projects
            </button>
          </div>
        </section>

        <section>
          <TaskProgress onViewMore={handleProgress} />
        </section>
      </main>
    </div>
  );
}

export default Home;
