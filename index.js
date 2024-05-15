const express = require("express");
require("dotenv").config();
const dbConnection = require("./dbConnection");
const userRoutes = require("./routes/user.routes");
dbConnection();
const app = express();
app.use(express.json());

app.use("/api/auth", userRoutes);

app.listen(process.env.PORT, () => {
  console.log(`Server listening at port ${process.env.PORT}`);
});
