import React, { useEffect, useState } from "react";
import axios from "axios";

const AllTasks = () => {
  const [projects, setProjects] = useState([]);
  const [selectedProjectId, setSelectedProjectId] = useState("");
  const [tasks, setTasks] = useState([]);

  // Fetch all projects initially
  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const response = await axios.get("http://localhost:5000/api/projects");
        console.log("Fetched Projects:", response.data); // Debugging line
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
      console.log("Selected Project ID:", selectedProjectId); // Debugging line
      const selectedProject = projects.find(
        (project) => project._id === selectedProjectId
      );
      if (selectedProject) {
        const projectTasks = selectedProject.taskList || [];
        console.log("Filtered Tasks:", projectTasks); // Debugging line
        setTasks(projectTasks);
      } else {
        console.error("Project not found!");
      }
    }
  }, [selectedProjectId, projects]);

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <div className="max-w-4xl mx-auto bg-white rounded-lg shadow-md p-8">
        <h1 className="text-3xl font-bold mb-6 text-center text-gray-800">
          All Tasks
        </h1>

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
            {tasks.length > 0 ? (
              <ul className="list-disc list-inside">
                {tasks.map((task) => (
                  <li
                    key={task._id}
                    className={`text-gray-700 ${
                      task.completed ? "line-through text-gray-500" : ""
                    }`}
                  >
                    {task.description}
                  </li>
                ))}
              </ul>
            ) : (
              <p className="text-gray-600">
                No tasks available for this project.
              </p>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default AllTasks;
