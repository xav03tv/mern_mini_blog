const UsersSchema = require("./usersSchema");
require("dotenv").config();

require("./mongooseConnexion");

const datas = { email: "xavider@gmail.com" };

async function get_all_users(datas = null) {
  const result = await UsersSchema.find(datas);

  console.log(result);
}

get_all_users(datas);
