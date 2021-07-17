const express = require("express");
const app = express();
const mongoose = require("mongoose");
require("dotenv").config();
const port = process.env.PORT;

require("./api/models/mongooseConnexion");

/* mongoose.connect(
  "mongodb+srv://" +
    process.env.BDD_USER +
    ":" +
    process.env.BDD_PASS +
    "@cluster0.ttbod.mongodb.net/" +
    process.env.BDD_NAME +
    "?retryWrites=true&w=majority",
  { useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true }
); */

const usersRoutes = require("./api/routes/usersRoutes");

app.use(express.json());
app.use("/users", usersRoutes);

app.listen(port, () => {
  console.log("Server start @ " + process.env.HOST + ":" + port);
});
