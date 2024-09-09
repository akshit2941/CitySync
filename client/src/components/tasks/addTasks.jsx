import React, { useEffect, useState } from "react";
import axios from "axios";

const AddTasks = () => {
  const [projects, setProjects] = useState([]);
  const [selectedProjectId, setSelectedProjectId] = useState("");
  const [newTaskDescription, setNewTaskDescription] = useState("");
  const [error, setError] = useState(""); // For error handling
  const [successMessage, setSuccessMessage] = useState(""); // For success handling

  // Fetch projects when the component loads
  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const response = await axios.get("http://localhost:5000/api/projects");
        setProjects(response.data);
        setError(""); // Reset error message
      } catch (error) {
        console.error("Error fetching projects:", error);
        setError("Failed to load projects.");
      }
    };

    fetchProjects();
  }, []);

  // Handle task submission
  const handleTaskSubmit = async (e) => {
    e.preventDefault();

    if (!selectedProjectId) {
      setError("Please select a project first.");
      return;
    }

    try {
      const response = await axios.post(
        `http://localhost:5000/api/projects/${selectedProjectId}/tasks`,
        { description: newTaskDescription }
      );

      if (response.status === 200) {
        setNewTaskDescription(""); // Clear the task input field
        setError(""); // Clear error if successful
        setSuccessMessage("Task added successfully!");
      } else {
        setError("Failed to add task.");
      }
    } catch (error) {
      console.error("Error adding task:", error);
      setError("Failed to add task.");
      setSuccessMessage(""); // Clear success message
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center p-4">
      <div className="w-full max-w-5xl bg-white rounded-lg shadow-lg border border-gray-200 p-8">
        <h1 className="text-3xl font-bold mb-6 text-center text-gray-800">
          Add Task to Project
        </h1>

        {/* Display Error Message */}
        {error && <p className="text-red-500 text-center mb-4">{error}</p>}

        {/* Display Success Message */}
        {successMessage && (
          <p className="text-green-500 text-center mb-4">{successMessage}</p>
        )}

        <div className="flex">
          {/* Right side: Task form */}
          <div className="w-full">
            <form onSubmit={handleTaskSubmit} className="space-y-6">
              <div>
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
                  className="block w-full border-gray-300 rounded-md shadow-sm focus:border-indigo-500 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                  required
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
              <div>
                <label
                  htmlFor="taskDescription"
                  className="block text-sm font-medium text-gray-700"
                >
                  Task Description
                </label>
                <textarea
                  id="taskDescription"
                  name="taskDescription"
                  value={newTaskDescription}
                  onChange={(e) => {
                    setNewTaskDescription(e.target.value);
                    setError("");
                  }}
                  rows="4"
                  className="mt-2 p-3 block w-full border-gray-300 rounded-md shadow-sm focus:border-indigo-500 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                  required
                />
              </div>
              <button
                type="submit"
                className="w-full bg-green-600 text-white py-2 px-4 rounded-md shadow-md hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-opacity-50"
              >
                Add Task
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddTasks;
