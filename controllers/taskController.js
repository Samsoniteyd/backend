import Task from '../models/tasks/TaskModel.js';

// Create task
export const createTask = async (req, res) => {
  const { title, description, dueDate, status } = req.body;
  try {
    const task = await Task.create({
      title,
      description,
      assignedTo: req.user.id,
      dueDate,
      status,
    });
    res.status(201).json(task);
  } catch (error) {
    res.status(400).json({ error: 'Failed to create task' });
  }
};

// Get tasks
export const getTasks = async (req, res) => {
  try {
    const tasks = await Task.find({ assignedTo: req.user.id });
    res.status(200).json(tasks);
  } catch (error) {
    res.status(400).json({ error: 'Failed to fetch tasks' });
  }
};

// Edit task
export const editTask = async (req, res) => {
  const { id } = req.params;
  const { title, description, dueDate, status } = req.body;

  try {
    const task = await Task.findById(id);
    if (task.assignedTo.toString() === req.user.id) {
      task.title = title;
      task.description = description;
      task.dueDate = dueDate;
      task.status = status;
      await task.save();
      res.status(200).json(task);
    } else {
      res.status(403).json({ error: 'Unauthorized' });
    }
  } catch (error) {
    res.status(400).json({ error: 'Failed to edit task' });
  }
};

// Delete task
export const deleteTask = async (req, res) => {
  const { id } = req.params;
  try {
    const task = await Task.findById(id);
    if (task.assignedTo.toString() === req.user.id) {
      await task.remove();
      res.status(200).json({ message: 'Task deleted successfully' });
    } else {
      res.status(403).json({ error: 'Unauthorized' });
    }
  } catch (error) {
    res.status(400).json({ error: 'Failed to delete task' });
  }
};
