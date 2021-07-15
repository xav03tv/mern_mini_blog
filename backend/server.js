const express = require("express");
const app = express();
const port = 3000;

const usersRoutes = require("./api/routes/usersRoutes");

app.use("/users", usersRoutes);

app.listen(port, () => {
  "Server start @ http://localhost:" + port;
});
