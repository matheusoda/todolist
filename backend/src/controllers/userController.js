const UserService = require("../services/userService.js");

const { z } = require("zod");
const BadRequestError = require("../utils/erros.js");

async function getUsers(req, res) {
    try {
        const users = await UserService.getAllUser();
        res.json(users);
    } catch (error) {
        res.status(500).json({ error: "Error fetching users" });
    }
}

async function createUser(req, res) {
    const { name, email, isAdmin, password } = req.body;
    try {
        const validation = userSchema.safeParse(req.body);
        if (!validation.success) {
            res.status(400).json({
                errors: validation.error.errors.map((err) => ({
                    path: err.path.join("."),
                    message: err.message
                }))
            });
            return;
        }

        const createdUser = await UserService.createUser(
            name,
            email,
            isAdmin,
            password
        );
        res.status(201).json(createdUser);
    } catch (error) {
        if (error instanceof BadRequestError) {
            return res.status(error.statusCode).json({ error: error.message });
        }
        res.status(500).json({
            error: "Erro ao criar o usuário",
            error: error.message
        });
    }
}

async function updateUser(req, res) {
    const { id } = req.params;
    const { name, email, phone, password } = req.body;

    try {
        const validation = userUpdateSchema.safeParse(req.body);

        if (!validation.success) {
            res.status(400).json({
                errors: validation.error.errors.map((err) => ({
                    path: err.path.join("."),
                    message: err.message
                }))
            });
            return;
        }

        const newUser = await UserService.updateUser(id, {
            name,
            email,
            phone
        });
        res.status(201).json(newUser);
    } catch (error) {
        console.log("ERROR: ", error);
        res.status(500).json({ error: "Error creating user" });
    }
}

async function deleteUser(req, res) {
    const { id } = req.params;

    try {
        await UserService.deleteUser(id);

        res.status(200).json({message: "Success delete user"});
    } catch (error) {
        console.log("ERROR: ", error);
        res.status(500).json({ error: "Error creating user" });
    }
}

module.exports = {
    getUsers,
    createUser,
    updateUser,
    deleteUser
};

const userSchema = z.object({
    name: z.string().min(2, "O nome precisa ter pelo menos 2 caracteres."),
    email: z.string().email("Formato de e-mail inválido."),
    password: z.string().min(5, "A senha precisa ter pelo menos 5 caracteres.")
});

const userUpdateSchema = z.object({
    name: z.string().min(2, "O nome precisa ter pelo menos 2 caracteres."),
    email: z.string().email("Formato de e-mail inválido."),
    phone: z.string().optional()
});
