const express = require("express");
const cors = require("cors");
const db = require("./model/mongoose");
const userRoutes = require("./routes/userRoutes");
const propertyRoutes = require("./routes/propertyRoutes");

const app = express();
db();

app.use(express.json());
app.use(cors());

app.use("/api", userRoutes);
app.use("/api", propertyRoutes);

app.listen(5000, () => console.log("Server running on port 5000"));
