const taskService = require ("../services/taskService.js");

async function createTask(req, res) {
    try {
        const task = await taskService.createTask(req.body);
        res.status(201).json(task);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}

async function getAllTasks(req, res) {
    try {
        const tasks = await taskService.getAllTasks();
        res.status(200).json(tasks);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}

async function updateTask(req, res) {
    try {
        const { id } = req.params;
        const task = await taskService.updateTask(id, req.body);
        res.status(200).json(task);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}

async function deleteTask(req, res) {
    try {
        const { id } = req.params;
        const result = await taskService.deleteTask(id);
        res.status(200).json(result);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}

module.exports = {
    createTask,
    getAllTasks,
    updateTask,
    deleteTask
};