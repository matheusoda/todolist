const { Firestore } = require('@google-cloud/firestore');
const os = require('os');

const firestore = new Firestore();
const collectionName = 'tasks';

class taskService {
  static async createTask(data) {
    const computerName = os.hostname(); // Nome do computador
    const taskData = { ...data, computer: computerName };

    const docRef = await firestore.collection(collectionName).add(taskData);
    return { id: docRef.id, ...taskData };
  }

  static async getAllTasks() {
    const snapshot = await firestore.collection(collectionName).get();
    return snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
  }

  static async updateTask(taskId, updates) {
    await firestore.collection(collectionName).doc(taskId).update(updates);
    return { id: taskId, ...updates };
  }

  static async deleteTask(taskId) {
    await firestore.collection(collectionName).doc(taskId).delete();
    return { message: `Task ${taskId} deleted successfully` };
  }
}

module.exports = taskService;