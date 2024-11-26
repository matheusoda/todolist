const  Firestore = require('@google-cloud/firestore');
const dotenv = require("dotenv");

dotenv.config();

(async () => {
    const collections = await firestore.listCollections();
    console.log("Collections:", collections.map((col) => col.id));
  })();

export const firestore = new Firestore({
    projectId: process.env.GCP_PROJECT_ID,
    keyFilename: process.env.GOOGLE_APPLICATION_CREDENTIALS,
});

