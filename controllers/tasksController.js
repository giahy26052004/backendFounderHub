import Task from "../models/taskModel.js";

const getTasks = async (req, res) => {
  const tasks = await Task.find();
  console.log(tasks);
  res.json(tasks);
};
const deleteTask = async (req, res) => {
  // Attempt to delete the task by ID
  try {
    const { id } = req.params; // Access the ID from request parameters

    // Attempt to delete the task by ID
    const result = await Task.deleteOne({ _id: id });

    // Check if the deletion was successful
    if (result.deletedCount === 0) {
      return res.status(404).json({ message: "Task not found" });
    }

    // Send success response if deletion was successful
    res.status(200).json({ message: "Delete success" });
  } catch (error) {
    console.error("Error deleting task:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};
//edit tasks

const editTask = async (req, res) => {
  try {
    const { id } = req.params;
    const { title, description, status, assigned_to, priority, due_date } =
      req.body;
    const updatedTask = await Task.findByIdAndUpdate(
      id,
      {
        title,
        description,
        status,
        assigned_to,
        priority,
        due_date,
      },
      { new: true }
    );
    if (!updatedTask) {
      return res.status(404).json({ error: "Task not found" });
    }
    return res.json(updatedTask);
  } catch (error) {
    console.error("Error updating task:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

//get TaskById
const getTaskById = async (req, res) => {
  try {
    const Tasks = await Task.findById(req.params.id);
    if (!Tasks) {
      return res.status(404).json({ error: "Tasks params id Not Found" });
    }
    return res.status(200).json(Tasks);
  } catch (e) {
    return res.status(400).json({ error: "error getting controllers: ", e });
  }
};

// Lấy danh sách nhiệm vụ đã hoàn thành
const getTasksCompleted = async (req, res) => {
  try {
    const completedTasks = await Task.find({ status: "Completed" });
    res.json(completedTasks);
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};
const registerTask = async (req, res) => {
  const { title, description, status, assigned_to, priority, due_date } =
    req.body;
  const task = new Task({
    title,
    description,
    status,
    assigned_to,
    priority,
    due_date,
  });

  try {
    const newTask = await task.save();
    res.status(201).json(newTask);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};
export {
  getTasks,
  registerTask,
  getTasksCompleted,
  deleteTask,
  getTaskById,
  editTask,
};
