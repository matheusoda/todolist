// const express = require('express');
// const firestore = require('./firestore');
// const os = require('os');
// const app = express();

// app.use(express.json());

// app.post('/insert-tasks', async (req, res) => {
//   try {
//     const tasks = req.body.map((task) => ({
//       ...task,
//       computer: os.hostname(),
//     }));
//     const batch = firestore.batch();
//     tasks.forEach((task) => {
//       const docRef = firestore.collection('tasks').doc();
//       batch.set(docRef, task);
//     });
//     await batch.commit();
//     res.status(201).send({ message: 'Tasks inserted successfully' });
//   } catch (error) {
//     res.status(500).send({ error: error.message });
//   }
// });
