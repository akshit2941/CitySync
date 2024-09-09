// src/components/TaskProgress.jsx
import React, { useEffect, useState } from "react";
import axios from "axios";

const TaskProgress = ({ onViewMore }) => {
  const [progressPercentage, setProgressPercentage] = useState(0); // Initialize as a number
  const [error, setError] = useState(""); // For error handling

  useEffect(() => {
    const fetchProgressData = async () => {
      try {
        // Fetch overall progress from the API
        const response = await axios.get("/api/projects/progress");
        const { progressPercentage } = response.data;

        // Set progressPercentage or default to 0 if not available
        setProgressPercentage(progressPercentage || 0);
        setError(""); // Reset error message
      } catch (error) {
        console.error("Error fetching progress data:", error);
        setError("Failed to load progress data.");
        setProgressPercentage(0); // Set default to 0 on error
      }
    };

    fetchProgressData();
  }, []);

  return (
    <section className="mt-12 bg-white p-6 rounded-lg shadow-md">
      <h2 className="text-xl font-semibold text-gray-800 mb-4">
        Overall Project Progress
      </h2>

      {/* Display Error Message */}
      {error && <p className="text-red-500 text-center mb-4">{error}</p>}

      <div className="w-full bg-gray-200 rounded-full h-6 mb-6">
        <div
          className="bg-blue-600 h-full rounded-full"
          style={{ width: `${progressPercentage}%` }}
        ></div>
      </div>
      <div className="flex justify-between items-center">
        <span className="text-gray-600">
          {progressPercentage.toFixed(2)}% Complete
        </span>
        <button
          onClick={onViewMore}
          className="bg-indigo-600 text-white py-2 px-6 rounded-lg shadow-md transform hover:scale-105 transition-transform duration-300 ease-in-out"
        >
          View More
        </button>
      </div>
    </section>
  );
};

export default TaskProgress;
