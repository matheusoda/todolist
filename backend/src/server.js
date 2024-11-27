// src/server.ts
const express = require("express");
const dotenv = require("dotenv");
const routes = require("./routes/index.js");
const cors = require("cors");

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());
app.use("/api", routes);

if (process.env.NODE_ENV !== "test") {
    app.listen(PORT, () => {
        console.log(`Server running on http://localhost:${PORT}`);
    });
}

module.exports = app;
