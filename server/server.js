require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs'); // For password hashing

const app = express();

app.use(cors());
app.use(express.json());

// MongoDB connection
mongoose.connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
}).then(() => {
    console.log('Connected to MongoDB');
}).catch(err => {
    console.error('Error connecting to MongoDB', err);
});

// User Schema
const userSchema = new mongoose.Schema({
    username: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    department: { type: String, required: true },
    role: { type: String, required: true },
    location: { type: String, required: true },
});

const User = mongoose.model('User', userSchema, 'user_data');

// Project Schema
const projectSchema = new mongoose.Schema({
    projectName: { type: String, required: true },
    projectDescription: { type: String, required: true },
    areaOfProject: { type: String, required: true },
    deadline: { type: Date, required: true },
    budgetAllocation: { type: Number, required: true },
    resourcesRequired: { type: String, required: true },
    complianceAndResource: { type: String, required: true },
    consent: { type: Boolean, required: true },
    taskList: [{ description: String, completed: { type: Boolean, default: false } }],
});

const Project = mongoose.model('Project', projectSchema, 'projects');

const discussionSchema = new mongoose.Schema({
    projectId: { type: mongoose.Schema.Types.ObjectId, ref: "Project", required: true },
    projectName: { type: String, required: true }, // Add projectName
    sender: { type: String, required: true },
    message: { type: String, required: true },
    timestamp: { type: Date, default: Date.now }
});


const Discussion = mongoose.model("Discussion", discussionSchema);


// Add a new task to a project
app.post("/api/projects/:projectId/tasks", async (req, res) => {
    const { projectId } = req.params;
    const { description } = req.body;

    if (!description) {
        return res.status(400).json({ message: "Task description is required" });
    }

    try {
        // Find the project by ID and update the taskList array
        const project = await Project.findByIdAndUpdate(
            projectId,
            { $push: { taskList: { description, completed: false } } }, // Set default for 'completed'
            { new: true } // Return the updated project
        );

        if (!project) {
            return res.status(404).json({ message: "Project not found" });
        }

        res.status(200).json(project);
    } catch (error) {
        console.error("Error adding task:", error);
        res.status(500).json({ message: "Internal server error" });
    }
});

// Update task completion status
app.patch("/api/projects/:projectId/tasks/:taskId", async (req, res) => {
    const { projectId, taskId } = req.params;

    try {
        // Find the project by ID and update the task's completed status
        const project = await Project.findOneAndUpdate(
            { _id: projectId, "taskList._id": taskId },
            { $set: { "taskList.$.completed": true } }, // Set the task's 'completed' field to true
            { new: true }
        );

        if (!project) {
            return res.status(404).json({ message: "Project or task not found" });
        }

        res.status(200).json({ message: "Task marked as completed", project });
    } catch (error) {
        console.error("Error updating task completion status:", error);
        res.status(500).json({ message: "Internal server error" });
    }
});

// Calculate overall task progress
app.get('/api/projects/progress', async (req, res) => {
    try {
        // Fetch all projects
        const projects = await Project.find();

        let totalTasks = 0;
        let completedTasks = 0;

        // Iterate through projects and tasks to calculate progress
        projects.forEach(project => {
            // Count the number of tasks in each project
            const tasks = project.taskList;
            totalTasks += tasks.length;
            // Count the number of completed tasks
            completedTasks += tasks.filter(task => task.completed).length;
        });

        // Calculate overall progress percentage
        const percentage = totalTasks ? (completedTasks / totalTasks) * 100 : 0;

        // Send the response
        res.status(200).json({ progressPercentage: percentage });
    } catch (error) {
        console.error("Error calculating overall progress:", error);
        res.status(500).json({ message: "Internal server error" });
    }
});

//message for discussion
app.post('/api/projects/:projectId/discussions', async (req, res) => {
    const { projectId } = req.params;
    const { sender, message } = req.body;

    try {
        // Find the project by its ID to get the project name
        const project = await Project.findById(projectId);

        if (!project) {
            return res.status(404).json({ message: "Project not found" });
        }

        // Create a new discussion with both projectId and projectName
        const newDiscussion = new Discussion({
            projectId,
            projectName: project.projectName,  // Include projectName here
            sender,
            message,
        });

        await newDiscussion.save();

        res.status(201).json({ message: "Message sent successfully", newDiscussion });
    } catch (error) {
        console.error("Error sending message:", error);
        res.status(500).json({ message: "Internal server error" });
    }
});


// Get all messages for a project (Discussion collection)
app.get('/api/projects/:projectId/discussions', async (req, res) => {
    const { projectId } = req.params;

    try {
        // Find all discussions related to the project and sort by timestamp
        const discussions = await Discussion.find({ projectId }).sort({ timestamp: 1 });

        res.status(200).json(discussions);
    } catch (error) {
        console.error("Error fetching messages:", error);
        res.status(500).json({ message: "Internal server error" });
    }
});



// Hardcoded JWT secret
const JWT_SECRET = 'your_hardcoded_jwt_secret';

// Register route
app.post('/register', async (req, res) => {
    try {
        const { username, password, department, role, location } = req.body;

        if (password.length < 6) {
            return res.status(400).json({ message: 'Password should be at least 6 characters long' });
        }

        // Hash the password before storing it
        const hashedPassword = await bcrypt.hash(password, 10);

        // Store user data in MongoDB
        const user = new User({
            username,
            password: hashedPassword,
            department,
            role,
            location,
        });

        await user.save();

        res.status(201).json({ message: 'User created successfully' });
    } catch (err) {
        res.status(500).json({ message: 'Error registering user', error: err });
    }
});

// Login route
app.post('/login', async (req, res) => {
    try {
        const { username, password } = req.body;

        // Find the user by username
        const user = await User.findOne({ username });
        if (!user) {
            return res.status(400).json({ message: 'User not found' });
        }

        // Compare the password with the stored hashed password
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(400).json({ message: 'Invalid credentials' });
        }

        // Create a JWT token
        const token = jwt.sign({ id: user._id }, JWT_SECRET, { expiresIn: '1h' });

        res.json({ token });
    } catch (err) {
        res.status(500).json({ message: 'Error logging in', error: err });
    }
});

// Add project route
app.post('/api/projects', async (req, res) => {
    try {
        const {
            projectName,
            projectDescription,
            areaOfProject,
            deadline,
            budgetAllocation,
            resourcesRequired,
            complianceAndResource,
            consent,
            ipfshash
        } = req.body;

        // Check if all required fields are provided
        if (!projectName || !projectDescription || !areaOfProject || !deadline || !budgetAllocation || !resourcesRequired || !complianceAndResource || consent === undefined || !ipfshash) {
            return res.status(400).json({ message: 'All fields are required' });
        }

        // Create a new project
        const project = new Project({
            projectName,
            projectDescription,
            areaOfProject,
            deadline,
            budgetAllocation,
            resourcesRequired,
            complianceAndResource,
            consent,
            ipfshash
        });

        await project.save();

        res.status(201).json({ message: 'Project saved successfully', project });
    } catch (err) {
        console.error('Error saving project:', err);
        res.status(500).json({ message: 'Error saving project', error: err });
    }
});

// Fetch tasks for a specific project
app.get('/api/projects/:projectId/tasks', async (req, res) => {
    const { projectId } = req.params;

    try {
        // Find the project by its ID
        const project = await Project.findById(projectId);

        if (!project) {
            return res.status(404).json({ message: 'Project not found' });
        }

        // Return the task list associated with this project
        res.status(200).json(project.taskList); // Send back the tasks
    } catch (error) {
        console.error('Error fetching tasks:', error);
        res.status(500).json({ message: 'Server error' });
    }
});

// Calculate overall task progress
app.get('/api/projects/progress', async (req, res) => {
    try {
        // Fetch all projects
        const projects = await Project.find();

        let totalTasks = 0;
        let completedTasks = 0;

        // Iterate through projects and tasks to calculate progress
        projects.forEach(project => {
            // Count the number of tasks in each project
            const tasks = project.taskList;
            totalTasks += tasks.length;
            // Count the number of completed tasks
            completedTasks += tasks.filter(task => task.completed).length;
        });

        // Calculate overall progress percentage
        const percentage = totalTasks ? (completedTasks / totalTasks) * 100 : 0;

        // Send the response
        res.status(200).json({ progressPercentage: percentage });
    } catch (error) {
        console.error("Error calculating overall progress:", error);
        res.status(500).json({ message: "Internal server error" });
    }
});


// Fetch all projects route
app.get('/api/projects', async (req, res) => {
    try {
        const projects = await Project.find(); // Retrieve all projects from the database
        res.status(200).json(projects);
    } catch (err) {
        res.status(500).json({ message: 'Error fetching projects', error: err });
    }
});

const PORT = 5000;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});