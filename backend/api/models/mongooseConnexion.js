const mongoose = require("mongoose");

mongoose.connect(
  "mongodb+srv://" +
    process.env.BDD_USER +
    ":" +
    process.env.BDD_PASS +
    "@cluster0.ttbod.mongodb.net/" +
    process.env.BDD_NAME +
    "?retryWrites=true&w=majority",
  { useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true }
);

module.exports = mongoose;
