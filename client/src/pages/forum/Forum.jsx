import React, { useEffect, useState } from "react";
import axios from "axios";

function Forum() {
  const [projects, setProjects] = useState([]);
  const [selectedProjectId, setSelectedProjectId] = useState("");
  const [selectedProjectName, setSelectedProjectName] = useState("");
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState("");
  const [sender, setSender] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  // Fetch all projects when the component mounts
  useEffect(() => {
    const fetchProjects = async () => {
      setLoading(true);
      try {
        const response = await axios.get("http://localhost:5000/api/projects");
        setProjects(response.data);
      } catch (error) {
        setError("Error fetching projects. Please try again later.");
        console.error("Error fetching projects:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchProjects();
  }, []);

  // Fetch messages and project name for the selected project
  useEffect(() => {
    if (selectedProjectId) {
      const fetchProjectDetails = async () => {
        setLoading(true);
        try {
          // Fetch messages
          const messagesResponse = await axios.get(
            `http://localhost:5000/api/projects/${selectedProjectId}/discussions`
          );
          setMessages(messagesResponse.data);

          // Fetch project details to get the name
          const projectResponse = await axios.get(
            `http://localhost:5000/api/projects/${selectedProjectId}`
          );
          setSelectedProjectName(projectResponse.data.projectName);
        } catch (error) {
          setError("Messages Loaded Successfully");
          console.error("Error fetching project details:", error);
        } finally {
          setLoading(false);
        }
      };

      fetchProjectDetails();
    }
  }, [selectedProjectId]);

  // Handle message submission
  const handleSendMessage = async () => {
    if (!newMessage || !sender) {
      setError("Please provide both your name and a message.");
      return;
    }

    setLoading(true);
    setError("");
    try {
      await axios.post(
        `http://localhost:5000/api/projects/${selectedProjectId}/discussions`,
        {
          sender,
          message: newMessage,
        }
      );
      // Fetch updated messages
      const response = await axios.get(
        `http://localhost:5000/api/projects/${selectedProjectId}/discussions`
      );
      setMessages(response.data);
      setNewMessage(""); // Clear the input field
      setSender(""); // Clear the sender field
    } catch (error) {
      setError("Error sending message. Please try again later.");
      console.error("Error sending message:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex h-screen">
      {/* Left Sidebar: Projects List */}
      <div className="w-1/4 bg-gray-100 p-4 border-r">
        <h2 className="text-xl font-semibold mb-4">Projects</h2>
        {loading && <p className="text-blue-500 font-semibold">Loading...</p>}
        {error && <p className="text-green-500 font-semibold">{error}</p>}

        <ul>
          {projects.map((project) => (
            <li
              key={project._id}
              className={`cursor-pointer p-2 mb-2 rounded-lg ${
                selectedProjectId === project._id
                  ? "bg-blue-200"
                  : "bg-white hover:bg-gray-200"
              }`}
              onClick={() => setSelectedProjectId(project._id)}
            >
              {project.projectName}
            </li>
          ))}
        </ul>
      </div>

      {/* Right Side: Chatbox */}
      <div className="w-3/4 flex flex-col p-4">
        <h3 className="text-xl font-semibold mb-4">
          {selectedProjectId ? selectedProjectName : "Select a Project"}
        </h3>

        {selectedProjectId && (
          <>
            {/* Messages Display */}
            <div className="flex-grow overflow-y-auto bg-gray-50 p-4 border rounded-md mb-4">
              {messages.length === 0 ? (
                <p className="text-gray-500">No messages yet</p>
              ) : (
                messages.map((msg) => (
                  <div
                    key={msg._id}
                    className="mb-4 border-b pb-2 border-gray-200"
                  >
                    <strong>{msg.sender}:</strong> {msg.message}
                    <br />
                    <small className="text-gray-500">
                      {new Date(msg.timestamp).toLocaleString()}
                    </small>
                  </div>
                ))
              )}
            </div>

            {/* Message Input */}
            <div className="flex flex-col space-y-2">
              <input
                type="text"
                placeholder="Your name"
                value={sender}
                onChange={(e) => setSender(e.target.value)}
                className="p-2 border rounded-md"
              />
              <textarea
                placeholder="Write a message"
                value={newMessage}
                onChange={(e) => setNewMessage(e.target.value)}
                className="p-2 border rounded-md"
              ></textarea>
              <button
                onClick={handleSendMessage}
                className="bg-green-500 text-white py-2 rounded-md hover:bg-green-600"
              >
                Send Message
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  );
}

export default Forum;
