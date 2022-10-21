const jwt = require("jsonwebtoken");
const { UnauthorizationError } = require("../errors");

const authorizationMiddleware = async (req, res, next) => {
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    throw new UnauthorizationError("No token provided");
  }
  const token = authHeader.split(" ")[1];
  try {
    const decoded = jwt.verify(token, process.env.JWT_TOKEN);
    console.log("decoded");
    const { id, username } = decoded;
    req.user = { id, username };
    next();
  } catch (error) {
    console.log(error);
    throw new UnauthorizationError("Not authorized to access this route");
  }
};

module.exports = authorizationMiddleware;
