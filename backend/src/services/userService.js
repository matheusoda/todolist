const { Firestore } = require("@google-cloud/firestore");
const { randomUUID } = require("crypto");
const bcrypt = require("bcrypt");
const BadRequestError = require("../utils/erros");

const firestore = new Firestore();
const collectionName = "users";

class UserService {
    // Servico que criar um novo usuario
    static async createUser(name, email, isAdmin, password) {
        const existingUser = await firestore
            .collection(collectionName)
            .where("email", "==", email)
            .get();

        if (existingUser.docs.length >= 1) {
            throw new BadRequestError(
                "Erro ao criar o usuário, email já cadastrado"
            );
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        const newUser = {
            id: randomUUID(),
            name,
            email,
            isAdmin,
            password: hashedPassword
        };

        const docRef = await firestore.collection(collectionName).add(newUser);

        const createdUser = { id: docRef.id, ...newUser };
        delete createdUser.password;

        return createdUser;
    }

    // Servico que busca todos usuarios
    static async getAllUser() {
        const snapshot = await firestore.collection(collectionName).get();
        return snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
    }

    // Servico que busca usuário por ID
    static async getUserById(id) {
        return prisma.user.findUnique({ where: { id } });
    }

    //  Servico que atualiza dados de um usuario
    static async updateUser(id, data) {
        return prisma.user.update({
            where: { id },
            data
        });
    }

    // Servico que exclui um usuario
    static async deleteUser(id) {
        const existingUser = await firestore
            .collection(collectionName)
            .where("id", "==", id)
            .get();

        if (existingUser.empty) {
            throw {
                status: 404,
                message: "Erro ao deletar usuário, usuário não encontrado"
            };
        }
        const docId = existingUser.docs[0].id;
        await firestore.collection(collectionName).doc(docId).delete();
    }
}

module.exports = UserService;
