import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const ProjectForm = () => {
  const [formData, setFormData] = useState({
    projectName: "",
    projectDescription: "",
    areaOfProject: "",
    deadline: "",
    budgetAllocation: "",
    resourcesRequired: "",
    complianceAndResource: "",
    consent: false,
    ipfshash: "",
  });

  const [projects, setProjects] = useState([]);
  const navigate = useNavigate();

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

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === "checkbox" ? checked : value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // Ensure formData includes the IPFS hash
      const formDataWithIPFS = {
        ...formData,
        ipfshash: "dummyHashValue", // Replace this if you still use IPFS
      };

      // Send data to MongoDB
      const res = await fetch("http://localhost:5000/api/projects", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formDataWithIPFS),
      });

      const mongodata = await res.json();
      console.log(mongodata);

      // Navigate to discussion forum
      try {
        navigate("/discussionForum");
      } catch (error) {
        console.error("Error navigating to discussion forum:", error);
      }
    } catch (error) {
      console.error("Error saving project:", error);
    }
  };

  return (
    <div className="max-w-2xl mx-auto p-8 bg-white rounded-xl shadow-md">
      <h1 className="text-2xl font-semibold mb-6 text-center">
        Submit Project
      </h1>
      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="grid grid-cols-2 gap-4">
          <input
            type="text"
            id="projectName"
            name="projectName"
            value={formData.projectName}
            onChange={handleChange}
            placeholder="project name*"
            className="mt-1 block w-full border-gray-300 rounded-md shadow-sm"
            required
          />
          <input
            type="number"
            id="budgetAllocation"
            name="budgetAllocation"
            value={formData.budgetAllocation}
            onChange={handleChange}
            placeholder="Budget*"
            className="mt-1 block w-full border-gray-300 rounded-md shadow-sm"
            required
          />
          <input
            type="text"
            id="areaOfProject"
            name="areaOfProject"
            value={formData.areaOfProject}
            onChange={handleChange}
            placeholder="Area of Project*"
            className="mt-1 block w-full border-gray-300 rounded-md shadow-sm"
            required
          />
          <input
            type="date"
            id="deadline"
            name="deadline"
            value={formData.deadline}
            onChange={handleChange}
            placeholder="Deadline*"
            className="mt-1 block w-full border-gray-300 rounded-md shadow-sm"
            required
          />
        </div>

        <textarea
          id="projectDescription"
          name="projectDescription"
          value={formData.projectDescription}
          onChange={handleChange}
          placeholder="Project Description*"
          rows="3"
          className="mt-1 block w-full border-gray-300 rounded-md shadow-sm"
          required
        />

        <textarea
          id="resourcesRequired"
          name="resourcesRequired"
          value={formData.resourcesRequired}
          onChange={handleChange}
          placeholder="Resources Required*"
          rows="2"
          className="mt-1 block w-full border-gray-300 rounded-md shadow-sm"
          required
        />

        <textarea
          id="complianceAndResource"
          name="complianceAndResource"
          value={formData.complianceAndResource}
          onChange={handleChange}
          placeholder="Compliance and Resource*"
          rows="2"
          className="mt-1 block w-full border-gray-300 rounded-md shadow-sm"
          required
        />

        <div className="flex items-center">
          <input
            type="checkbox"
            id="consent"
            name="consent"
            checked={formData.consent}
            onChange={handleChange}
            className="h-4 w-4 text-green-600 border-gray-300 rounded"
            required
          />
          <label htmlFor="consent" className="ml-2 block text-sm text-gray-900">
            I give my consent*
          </label>
        </div>

        <button
          type="submit"
          className="w-full bg-green-600 text-white py-2 px-4 rounded-md hover:bg-green-700"
        >
          Submit
        </button>
      </form>
    </div>
  );
};

export default ProjectForm;
