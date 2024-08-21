import mongoose from "mongoose";

const TaskSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  status: {
    type: String,
    enum: ["New", "In Progress", "Completed"],
    default: "New",
  },
  assigned_to: {
    type: String,
  },
  priority: {
    type: String,
    enum: ["Low", "Medium", "High"],
    default: "Medium",
  },
  due_date: {
    type: Date,
  },
  created_at: {
    type: Date,
    default: Date.now,
  },
  updated_at: {
    type: Date,
    default: Date.now,
  },
});

// Middleware to update the 'updated_at' field before saving
TaskSchema.pre("save", function (next) {
  this.updated_at = Date.now();
  next();
});

// Middleware to update 'updated_at' field before updating
TaskSchema.pre("findOneAndUpdate", function (next) {
  this.set({ updated_at: Date.now() });
  next();
});

const Task = mongoose.model("Task", TaskSchema);

export default Task;
