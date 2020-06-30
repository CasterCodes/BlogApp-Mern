const express = require("express");
const connect = require("./config/db");

// connect to the database
connect();

const app = express();
// middleware
app.use(express.json({ extented: false }));

// routes
app.use("/posts", require("./routes/post"));

// listen
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
