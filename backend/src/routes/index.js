// // src/routes/routes.ts
const { Router } = require("express");

const {
    getUsers,
    createUser,
    updateUser,
    deleteUser
} = require("../controllers/userController.js");

const {
    createTask,
    deleteTask,
    getAllTasks,
    updateTask
} = require("../controllers/taskController.js");

const login = require("../controllers/authController");
// const { authMiddleware } = require("../middleware/authMiddleware";

const router = Router();

// // Rota de login
router.post("/login", login);

// // Rotas de usuarios
router.get("/users", getUsers);
router.post("/users", createUser);
// router.put("/users/:id", updateUser);
router.delete("/users/:id", deleteUser);

// // Rotas de tarefas
router.post("/insert-tasks", createTask);
router.get("/get-tasks", getAllTasks);
// router.put("/:id", updateTask);
router.delete("/:id", deleteTask);

module.exports = router;
