const jwt = require("jsonwebtoken");

module.exports = (...permissionList) => {
  return (req, res, next) => {
    try {
      const token = req.headers.authorization;
      const decoded = jwt.verify(token, "123456");
      req.userData = decoded;
      next();
    } catch (err) {
      console.log(err);
      return res.status(400).json({
        ok: false,
        message: "TOKEN INVALID",
        err: err,
      });
    }
  };
};
