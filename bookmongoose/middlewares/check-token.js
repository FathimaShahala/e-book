const jwt = require("jsonwebtoken");
const checkToken = (req, res, next) => {
  //   console.log("middleware worked");
  //   console.log(req.headers.authorization);

  try {
    const bearerToken = req.headers.authorization;
    if (!bearerToken) {
      return res.status(403).json({ message: "You are not authorized" });
    }
    const token = bearerToken.split(" ")[1];
    const isValid = jwt.verify(token, process.env.KEY);
    next();
  } catch (e) {
    return res.status(500).json({ message: e.message });
  }
};
module.exports = checkToken;
