app.get('/get-tasks', async (req, res) => {
    try {
      const snapshot = await firestore.collection('tasks').get();
      const tasks = snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
      res.status(200).send(tasks);
    } catch (error) {
      res.status(500).send({ error: error.message });
    }
  });
  