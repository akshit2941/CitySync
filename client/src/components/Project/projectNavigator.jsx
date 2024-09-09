import React, { useEffect, useState } from "react";

const ProjectNavigator = () => {
  const [projects, setProjects] = useState([]);

  // Fetch the projects from the server when the component mounts
  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const response = await fetch("http://localhost:5000/api/projects"); // API endpoint to fetch projects
        const data = await response.json();
        setProjects(data); // Update the state with the fetched project data
      } catch (error) {
        console.error("Error fetching projects:", error);
      }
    };

    fetchProjects();
  }, []); // Empty dependency array ensures this runs once when the component mounts

  return (
    <div>
      {projects.length > 0 ? (
        projects.map((project) => (
          <div key={project._id} className="mb-4">
            <div className="bg-gray-200 p-4 rounded-lg">
              {project.projectName}
            </div>
            {/* <p>{project.projectDescription}</p>
            <p>Area: {project.areaOfProject}</p>
            <p>Budget: {project.budgetAllocation}</p>
            <p>Deadline: {new Date(project.deadline).toLocaleDateString()}</p> */}
          </div>
        ))
      ) : (
        <p>No projects available</p>
      )}
    </div>
  );
};

export default ProjectNavigator;
