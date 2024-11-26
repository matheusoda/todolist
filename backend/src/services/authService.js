const { Firestore } = require("@google-cloud/firestore");
const jwt = require("jsonwebtoken");
const dotenv = require("dotenv");
const bcrypt = require("bcrypt");

dotenv.config();

const firestore = new Firestore();
const collectionName = "users";

const secret = process.env.JWT_SECRET || "seu-segredo"; // Mantenha isso em um arquivo .env

class authService {
    static async login(email, password) {
        // Busca o usuário pelo nome de usuário
        const existingUser = await firestore
            .collection(collectionName)
            .where("email", "==", email)
            .get();

        // Valida se usuário retornou dados
        if (existingUser.empty) {
            throw new Error("Credenciais inválidas");
        }

        const userDoc = existingUser.docs[0];
        const userData = userDoc.data();
        const passwordHash = userData.password;

        // Valida senha inserida pelo usuário e senha salva no banco
        const isPasswordValid = await bcrypt.compare(password, passwordHash);

        // Retorna erro caso senhas sejam diferentes
        if (!isPasswordValid) {
            throw new Error("Credenciais inválidas");
        }

        // Gera o token JWT
        const token = jwt.sign({ userId: userData.id }, secret, {
            expiresIn: "1h"
        });

        return { token, userId: userData.id, isAdmin: userData.isAdmin };
    }

    static verifyToken(token) {
        try {
            // Verifica o token com a chave secreta
            const decoded = jwt.verify(token, secret);
            return decoded; // Retorna os dados decodificados, como `userId` e `isAdmin`
        } catch (error) {
            // Lança erro caso o token seja inválido ou expirado
            throw new Error("Token inválido ou expirado");
        }
    }
}

module.exports = authService; // Exporta o authService
