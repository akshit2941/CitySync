import React, { useEffect, useState } from "react";
import axios from "axios";
import Navbar from "../Navbar/Navbar";

const ProjectProgress = () => {
  const [projects, setProjects] = useState([]);
  const [selectedProjectId, setSelectedProjectId] = useState("");
  const [tasks, setTasks] = useState([]);
  const [progressPercentage, setProgressPercentage] = useState(0);
  const [taskStatus, setTaskStatus] = useState([]);

  // Fetch all projects initially
  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const response = await axios.get("http://localhost:5000/api/projects");
        setProjects(response.data);
      } catch (error) {
        console.error("Error fetching projects:", error);
      }
    };

    fetchProjects();
  }, []);

  // Filter tasks based on selected project
  useEffect(() => {
    if (selectedProjectId) {
      const selectedProject = projects.find(
        (project) => project._id === selectedProjectId
      );
      if (selectedProject) {
        const projectTasks = selectedProject.taskList || [];
        setTasks(projectTasks);

        // Initialize task status and progress
        const initialTaskStatus = projectTasks.map((task) => task.completed);
        setTaskStatus(initialTaskStatus);
        setProgressPercentage(
          (initialTaskStatus.filter((status) => status).length /
            projectTasks.length) *
            100
        );
      } else {
        console.error("Project not found!");
      }
    }
  }, [selectedProjectId, projects]);

  // Calculate progress percentage
  useEffect(() => {
    if (tasks.length > 0) {
      const completedTasks = taskStatus.filter((status) => status).length;
      const newProgressPercentage = (completedTasks / tasks.length) * 100;
      setProgressPercentage(newProgressPercentage);
    }
  }, [taskStatus, tasks]);

  const handleTaskCompletion = async (index, taskId) => {
    if (!taskStatus[index]) {
      try {
        // Send request to update task completion in the backend
        await axios.patch(
          `http://localhost:5000/api/projects/${selectedProjectId}/tasks/${taskId}`
        );

        // Update task status locally
        const updatedTaskStatus = [...taskStatus];
        updatedTaskStatus[index] = true;
        setTaskStatus(updatedTaskStatus);
      } catch (error) {
        console.error("Error updating task:", error);
      }
    }
  };

  return (
    <div className="min-h-screen p-6">
      <header>
        <Navbar />
      </header>

      <main className="mt-6 max-w-4xl mx-auto">
        <div className="mb-6">
          <label
            htmlFor="projectSelect"
            className="block text-sm font-medium text-gray-700"
          >
            Select Project
          </label>
          <select
            id="projectSelect"
            value={selectedProjectId}
            onChange={(e) => setSelectedProjectId(e.target.value)}
            className="mt-2 block w-full border-gray-300 rounded-md shadow-sm focus:border-indigo-500 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
          >
            <option value="" disabled>
              -- Select a project --
            </option>
            {projects.map((project) => (
              <option key={project._id} value={project._id}>
                {project.projectName}
              </option>
            ))}
          </select>
        </div>
        {selectedProjectId && (
          <div>
            <div className="w-full bg-gray-200 rounded-full h-4 mb-6 border border-gray-300">
              <div
                className="bg-blue-500 h-full rounded-full"
                style={{ width: `${progressPercentage}%` }}
              ></div>
            </div>
            <h1 className="text-2xl font-semibold">Project Progress</h1>
            <p className="mt-2 mb-6">
              The current project progress is at {progressPercentage.toFixed(2)}
              %.
            </p>

            <div className="space-y-4">
              {tasks.map((task, index) => (
                <div
                  key={task._id}
                  className="flex justify-between items-center p-4 bg-gray-800 text-white rounded-lg shadow-md border border-gray-700"
                >
                  <span>{task.description}</span>
                  <div className="flex items-center space-x-2">
                    <button
                      onClick={() => handleTaskCompletion(index, task._id)}
                      className={`${
                        taskStatus[index]
                          ? "bg-gray-500 cursor-not-allowed"
                          : "bg-green-600 hover:bg-green-500"
                      } text-white py-1 px-3 rounded-lg`}
                      disabled={taskStatus[index]}
                    >
                      Done
                    </button>
                    <button className="text-red-500 hover:text-red-400">
                      <i className="fas fa-times"></i>
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </main>
    </div>
  );
};

export default ProjectProgress;
